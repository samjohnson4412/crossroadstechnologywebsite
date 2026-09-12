'use strict';

/**
 * Single source of truth for business facts, navigation and page content.
 * Everything on the site is generated from this file, so NAP details stay
 * identical across pages and structured data (important for local SEO).
 */

const site = {
  name: 'Crossroads Technology',
  legalName: 'Crossroads Tech & Travel Group, Inc.',
  origin: 'https://crossroadstechnology.co',
  tagline: 'One technology contractor, accountable end to end.',
  founded: '2024-04-01',
  description:
    'Crossroads Technology is a Tampa Bay managed IT and low-voltage contractor. Managed IT, networking and Wi-Fi, structured cabling, security cameras, AV and Microsoft 365 — one team, end to end.',
  phone: '(813) 921-5733',
  phoneHref: '+18139215733',
  phoneE164: '+1-813-921-5733',
  email: 'sales@crossroadstechnology.co',
  supportEmail: 'support@crossroadstechnology.co',
  address: {
    street: '6706 Camden Bay Dr. STE 205',
    city: 'Tampa',
    region: 'FL',
    regionName: 'Florida',
    postal: '33635',
    country: 'US',
    lat: '28.0367',
    lon: '-82.6314',
  },
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], open: '08:00', close: '17:00' },
  ],
  hoursLabel: 'Monday – Friday, 8:00am – 5:00pm ET',
  emergencyLabel: 'Emergency support available for managed clients',

  // Set this to a form handler URL (Formspree, Netlify Forms, Zoho Forms) to
  // receive quote requests directly. Left empty, the contact form falls back
  // to opening the visitor's email client.
  formEndpoint: '',
};

/**
 * Clients already named publicly on the current site. Text wordmarks for now —
 * drop real logo files in src/assets/ and swap this for <img> if they arrive.
 */
const clients = ['ITD Cloud', 'iDogCam', 'Helium Mobile', 'Florida Lantern Project'];

/** Partner and certification signals. Text only — no third-party logo files required. */
const credentials = [
  { label: 'Cisco 360 Partner', detail: 'Networking and switching' },
  { label: 'Zoom Partner', detail: 'Meetings and conference rooms' },
  { label: 'Microsoft 365', detail: 'Tenant setup, security and support' },
  { label: 'Google Workspace', detail: 'Admin, migration and Classroom' },
  { label: 'SMART Displays', detail: 'Interactive boards for classrooms' },
  { label: 'Fluke-Certified Testing', detail: 'Every cable tested and documented' },
];

/**
 * Service groupings. Order here is the order they appear on the services index.
 */
const serviceCategories = [
  { id: 'infrastructure', label: 'Network & Infrastructure', blurb: 'The physical layer everything else depends on — cable, switching, wireless and the circuit coming into the building.' },
  { id: 'security', label: 'Security Systems', blurb: 'Cameras and door access, designed around what you actually need to see and who should be able to get in.' },
  { id: 'managed', label: 'Managed IT & Cloud', blurb: 'The day-to-day: support, accounts, security, point of sale and an honest read on what you already have.' },
  { id: 'av', label: 'Audio Visual', blurb: 'Rooms that work without a technician standing in them — conference, classroom, sanctuary and theater.' },
];

/**
 * Core services. Each becomes a page at /services/<slug>/ and is linked from
 * the home page, the services index, and the relevant industry/area pages.
 */
