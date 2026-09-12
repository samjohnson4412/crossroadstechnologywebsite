'use strict';

const { site, credentials, clients, serviceCategories, services, industries, areas, homeFaqs, pillars, process } = require('./data');
const { icon, esc, faqList, sectionHead, ctaBand, crumbs } = require('./ui');
const { heroGraphic } = require('./hero');

const svc = (slug) => services.find((s) => s.slug === slug);

/** Service card linking to its detail page. */
function serviceCard(s) {
  return `<a class="card" href="/services/${s.slug}/">
<span class="card-ico">${icon(s.icon)}</span>
<h3>${esc(s.title)}</h3>
<p>${esc(s.blurb)}</p>
<span class="card-more">Learn more ${icon('arrow')}</span>
</a>`;
}

function industryCard(i) {
  return `<a class="card" href="/industries/${i.slug}/">
<span class="card-ico">${icon(i.icon)}</span>
<h3>${esc(i.title)}</h3>
<p>${esc(i.blurb)}</p>
<span class="card-more">Learn more ${icon('arrow')}</span>
</a>`;
}

/** Dark page header used on every interior page. */
function pageHead(h1, sub) {
  return `<section class="phead"><div class="wrap"><h1>${esc(h1)}</h1><p>${esc(sub)}</p></div></section>`;
}

/** Sidebar shared by service and industry pages. */
function sidebar(heading, links) {
  return `<aside class="aside">
<h3>${esc(heading)}</h3>
<ul>${links.map((l) => `<li><a href="${l[1]}"><span>${esc(l[0])}</span>${icon('arrow')}</a></li>`).join('')}</ul>
<a class="btn" href="/contact/">Request a quote</a>
<a class="aside-tel" href="tel:${site.phoneHref}">${esc(site.phone)}</a>
</aside>`;
}

