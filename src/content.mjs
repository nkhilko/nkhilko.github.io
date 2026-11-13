export const identity = {
  name: 'Nikita Khilko',
  headline: 'I build systems that make growth operational.',
  intro: 'I connect business strategy, AI and automation to create scalable operations — from intelligent sales systems to digital products and international commerce.',
  description: 'Selected work by Nikita Khilko across AI operations, product strategy, automation and commercial growth.',
  contacts: [
    { label: 'Email', detail: 'nikitahilko@gmail.com', href: 'mailto:nikitahilko@gmail.com' },
    { label: 'LinkedIn', detail: 'Nikita Khilko', href: 'https://es.linkedin.com/in/nikitakhilko/es' },
  ],
};

export const groups = [
  { id: 'work', title: 'AI Revenue Systems', description: 'From finding the right accounts to designing the operations that serve them.', projects: ['sdr-crm', 'legal-operations', 'hospitality-operations'] },
  { id: 'commerce', title: 'AI & Commerce Operations', description: 'How digital products, storefronts and creative assets move from preparation to delivery.', projects: ['checklist-pipeline', 'sketchsy-commerce', 'sketchsy-release', 'sketchsy-cinematic'] },
  { id: 'impact', title: 'Commercial Impact', description: 'Growing a software business and evolving the product for a new audience.', projects: ['limon-ad', 'skt'] },
];