const services = [
  {
    slug: 'managed-it-services',
    category: 'managed',
    featured: true,
    nav: 'Managed IT',
    title: 'Managed IT Services',
    h1: 'Managed IT Services in Tampa Bay',
    metaTitle: 'Managed IT Services Tampa Bay | Crossroads Technology',
    metaDescription:
      'Flat-rate managed IT support for Tampa Bay businesses. Help desk, monitoring, patching, backups and security — with a direct line to the tech doing the work.',
    blurb:
      'Day-to-day IT support, monitoring, patching and backups on a flat monthly rate — with a direct line to the tech who knows your network.',
    icon: 'shield',
    keywords: 'managed IT services Tampa, IT support Tampa Bay, MSP Tampa',
    intro:
      'Most small businesses do not need a full IT department. They need someone who answers, knows the building, and fixes the problem the first time. That is what our managed plans cover: a help desk your staff can actually reach, continuous monitoring on the equipment that matters, and a technician who has been on site and knows how your network is wired.',
    body: [
      {
        h: 'What a managed plan covers',
        p: 'We take ownership of the everyday: workstations, servers, switches, firewalls, access points, printers and cloud accounts. Tickets come in by email, phone or portal and get worked by a technician, not routed through a queue of people reading a script.',
        list: [
          'Unlimited remote help desk during business hours',
          'On-site response across Tampa Bay when remote will not cut it',
          'Continuous monitoring and alerting on network hardware',
          'Windows, macOS and third-party patching',
          'Endpoint protection, DNS filtering and email security',
          'Backup configuration and restore testing',
          'Microsoft 365 or Google Workspace administration',
          'Vendor management — we call the ISP, the copier company and the software vendor so you do not have to',
        ],
      },
      {
        h: 'Onboarding starts with documentation',
        p: 'Before we quote a monthly rate we walk the building. We map the network, label the rack, photograph the closets and record every account, license and renewal date. Plenty of businesses come to us having never seen documentation of their own systems. You get a copy of all of it, and it stays yours whether or not you stay with us.',
      },
      {
        h: 'Security that fits a small business',
        p: 'We are not going to sell you an enterprise security stack you cannot staff. We start with the controls that stop the attacks small businesses actually lose money to: multi-factor authentication everywhere, tested backups that are separated from the network, least-privilege admin accounts, patched edge hardware and filtered email.',
      },
      {
        h: 'What it costs',
        p: 'Managed plans are quoted per user and per site after the walkthrough, so the number reflects what is actually in your building. No long-term contract is required to start, and the documentation we produce during onboarding is yours regardless.',
      },
    ],
    faqs: [
      {
        q: 'Do you require a long-term contract for managed IT?',
        a: 'No. We quote a month-to-month managed plan after a walkthrough of your site. Multi-year agreements are available if you want rate certainty, but they are not a condition of working with us.',
      },
      {
        q: 'How fast do you respond to a support ticket?',
        a: 'Managed clients get same-business-day response, and most remote issues are resolved the same day they are reported. Outages affecting a whole site are treated as emergencies and worked immediately.',
      },
      {
        q: 'Can you work alongside our existing IT person?',
        a: 'Yes. We frequently act as the infrastructure and project arm for an in-house admin, handling cabling, network, cameras and AV while they manage applications and users.',
      },
    ],
    related: ['networking-wifi', 'microsoft-365', 'internet-phone-systems'],
  },
  {
    slug: 'networking-wifi',
    category: 'infrastructure',
    featured: true,
    nav: 'Networking & Wi-Fi',
    title: 'Business Networking & Wi-Fi',
    h1: 'Business Networking & Wi-Fi Installation',
    metaTitle: 'Business Wi-Fi & Network Installation | Tampa Bay',
    metaDescription:
      'Business-grade network and Wi-Fi design, installation and support in Tampa Bay. Firewalls, switching, VLANs and wireless surveys from a Cisco 360 Partner.',
    blurb:
      'Firewalls, switching, VLANs and wireless that holds up under a full building of users — designed, installed and documented.',
    icon: 'network',
    keywords: 'business wifi installation Tampa, commercial network installation, Cisco partner Tampa',
    intro:
      'Consumer gear fails in a commercial building for predictable reasons: not enough access points, no wired backhaul, one flat network carrying cameras and guests and payroll together, and no one watching it. We design networks the way they should be built — properly segmented, wired back to a real switch, and documented so the next technician is not guessing.',
    body: [
      {
        h: 'Design before hardware',
        p: 'Access point placement is decided by the building, not by a box count. We look at construction materials, ceiling height, user density and where people actually work, then place coverage accordingly. Warehouses, sanctuaries, classrooms and open offices all behave differently.',
        list: [
          'Wireless survey and access point placement plan',
          'Firewall selection, configuration and rules',
          'Managed switching with PoE for cameras, phones and APs',
          'VLAN segmentation for staff, guest, voice, cameras and IoT',
          'Guest networks with captive portal and bandwidth limits',
          'Site-to-site and remote-access VPN',
          'Static IP, DNS and DHCP configuration',
          'Rack build-out, labeling and as-built documentation',
        ],
      },
      {
        h: 'Segmentation is not optional',
        p: 'A camera recorder, a guest phone and a bookkeeping workstation should not share one broadcast domain. We separate traffic by VLAN so a compromised device or a misbehaving one cannot take the rest of the building with it — and so the network stays diagnosable when something does go wrong.',
      },
      {
        h: 'Monitoring after the install',
        p: 'Every network we support is monitored continuously. We see a switch, access point or circuit drop and start working it, often before the first call comes in. Managed clients get this included; project clients can add it.',
      },
    ],
    faqs: [
      {
        q: 'Can you fix Wi-Fi dead zones without replacing everything?',
        a: 'Often, yes. Many coverage problems are placement and channel issues rather than hardware. We survey first and tell you honestly whether you need more access points, better placement, or a full replacement.',
      },
      {
        q: 'What network hardware do you install?',
        a: 'We are a Cisco 360 Partner and also deploy Meraki, UniFi and Fortinet depending on what the site needs and what you want to spend. We will explain the trade-offs rather than defaulting to one line.',
      },
    ],
    related: ['structured-cabling', 'managed-it-services', 'internet-phone-systems'],
  },
  {
    slug: 'structured-cabling',
    category: 'infrastructure',
    featured: true,
    nav: 'Structured Cabling',
    title: 'Structured Cabling & Low-Voltage',
    h1: 'Structured Cabling & Low-Voltage Installation',
    metaTitle: 'Structured Cabling & Low Voltage | Tampa & Orlando',
    metaDescription:
      'Cat6, Cat6A and fiber structured cabling for offices, schools and retail builds in Tampa and Orlando. Fluke-certified testing and full documentation on every run.',
    blurb:
      'Cat6, Cat6A and fiber done to standard — dressed, labeled, Fluke-certified and documented. Retail builds, offices, schools and warehouses.',
    icon: 'cable',
    keywords: 'structured cabling Tampa, low voltage contractor Orlando, Cat6 installation, network cabling',
    intro:
      'Cabling is the part of the job nobody sees and everybody depends on. It is also the easiest place to cut corners. We pull to standard, dress the rack, label both ends of every run, certify with a Fluke tester and hand over the results. If a run does not pass, we fix it before we leave — not after you call.',
    body: [
      {
        h: 'What we install',
        list: [
          'Cat5e, Cat6 and Cat6A copper',
          'Single-mode and multimode fiber backbone',
          'Racks, cabinets, patch panels and cable management',
          'Wall plates, floor boxes and poke-throughs',
          'Cable tray, J-hooks and conduit pathways',
          'Plenum-rated cable where code requires it',
          'Demarc extensions and ISP handoffs',
          'Camera, access control, paging and speaker cabling',
        ],
      },
      {
        h: 'Certification and documentation',
        p: 'Every run is tested with a Fluke certification tester and the results are delivered as a report. You also get a labeled patch panel, a port map, and photographs of the closets. That documentation is what makes the next project cheap instead of exploratory — and it is what general contractors and franchise programs increasingly require at closeout.',
      },
      {
        h: 'New construction and retail buildouts',
        p: 'We work from plans and coordinate with the GC and other trades on rough-in and trim schedules. We have delivered low-voltage scopes for retail store builds in the Tampa and Orlando markets, including brand-specified cable categories, certification requirements and closeout packages. The same applies to office relocations and new locations: if you are moving or opening, we take the whole technology scope and sequence it against your open date.',
      },
      {
        h: 'Cleanups and remediation',
        p: 'If you inherited a closet that looks like a bird nest, that is fixable. We re-terminate, re-dress and re-label existing infrastructure, test what is already in the walls, and tell you what is reusable rather than reflexively quoting a full re-pull.',
      },
    ],
    faqs: [
      {
        q: 'Do you provide certification test results?',
        a: 'Yes. Every structured cabling job includes Fluke certification testing with a delivered report, plus labeling and a port map. It is part of the scope, not an upcharge.',
      },
      {
        q: 'Do you work as a subcontractor for general contractors?',
        a: 'Yes. We regularly take low-voltage scopes on new construction and retail buildouts in Tampa and Orlando, working from plans and coordinating rough-in and trim with the GC schedule.',
      },
      {
        q: 'Cat6 or Cat6A?',
        a: 'Cat6 handles gigabit everywhere and 10 gigabit over short runs, and it is the right answer for most offices. Cat6A is worth it for long runs, high-density wireless backhaul and anywhere you expect 10 gigabit to the desk. We will tell you which one your building actually needs.',
      },
    ],
    related: ['networking-wifi', 'security-cameras', 'access-control'],
  },
  {
    slug: 'security-cameras',
    category: 'security',
    featured: true,
    nav: 'Security Cameras',
    title: 'Security Cameras & Surveillance',
    h1: 'Security Camera Installation in Tampa Bay',
    metaTitle: 'Security Camera Installation Tampa Bay | Crossroads Technology',
    metaDescription:
      'Commercial security camera and access control installation in Tampa Bay. IP cameras, NVR storage, remote viewing and door access, installed by techs.',
    blurb:
      'IP camera systems that produce footage you can actually use — designed around the shot you need, then aimed, secured and supported.',
    icon: 'camera',
    keywords: 'security camera installation Tampa, commercial CCTV Tampa, access control Tampa Bay',
    intro:
      'A camera system is only worth what its footage is worth. Most of the systems we are called in to replace fail the one time they matter: the resolution is too low to identify anyone, the camera was aimed at a parking lot at noon and blown out, or the recorder filled up and started overwriting three days ago. We design around the shot you actually need.',
    body: [
      {
        h: 'Designed around what you need to see',
        p: 'Before we quote, we establish what each camera is for — identifying a face at a door, reading a plate, covering a register, or watching a gym for incident review. That determines lens, mounting height, resolution and retention, and it is the difference between footage that resolves a dispute and footage that does not.',
        list: [
          'IP camera systems with on-site NVR or hybrid cloud storage',
          'Interior, exterior, dome, turret, bullet and multi-sensor cameras',
          'Low-light and infrared coverage for parking and perimeter',
          'Retention sizing so footage lasts as long as your policy requires',
          'Remote viewing on desktop and mobile, secured properly',
          'Entry-point coverage integrated with door access control',
          'Clip export and retrieval support when you need a specific incident',
        ],
      },
      {
        h: 'Secured, not just installed',
        p: 'Camera systems are a common way into a network. We put recorders on their own VLAN, replace default credentials, disable unnecessary services and avoid exposing recorders directly to the internet. Remote access is set up through a proper path, not a port-forward and a hope.',
      },
      {
        h: 'Support after the install',
        p: 'Managed clients can ask us to pull a clip and we will retrieve it. Schools and offices use this constantly for incident review, and it is far faster than teaching every front-office staffer the recorder software.',
      },
    ],
    faqs: [
      {
        q: 'How long is camera footage kept?',
        a: 'That is a design decision we make with you. Thirty days is common; some organizations need sixty or ninety for policy or insurance reasons. Retention drives recorder storage sizing, so we settle it before quoting.',
      },
      {
        q: 'Can you add cameras to a system we already have?',
        a: 'Usually. If the existing recorder has capacity and the cameras are a compatible standard, expanding is cheaper than replacing. We check that before recommending new equipment.',
      },
      {
        q: 'Do you support access control as well as cameras?',
        a: 'Yes, and we integrate the two so an entry event and the footage of it line up. Door hardware, credentials and entry systems are covered on our access control page.',
      },
    ],
    related: ['access-control', 'structured-cabling', 'networking-wifi'],
  },
  {
    slug: 'audio-visual',
    category: 'av',
    featured: true,
    nav: 'Audio Visual',
    title: 'Audio Visual & Conference Rooms',
    h1: 'Audio Visual Installation for Business & Worship',
    metaTitle: 'AV Installation Tampa | Conference Rooms & Worship',
    metaDescription:
      'Conference room AV, classroom displays and church sound and projection in Tampa Bay. Zoom Partner and SMART display installer — designed, installed and supported.',
    blurb:
      'Conference rooms, classroom displays, sanctuary sound and projection — specified, installed and supported so they work without a technician in the room.',
    icon: 'display',
    keywords: 'AV installation Tampa, conference room AV, church sound system Tampa, SMART board installation',
    intro:
      'The measure of a good AV install is whether a person who was not trained on it can walk in and start a meeting or a service. That means the right gear, but more importantly it means clean signal paths, sensible control, and cabling that was planned instead of improvised.',
    body: [
      {
        h: 'Conference and meeting rooms',
        p: 'One-touch join, a camera that frames the room, and microphones that pick up the far end of the table. We are a Zoom Partner and build rooms around Zoom, Microsoft Teams or Google Meet depending on what your organization already runs.',
        list: [
          'Displays, mounts and video walls',
          'Conferencing cameras, speakerphones and ceiling microphones',
          'Zoom Rooms, Microsoft Teams Rooms and Google Meet hardware',
          'Wireless presentation and HDMI switching',
          'In-wall and in-ceiling cable paths with no visible runs',
        ],
      },
      {
        h: 'Classrooms and education AV',
        p: 'We install and support SMART interactive displays and classroom projection, including the parts schools usually get stuck on afterward — getting displays onto the network, tying them to Google Classroom and Workspace accounts, and training teachers so the boards actually get used.',
      },
      {
        h: 'Churches and event spaces',
        p: 'Sanctuary sound, projection, lighting control and streaming. We work with worship teams on systems volunteers can run week to week, and we support event setups — sound reinforcement, video projection and presentation — for galas and special services.',
      },
    ],
    faqs: [
      {
        q: 'Can you support AV we did not install?',
        a: 'Yes. We take over support on existing conference rooms, sanctuaries and classrooms regularly. We document what is there first, then quote support or remediation.',
      },
      {
        q: 'Do you install SMART boards for schools?',
        a: 'Yes, including mounting, network setup, account integration with Google Workspace or Microsoft 365, and teacher training so the displays get used rather than sitting dark.',
      },
    ],
    related: ['home-theater', 'structured-cabling', 'networking-wifi'],
  },
  {
    slug: 'microsoft-365',
    category: 'managed',
    featured: true,
    nav: 'Microsoft 365',
    title: 'Microsoft 365 & Google Workspace',
    h1: 'Microsoft 365 & Google Workspace Support',
    metaTitle: 'Microsoft 365 & Google Workspace Support | Tampa Bay',
    metaDescription:
      'Microsoft 365 and Google Workspace setup, migration, security and day-to-day admin for Tampa Bay businesses and schools. Licensing, MFA, email security and backups.',
    blurb:
      'Tenant setup, migrations, licensing, MFA and day-to-day administration for Microsoft 365 and Google Workspace.',
    icon: 'cloud',
    keywords: 'Microsoft 365 support Tampa, Google Workspace admin, email migration Tampa',
    intro:
      'Almost every business we support runs on Microsoft 365 or Google Workspace, and almost every one we inherit has the same three problems: licensing nobody has reviewed in two years, multi-factor authentication that was never fully enforced, and no backup of the data because people assume the provider handles it. We fix those first.',
    body: [
      {
        h: 'Setup, migration and cleanup',
        list: [
          'New tenant setup with domains, DNS, SPF, DKIM and DMARC',
          'Migration from POP/IMAP, on-premises Exchange, or between tenants',
          'Microsoft 365 to Google Workspace moves and the reverse',
          'Shared mailboxes, distribution groups and calendar permissions',
          'SharePoint and Google Drive structure and permissions',
          'License review to stop paying for seats and tiers you do not use',
        ],
      },
      {
        h: 'Security and compliance basics',
        p: 'Multi-factor authentication enforced across every account including admins, conditional access where the licensing supports it, legacy authentication disabled, admin roles separated from daily-use accounts, and email filtering tuned to your actual mail flow.',
      },
      {
        h: 'Third-party backup',
        p: 'Microsoft and Google protect their infrastructure, not your data from your own users. Deleted mailboxes, ransomware and departing-employee cleanups are your problem, and retention policies are shorter than most people assume. We deploy third-party backup for mail, drives and sites, and test restores.',
      },
      {
        h: 'Google Workspace for Education',
        p: 'We administer Workspace for Education tenants for private schools — account provisioning for new students and staff, Google Classroom setup and troubleshooting, Chromebook enrollment and policy, and the start-of-year rollover that eats an entire week if nobody has done it before.',
      },
    ],
    faqs: [
      {
        q: 'Is Microsoft 365 data backed up automatically?',
        a: 'Not in the way most people assume. Microsoft protects the platform and offers limited retention, but it is not a backup of your business data against deletion, ransomware or a departing employee. We deploy separate third-party backup and test restores.',
      },
      {
        q: 'Can you migrate our email without downtime?',
        a: 'Migrations are staged so mail keeps flowing throughout, with the final cutover scheduled outside business hours. Users generally arrive the next morning to a working mailbox with their history intact.',
      },
    ],
    related: ['managed-it-services', 'audio-visual', 'internet-phone-systems'],
  },
  {
    slug: 'internet-phone-systems',
    category: 'infrastructure',
    featured: true,
    nav: 'Internet & Phones',
    title: 'Internet, Phones & Vendor Management',
    h1: 'Business Internet, Phone Systems & Vendor Management',
    metaTitle: 'Business Internet & Phone Systems Tampa | Crossroads Technology',
    metaDescription:
      'Business internet sourcing, VoIP phone systems and vendor management in Tampa Bay. We source circuits, manage the install and own the escalation when it breaks.',
    blurb:
      'We source the circuit, manage the install, configure the phones — and make the support calls when a carrier goes down.',
    icon: 'phone',
    keywords: 'business internet Tampa, VoIP phone system Tampa, ISP management',
    intro:
      'Carrier and vendor management is the least glamorous thing we do and one of the most valuable. When the internet goes down, somebody has to sit on hold, know the circuit ID, escalate past the first tier and keep the ticket moving. That should not be your office manager.',
    body: [
      {
        h: 'Sourcing circuits',
        p: 'We check serviceability across carriers at your address, compare real pricing and terms, and tell you what is actually available — not just what one salesperson wants to sell. Fiber, coax and fixed wireless all have a place depending on the building and the budget.',
        list: [
          'Multi-carrier serviceability checks and pricing comparison',
          'Fiber, coax and fixed wireless circuits',
          'Failover and dual-WAN so an outage is an inconvenience, not a closure',
          'Static IP blocks and DNS',
          'Install coordination with the carrier and the building',
          'Demarc extension and handoff into your rack',
        ],
      },
      {
        h: 'Phone systems',
        p: 'VoIP platforms, desk phones, softphones, auto attendants, ring groups, voicemail-to-email and porting your existing numbers. We handle the port, which is the part that goes wrong when nobody owns it, and we make sure the network is set up to prioritize voice traffic before the phones ever arrive.',
      },
      {
        h: 'Vendor management',
        p: 'Copiers, alarm companies, software vendors, point of sale, the building landlord. If it plugs in and somebody else supports it, we will make the call, sit through the hold music and own the escalation until it is resolved.',
      },
    ],
    faqs: [
      {
        q: 'Do you charge to source internet service?',
        a: 'Sourcing and comparing circuits is part of the service for clients we support. We are compensated by the carriers through standard partner channels, so you are not paying us a separate fee to shop for you.',
      },
      {
        q: 'Can you keep our existing phone numbers?',
        a: 'Yes. Number porting is a standard part of a phone system migration. We manage the port paperwork and schedule the cutover so the numbers move without a gap in service.',
      },
    ],
    related: ['networking-wifi', 'managed-it-services', 'microsoft-365'],
  },
  {
    slug: 'access-control',
    category: 'security',
    featured: true,
    nav: 'Access Control',
    title: 'Access Control & Entry Systems',
    h1: 'Access Control & Door Entry Installation',
    metaTitle: 'Access Control Installation Tampa | Crossroads Technology',
    metaDescription:
      'Commercial access control and door entry in Tampa Bay. Keypads, fobs, mobile credentials, electric strikes and intercoms, installed, integrated and supported.',
    blurb:
      'Keypads, fobs, mobile credentials and intercoms — so you stop rekeying the building every time somebody leaves.',
    icon: 'door',
    keywords: 'access control Tampa, door entry systems, keyless entry commercial',
    intro:
      'Keys are the problem. They get copied, they walk out with departing staff, and the only fix is rekeying the building. Access control replaces that with credentials you can switch off in ten seconds, and a record of who opened which door and when.',
    body: [
      {
        h: 'What we install',
        list: [
          'Keypads, card and fob readers, and mobile credentials',
          'Electric strikes, maglocks and request-to-exit hardware',
          'Video intercoms and door stations for staffed entries',
          'Door position and forced-entry monitoring',
          'Schedules, so exterior doors unlock and lock themselves',
          'Cloud-managed platforms you can administer from a phone',
          'Integration with existing camera systems at entry points',
        ],
      },
      {
        h: 'Doors are life safety, not just hardware',
        p: 'A locked door has to release on the way out, every time, including when the power fails and when the fire alarm goes. That is code, and it is the part unlicensed installers get wrong. We work to egress and fire code requirements, and we coordinate with your alarm vendor where the systems have to talk.',
      },
      {
        h: 'Tied to the cameras',
        p: 'Access events and camera footage are far more useful together than apart. When a door opens at 2am, you want the credential that opened it and the video of it in the same place. We install both, so the timestamps line up and there is one system to review rather than two.',
      },
      {
        h: 'Schools and offices with front-door control',
        p: 'For a school or a professional office, the common requirement is simple: the front door stays locked, a visitor presses a button, someone in the office sees and hears them, and releases the door from a desk. That is a video intercom tied to a strike, and it is one of the most cost-effective security upgrades available.',
      },
    ],
    faqs: [
      {
        q: 'Can we keep our existing doors and hardware?',
        a: 'Usually. Most commercial doors and frames accept an electric strike without replacement. We survey each opening first, because the door, frame and existing lockset decide what hardware fits and whether anything needs modification.',
      },
      {
        q: 'What happens to the doors in a power outage?',
        a: 'They release. Egress is never dependent on power in a properly installed system, and we specify fail-safe or fail-secure hardware per opening according to code and what that door is for.',
      },
    ],
    related: ['security-cameras', 'structured-cabling', 'managed-it-services'],
  },
  {
    slug: 'point-of-sale',
    category: 'managed',
    nav: 'Point of Sale',
    title: 'Point-of-Sale Systems',
    h1: 'Point-of-Sale Setup & Support',
    metaTitle: 'POS System Setup & Support Tampa | Crossroads Technology',
    metaDescription:
      'Point-of-sale installation and support for Tampa Bay restaurants and retail. Toast and similar platforms, plus the network, cabling and payment path behind them.',
    blurb:
      'Toast and similar platforms — plus the network, cabling and payment path that actually decides whether the terminal works.',
    icon: 'card',
    keywords: 'POS installation Tampa, Toast POS support, restaurant technology Tampa',
    intro:
      'When a point-of-sale system goes down mid-service, the cause is almost never the point-of-sale system. It is the network, the switch it is plugged into, the access point the handheld roams to, or the circuit. We install and support the terminals, and we own everything underneath them too, which is why the problem gets fixed instead of escalated.',
    body: [
      {
        h: 'What we handle',
        list: [
          'Terminal, kitchen display and receipt printer installation',
          'Toast and comparable restaurant and retail platforms',
          'Handheld and tableside ordering device deployment',
          'Cabling and power for every station and printer location',
          'Dedicated wireless coverage for handhelds across the floor',
          'Payment terminal connectivity and card reader setup',
          'Failover internet so an outage does not stop you taking cards',
        ],
      },
      {
        h: 'The network is the point-of-sale system',
        p: 'Handhelds that drop orders in the back of the dining room are a wireless coverage problem. Terminals that freeze at the dinner rush are usually a switch or a saturated circuit. We design coverage for the floor plan you actually have, put the point-of-sale traffic on its own segment, and give payment devices a clean path out.',
      },
      {
        h: 'Card data and segmentation',
        p: 'Payment devices should not share a network with the guest Wi-Fi, the cameras or the office computer. We separate them, which is both good practice and the thing that keeps your PCI questionnaire honest. We are happy to work alongside your processor and document the setup.',
      },
    ],
    faqs: [
      {
        q: 'Do you support systems we bought directly from the vendor?',
        a: 'Yes. Most restaurants buy the platform from the provider and then discover nobody owns the network it runs on. That is the part we take, and we will work the vendor support line with you when the fault genuinely is the platform.',
      },
      {
        q: 'Can you get us running before opening day?',
        a: 'Yes, provided the internet circuit is ordered early enough — that is the long lead item. Bring us in when the lease is signed and we sequence cabling, network and terminals against your opening date.',
      },
    ],
    related: ['networking-wifi', 'internet-phone-systems', 'managed-it-services'],
  },
  {
    slug: 'home-theater',
    category: 'av',
    nav: 'Home Theater',
    title: 'Home Theater & Media Rooms',
    h1: 'Home Theater & Media Room Installation',
    metaTitle: 'Home Theater Installation Tampa | Crossroads Technology',
    metaDescription:
      'Home theater and media room design and installation in Tampa Bay. Projection, displays, surround sound, acoustics and single-remote control, wired properly.',
    blurb:
      'Projection, surround sound, acoustic treatment and one remote that works. The one residential project we still take.',
    icon: 'theater',
    keywords: 'home theater installation Tampa, media room design, surround sound installation',
    intro:
      'Crossroads Technology is a business-to-business contractor, and we no longer take general residential work. Home theater is the exception, because it is the same discipline as the commercial AV we do every week: signal paths, acoustics, cable planned before the drywall, and control simple enough that nobody needs instructions.',
    body: [
      {
        h: 'What a room needs to actually work',
        list: [
          'Projection and screen, or a large-format display, sized to the seating distance',
          'Surround processing and amplification matched to the room, not to a box on a shelf',
          'In-wall, in-ceiling and floor-standing speaker placement',
          'Acoustic treatment where the room needs it, which is most rooms',
          'Equipment rack with proper ventilation and clean cable management',
          'Lighting control and motorised shades',
          'One remote, or one app, that turns the whole room on',
        ],
      },
      {
        h: 'Cable first, equipment second',
        p: 'The decisions that are expensive to reverse are the ones behind the wall. Speaker placement, conduit for future cable, where the rack lives and how it breathes, where the projector power and signal run. If the room is being built or renovated, bring us in before the drywall goes up and the rest becomes straightforward.',
      },
      {
        h: 'Control that a guest can operate',
        p: 'A theater that needs a cheat sheet is a theater nobody uses. We program a single interface where one button starts the room, and we label and document the rack so any technician can work on it later.',
      },
    ],
    faqs: [
      {
        q: 'Do you take other residential work?',
        a: 'No. We moved away from general residential to focus on business clients. Home theater and dedicated media rooms are the one residential category we still take, because it draws on the same commercial AV skill set.',
      },
      {
        q: 'Can you work with our builder or renovation contractor?',
        a: 'Yes, and that is the ideal time to involve us. We coordinate rough-in with the builder so the cable, conduit, power and mounting backing are all in place before the walls close.',
      },
    ],
    related: ['audio-visual', 'networking-wifi', 'structured-cabling'],
  },
  {
    slug: 'technology-audits',
    category: 'managed',
    nav: 'Technology Audits',
    title: 'Technology Audits & System Reviews',
    h1: 'Technology Audits & System Reviews',
    metaTitle: 'Technology Audit Services Tampa | Crossroads Technology',
    metaDescription:
      'Independent technology audits for Tampa Bay businesses. We document what you have, find the risks and bottlenecks, and hand you a prioritised plan that is yours.',
    blurb:
      'We document what you actually have, find the risks and the bottlenecks, and hand you a prioritised plan that is yours to keep.',
    icon: 'audit',
    keywords: 'technology audit Tampa, IT assessment, network assessment Tampa',
    intro:
      'Most organisations cannot answer basic questions about their own systems: what is in the closet, who has administrator access, when the firewall was last updated, whether the backup has ever been restored. An audit answers them in writing. It is also the honest way to find out whether you are being well served by whoever supports you now.',
    body: [
      {
        h: 'What the audit covers',
        list: [
          'Network hardware inventory, firmware levels and support status',
          'Cabling and closet condition, with photographs',
          'Wireless coverage measured across the building',
          'Firewall configuration, open ports and remote access paths',
          'Accounts and administrator access, including former staff',
          'Backup configuration and a live restore test',
          'Microsoft 365 or Google Workspace security posture and licensing waste',
          'Camera coverage, retention and recorder exposure',
          'Circuits, contracts and renewal dates',
        ],
      },
      {
        h: 'What you receive',
        p: 'A written report with network diagrams, a labelled asset inventory, photographs of every closet, and a findings list ranked by risk and by cost to fix. Everything is in plain language, with the technical detail in an appendix for whoever needs it. The document is yours regardless of what you do next.',
      },
      {
        h: 'No obligation attached',
        p: 'An audit is a fixed-fee engagement, not a sales call with a clipboard. Some clients hand the report to their existing provider and ask them to work through it. That is a perfectly good outcome, and we would rather be the people who told you the truth than the people who used it as leverage.',
      },
    ],
    faqs: [
      {
        q: 'Will an audit disrupt our operations?',
        a: 'Very little. Most of it is inspection, documentation and read-only configuration review. The one item we schedule carefully is the backup restore test, and that runs to isolated hardware rather than over anything live.',
      },
      {
        q: 'Do we have to switch providers afterward?',
        a: 'No. The report is yours to use however you want, including handing it to your current provider as a work list. We quote remediation separately only if you ask for it.',
      },
    ],
    related: ['managed-it-services', 'networking-wifi', 'microsoft-365'],
  },
];

