#!/usr/bin/env node
'use strict';

/**
 * Zero-dependency static site build.
 *
 *   node build.js
 *
 * Reads src/ and writes a deployable static site to dist/. No npm install,
 * no toolchain, nothing to break — the output is plain HTML, one stylesheet
 * and a handful of generated assets.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const { site } = require('./src/data');
const { render } = require('./src/layout');
const { allPages } = require('./src/pages');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

/* ------------------------------------------------------------- utilities */

function write(relPath, contents) {
  const full = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
  return Buffer.byteLength(contents);
}

/** Map a route to its output file. "/" -> index.html, "/about/" -> about/index.html */
function outputPathFor(route) {
  if (route.endsWith('.html')) return route.replace(/^\//, '');
  return path.posix.join(route.replace(/^\//, ''), 'index.html');
}

/** Conservative CSS minifier: safe for the hand-written stylesheet in src/. */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .replace(/\s*\n\s*/g, '')
    .trim();
}

/** Collapse insignificant whitespace between block-level tags in the HTML. */
function minifyHtml(html) {
  const parts = html.split(/(<(?:pre|textarea|script)\b[\s\S]*?<\/(?:pre|textarea|script)>)/gi);
  return parts
    .map((part, i) => (i % 2 ? part : part.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ')))
    .join('')
    .trim();
}

/* ------------------------------------------------------ generated assets */

/** Minimal PNG encoder (truecolour, filter 0) so we can emit brand images with no dependencies. */
function encodePng(width, height, rgb) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  let o = 0;
  for (let y = 0; y < height; y++) {
    raw[o++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      raw[o++] = rgb[i];
      raw[o++] = rgb[i + 1];
      raw[o++] = rgb[i + 2];
    }
  }

  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body) >>> 0, 0);
    return Buffer.concat([len, body, crc]);
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ -1;
}

/**
 * Brand card used for og:image. Navy gradient with the cyan "signal line"
 * motif carried over from the logo. Replace dist/og.png with a designed
 * 1200x630 card when one is available — nothing else needs to change.
 */
function brandImage(width, height) {
  const rgb = Buffer.alloc(width * height * 3);
  const put = (x, y, r, g, b) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = (y * width + x) * 3;
    rgb[i] = r;
    rgb[i + 1] = g;
    rgb[i + 2] = b;
  };
  const mix = (a, b, t) => Math.round(a + (b - a) * Math.max(0, Math.min(1, t)));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Diagonal navy gradient: #0d1b3d -> #1b3f8f
      const d = (x / width) * 0.55 + (y / height) * 0.45;
      let r = mix(0x0d, 0x1b, d);
      let g = mix(0x1b, 0x3f, d);
      let b = mix(0x3d, 0x8f, d);

      // Cyan glow in the upper right, matching the site hero.
      const gx = (x - width * 0.82) / (width * 0.45);
      const gy = (y - height * -0.05) / (height * 0.8);
      const glow = Math.max(0, 1 - Math.sqrt(gx * gx + gy * gy));
      const gi = glow * glow * 0.75;
      r = mix(r, 0x0a, gi);
      g = mix(g, 0xb9, gi);
      b = mix(b, 0xe4, gi);

      put(x, y, r, g, b);
    }
  }

  // Cyan signal lines with terminating nodes, echoing the logo mark.
  const unit = height / 630;
  const lines = [
    { y: 0.44, x0: 0.07, x1: 0.52 },
    { y: 0.53, x0: 0.07, x1: 0.66 },
    { y: 0.62, x0: 0.07, x1: 0.41 },
  ];
  for (const ln of lines) {
    const yy = Math.round(ln.y * height);
    const thick = Math.max(2, Math.round(3 * unit));
    for (let x = Math.round(ln.x0 * width); x < Math.round(ln.x1 * width); x++) {
      for (let t = 0; t < thick; t++) put(x, yy + t, 0x0a, 0xb9, 0xe4);
    }
    const cx = Math.round(ln.x1 * width);
    const cy = yy + Math.floor(thick / 2);
    const rad = Math.round(11 * unit);
    for (let dy = -rad; dy <= rad; dy++) {
      for (let dx = -rad; dx <= rad; dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= rad) {
          const edge = dist > rad - 2 ? 0.55 : 1;
          put(cx + dx, cy + dy, Math.round(0x0a * edge + 255 * (1 - edge)), Math.round(0xb9 * edge + 255 * (1 - edge)), Math.round(0xe4 * edge + 255 * (1 - edge)));
        }
      }
    }
  }

  return encodePng(width, height, rgb);
}

