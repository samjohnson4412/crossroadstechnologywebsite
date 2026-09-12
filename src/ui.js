'use strict';

/** Inline SVG icons. Inlined so the page needs zero image requests. */
const ICONS = {
  shield: '<path d="M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  network:
    '<rect x="3" y="3" width="7" height="6" rx="1"/><rect x="14" y="3" width="7" height="6" rx="1"/><rect x="8.5" y="15" width="7" height="6" rx="1"/><path d="M6.5 9v3h11V9M12 12v3"/>',
  cable:
    '<path d="M4 4v5a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v3"/><path d="M2 4h4M18 20h4"/><path d="M9 4h2v3H9zM13 4h2v3h-2z"/>',
  camera:
    '<path d="m3 7 14-4 1.6 5.6L4.6 12.6 3 7Z"/><path d="M6 12.2V17a2 2 0 0 0 2 2h3"/><circle cx="15" cy="17" r="3"/>',
  display:
    '<rect x="2.5" y="4" width="19" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
  cloud:
    '<path d="M7 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5H7Z"/>',
  phone:
    '<path d="M6.3 3h3l1.5 4-2 1.4a12 12 0 0 0 5.8 5.8l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.3 5.2 2 2 0 0 1 6.3 3Z"/>',
  move: '<path d="M3 20V9l7-5 7 5v11"/><path d="M3 20h18M10 20v-5h4v5"/><path d="m18 4 3 3-3 3"/><path d="M21 7h-6"/>',
  wrench:
    '<path d="M15.5 3.5a5 5 0 0 0-6.4 6.1L3.6 15a2 2 0 0 0 2.8 2.8l5.4-5.4a5 5 0 0 0 6.1-6.4L15.4 8.6 12 8l-.6-3.4 2.8-2.8Z" transform="translate(1 1.5)"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  hub: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="3.5" r="2"/><circle cx="12" cy="20.5" r="2"/><circle cx="3.5" cy="12" r="2"/><circle cx="20.5" cy="12" r="2"/><path d="M12 5.5v3.5M12 15v3.5M5.5 12H9M15 12h3.5"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  school: '<path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5"/><path d="M21 8v6"/>',
  church: '<path d="M12 2v6M9.5 5h5"/><path d="m12 8-6 4v9h12v-9l-6-4Z"/><path d="M10 21v-4h4v4"/>',
  briefcase: '<rect x="2.5" y="7" width="19" height="13" rx="2"/><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M2.5 12.5h19"/>',
  store: '<path d="M4 4h16l1.5 5a3 3 0 0 1-5.8 1 3 3 0 0 1-5.7 0 3 3 0 0 1-5.8-1L4 4Z"/><path d="M4.5 11v9h15v-9"/><path d="M9.5 20v-5h5v5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6.5 9 6 9-6"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 9.5h19M6 14.5h4"/>',
  door:
    '<path d="M5.5 21V4.2A1.2 1.2 0 0 1 6.7 3h7.6a1.2 1.2 0 0 1 1.2 1.2V21"/><path d="M3.5 21h17"/><circle cx="13" cy="12.4" r="1"/><path d="M18.5 8.5h2.5M18.5 11.5h2.5M18.5 14.5h2.5"/>',
  theater:
    '<rect x="2.5" y="3.5" width="19" height="11" rx="1.5"/><path d="M5 21v-2.4a2 2 0 0 1 2-2h1.6a2 2 0 0 1 2 2V21"/><path d="M13.4 21v-2.4a2 2 0 0 1 2-2H17a2 2 0 0 1 2 2V21"/>',
  audit:
    '<circle cx="10.8" cy="10.8" r="6.6"/><path d="m15.6 15.6 4.6 4.6"/><path d="M8.6 12.4v-1.8M10.8 12.9V9.6M13 12.4V8.8"/>',
  leaf: '<path d="M5 19c0-9 6-14 15-15 0 9-4.6 15-13 15H5Z"/><path d="M5.2 19c2.8-5 6.6-8 10.6-9.6"/>',
  rocket:
    '<path d="M12 2.6c3 2.1 4.9 5.6 4.9 9.5 0 1.9-.4 3.4-.9 4.4H8c-.5-1-.9-2.5-.9-4.4 0-3.9 1.9-7.4 4.9-9.5Z"/><circle cx="12" cy="9.8" r="2"/><path d="M8.2 16.9 6 19.4l2.7-.6M15.8 16.9 18 19.4l-2.7-.6"/>',
  arrow: '<path d="M5 12h13M13 6l6 6-6 6"/>',
};

/** Render an inline SVG icon. */
function icon(name, cls = 'ico') {
  const d = ICONS[name] || ICONS.check;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
}

/** Escape text destined for HTML body content or attribute values. */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Native-details FAQ list. Uses <details> so it needs no JavaScript, and the
 * answers stay in the DOM for crawlers even while visually collapsed.
 */
function faqList(faqs) {
  return `<div class="faq">${faqs
    .map(
      (f) => `<details class="faq-item">
<summary><span>${esc(f.q)}</span>${icon('arrow', 'ico faq-chev')}</summary>
<div class="faq-a"><p>${esc(f.a)}</p></div>
</details>`
    )
    .join('')}</div>`;
}

/** Section heading block with an eyebrow label. */
function sectionHead(eyebrow, title, sub, align = '') {
  return `<div class="sec-head${align ? ' ' + align : ''}">
${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
<h2>${title}</h2>
${sub ? `<p class="sec-sub">${sub}</p>` : ''}
</div>`;
}

/** Full-width call-to-action band used at the bottom of every page. */
function ctaBand(site, heading, sub) {
  return `<section class="band">
<div class="wrap band-in">
<div>
<h2>${heading}</h2>
<p>${sub}</p>
</div>
<div class="band-act">
<a class="btn btn-lg" href="tel:${site.phoneHref}">${icon('phone')}<span>${esc(site.phone)}</span></a>
<a class="btn btn-ghost btn-lg" href="/contact/">Request a quote</a>
</div>
</div>
</section>`;
}

/** Breadcrumb trail. Paired with BreadcrumbList structured data in layout.js. */
function crumbs(trail) {
  const items = trail
    .map((c, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${esc(c.name)}</li>`
        : `<li><a href="${c.url}">${esc(c.name)}</a></li>`
    )
    .join('');
  return `<nav class="crumbs" aria-label="Breadcrumb"><div class="wrap"><ol>${items}</ol></div></nav>`;
}

module.exports = { icon, esc, faqList, sectionHead, ctaBand, crumbs, ICONS };
