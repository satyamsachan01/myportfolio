import type { ServiceArea } from './types';

export const engineering = {
  eyebrow: 'Web Engineering',
  title: 'Built with logic.',
  accent: 'Designed with purpose.',
  description: 'Modern digital products with thoughtful interfaces, reliable architecture and code that is easy to change.',
  showcase: [
    { title: 'Full-Stack Development', text: 'Front end, back end and database, planned as one product.' },
    { title: 'Custom Websites', text: 'Built around the business, not a template.' },
    { title: 'React Applications', text: 'Component driven interfaces with clean state and routing.' },
    { title: 'TypeScript Interfaces', text: 'Typed code that is safer to change later.' },
    { title: 'Node.js & Express', text: 'Lightweight APIs and server logic.' },
    { title: 'Java & Spring Boot', text: 'Structured, dependable REST services.' },
    { title: 'REST APIs', text: 'Clear endpoints between apps and services.' },
    { title: 'MySQL & MongoDB', text: 'Data modelled for how it will be used.' },
    { title: 'Admin Dashboards', text: 'Internal tools to run content and operations.' },
    { title: 'CRUD Applications', text: 'Create, read, update, delete. Done properly.' },
    { title: 'Responsive Design', text: 'From small phones to wide desktops.' },
    { title: 'Performance', text: 'Lean bundles, lazy loading, fast first paint.' },
  ],
  featuredSlugs: ['prescripto', 'photography-contest-platform', 'movie-booking-platform', 'employee-management-system'],
};

export const commerce = {
  eyebrow: 'WordPress, Shopify & E-commerce',
  title: 'Turning ideas into',
  accent: 'digital storefronts.',
  description: 'WordPress, Shopify, WooCommerce or a custom build. The platform is picked for what the business actually needs.',
  areas: [
    {
      id: 'wordpress', label: 'WordPress', title: 'WordPress Development',
      description: 'Content blocks that snap together into polished pages the team can edit themselves.',
      visual: 'blocks',
      items: ['Custom WordPress Themes', 'Gutenberg Blocks', 'Custom PHP Templates', 'Business Websites', 'Content Publishing', 'Responsive Layouts', 'Technical SEO', 'Schema Implementation', 'Speed Optimization', 'Malware Cleanup & Security'],
      cta: { label: 'Explore WordPress', filter: 'wordpress' },
    },
    {
      id: 'shopify', label: 'Shopify', title: 'Shopify Development',
      description: 'Premium storefronts assembled from modular sections into a product page that sells.',
      visual: 'storefront',
      items: ['Shopify Theme Development', 'Liquid Templates', 'Sections & Snippets', 'Product & Collection Pages', 'Metafields & Metaobjects', 'Cart Customization', 'App Integrations', 'Product SEO', 'Responsive Storefronts', 'Landing Pages'],
      cta: { label: 'Explore Shopify', filter: 'shopify' },
    },
    {
      id: 'woocommerce', label: 'WooCommerce', title: 'WooCommerce Development',
      description: 'Products, cart, payments and orders working as one system on WordPress.',
      visual: 'journey',
      items: ['Store Development', 'WordPress Integration', 'Custom Product Pages', 'Variable Products', 'Cart & Checkout', 'Payment Gateways', 'Shipping Setup', 'Coupons & Discounts', 'Order Management', 'Product SEO', 'Performance'],
      cta: { label: 'Explore WooCommerce', filter: 'woocommerce' },
    },
    {
      id: 'custom', label: 'Custom', title: 'Custom E-commerce',
      description: 'Bespoke builds for catalogues and journeys an off-the-shelf platform cannot model.',
      visual: 'layers',
      items: ['Custom Storefronts', 'Product Catalogs', 'Shopping Experiences', 'Product Filtering', 'Checkout UX', 'Payment Integrations', 'Shipping Integrations', 'Analytics', 'Conversion Optimization', 'Mobile Commerce'],
      cta: { label: 'Explore E-commerce', filter: 'ecommerce' },
    },
  ] satisfies ServiceArea[],
  journey: [
    { id: 'discover', label: 'Discover', text: 'A shopper finds the product through search, a collection or a category.' },
    { id: 'select', label: 'Select', text: 'They pick a size, colour or bundle. Price and stock update with it.' },
    { id: 'cart', label: 'Add to Cart', text: 'Quantity, coupons and a shipping estimate, right in the cart.' },
    { id: 'checkout', label: 'Checkout', text: 'Address, shipping method and a payment gateway in one short form.' },
    { id: 'order', label: 'Order', text: 'An order lands for the store to fulfil, with confirmation emails.' },
  ],
  platforms: [
    { name: 'Shopify', type: 'Hosted platform', best: 'Brands that want to sell fast, with hosting, security and checkout handled.', notes: 'Themes use Liquid. Monthly plan plus apps, less control over the back end.' },
    { name: 'WooCommerce', type: 'WordPress plugin', best: 'Businesses already on WordPress that want full ownership.', notes: 'Self hosted. You own code and data, and you look after hosting and updates.' },
    { name: 'WordPress', type: 'Content system', best: 'Content rich business sites, blogs and lead generation.', notes: 'Not a store on its own. Commerce comes through WooCommerce. Strong for SEO.' },
    { name: 'Custom', type: 'Bespoke build', best: 'Unique catalogues, B2B flows or integrations a platform cannot model.', notes: 'Most flexible, for example React + Node.js + payment APIs. More effort to build and run.' },
  ],
};