/** Render the prose body blocks defined in data.js. */
function bodyBlocks(blocks) {
  return blocks
    .map((b) => {
      let h = `<h2>${esc(b.h)}</h2>`;
      if (b.p) h += `<p>${esc(b.p)}</p>`;
      if (b.list) h += `<ul>${b.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
      return h;
    })
    .join('\n');
}

/* ------------------------------------------------------------------ home */

function home() {
  const body = `
<section class="hero">
<div class="wrap hero-in">
<div class="hero-copy">
<p class="eyebrow">Tampa Bay &middot; Managed IT &amp; Low-Voltage</p>
<h1>Designed, installed and supported by <span class="hl">the same team</span>.</h1>
<p class="hero-lead">Crossroads Technology is a single technology contractor for Tampa Bay business &mdash; network, structured cabling, security cameras, AV and Microsoft 365. One scope, one schedule, one company accountable for whether it works.</p>
<div class="hero-acts">
<a class="btn btn-lg" href="/contact/">Get a quote</a>
<a class="btn btn-ghost btn-lg" href="tel:${site.phoneHref}">${icon('phone')}<span>${esc(site.phone)}</span></a>
</div>
<p class="hero-note">${icon('pin')}<span>Based in Tampa &middot; Serving Tampa Bay and Orlando</span></p>
</div>
<div class="hero-art">${heroGraphic()}</div>
</div>
</section>

<div class="trust"><div class="wrap trust-in">
<span><i class="dot"></i><b>Cisco 360 Partner</b></span>
<span><i class="dot"></i><b>Zoom Partner</b></span>
<span><i class="dot"></i><b>Microsoft 365 &amp; Google Workspace</b></span>
<span><i class="dot"></i><b>Fluke-Certified Cable Testing</b></span>
<span><i class="dot"></i><b>Licensed &amp; Insured</b></span>
</div></div>

<section class="sec">
<div class="wrap">
${sectionHead(
  'What we do',
  'One contractor for the whole technology stack',
  'Most businesses end up with four vendors who each blame the other three. We handle the network, the cable in the walls, the cameras, the screens and the cloud accounts &mdash; so there is one number to call and one company accountable.',
  'center'
)}
<div class="grid g4">${services.filter((s) => s.featured).map(serviceCard).join('')}</div>
<p class="sec-more"><a href="/services/">See all ${services.length} services ${icon('arrow')}</a></p>
</div>
</section>

<section class="clients">
<div class="wrap clients-in">
<p class="clients-lbl">Trusted by</p>
<ul class="clients-list">
${clients.map((c) => `<li>${esc(c)}</li>`).join('')}
</ul>
</div>
</section>

<section class="sec sec-dark">
<div class="wrap">
${sectionHead('Why Crossroads', 'One team, accountable for all of it')}
<div class="grid g2">
${pillars
  .map(
    (p) => `<div class="pillar">
<span class="p-ico">${icon(p.icon)}</span>
<div><h3>${esc(p.h)}</h3><p>${esc(p.p)}</p></div>
</div>`
  )
  .join('')}
</div>
</div>
</section>

<section class="sec sec-soft">
<div class="wrap">
${sectionHead(
  'Who we work with',
  'Industries we know well',
  'We are not generalists pretending. These are the environments we are in every week, and we know where their problems come from.',
  'center'
)}
<div class="grid g4">${industries.map(industryCard).join('')}</div>
</div>
</section>

<section class="sec">
<div class="wrap">
${sectionHead('How it works', 'A process built to remove surprises')}
<div class="grid g4">
${process
  .map((s) => `<div class="step"><span class="n">${s.n}</span><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></div>`)
  .join('')}
</div>
</div>
</section>

<section class="sec sec-soft">
<div class="wrap">
${sectionHead('Partners & standards', 'Certified where it counts', '', 'center')}
<div class="grid g3">
${credentials.map((c) => `<div class="cred"><b>${esc(c.label)}</b><span>${esc(c.detail)}</span></div>`).join('')}
</div>
</div>
</section>

<section class="sec">
<div class="wrap">
${sectionHead(
  'Service area',
  'Local, and that matters',
  'Cabling, cameras and AV are physical work. Someone has to be in the building. We are based in Tampa and cover the bay area for on-site work, with project coverage extending to Orlando.',
  'center'
)}
<div class="grid g3" style="max-width:900px;margin-inline:auto">
${areas
  .map(
    (a) => `<a class="card" href="/service-areas/${a.slug}/">
<span class="card-ico">${icon('pin')}</span>
<h3>${esc(a.city)}, FL</h3>
<p>${esc(a.metaDescription.split('.')[0])}.</p>
<span class="card-more">View area ${icon('arrow')}</span>
</a>`
  )
  .join('')}
</div>
</div>
</section>

<section class="sec sec-soft">
<div class="wrap">
${sectionHead('Questions', 'Frequently asked', '', 'center')}
${faqList(homeFaqs)}
</div>
</section>

${ctaBand(
  site,
  'Tell us what is broken, or what you are building.',
  'Call and you will reach someone who can actually answer the question. For cabling, camera and AV work we will come walk the site before quoting.'
)}`;

  return {
    path: '/',
    top: 'home',
    metaTitle: 'Managed IT, Cabling & AV in Tampa Bay | Crossroads Technology',
    metaDescription:
      'Tampa Bay managed IT and low-voltage contractor. Networking, structured cabling, security cameras, AV and Microsoft 365 from one accountable team.',
    faqs: homeFaqs,
    body,
  };
}

/* -------------------------------------------------------------- services */

function servicesIndex() {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' },
  ];
  const body = `${crumbs(trail)}
${pageHead(
  'Technology Services for Tampa Bay Businesses',
  'Managed IT, networking, cabling, cameras, AV and cloud — delivered by one contractor so nothing falls between vendors.'
)}
${serviceCategories
  .map(
    (cat) => `<section class="sec${cat.id === 'security' || cat.id === 'managed' ? ' sec-soft' : ''}">
<div class="wrap">
${sectionHead('', esc(cat.label), esc(cat.blurb))}
<div class="grid g3">${services.filter((sv) => sv.category === cat.id).map(serviceCard).join('')}</div>
</div>
</section>`
  )
  .join('')}

<section class="sec sec-soft">
<div class="wrap">
${sectionHead(
  'Scopes that overlap',
  'Why buying it together is cheaper',
  'A camera install needs cable, a switch port, PoE budget, a VLAN and a recorder on a network someone maintains. Split across three vendors, each one prices defensively around what the others might do, and the gaps become change orders. One contractor prices the whole path once.',
  'center'
)}
</div>
</section>
${ctaBand(site, 'Not sure which scope you need?', 'Describe the problem and we will tell you what it actually takes to fix it — including when the answer is smaller than you expected.')}`;

  return {
    path: '/services/',
    top: 'services',
    metaTitle: 'IT, Cabling, Camera & AV Services in Tampa Bay',
    metaDescription:
      'Managed IT, business networking and Wi-Fi, structured cabling, security cameras, AV, Microsoft 365 and office moves for Tampa Bay and Orlando businesses.',
    crumbs: trail,
    body,
  };
}

function servicePage(s) {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' },
    { name: s.title, url: `/services/${s.slug}/` },
  ];
  const rel = s.related.map((r) => svc(r)).filter(Boolean);

  const body = `${crumbs(trail)}
${pageHead(s.h1, s.blurb)}
<section class="sec">
<div class="wrap split">
<div class="prose">
<p class="lead">${esc(s.intro)}</p>
${bodyBlocks(s.body)}
</div>
${sidebar('Related services', [
  ...rel.map((r) => [r.title, `/services/${r.slug}/`]),
  ['All services', '/services/'],
])}
</div>
</section>

<section class="sec sec-soft">
<div class="wrap">
${sectionHead('Questions', `${esc(s.title)} — frequently asked`, '', 'center')}
${faqList(s.faqs)}
</div>
</section>

<section class="sec">
<div class="wrap">
${sectionHead('Where we work', 'Available across Tampa Bay and Orlando', '', 'center')}
<ul class="chips" style="justify-content:center">
${areas.map((a) => `<li><a href="/service-areas/${a.slug}/">${esc(a.city)}, FL</a></li>`).join('')}
</ul>
</div>
</section>
${ctaBand(site, `Need ${esc(s.title.toLowerCase())}?`, `Call ${site.phone} or send us the details. For physical work we will walk the site before we quote it.`)}`;

  return {
    path: `/services/${s.slug}/`,
    top: 'services',
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    crumbs: trail,
    faqs: s.faqs,
    serviceSchema: { name: s.title, description: s.metaDescription },
    body,
  };
}

/* ------------------------------------------------------------ industries */

function industriesIndex() {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Industries', url: '/industries/' },
  ];
  const body = `${crumbs(trail)}
${pageHead(
  'Industries We Serve',
  'Private schools, churches, professional offices and retail construction — environments we are in every week.'
)}
<section class="sec"><div class="wrap"><div class="grid g2">${industries.map(industryCard).join('')}</div></div></section>
${ctaBand(site, 'Work in one of these? So do we.', 'We already know where the problems come from in your environment, which means less discovery and a faster start.')}`;

  return {
    path: '/industries/',
    top: 'industries',
    metaTitle: 'Industries We Serve | Schools, Churches & Law Firms',
    metaDescription:
      'IT and low-voltage support for private schools, churches, law firms and retail construction across Tampa Bay and Orlando.',
    crumbs: trail,
    body,
  };
}

function industryPage(ind) {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Industries', url: '/industries/' },
    { name: ind.title, url: `/industries/${ind.slug}/` },
  ];
  const rel = ind.services.map((r) => svc(r)).filter(Boolean);

  const body = `${crumbs(trail)}
${pageHead(ind.h1, ind.blurb)}
<section class="sec">
<div class="wrap split">
<div class="prose">
<p class="lead">${esc(ind.intro)}</p>
${ind.points.map((p) => `<h3>${esc(p[0])}</h3><p>${esc(p[1])}</p>`).join('\n')}
</div>
${sidebar('Services for this industry', [
  ...rel.map((r) => [r.title, `/services/${r.slug}/`]),
  ['All industries', '/industries/'],
])}
</div>
</section>

<section class="sec sec-soft">
<div class="wrap">
${sectionHead('Questions', 'Frequently asked', '', 'center')}
${faqList(ind.faqs)}
</div>
</section>
${ctaBand(site, 'Let us take a look at what you have.', 'We will walk the site, document what is there, and tell you what actually needs to change — and what does not.')}`;

  return {
    path: `/industries/${ind.slug}/`,
    top: 'industries',
    metaTitle: ind.metaTitle,
    metaDescription: ind.metaDescription,
    crumbs: trail,
    faqs: ind.faqs,
    body,
  };
}

/* ---------------------------------------------------------- service areas */

function areasIndex() {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/service-areas/' },
  ];
  const body = `${crumbs(trail)}
${pageHead(
  'Service Areas',
  'Based in Tampa, covering the bay area for on-site work, with project coverage across Orlando and the I-4 corridor.'
)}
<section class="sec"><div class="wrap"><div class="grid g3">
${areas
  .map(
    (a) => `<a class="card" href="/service-areas/${a.slug}/">
<span class="card-ico">${icon('pin')}</span>
<h3>${esc(a.city)}, FL</h3>
<p>${esc(a.intro.slice(0, 150))}…</p>
<span class="card-more">View area ${icon('arrow')}</span>
</a>`
  )
  .join('')}
</div></div></section>
${ctaBand(site, 'Outside these cities?', 'Ask anyway. We take project work beyond our normal radius when the scope makes the trip make sense.')}`;

  return {
    path: '/service-areas/',
    top: 'areas',
    metaTitle: 'Service Areas — Tampa Bay & Orlando | Crossroads Technology',
    metaDescription:
      'Crossroads Technology serves Tampa, St. Petersburg, Clearwater, Brandon and Orlando, Florida with managed IT, cabling, cameras and AV.',
    crumbs: trail,
    body,
  };
}

function areaPage(a) {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/service-areas/' },
    { name: a.city, url: `/service-areas/${a.slug}/` },
  ];

  const faqs = [
    {
      q: `Do you offer on-site IT support in ${a.city}?`,
      a: `Yes. ${a.city} is inside our regular service area. Most issues are resolved remotely the same day, and we dispatch on site for anything physical — cabling, hardware, cameras, AV or a site-wide outage.`,
    },
    {
      q: `How quickly can you get to a site in ${a.city}?`,
      a: `Managed clients get same-business-day response, with on-site dispatch scheduled the same or next day depending on severity. A full-site outage is treated as an emergency and worked immediately.`,
    },
    {
      q: `Do you quote ${a.city} projects before visiting?`,
      a: `Not for physical work. Cabling, camera and AV pricing depends on the building — ceiling access, pathways, distances and existing infrastructure — so we walk the site first. Remote and cloud work can be scoped over a call.`,
    },
  ];

  const body = `${crumbs(trail)}
${pageHead(a.h1, `Managed IT, networking, structured cabling, security cameras and AV for businesses in ${a.city} and the surrounding area.`)}
<section class="sec">
<div class="wrap split">
<div class="prose">
<p class="lead">${esc(a.intro)}</p>
<h2>What we do in ${esc(a.city)}</h2>
<p>The full scope travels with us. ${esc(a.city)} clients get the same services as everyone else &mdash; there is no reduced offering outside our home office.</p>
<ul>${services.map((s) => `<li><a href="/services/${s.slug}/">${esc(s.title)}</a> &mdash; ${esc(s.blurb)}</li>`).join('')}</ul>
<h2>Areas we cover near ${esc(a.city)}</h2>
<p>On-site work regularly takes us to:</p>
<ul class="chips" style="margin:1.1em 0">${a.neighborhoods.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
<h2>Why local matters for this work</h2>
<p>Remote support handles a lot, but not a bad cable run, a camera aimed at the wrong doorway or a switch that will not come back up. Those need someone in the building. Being based in Tampa means a technician can be at a ${esc(
    a.city
  )} site the same day rather than the next week &mdash; and it means the person who shows up has probably been in your building before.</p>
</div>
${sidebar('Popular services', [
  ['Managed IT Services', '/services/managed-it-services/'],
  ['Networking & Wi-Fi', '/services/networking-wifi/'],
  ['Structured Cabling', '/services/structured-cabling/'],
  ['Security Cameras', '/services/security-cameras/'],
  ['All service areas', '/service-areas/'],
])}
</div>
</section>

<section class="sec sec-soft">
<div class="wrap">
${sectionHead('Questions', `Serving ${a.city} — frequently asked`, '', 'center')}
${faqList(faqs)}
</div>
</section>
${ctaBand(site, `Need a technician in ${a.city}?`, `Call ${site.phone} and talk to someone who can answer. We will schedule a walkthrough for anything physical.`)}`;

  return {
    path: `/service-areas/${a.slug}/`,
    top: 'areas',
    metaTitle: a.metaTitle,
    metaDescription: a.metaDescription,
    crumbs: trail,
    faqs,
    body,
  };
}

/* ----------------------------------------------------------------- about */

function about() {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about/' },
  ];
  const body = `${crumbs(trail)}
${pageHead('The people who scope it are the people who install it.', 'Why this company was started, and what it changes about how the work gets done.')}
<section class="sec">
<div class="wrap split">
<div class="prose">
<h2>The short version</h2>
<p>Before starting this company, our founder spent five years as a contractor in the technology industry. The same pattern kept repeating: good work slowed down by middle layers, unclear communication, and pricing that had nothing to do with the value being delivered. Crossroads Technology was built to take those layers out.</p>
<p>That is what &ldquo;built by techs&rdquo; means here. It is not a slogan about how much we like technology. It means the people who scope your project are the people who install it and the people who support it afterward &mdash; so nothing is lost in translation and nobody has to check with someone who has never seen your building.</p>

<h2>How we got here</h2>
<p>Crossroads Tech &amp; Travel Group, Inc. was founded on April 1, 2024 as the parent company behind two brands: Crossroads Technology and Crossroads Travel. The technology side started with hands-on work &mdash; infrastructure, networking, AV and low-voltage systems &mdash; built around reliability and practicality rather than whatever was easiest to sell.</p>
<p>Over time the direction sharpened. We moved away from residential work to focus entirely on business clients, with a growing emphasis on managed services and long-term support. Crossroads Travel wound down operations as part of that shift. Today the company is focused on one thing: business-to-business technology, delivered with direct communication, fast execution and full ownership of outcomes.</p>

<h2>What we actually believe</h2>
<h3>Documentation is part of the job</h3>
<p>Every cable gets tested and labeled. Every closet gets photographed. Every network gets a port map and an as-built. You get all of it, and it stays yours whether or not you keep working with us. A surprising number of businesses have never been given documentation of their own systems &mdash; usually because it makes them harder to leave.</p>

<h3>The cheaper answer is often the right one</h3>
<p>Plenty of Wi-Fi problems are placement, not hardware. Plenty of camera systems can be expanded instead of replaced. Plenty of existing cable is perfectly good. We would rather tell you that and be the people you call next time.</p>

<h3>Scope is a promise, not a starting point</h3>
<p>A quote says what you get, what it costs, and what it does not include. If we missed something in our own scope, that is on us, not a change order.</p>

<h3>Owning the outcome means owning the vendors too</h3>
<p>If the circuit is down, we call the carrier. If the copier will not scan to email, we call the copier company. Sitting on hold is part of what you are paying for, and it should not land on your office manager.</p>

<h2>Where we work</h2>
<p>We are based in Tampa, at ${esc(site.address.street)}, and cover the Tampa Bay region for on-site work &mdash; ${areas
    .filter((a) => a.slug !== 'orlando')
    .map((a) => esc(a.city))
    .join(', ')} and the surrounding Hillsborough and Pinellas communities. We also take project work in Orlando and along the I-4 corridor, particularly retail buildouts and new construction low-voltage.</p>
</div>
${sidebar('Company', [
  ['Our services', '/services/'],
  ['Industries we serve', '/industries/'],
  ['Service areas', '/service-areas/'],
  ['Contact us', '/contact/'],
])}
</div>
</section>

<section class="sec sec-dark">
<div class="wrap">
${sectionHead('Partners & standards', 'Certified where it counts', '', 'center')}
<div class="grid g3">
${credentials.map((c) => `<div class="card"><h3>${esc(c.label)}</h3><p>${esc(c.detail)}</p></div>`).join('')}
</div>
</div>
</section>
${ctaBand(site, 'Want to talk to the person who would do the work?', 'That is generally who answers the phone.')}`;

  return {
    path: '/about/',
    top: 'about',
    metaTitle: 'About Us | Tampa IT & Low-Voltage Contractor',
    metaDescription:
      'Crossroads Technology is a Tampa Bay IT and low-voltage contractor founded in 2024 to remove the middle layers between clients and the techs doing the work.',
    crumbs: trail,
    body,
  };
}

/* --------------------------------------------------------------- contact */

function contact() {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact/' },
  ];

  const formAction = site.formEndpoint
    ? ` action="${site.formEndpoint}" method="POST"`
    : ` action="mailto:${site.email}" method="POST" enctype="text/plain"`;

  const body = `${crumbs(trail)}
${pageHead('Contact Crossroads Technology', 'Call and you will reach someone who can answer the question — not a call center reading a script.')}
<section class="sec">
<div class="wrap grid g2">
<div>
<h2>Get in touch</h2>
<p>For anything involving cabling, cameras or AV we will come walk the site before quoting. Physical work cannot be priced accurately from a phone call, and a quote that pretends otherwise turns into a change order.</p>
<ul class="clist">
<li><a href="tel:${site.phoneHref}">${icon('phone')}<span>${esc(site.phone)}<small>${esc(site.hoursLabel)}</small></span></a></li>
<li><a href="mailto:${site.email}">${icon('mail')}<span>${esc(site.email)}<small>New projects and quotes</small></span></a></li>
<li><a href="mailto:${site.supportEmail}">${icon('mail')}<span>${esc(site.supportEmail)}<small>Existing clients — support requests</small></span></a></li>
<li><a href="https://maps.google.com/?q=${encodeURIComponent(
    `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`
  )}" rel="noopener">${icon('pin')}<span>${esc(site.address.street)}<small>${esc(site.address.city)}, ${esc(
    site.address.region
  )} ${esc(site.address.postal)}</small></span></a></li>
