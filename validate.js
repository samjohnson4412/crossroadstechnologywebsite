#!/usr/bin/env node
'use strict';

/**
 * Post-build checks: structured data parses, internal links resolve, and the
 * SEO fundamentals are present on every page.
 *
 *   node validate.js
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const problems = [];
const warnings = [];

/** Entities occupy one character in a search result, not five. */
function decode(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&mdash;/g, '—')
    .replace(/&ldquo;|&rdquo;/g, '"');
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `node build.js` first.');
  process.exit(1);
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const routes = new Set(
  htmlFiles.map((f) => {
    const rel = '/' + path.relative(DIST, f).split(path.sep).join('/');
    return rel.endsWith('/index.html') ? rel.replace(/index\.html$/, '') : rel;
  })
);
const assets = new Set(files.map((f) => '/' + path.relative(DIST, f).split(path.sep).join('/')));

for (const file of htmlFiles) {
  const rel = '/' + path.relative(DIST, file).split(path.sep).join('/');
  const html = fs.readFileSync(file, 'utf8');
  const at = (msg) => problems.push(`${rel}: ${msg}`);

  // --- SEO fundamentals -------------------------------------------------
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  if (!title) at('missing <title>');
  else if (title.length > 65) warnings.push(`${rel}: title is ${title.length} chars (>65 may truncate in results)`);

  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (!desc) at('missing meta description');
  else if (desc.length > 165) warnings.push(`${rel}: meta description is ${desc.length} chars (>165 may truncate)`);
  else if (desc.length < 70) warnings.push(`${rel}: meta description is only ${desc.length} chars`);

  if (!/<link rel="canonical"/.test(html)) at('missing canonical link');
  if (!/<html lang="/.test(html)) at('missing lang attribute');
  if (!/<meta name="viewport"/.test(html)) at('missing viewport meta');

  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) at('no <h1>');
  if (h1s.length > 1) at(`${h1s.length} <h1> elements (should be exactly 1)`);

  // --- Structured data --------------------------------------------------
  const ld = (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
  if (!ld) at('missing JSON-LD');
  else {
    try {
      const parsed = JSON.parse(ld);
      if (!parsed['@graph'] || !parsed['@graph'].length) at('JSON-LD has no @graph nodes');
    } catch (e) {
      at('JSON-LD does not parse: ' + e.message);
    }
  }

  // --- Images -----------------------------------------------------------
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt=/.test(tag)) at('image without alt text: ' + tag.slice(0, 70));
    if (!/\swidth=/.test(tag) || !/\sheight=/.test(tag))
      warnings.push(`${rel}: image without explicit dimensions (risks layout shift)`);
  }

  // --- Character escaping ------------------------------------------------
  // A bare "&" outside <script> is invalid HTML and usually means a value was
  // interpolated without escaping. Entities inside JSON-LD are not an issue.
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  const bare = withoutScripts.match(/&(?![a-zA-Z][a-zA-Z0-9]*;|#\d+;|#x[0-9a-fA-F]+;)/g);
  if (bare) at(`${bare.length} unescaped "&" in markup (should be &amp;)`);
  if (/&amp;(?:amp;|[a-z]+;)/.test(withoutScripts)) at('double-escaped entity found (e.g. &amp;amp;)');

  // --- Internal links ---------------------------------------------------
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
    const target = m[1];
    if (routes.has(target) || assets.has(target)) continue;
    if (routes.has(target + '/')) {
      at(`link to ${target} should be ${target}/ (avoids a redirect hop)`);
      continue;
    }
    at(`broken internal link: ${target}`);
  }
}

// --- Sitemap consistency --------------------------------------------------
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const listed = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]);
for (const loc of listed) if (!routes.has(loc)) problems.push(`sitemap.xml lists a route that does not exist: ${loc}`);
for (const r of routes) {
  if (r === '/404.html') continue;
  if (!listed.includes(r)) warnings.push(`${r} is not listed in sitemap.xml`);
}

// --- Duplicate titles and descriptions ------------------------------------
const seenTitles = new Map();
const seenDescs = new Map();
for (const file of htmlFiles) {
  const rel = '/' + path.relative(DIST, file).split(path.sep).join('/');
  const html = fs.readFileSync(file, 'utf8');
  const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const d = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (t) seenTitles.set(t, [...(seenTitles.get(t) || []), rel]);
  if (d) seenDescs.set(d, [...(seenDescs.get(d) || []), rel]);
}
for (const [t, pages] of seenTitles) if (pages.length > 1) problems.push(`duplicate title "${t}" on ${pages.join(', ')}`);
for (const [, pages] of seenDescs)
  if (pages.length > 1) problems.push(`duplicate meta description on ${pages.join(', ')}`);

/* ------------------------------------------------------------------ report */

console.log(`\n  Validated ${htmlFiles.length} pages, ${files.length} files\n`);
if (warnings.length) {
  console.log(`  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log('    - ' + w);
  console.log('');
}
if (problems.length) {
  console.log(`  ${problems.length} problem(s):`);
  for (const p of problems) console.log('    x ' + p);
  console.log('');
  process.exit(1);
}
console.log('  No problems found.\n');