export const search = {
  eyebrow: 'SEO, AEO & GEO',
  title: 'Make your digital presence',
  accent: 'discoverable.',
  description: 'Technically sound websites and genuinely useful content, so people and search systems understand your business.',
  pillars: [
    {
      id: 'seo', label: 'SEO', name: 'Search Engine Optimization',
      definition: 'Helping search engines crawl, index, understand and rank your pages for what customers type.',
      items: ['Technical SEO Audits', 'Keyword Research', 'Search Intent', 'On-Page Optimization', 'Internal Linking', 'Metadata', 'XML Sitemaps', 'Canonical Tags', 'Crawlability & Indexing', 'Core Web Vitals', 'Schema Markup', 'E-commerce SEO', 'Analytics & Search Console'],
      cta: 'Explore SEO',
    },
    {
      id: 'aeo', label: 'AEO', name: 'Answer Engine Optimization',
      definition: 'Writing and structuring content so it answers real questions clearly, for featured answers and voice assistants.',
      items: ['Question-Based Content', 'Clear Answers', 'Helpful Structure', 'Relevant FAQs', 'Source Transparency', 'Structured Information', 'Entity Consistency', 'Answer-Oriented Discovery'],
      cta: 'Explore AEO',
    },
    {
      id: 'geo', label: 'GEO', name: 'Generative Engine Optimization',
      definition: 'Making your brand clear, credible and technically accessible, so AI search experiences can understand and reference it.',
      items: ['AI Search Discoverability', 'Clear Brand & Entity Info', 'Original, Useful Content', 'Credible Sources', 'Relevant Structured Data', 'Technical Accessibility', 'Content Freshness', 'Real Authority Building', 'Referral & Search Data'],
      cta: 'Explore GEO',
    },
  ] as const,
  note:
    'SEO, AEO and GEO share the same foundations but target different ways people look for answers. Nobody can honestly guarantee rankings, featured snippets or AI citations. The work is making a site clear, useful and trustworthy.',
};

export const intelligence = {
  eyebrow: 'AI-Powered Products',
  title: 'Building systems that think,',
  accent: 'connect, and assist.',
  description: 'AI products, knowledge retrieval and automation that plug software into real business workflows.',
  capabilities: ['AI-Powered Applications', 'LLM Integrations', 'RAG', 'Document Q&A', 'Knowledge Retrieval', 'AI Assistants & Agents', 'API & Tool Integrations', 'Workflow Automation', 'Enterprise Dashboards', 'Data Processing', 'Local LLM Experiments', 'Multi-Step Agents'],
  tech: ['Python', 'FastAPI', 'Node.js', 'React', 'SQL', 'NoSQL', 'Embeddings', 'Vector Search', 'RAG Pipelines', 'MCP', 'Ollama'],
  pipeline: [
    { id: 'data', label: 'Business Data', text: 'PDFs, policies, product sheets, tickets and records. Knowledge the business already has.', detail: 'Connectors read files and records from storage, a CMS or a database, on upload or on a schedule.' },
    { id: 'process', label: 'Document Processing', text: 'Text is extracted, cleaned and split into chunks with metadata.', detail: 'Chunk size and overlap decide how much context each piece keeps. The playground below runs this step for real.' },
    { id: 'retrieve', label: 'Retrieval & Context', text: 'For each question, the most relevant chunks are found and assembled.', detail: 'Production systems use embeddings and vector search. The playground uses keyword scoring so it runs in your browser.' },
    { id: 'ai', label: 'AI Processing', text: 'A language model reads the question plus the retrieved context and drafts an answer.', detail: 'Needs a model: a hosted API called from a secure backend, or a local model through Ollama. Keys never sit in frontend code.' },
    { id: 'tools', label: 'Tools & Integrations', text: 'The system calls APIs to create a ticket, check stock or update a CRM.', detail: 'Protocols like MCP describe tools so a model can use them safely, with permissions and logs.' },
    { id: 'output', label: 'Useful Output', text: 'An answer with sources, a filled form, a summary or the next workflow step.', detail: 'Good output says where it came from, so people can check it.' },
  ],
};