<li><span class="ci">${icon('clock')}<span>${esc(site.hoursLabel)}<small>${esc(site.emergencyLabel)}</small></span></span></li>
</ul>
</div>
<div class="cbox">
<h3>Request a quote</h3>
<p>Tell us what you are working on. We respond the same business day.</p>
<form${formAction} class="qform">
<p><label for="f-name">Name</label><br><input id="f-name" name="name" type="text" autocomplete="name" required></p>
<p><label for="f-company">Company</label><br><input id="f-company" name="company" type="text" autocomplete="organization"></p>
<p><label for="f-email">Email</label><br><input id="f-email" name="email" type="email" autocomplete="email" required></p>
<p><label for="f-phone">Phone</label><br><input id="f-phone" name="phone" type="tel" autocomplete="tel"></p>
<p><label for="f-city">City</label><br><input id="f-city" name="city" type="text" autocomplete="address-level2"></p>
<p><label for="f-msg">What do you need?</label><br><textarea id="f-msg" name="message" rows="5" required></textarea></p>
<p><button class="btn" type="submit">Send request</button></p>
</form>
${
  site.formEndpoint
    ? ''
    : `<p class="form-note"><strong>Setup note:</strong> this form falls back to opening the visitor's email client. Set <code>formEndpoint</code> in <code>src/data.js</code> to a form handler URL (Formspree, Netlify Forms, Zoho Forms) to receive submissions directly.</p>`
}
</div>
</div>
</section>