/** Industry pages — grounded in the verticals we actually serve. */
const industries = [
  {
    slug: 'schools',
    title: 'Private Schools & Education',
    h1: 'IT Support for Private Schools in Tampa Bay',
    metaTitle: 'School IT Support Tampa Bay | Crossroads Technology',
    metaDescription:
      'IT support for private and faith-based schools in Tampa Bay. Google Workspace for Education, Chromebooks, Classroom, classroom displays, cameras and campus Wi-Fi.',
    blurb: 'Google Workspace, Chromebooks, Classroom, campus Wi-Fi, classroom displays and camera coverage.',
    icon: 'school',
    intro:
      'Private schools run on a thin administrative staff and an academic calendar that does not move. The work has to land in the windows that exist — summer, breaks, and after dismissal — and the systems have to be simple enough that teachers and front-office staff can use them without a technician standing there.',
    points: [
      ['Google Workspace for Education', 'Account provisioning, Classroom setup and troubleshooting, Chromebook enrollment and policy, and the start-of-year rollover.'],
      ['Campus Wi-Fi that holds a full class', 'Density-designed coverage for classrooms, gyms and sanctuaries, with staff, student and guest traffic properly separated.'],
      ['Classroom displays', 'SMART interactive display installation, network integration and teacher training so the boards actually get used.'],
      ['Cameras and incident review', 'Coverage of entries, hallways, gyms and parking, with retention sized to policy. When administration needs a clip from a specific window, we pull it.'],
      ['Front-office help desk', 'Teachers and staff submit tickets and get a technician, which keeps the office manager out of the middle of every printer problem.'],
    ],
    faqs: [
      {
        q: 'Can you schedule work around the academic calendar?',
        a: 'That is how we plan school projects. Cabling, network upgrades and display installations happen over summer and breaks, with the start-of-year rollover finished before teachers return for pre-planning.',
      },
      {
        q: 'Do you support Chromebooks and Google Classroom?',
        a: 'Yes. Chromebook enrollment and policy, Classroom rosters and troubleshooting, and Workspace for Education administration are routine work for us.',
      },
    ],
    services: ['managed-it-services', 'networking-wifi', 'audio-visual', 'security-cameras', 'microsoft-365'],
  },
  {
    slug: 'churches',
    title: 'Churches & Nonprofits',
    h1: 'AV & IT Support for Churches in Tampa Bay',
    metaTitle: 'Church AV & IT Support Tampa Bay | Crossroads Technology',
    metaDescription:
      'Sanctuary sound, projection, streaming and IT support for churches and nonprofits in Tampa Bay. Systems your volunteers can run, supported by techs who answer.',
    blurb: 'Sanctuary sound, projection, streaming, campus Wi-Fi and IT support built for volunteer operators.',
    icon: 'church',
    intro:
      'Church technology has a constraint most businesses do not: the people running it on Sunday are volunteers, and they rotate. A system that requires an expert at the board is a system that fails during a service. We design for the operator you actually have.',
    points: [
      ['Sanctuary sound and projection', 'Reinforcement, mixing, projection and display systems specified for the room and the service style.'],
      ['Streaming and recording', 'Reliable streams to the platforms your congregation already uses, with a workflow a volunteer can start and stop.'],
      ['Event support', 'Sound, video projection and presentation support for galas, concerts and special services.'],
      ['Campus networking', 'Wi-Fi across sanctuary, offices, classrooms and fellowship space, with guest access separated from staff and giving systems.'],
      ['Office IT and Microsoft 365', 'Email, file storage, backups and day-to-day support for church staff.'],
      ['Documentation and training', 'Written run sheets and hands-on training so a new volunteer can be brought up in an afternoon.'],
    ],
    faqs: [
      {
        q: 'Can you train our volunteer tech team?',
        a: 'Yes, and we recommend it on every install. We provide written run sheets and hands-on training, and we stay reachable when a new volunteer hits something unfamiliar on a Sunday morning.',
      },
      {
        q: 'Do you support one-off events?',
        a: 'Yes. We provide sound reinforcement, video projection and presentation support for galas, concerts and special services, either in your space or at an event venue.',
      },
    ],
    services: ['audio-visual', 'networking-wifi', 'managed-it-services', 'security-cameras'],
  },
  {
    slug: 'law-firms',
    title: 'Law Firms & Professional Offices',
    h1: 'IT Support for Law Firms & Professional Offices',
    metaTitle: 'Law Firm IT Support Tampa | Crossroads Technology',
    metaDescription:
      'IT support for law firms and professional offices in Tampa Bay. Document storage, secure backups, Microsoft 365, office moves and reliable day-to-day support.',
    blurb: 'Document storage, tested backups, secure email, and support that respects billable hours.',
    icon: 'briefcase',
    intro:
      'In a professional office, downtime is billable time. The priorities are boringly consistent: documents available and searchable, backups that have actually been restored from, email that is secure and does not land in spam, and problems resolved without three days of back-and-forth.',
    points: [
      ['Document storage and access', 'On-premises NAS, cloud storage, or a hybrid — sized to your matter volume, with permissions that reflect who should see what.'],
      ['Backups that get tested', 'Local and off-site backup with periodic restore testing. An untested backup is a guess, and we do not hand clients guesses.'],
      ['Email security', 'Multi-factor authentication, SPF, DKIM and DMARC configured properly, and filtering tuned so client mail arrives and phishing does not.'],
      ['Office moves', 'Relocations planned around your calendar, with cutover over a weekend so Monday morning works.'],
      ['Predictable support', 'Flat-rate managed plans with a direct line, so a stalled workstation does not cost a partner an afternoon.'],
    ],
    faqs: [
      {
        q: 'Can you support a firm with both on-premises storage and cloud?',
        a: 'Yes. Hybrid setups are common in professional offices, and often the right answer — fast local access to large document sets with cloud replication for off-site protection and remote work.',
      },
    ],
    services: ['managed-it-services', 'microsoft-365', 'internet-phone-systems', 'technology-audits'],
  },
  {
    slug: 'retail-construction',
    title: 'Retail & New Construction',
    h1: 'Low-Voltage for Retail Buildouts & New Construction',
    metaTitle: 'Retail Buildout Low Voltage | Tampa & Orlando',
    metaDescription:
      'Low-voltage subcontracting for retail buildouts and new construction in Tampa and Orlando. Brand-spec cabling, Fluke certification and closeout docs.',
    blurb: 'Low-voltage scopes for retail buildouts and new construction — to brand spec, certified, on the GC schedule.',
    icon: 'store',
    intro:
      'Retail buildouts run on someone else\'s schedule and someone else\'s specification. The brand dictates cable category, certification requirements and closeout documentation; the general contractor dictates when you can be in the space. We work to both.',
    points: [
      ['Plan takeoffs and bids', 'We price from drawings and specifications, and we flag conflicts between the brand standard and the actual site before they become change orders.'],
      ['Brand-specified cabling', 'Cable category, pathway and termination standards built to the program specification rather than to whatever is on the truck.'],
      ['Fluke certification and closeout', 'Certification testing with delivered reports, labeled panels, port maps and photo documentation in the closeout package.'],
      ['Trade coordination', 'Rough-in and trim scheduled against the GC calendar, coordinated with electrical, ceiling and millwork.'],
      ['Tampa and Orlando coverage', 'We take work across both markets and the I-4 corridor between them.'],
    ],
    faqs: [
      {
        q: 'Do you bid from construction drawings?',
        a: 'Yes. Send the low-voltage drawings and the specification and we will return a takeoff and a bid. We will also flag anywhere the spec and the site conflict before it becomes a change order.',
      },
      {
        q: 'Do you carry insurance for commercial job sites?',
        a: 'Yes. We carry general liability and workers compensation coverage, and we provide certificates naming the GC as required before mobilizing.',
      },
    ],
    services: ['structured-cabling', 'security-cameras', 'access-control', 'networking-wifi'],
  },
];