/** Square app icon: navy field with the cyan signal motif. */
function iconImage(size) {
  const rgb = Buffer.alloc(size * size * 3);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = (x + y) / (size * 2);
      const i = (y * size + x) * 3;
      rgb[i] = Math.round(0x0d + (0x1b - 0x0d) * d);
      rgb[i + 1] = Math.round(0x1b + (0x3f - 0x1b) * d);
      rgb[i + 2] = Math.round(0x3d + (0x8f - 0x3d) * d);
    }
  }
  const put = (x, y) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 3;
    rgb[i] = 0x0a;
    rgb[i + 1] = 0xb9;
    rgb[i + 2] = 0xe4;
  };
  const th = Math.max(2, Math.round(size * 0.055));
  const rows = [0.33, 0.5, 0.67];
  const ends = [0.62, 0.78, 0.52];
  rows.forEach((ry, idx) => {
    const yy = Math.round(ry * size);
    for (let x = Math.round(size * 0.2); x < Math.round(ends[idx] * size); x++) {
      for (let t = 0; t < th; t++) put(x, yy + t);
    }
    const cx = Math.round(ends[idx] * size);
    const rad = Math.round(size * 0.075);
    for (let dy = -rad; dy <= rad; dy++)
      for (let dx = -rad; dx <= rad; dx++)
        if (dx * dx + dy * dy <= rad * rad) put(cx + dx, yy + Math.floor(th / 2) + dy);
  });
  return encodePng(size, size, rgb);
}

/** Square SVG favicon matching the generated PNG icon. */
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#0d1b3d"/><stop offset="1" stop-color="#1b3f8f"/>
</linearGradient></defs>
<rect width="64" height="64" rx="13" fill="url(#g)"/>
<g stroke="#0ab9e4" stroke-width="3.4" stroke-linecap="round" fill="#0ab9e4">
<path d="M13 21h24"/><circle cx="42" cy="21" r="4.6"/>
<path d="M13 32h31"/><circle cx="49" cy="32" r="4.6"/>
<path d="M13 43h19"/><circle cx="37" cy="43" r="4.6"/>
</g></svg>`;

/* ------------------------------------------------------------------ build */

function build() {
  const started = Date.now();
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  // Pages
  const pages = allPages();
  let htmlBytes = 0;
  let largest = { path: '', size: 0 };

  for (const page of pages) {
    const html = minifyHtml(render(page));
    const size = write(outputPathFor(page.path), html);
    htmlBytes += size;
    if (size > largest.size) largest = { path: page.path, size };
  }

  // Stylesheet
  const css = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');
  const cssBytes = write('s.css', minifyCss(css));

  // Logo. src/assets/logo.svg is the untouched brand file; its viewBox carries
  // ~25% empty space below the artwork, which makes the mark sit high in the
  // header. Crop to the measured content bounds (286.12 x 75.10, padded for the
  // 1.47px stroke) so it fills the space it is given. Aspect becomes 286.12/76.7.
  const logo = fs.readFileSync(path.join(SRC, 'assets', 'logo.svg'), 'utf8');
  const tight = logo.replace('viewBox="0 0 286.12 99.92"', 'viewBox="0 -0.8 286.12 76.7"');
  if (tight === logo) throw new Error('logo.svg viewBox not found — check the source asset');
  write('logo.svg', tight);
  write('logo-light.svg', tight.replace(/#1b3f8f/gi, '#ffffff').replace(/#1a408d/gi, '#ffffff'));

  // Icons and social card
  write('favicon.svg', FAVICON_SVG);
  write('apple-touch-icon.png', iconImage(180));
  write('icon-512.png', iconImage(512));
  const ogBytes = write('og.png', brandImage(1200, 630));

  // Web app manifest
  write(
    'site.webmanifest',
    JSON.stringify(
      {
        name: site.name,
        short_name: 'Crossroads',
        description: site.description,
        start_url: '/',
        display: 'browser',
        background_color: '#ffffff',
        theme_color: '#0d1b3d',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      null,
      2
    )
  );

  // sitemap.xml — indexable pages only
  const today = new Date().toISOString().slice(0, 10);
  const priority = (p) => (p === '/' ? '1.0' : p.split('/').filter(Boolean).length === 1 ? '0.8' : '0.7');
  const urls = pages
    .filter((p) => !p.noindex)
    .map(
      (p) =>
        `<url><loc>${site.origin}${p.path}</loc><lastmod>${today}</lastmod>` +
        `<changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq>` +
        `<priority>${priority(p.path)}</priority></url>`
    )
    .join('\n');
  write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );

  write(
    'robots.txt',
    `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`
  );

  // Cloudflare Pages / Netlify headers: long cache on immutable assets,
  // revalidate HTML, plus baseline security headers.
  write(
    '_headers',
    `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/s.css
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable
`
  );

  // Keep the legacy extensionless URLs working on hosts that do not do it automatically.
  write(
    '_redirects',
    `/privacy.html  /privacy/  301
/returns.html  /returns/  301
/index.html    /          301
`
  );

  const ms = Date.now() - started;
  const kb = (n) => (n / 1024).toFixed(1) + ' KB';
  console.log(`\n  Crossroads Technology — build complete in ${ms}ms\n`);
  console.log(`  ${pages.length} pages   ${kb(htmlBytes)} HTML total`);
  console.log(`  stylesheet       ${kb(cssBytes)}`);
  console.log(`  og image         ${kb(ogBytes)}`);
  console.log(`  largest page     ${largest.path} (${kb(largest.size)})`);
  console.log(`  output           dist/\n`);
}

build();