<section class="sec sec-soft">
<div class="wrap">
${sectionHead('Service area', 'Where we work', '', 'center')}
<ul class="chips" style="justify-content:center">
${areas.map((a) => `<li><a href="/service-areas/${a.slug}/">${esc(a.city)}, FL</a></li>`).join('')}
</ul>
</div>
</section>`;

  return {
    path: '/contact/',
    top: 'contact',
    metaTitle: 'Contact Crossroads Technology | Tampa IT Support & Cabling',
    metaDescription: `Contact Crossroads Technology in Tampa, FL. Call ${site.phone} for managed IT, networking, structured cabling, security cameras and AV across Tampa Bay and Orlando.`,
    crumbs: trail,
    body,
  };
}

/* ------------------------------------------------------------ legal, 404 */

function legalPage({ slug, title, metaTitle, metaDescription, intro, sections }) {
  const trail = [
    { name: 'Home', url: '/' },
    { name: title, url: `/${slug}/` },
  ];
  const body = `${crumbs(trail)}
${pageHead(title, intro)}
<section class="sec"><div class="wrap" style="max-width:820px">
<div class="prose">
<p><em>Last updated: ${new Date().toISOString().slice(0, 10)}</em></p>
${sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((x) => `<p>${x}</p>`).join('')}`).join('\n')}
</div>
</div></section>`;

  return { path: `/${slug}/`, top: '', metaTitle, metaDescription, crumbs: trail, body };
}