export const projects = {
  'sdr-crm': {
    title: 'AI-Assisted SDR-CRM', category: 'Revenue operations',
    summary: 'A modular system for prospect research, AI-assisted qualification and human-supervised outreach.',
    cta: 'Explore the architecture',
    challenge: 'Create a repeatable business-development process while keeping prospect selection, outreach and follow-up traceable. The same account can surface more than once, and outreach needs to reflect what has already happened.',
    contribution: 'I designed and built the internal workflow around focused modules for collection, enrichment, qualification, draft preparation, CRM updates and monitoring. I placed review before consequential outreach and used explicit CRM state to coordinate follow-up.',
    controls: [
      'Deduplication, validation and explicit state transitions govern how records enter and move through the workflow.',
      'People review prospect fit and the outreach draft. Sent activity is reconciled with CRM history before follow-up is prepared.',
      'Run logs and daily briefs surface exceptions. Modular stages give operators a defined place to diagnose and recover from failures.',
    ],
    impact: 'The throughput target is sized for a supervised workflow. Research depth, record quality and review capacity determine what can move through it each day.',
    decisions: 'The workflow uses n8n, Baserow and Gmail. AI interprets company context and drafts recommendations. Deterministic logic handles scheduling, routing, validation and synchronization. I’ve used Salesforce hands-on in other projects. It is also a possible enterprise CRM integration for SDR-CRM.',
    metrics: [{ value: '10–20', label: 'new prospect records per business day', type: 'Design target' }],
    diagrams: ['sdr'], overview: ['intake', 'qualify', 'review', 'sync'],
  },
  'legal-operations': {
    title: 'Legal Operations', category: 'Professional services',
    summary: 'Account research and contact prioritization, alongside an operating model for law-firm administration.',
    challenge: 'Law firms require careful contact selection during business development. Inside the firm, repetitive intake, document handling and matter administration can consume professional time.',
    contribution: 'I designed an account research workflow that identifies relevant firms and ranks primary and secondary contacts. I also developed a separate client operating model for intake, document coordination, matter updates and reporting.',
    controls: [
      'Review contact relevance and outreach history at account level before preparing a second approach to the same firm.',
      'Keep business-development records separate from confidential matter and client information.',
      'Route sensitive intake, matter decisions and consequential communications to a professional for approval.',
    ],
    impact: 'The scenario assumes five lawyers each recover 15 hours per month. At €100 per hour, that is €7,500 in modeled capacity value. The amount represents capacity that could be redirected to other work.',
    decisions: 'CRM supports research and outreach history. Case-management and document systems sit on the client side, with integration scope determined by access, confidentiality and the firm’s review process.',
    metrics: [{ value: '75 h/mo', label: 'potential professional capacity recovered', type: 'Modeled opportunity' }, { value: '€7,500', label: 'illustrative monthly capacity value', type: 'Modeled opportunity' }],
    diagrams: ['legal-sales', 'legal-client'], overview: ['research', 'rank', 'review'],
  },
  'hospitality-operations': {
    title: 'Hospitality Operations', category: 'Guest & service operations',
    summary: 'Business-development research and a guest journey connecting inquiries, reservations and service delivery.',
    challenge: 'Guest inquiries, booking changes and service requests often arrive in separate tools. When a request moves between teams, its status and owner can become unclear.',
    contribution: 'I developed a research model for identifying and qualifying hospitality accounts. I also mapped a reference guest journey from inquiry through reservation, internal coordination and follow-up.',
    controls: [
      'Give incoming requests a defined owner and keep reservation status visible at handoffs.',
      'Route policy exceptions and service decisions to staff before confirming the next action.',
      'Use follow-up and reporting to identify recurring guest requests and operational bottlenecks.',
    ],
    impact: 'The range represents potential monthly administrative time savings. The size of the opportunity depends on request volume, the existing booking setup and how often staff need to intervene.',
    decisions: 'Booking, messaging and customer records support the workflow. This work builds on my earlier hospitality product work at TVOE.menu, where restaurant operations shaped product decisions.',
    metrics: [{ value: '10–40 h/mo', label: 'potential administrative time saved', type: 'Modeled opportunity' }],
    diagrams: ['hospitality'], overview: ['inquiry', 'reserve', 'coordinate'],
  },
  'checklist-pipeline': {
    title: 'Automated Checklist Pipeline', category: 'Digital product production',
    summary: 'A research-to-publication workflow for preparing and reviewing digital checklist products in batches.',
    challenge: 'Preparing each checklist manually repeated the same work across research, content, metadata and storefront setup. Batch production needed a consistent way to maintain editorial quality.',
    contribution: 'I designed and implemented an AI-assisted pipeline that selects topics, prepares checklist content and product metadata in parallel, validates the output and hands approved items to Wix for publication.',
    controls: [
      'Track each checklist separately through a batch so that revisions and approvals are tied to the correct item.',
      'Send incomplete or unapproved items through revision and review before publication.',
      'Record publication state after the storefront step so prepared and published products can be reconciled.',
    ],
    impact: 'Adding the automated and review estimates gives an indicative 5–8 minutes per checklist. Across the stated 35–50 minute manual baseline, that implies approximately 77–90% less time for the compared steps. Batch completion depends on review capacity and revisions.',
    decisions: 'Research inputs and AI services support preparation. Wix handles publication after editorial approval. I separated automated preparation time from review time so the comparison makes the remaining human effort visible.',
    metrics: [{ value: '2–3 min', label: 'automated preparation per checklist', type: 'Workflow estimate' }, { value: '3–5 min', label: 'human review and approval', type: 'Workflow estimate' }, { value: '4–8', label: 'checklists per parallel batch', type: 'Reported workflow capacity' }, { value: 'Up to 85%', label: 'reported approval rate', type: 'Reported outcome' }],
    comparison: [
      ['Manual preparation', '35–50 min'],
      ['Automated workflow', '2–3 min'],
      ['Human review', '3–5 min'],
      ['Automated workflow + review', '5–8 min'],
    ],
    diagrams: ['checklists'], overview: ['topic', 'prepare', 'review', 'publish'],
  },
  'sketchsy-commerce': {
    title: 'Sketchsy Commerce', category: 'International e-commerce',
    summary: 'A connected storefront and fulfillment workflow for selling independent artwork across markets.',
    challenge: 'A print-on-demand storefront needs to reflect where a product can be produced and delivered, what shipping costs at checkout, and how customers learn about the status of their order.',
    contribution: 'I designed and operated the commercial setup for Sketchsy, configuring products, shipping zones and region-dependent fees, checkout considerations, fulfillment routing and customer tracking.',
    controls: [
      'Use product availability, destination rules and shipping fees to govern checkout. Configure tax handling within the storefront’s supported setup.',
      'Review order or fulfillment exceptions before retrying or confirming a customer update.',
      'Reconcile fulfillment and tracking status so customer communications reflect the latest available information.',
    ],
    impact: 'The Wix and Gelato setup supports print-on-demand production and shipping without holding inventory. Consistent international purchasing and delivery is the operating objective. Coverage depends on product, destination and fulfillment rules.',
    decisions: 'Wix manages the storefront and checkout. Gelato handles production and shipping coordination. Payment, tax and carrier information support the workflow at their relevant handoffs.',
    diagrams: ['commerce'], overview: ['validate', 'checkout', 'route', 'tracking'],
  },
  'sketchsy-release': {
    title: 'Sketchsy Release Automation', category: 'Marketing operations',
    summary: 'A shared release workflow connecting artwork, product preparation and multichannel publishing.',
    challenge: 'Each artwork release requires product assets, storefront metadata and channel-specific copy. Preparing them independently increases the chance that versions or descriptions drift.',
    contribution: 'I designed a release architecture around a shared product record, from artwork intake and asset validation to content preparation, approval, publication and reconciliation.',
    controls: [
      'Validate source assets and product metadata before generating channel outputs.',
      'Review the prepared release before publishing to its channels.',
      'Reconcile publication status against the release record so incomplete channel deliveries remain visible.',
    ],
    impact: 'A shared release record gives each channel a consistent product reference and makes remaining publication work visible. A performance-learning loop using publishing and sales data is under development.',
    decisions: 'The release record coordinates the workflow while the storefront and distribution channels remain responsible for their own publication state. This keeps editorial control and channel verification explicit.',
    diagrams: ['release'], overview: ['intake', 'prepare', 'review', 'publish'],
  },
  'sketchsy-cinematic': {
    title: 'Sketchsy Cinematic Pipeline', category: 'Creative technology',
    summary: 'Cloud-based R&D for product films that preserve the original artwork through a 3D camera move.',
    challenge: 'A camera move through a reference interior has to preserve perspective, artwork proportions and the final crop. Cloud rendering also places limits on what can be tested in each iteration.',
    contribution: 'I built and validated a camera geometry preview, then produced opening, frontal and final-framing stills to test composition and fidelity. I structured the workflow so camera and framing decisions can be checked before committing to a render.',
    controls: [
      'Check that the camera remains aimed at the artwork during the curved move and aligns for the straight push-in.',
      'Review proportions and framing against the original artwork before moving to render preparation.',
      'Use intermediate stills and short previews to identify geometry and resource issues early.',
    ],
    impact: 'An accepted camera geometry preview and subsequent framing stills provide evidence of progress. The full production workflow remains active R&D.',
    decisions: 'Blender supports scene reconstruction, camera validation and CPU rendering. Reference assets and original artwork serve as inputs. CPU rendering lets me validate the camera and composition within the available cloud resources.',
    diagrams: ['cinematic'], overview: ['reference', 'scene', 'camera', 'fidelity'],
  },
  'limon-ad': {
    title: 'limon.ad', category: 'SaaS growth & product strategy',
    summary: 'Co-founding and scaling a digital growth platform through acquisition, product strategy and customer economics.',
    challenge: 'The platform needed a repeatable acquisition model and a product that kept customers long enough for growth to be sustainable.',
    contribution: 'I co-founded limon.ad and contributed across commercial strategy, acquisition, customer experience, product ownership and monetization.',
    controls: [
      'Use audience and campaign research to decide which acquisition opportunities to test.',
      'Connect activation and retention signals to product priorities.',
      'Review customer lifetime value alongside revenue to assess the economics of growth.',
    ],
    impact: 'Monthly revenue grew from approximately €8–10K to €45K+, and customer lifetime value rose from approximately $150 to $400+. The venture secured approximately €150K in funding. These are historical company outcomes.',
    decisions: 'Audience research, performance marketing, product experimentation and analytics informed decisions across the customer lifecycle. The diagram shows the commercial relationships between those stages.',
    metrics: [{ value: '€45K+', label: 'monthly revenue, from ~€8–10K', type: 'Reported historical outcome' }, { value: '$400+', label: 'customer LTV, from ~$150', type: 'Reported historical outcome' }, { value: '~€150K', label: 'venture funding secured', type: 'Reported historical outcome' }],
    diagrams: ['limon'],
  },
  skt: {
    title: 'SKT Marketing Management', category: 'Product ownership & market expansion',
    summary: 'Evolving a B2B growth platform toward a stronger consumer proposition while continuing to serve business users.',
    challenge: 'The product inherited an established B2B foundation from limon.ad. Expanding toward consumers introduced different expectations for acquisition and the product experience.',
    contribution: 'I led product ownership, coordinated cross-functional delivery and aligned priorities across B2B continuity, B2C product changes and growth operations.',
    controls: [
      'Keep the existing B2B path visible while developing the consumer experience.',
      'Use discovery and stakeholder alignment to resolve priorities shared across both audiences.',
      'Use tracking and lead-quality signals to inform product and acquisition decisions.',
    ],
    impact: 'The product expanded toward B2C while maintaining its business audience. Subscription retention drove high customer lifetime value (LTV). Measured return on ad spend was 45% in the first month and 540% over 12 months. Growth operations also reported an improvement of approximately 30% in lead quality.',
    decisions: 'Product discovery and analytics informed prioritization. Growth operations included server-side tracking and AI-assisted lead scoring.',
    metrics: [
      { value: '540%', label: '12-month return on ad spend', type: 'Measured outcome' },
      { value: '≈30%', label: 'improvement in lead quality', type: 'Reported outcome' },
    ],
    diagrams: ['skt'],
  },
};

export const experience = [
  ['PrivateData Operating Platform', 'Connected consulting operations across intake, delivery, publishing and measurement.'],
  ['Professional Operating System', 'A system for connecting project experience to capabilities, evidence and reusable assets.'],
  ['AI Content Operations', 'Research, editorial preparation and channel-specific publishing workflows with human review.'],
  ['Security Checklist & Knowledge Products', 'Practical security guides and checklists for small teams and independent professionals.'],
  ['AI-Assisted Document and Spreadsheet Processing', 'File review, data extraction and structured spreadsheet workflows with validation.'],
  ['TVOE.menu', 'Product work for restaurant workflows and hospitality operations.'],
  ['PawMe', 'Technical and product leadership for an early-stage digital product.'],
  ['CloneFish', 'Creative direction and production team leadership.'],
  ['Earlier independent work', 'Consulting, visual storytelling and product exploration across creative and technical projects.'],
];

export const approach = [
  ['Understand the operation', 'Map how work moves, who owns each decision and where the handoffs break.'],
  ['Design around decisions', 'Give rules, people and AI distinct responsibilities, with review where judgment matters.'],
  ['Build and measure', 'Deliver in modules, make outcomes visible and use the evidence to improve the next iteration.'],
];