/** Service-area pages for local search. */
const areas = [
  {
    slug: 'tampa',
    city: 'Tampa',
    title: 'Tampa',
    h1: 'IT Services & Low-Voltage in Tampa, FL',
    metaTitle: 'Managed IT & Low Voltage Services in Tampa, FL',
    metaDescription:
      'Tampa-based managed IT, networking, structured cabling, security cameras and AV. Local techs, direct communication and one vendor for the whole technology scope.',
    intro:
      'Our office is in Tampa, off Camden Bay Drive near the Countryway corridor, and Tampa is where we do the most work. Westshore and downtown offices, professional practices, schools and warehouse space across Hillsborough County are all inside our normal service radius.',
    neighborhoods: ['Westshore', 'Downtown Tampa', 'Ybor City', 'Carrollwood', 'Town \'N\' Country', 'Temple Terrace', 'Channelside', 'Citrus Park'],
  },
  {
    slug: 'st-petersburg',
    city: 'St. Petersburg',
    title: 'St. Petersburg',
    h1: 'IT Services & Low-Voltage in St. Petersburg, FL',
    metaTitle: 'Managed IT & Low Voltage in St. Petersburg, FL',
    metaDescription:
      'Managed IT, business Wi-Fi, structured cabling, cameras and AV for St. Petersburg businesses, schools and churches. Same-day remote support, on-site when needed.',
    intro:
      'We cross the bay regularly for St. Petersburg clients — professional offices downtown, schools and churches through the Pinellas side, and retail along the 4th Street and Central Avenue corridors.',
    neighborhoods: ['Downtown St. Pete', 'Gateway', 'Kenwood', 'Old Northeast', 'Pinellas Park', 'Gulfport', 'Seminole', 'Tyrone'],
  },
  {
    slug: 'clearwater',
    city: 'Clearwater',
    title: 'Clearwater',
    h1: 'IT Services & Low-Voltage in Clearwater, FL',
    metaTitle: 'Managed IT & Low Voltage Services in Clearwater, FL',
    metaDescription:
      'IT support, cabling, cameras and AV for Clearwater businesses, private schools and churches. A Tampa Bay contractor that answers the phone and shows up.',
    intro:
      'Clearwater and the north Pinellas corridor are a steady part of our work, particularly private schools, churches and professional offices that need one contractor covering IT, cabling, cameras and AV rather than four.',
    neighborhoods: ['Downtown Clearwater', 'Countryside', 'Dunedin', 'Safety Harbor', 'Largo', 'Palm Harbor', 'Oldsmar', 'Clearwater Beach'],
  },
  {
    slug: 'brandon',
    city: 'Brandon',
    title: 'Brandon',
    h1: 'IT Services & Low-Voltage in Brandon, FL',
    metaTitle: 'Managed IT & Low Voltage Services in Brandon, FL',
    metaDescription:
      'Managed IT, business networking, structured cabling and security cameras for Brandon and east Hillsborough businesses. Local, responsive and documented.',
    intro:
      'Brandon, Riverview and east Hillsborough are growing fast, and a lot of that growth is new commercial space that needs cabling, network and cameras from scratch. We handle the whole scope so a new location opens on schedule.',
    neighborhoods: ['Brandon', 'Riverview', 'Valrico', 'Lithia', 'Seffner', 'Plant City', 'Apollo Beach', 'Bloomingdale'],
  },
  {
    slug: 'orlando',
    city: 'Orlando',
    title: 'Orlando',
    h1: 'Low-Voltage & IT Services in Orlando, FL',
    metaTitle: 'Low Voltage & IT Services in Orlando, FL',
    metaDescription:
      'Structured cabling, retail buildout low-voltage, networking and cameras in Orlando and the I-4 corridor. Certified, documented, on the GC schedule.',
    intro:
      'We take project work across the Orlando market and the I-4 corridor, with a particular focus on retail buildouts and new construction low-voltage — brand-specified cabling, Fluke certification and closeout documentation delivered on the general contractor\'s schedule.',
    neighborhoods: ['Downtown Orlando', 'Winter Park', 'Lake Nona', 'Altamonte Springs', 'Kissimmee', 'Maitland', 'Winter Garden', 'Sanford'],
  },
];