function privacy() {
  const mail = `<a href="mailto:${site.email}">${esc(site.email)}</a>`;
  return legalPage({
    slug: 'privacy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | Crossroads Technology',
    metaDescription:
      'How Crossroads Technology collects, uses and protects information submitted through crossroadstechnology.co and in the course of providing services.',
    intro: 'How we handle information you share with us.',
    sections: [
      {
        h: 'Who we are',
        p: [
          `Crossroads Technology is a division of ${esc(site.legalName)}, located at ${esc(site.address.street)}, ${esc(
            site.address.city
          )}, ${esc(site.address.region)} ${esc(site.address.postal)}. This policy covers crossroadstechnology.co and the services we provide.`,
        ],
      },
      {
        h: 'Information we collect',
        p: [
          'When you contact us through the website, by phone or by email, we collect the information you choose to give us — typically your name, company, email address, phone number and a description of what you need.',
          'When we provide services, we necessarily handle information about your systems: network configurations, account details, device inventories and support ticket history. We treat this as confidential client information.',
          'Our website may collect standard technical information such as pages visited and referring source, used only to understand how the site is performing.',
        ],
      },
      {
        h: 'How we use information',
        p: [
          'We use the information you provide to respond to inquiries, prepare quotes, deliver and support services, and send communications relevant to work we are doing for you.',
          'We do not sell your information. We do not share it with third parties for their own marketing.',
        ],
      },
      {
        h: 'Service providers',
        p: [
          'We use third-party tools to run the business — email, ticketing, remote monitoring, quoting and accounting platforms. These providers process information only as needed to deliver their service to us, and are bound by their own confidentiality obligations.',
          'Where a project requires coordinating with a carrier, manufacturer or distributor on your behalf, we share only what is necessary to complete that work.',
        ],
      },
      {
        h: 'Security camera and recorded data',
        p: [
          'Where we install or support camera systems, footage belongs to you. We access recordings only when you ask us to, or when required to service the system. We do not retain copies of client footage beyond what is needed to complete a requested task.',
        ],
      },
      {
        h: 'Data retention',
        p: [
          'We keep client records, documentation and correspondence for as long as we have an active relationship, and afterward for as long as needed to meet legal, tax and insurance obligations.',
        ],
      },
      {
        h: 'Your choices',
        p: [
          `You can ask us what information we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Email ${mail} and we will respond.`,
          'You can opt out of non-essential email from us at any time by replying and telling us to stop.',
        ],
      },
      {
        h: 'Changes to this policy',
        p: ['If we change this policy we will update the date at the top of this page.'],
      },
      {
        h: 'Contact',
        p: [`Questions about this policy can go to ${mail} or ${esc(site.phone)}.`],
      },
    ],
  });
}

