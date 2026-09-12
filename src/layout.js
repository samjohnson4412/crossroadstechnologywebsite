'use strict';

const { site, services, industries, areas } = require('./data');
const { icon, esc } = require('./ui');

const ORG_ID = site.origin + '/#organization';
const SITE_ID = site.origin + '/#website';

/**
 * Organization node reused by every page via @id references, so search engines
 * resolve one consistent business entity across the whole site.
 */
function organizationNode() {
  return {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: 'Crossroads Tech',
    url: site.origin + '/',
    description: site.description,
    slogan: site.tagline,
    foundingDate: site.founded,
    telephone: site.phoneE164,
    email: site.email,
    priceRange: '$$',
    image: site.origin + '/og.png',
    logo: { '@type': 'ImageObject', url: site.origin + '/logo.svg' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lon },
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    areaServed: [
      ...areas.map((a) => ({ '@type': 'City', name: a.city + ', FL' })),
      { '@type': 'AdministrativeArea', name: 'Hillsborough County, FL' },
      { '@type': 'AdministrativeArea', name: 'Pinellas County, FL' },
    ],
    knowsAbout: [
      'Managed IT services',
      'Structured cabling',
      'Business networking',
      'Security camera installation',
      'Audio visual integration',
      'Microsoft 365 administration',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Technology Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          url: `${site.origin}/services/${s.slug}/`,
          description: s.blurb,
        },
      })),
    },
  };
}

/** Assemble the JSON-LD graph for a single page. */
function schemaGraph(page) {
  const graph = [
    organizationNode(),
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: site.origin + '/',
      name: site.name,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebPage',
      '@id': site.origin + page.path + '#webpage',
      url: site.origin + page.path,
      name: page.metaTitle,
      description: page.metaDescription,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
      inLanguage: 'en-US',
    },
  ];

  if (page.crumbs && page.crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': site.origin + page.path + '#breadcrumb',
      itemListElement: page.crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: site.origin + c.url,
      })),
    });
  }

  if (page.serviceSchema) {
    graph.push({
      '@type': 'Service',
      '@id': site.origin + page.path + '#service',
      name: page.serviceSchema.name,
      description: page.serviceSchema.description,
      serviceType: page.serviceSchema.name,
      provider: { '@id': ORG_ID },
      areaServed: areas.map((a) => ({ '@type': 'City', name: a.city + ', FL' })),
      url: site.origin + page.path,
    });
  }

  if (page.faqs && page.faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': site.origin + page.path + '#faq',
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function header(currentTop) {
  const on = (k) => (currentTop === k ? ' aria-current="page"' : '');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
<div class="wrap head-in">
<a class="brand" href="/" aria-label="${esc(site.name)} — home">
<img src="/logo.svg" alt="${esc(site.name)}" width="224" height="60" fetchpriority="high" decoding="async">
</a>
<input type="checkbox" id="navtoggle" class="navtoggle">
<label for="navtoggle" class="burger"><span></span><span></span><span></span><span class="sr-only">Menu</span></label>
<nav class="nav" aria-label="Main">
<ul>
<li><a href="/services/"${on('services')}>Services</a></li>
<li><a href="/industries/"${on('industries')}>Industries</a></li>
<li><a href="/service-areas/"${on('areas')}>Service Areas</a></li>
<li><a href="/about/"${on('about')}>About</a></li>
<li><a href="/contact/"${on('contact')}>Contact</a></li>
</ul>
</nav>
<div class="head-cta">
<a class="head-tel" href="tel:${site.phoneHref}">${icon('phone')}<span>${esc(site.phone)}</span></a>
<a class="btn btn-sm" href="/contact/">Get a quote</a>
</div>
</div>
</header>`;
}

function footer() {
  const col = (title, links) =>
    `<div class="fcol"><h3>${title}</h3><ul>${links
      .map((l) => `<li><a href="${l[1]}">${esc(l[0])}</a></li>`)
      .join('')}</ul></div>`;

  return `<footer class="site-foot">
<div class="wrap foot-top">
<div class="fbrand">
<img src="/logo-light.svg" alt="${esc(site.name)}" width="224" height="60" loading="lazy" decoding="async">
<p class="fslogan">${esc(site.tagline)}</p>
<p class="fdesc">A Tampa Bay managed IT and low-voltage contractor. One team for your network, cabling, cameras, AV and cloud — run by the people who do the work.</p>
<address class="nap">
<a href="https://maps.google.com/?q=${encodeURIComponent(
    `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`
  )}" rel="noopener">${icon('pin')}<span>${esc(site.address.street)}<br>${esc(site.address.city)}, ${esc(
    site.address.region
  )} ${esc(site.address.postal)}</span></a>
<a href="tel:${site.phoneHref}">${icon('phone')}<span>${esc(site.phone)}</span></a>
<a href="mailto:${site.email}">${icon('mail')}<span>${esc(site.email)}</span></a>
<span class="nap-hours">${icon('clock')}<span>${esc(site.hoursLabel)}</span></span>
<span class="nap-hours">${icon('check')}<span>Licensed &amp; insured</span></span>
</address>
</div>
<div class="fnav">
${col(
  'Services',
  services.map((s) => [s.nav || s.title, `/services/${s.slug}/`])
)}
${col(
  'Industries',
  industries.map((i) => [i.title, `/industries/${i.slug}/`])
)}
${col(
  'Service Areas',
  areas.map((a) => [a.city + ', FL', `/service-areas/${a.slug}/`])
)}
${col('Company', [
  ['About', '/about/'],
  ['Contact', '/contact/'],
  ['Request a Quote', '/contact/'],
  ['Privacy Policy', '/privacy/'],
  ['Returns & Cancellations', '/returns/'],
])}
</div>
</div>
<div class="wrap foot-bot">
<p>&copy; ${new Date().getFullYear()} ${esc(site.legalName)}. Crossroads Technology is a division of ${esc(
    site.legalName
  )}. All rights reserved.</p>
<p class="fsmall">Serving Tampa, St. Petersburg, Clearwater, Brandon and Orlando, Florida.</p>
</div>
</footer>`;
}

/**
 * Render a complete HTML document.
 *
 * page: { path, metaTitle, metaDescription, h1, body, crumbs, faqs,
 *         serviceSchema, top, noindex }
 */
function render(page) {
  const canonical = site.origin + page.path;
  const title = page.metaTitle;
  const desc = page.metaDescription;

  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">'}
<meta name="theme-color" content="#0d1b3d">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.origin}/og.png">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${site.origin}/og.png">
<meta name="geo.region" content="US-FL">
<meta name="geo.placename" content="Tampa, Florida">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/s.css">
<script type="application/ld+json">${schemaGraph(page)}</script>
</head>
<body>
${header(page.top)}
<main id="main">
${page.body}
</main>
${footer()}
</body>
</html>
`;
}

module.exports = { render };