/** Home page FAQs — these carry FAQPage structured data. */
const homeFaqs = [
  {
    q: 'What areas does Crossroads Technology serve?',
    a: 'We are based in Tampa and serve the Tampa Bay region — Tampa, St. Petersburg, Clearwater, Brandon and the surrounding Hillsborough and Pinellas communities. We also take project work in Orlando and along the I-4 corridor.',
  },
  {
    q: 'What makes Crossroads different from other IT providers?',
    a: 'Continuity and scope. The person who walks your building and writes the scope is the person who installs it and supports it, so nothing is lost in a handoff. And because we cover cabling, network, cameras, AV and ongoing IT under one company, there is no gap between trades and no vendor to blame. Our founder spent five years contracting in this industry before starting the company, and built it without the account-management layer that slows decisions down.',
  },
  {
    q: 'Do you work with businesses that already have an IT provider?',
    a: 'Frequently. Many clients bring us in for infrastructure work their current provider does not do — structured cabling, cameras, AV, office moves — while keeping their existing help desk. Others move everything to us after the first project. Either is fine.',
  },
  {
    q: 'Do you handle both the cabling and the IT support?',
    a: 'Yes, and that is the point of how we are built. We act as the general contractor for technology: cabling, network, internet, phones, cameras, AV and ongoing IT support under one company. There is no vendor to blame and no gap between scopes.',
  },
  {
    q: 'Do you work with small businesses?',
    a: 'Yes. Most of our clients are small to mid-sized organizations — professional offices, private schools, churches and multi-site retail. We do not have a minimum seat count for project work, and managed plans are priced per user so a ten-person office is a normal fit.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Call (813) 921-5733 or send the contact form. For anything involving cabling, cameras or AV we will walk the site before quoting, because accurate pricing on physical work requires seeing the building.',
  },
];