function returns() {
  const mail = `<a href="mailto:${site.email}">${esc(site.email)}</a>`;
  return legalPage({
    slug: 'returns',
    title: 'Return & Cancellation Policy',
    metaTitle: 'Return & Cancellation Policy | Crossroads Technology',
    metaDescription:
      'Return, cancellation and warranty terms for hardware and services purchased from Crossroads Technology.',
    intro: 'Terms for hardware returns, project cancellations and service agreements.',
    sections: [
      {
        h: 'Hardware returns',
        p: [
          'Unopened, uninstalled hardware may be returned within 30 days of delivery. Returns are subject to the manufacturer or distributor restocking policy for that product, and any restocking fee charged to us is passed through at cost.',
          'Special-order, custom-configured and made-to-order items — including custom cable assemblies, cut fiber and specially ordered displays — are not returnable once ordered.',
          'Installed hardware is not returnable, but remains covered by the manufacturer warranty described below.',
        ],
      },
      {
        h: 'Defective hardware',
        p: [
          'Hardware that arrives dead or fails within the manufacturer warranty period is handled as a warranty claim. We manage the claim with the manufacturer or distributor on your behalf.',
          'Report visible shipping damage within 48 hours of delivery, with photographs, so we can open a claim before the carrier window closes.',
        ],
      },
      {
        h: 'Labor and service work',
        p: [
          'Labor already performed is not refundable. If work we performed does not meet the scope we quoted, we will return and correct it at no charge — that is our responsibility, not a warranty claim.',
          'Structured cabling we install is warranted against defects in workmanship for one year from completion. Certification test results are delivered at closeout and serve as the baseline.',
        ],
      },
      {
        h: 'Project cancellations',
        p: [
          'A project can be cancelled at any time before work begins. If materials have already been ordered, you are responsible for any non-returnable items and restocking fees charged to us.',
          'If a project is cancelled after work has started, you are billed for labor performed and materials consumed to that point.',
          'Deposits are applied to materials and scheduling. Where materials have not been ordered and no labor has been performed, deposits are refundable.',
        ],
      },
      {
        h: 'Managed service agreements',
        p: [
          'Month-to-month managed plans can be cancelled with 30 days written notice. Term agreements follow the cancellation terms written into that agreement.',
          'On cancellation we provide your documentation — network diagrams, port maps, credentials and asset inventory — at no charge. That information is yours.',
        ],
      },
      {
        h: 'Recurring services and subscriptions',
        p: [
          'Licenses and subscriptions purchased on your behalf (Microsoft 365, backup, monitoring, carrier services) follow the cancellation and refund terms of the underlying provider, which are frequently annual commitments. We will tell you the term before purchase.',
        ],
      },
      {
        h: 'How to start a return or cancellation',
        p: [`Email ${mail} or call ${esc(site.phone)} with your invoice or quote number and what you need. We respond the same business day.`],
      },
    ],
  });
}

