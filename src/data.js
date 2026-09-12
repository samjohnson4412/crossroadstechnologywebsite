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
  tagline: 'Built by techs, not salespeople.',
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
 * Core services. Each becomes a page at /services/<slug>/ and is linked from
 * the home page, the services index, and the relevant industry/area pages.
 */
const services = [
  {
    slug: 'managed-it-services',
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
        p: 'We work from plans and coordinate with the GC and other trades on rough-in and trim schedules. We have delivered low-voltage scopes for retail store builds in the Tampa and Orlando markets, including brand-specified cable categories, certification requirements and closeout packages.',
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
    related: ['networking-wifi', 'security-cameras', 'office-moves'],
  },
  {
    slug: 'security-cameras',
    nav: 'Security Cameras',
    title: 'Security Cameras & Access Control',
    h1: 'Security Camera Installation & Access Control',
    metaTitle: 'Security Camera Installation Tampa Bay | Crossroads Technology',
    metaDescription:
      'Commercial security camera and access control installation in Tampa Bay. IP cameras, NVR storage, remote viewing and door access, installed by techs.',
    blurb:
      'IP camera systems that actually produce usable footage, plus door access control — installed, aimed, configured and supported.',
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
          'Door access control, keypads, fobs and door position monitoring',
          'Intercom and video doorbell entry for schools and offices',
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
        a: 'Yes. We install and support door access control — keypads, fobs, strikes and door position monitoring — and integrate it with camera coverage at entry points.',
      },
    ],
    related: ['structured-cabling', 'networking-wifi', 'managed-it-services'],
  },
  {
    slug: 'audio-visual',
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
    related: ['structured-cabling', 'networking-wifi', 'microsoft-365'],
  },
  {
    slug: 'microsoft-365',
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
    related: ['networking-wifi', 'managed-it-services', 'office-moves'],
  },
  {
    slug: 'office-moves',
    nav: 'Office Moves',
    title: 'Office Moves & New Build Technology',
    h1: 'Office Move & New Build Technology Services',
    metaTitle: 'Office Move IT & New Build Technology | Tampa Bay',
    metaDescription:
      'Moving offices or opening a new location in Tampa Bay? One contractor for cabling, network, internet, phones, cameras and AV — planned so you open on schedule.',
    blurb:
      'One contractor for the whole technology scope of a move or a new location — cabling, network, internet, phones, cameras and AV, sequenced to your open date.',
    icon: 'move',
    keywords: 'office move IT Tampa, new office technology setup, business relocation IT',
    intro:
      'An office move is where fragmented IT vendors become expensive. The cabling contractor finishes late, the carrier install was never scheduled, the phone port fails on cutover day, and everyone points at someone else. We take the whole technology scope so there is one schedule and one person accountable for the open date.',
    body: [
      {
        h: 'Working backward from your open date',
        p: 'Carrier installs are the long pole — a fiber build can run sixty days or more. We start there and schedule everything else against it: cabling at rough-in, rack and network before furniture, cameras and AV at trim, cutover the weekend before you open.',
        list: [
          'Site walkthrough and technology plan for the new space',
          'Structured cabling designed to the furniture and floor plan',
          'Internet circuit sourced and installation scheduled early',
          'Rack, network and Wi-Fi built and tested before move-in',
          'Phone system move and number port managed end to end',
          'Cameras, access control and AV installed at trim',
          'Workstation, printer and server relocation over a weekend',
          'Decommissioning and documentation at the old site',
        ],
      },
      {
        h: 'Storage, servers and data',
        p: 'Moving a server or NAS is the riskiest hour of a relocation. We back up first, verify the backup, move it, and confirm services are up before anyone tries to work Monday morning. Where a move is a good moment to retire aging on-premises hardware, we will say so and price both paths.',
      },
    ],
    faqs: [
      {
        q: 'How far in advance should we start planning an office move?',
        a: 'Reach out as soon as you have a signed lease. Internet circuits are the constraint — a fiber build can take sixty days or more — and cabling has to happen before walls close. Sixty to ninety days is comfortable; less is workable but limits your carrier options.',
      },
      {
        q: 'Can you work nights and weekends for the cutover?',
        a: 'Yes, and we usually do. Physical moves and cutovers are scheduled outside business hours so your staff arrives to a working office.',
      },
    ],
    related: ['structured-cabling', 'internet-phone-systems', 'networking-wifi'],
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
    services: ['managed-it-services', 'microsoft-365', 'office-moves', 'internet-phone-systems'],
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
    services: ['structured-cabling', 'security-cameras', 'networking-wifi', 'office-moves'],
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
    q: 'What does "built by techs, not salespeople" actually mean?',
    a: 'It means the people who scope your project are the people who install and support it. Our founder spent five years as a contractor in the field before starting the company, and the business was built specifically to remove the middle layers that slow good work down. You get a direct line to a technician rather than an account manager relaying messages.',
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
    h: 'You talk to the tech',
    p: 'No account manager relaying messages to someone who has never seen your building. You reach the person who installed it and knows why it was built that way.',
  },
  {
    icon: 'layers',
    h: 'No middle layers',
    p: 'This company exists because our founder spent five years watching good work get slowed down by unnecessary hand-offs. We took them out. Decisions happen in one conversation.',
  },
  {
    icon: 'hub',
    h: 'One vendor, end to end',
    p: 'Cabling, network, internet, phones, cameras, AV and ongoing support from one contractor. Nobody to point at when something does not work.',
  },
  {
    icon: 'check',
    h: 'We own the outcome',
    p: 'If it is in our scope, it is our problem until it works. We test, certify and document what we install, and you get the documentation.',
  },
];

const process = [
  { n: '01', h: 'Walk the site', p: 'For anything physical, we come look. Accurate scoping on cabling, cameras and AV requires seeing the building, the closets and the ceiling.' },
  { n: '02', h: 'Scope and quote in plain language', p: 'A written quote that says what you get, what it costs and what it does not include. If there is a cheaper way to solve it, we will tell you.' },
  { n: '03', h: 'Install and certify', p: 'Work scheduled around your operating hours. Every cable tested, every device labeled, every closet photographed.' },
  { n: '04', h: 'Document and support', p: 'You get the as-builts, port maps, credentials and test results. Then we support what we built.' },
];

module.exports = { site, credentials, services, industries, areas, homeFaqs, pillars, process };