/** The four positioning pillars drawn from how the company was founded. */
const pillars = [
  {
    icon: 'wrench',
    h: 'Continuity from scope to support',
    p: 'The person who walks your building and writes the scope is the person who installs it and supports it afterward. Nothing is lost in a handoff, and nobody has to go ask someone who has never seen the site.',
  },
  {
    icon: 'layers',
    h: 'No middle layers',
    p: 'Our founder spent five years contracting in this industry before starting the company, and built it specifically without the account-management layer that slows decisions down. You reach someone who can answer.',
  },
  {
    icon: 'hub',
    h: 'One contractor, end to end',
    p: 'Cabling, network, internet, phones, cameras, AV and ongoing support under one company. One scope, one schedule, and no gap between trades for a problem to fall into.',
  },
  {
    icon: 'check',
    h: 'Documented and certified',
    p: 'Every run is tested and labeled, every closet photographed, every network mapped. You receive the as-builts, port maps and certification results, and they remain yours.',
  },
];

const process = [
  { n: '01', h: 'Walk the site', p: 'For anything physical, we come look. Accurate scoping on cabling, cameras and AV requires seeing the building, the closets and the ceiling.' },
  { n: '02', h: 'Scope and quote in plain language', p: 'A written quote that says what you get, what it costs and what it does not include. If there is a cheaper way to solve it, we will tell you.' },
  { n: '03', h: 'Install and certify', p: 'Work scheduled around your operating hours. Every cable tested, every device labeled, every closet photographed.' },
  { n: '04', h: 'Document and support', p: 'You get the as-builts, port maps, credentials and test results. Then we support what we built.' },
];

module.exports = { site, credentials, clients, serviceCategories, services, industries, areas, homeFaqs, pillars, process };