function notFound() {
  const body = `${pageHead('Page not found', 'That link does not point anywhere on this site — it may have moved or been renamed.')}
<section class="sec"><div class="wrap" style="max-width:760px">
<h2>Try one of these</h2>
<div class="grid g2" style="margin-top:24px">
<a class="card" href="/services/"><h3>Services</h3><p>Managed IT, cabling, cameras, AV and cloud.</p><span class="card-more">Browse ${icon('arrow')}</span></a>
<a class="card" href="/contact/"><h3>Contact</h3><p>Call ${esc(site.phone)} or send us a message.</p><span class="card-more">Get in touch ${icon('arrow')}</span></a>
</div>
</div></section>`;

  return {
    path: '/404.html',
    top: '',
    metaTitle: 'Page Not Found | Crossroads Technology',
    metaDescription:
      'That page could not be found. Browse our managed IT, cabling, camera and AV services, or contact Crossroads Technology in Tampa.',
    noindex: true,
    body,
  };
}

/** Every page the site produces, in sitemap order. */
function allPages() {
  return [
    home(),
    servicesIndex(),
    ...services.map(servicePage),
    industriesIndex(),
    ...industries.map(industryPage),
    areasIndex(),
    ...areas.map(areaPage),
    about(),
    contact(),
    privacy(),
    returns(),
    notFound(),
  ];
}

module.exports = { allPages };
