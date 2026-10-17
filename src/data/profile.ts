/**
 * Central profile content. Edit freely. Every component reads from here.
 * Empty strings and empty arrays are hidden in the UI, so nothing unverified is shown.
 */
const base = import.meta.env.BASE_URL;

export const profile = {
  name: 'Satyam Sachan',
  shortRole: 'Full-Stack Developer & Digital Product Builder',
  headline:
    'Full-Stack Developer | WordPress & Shopify Developer | SEO Executive | Building AI-Powered Enterprise Products',
  creativeHeadline: "I don't just build websites. I build digital worlds.",
  /** The hero splits the headline: plain line + serif accent line. */
  heroLine: "I don't just build websites.",
  heroAccent: 'I build digital worlds.',
  /** Shown as a small status pill in the hero and contact. Leave empty to hide. */
  openTo: 'Open to full-time roles and freelance projects',
  /** Link to a PDF résumé. Leave empty to hide the button. */
  resumeUrl: `${base}Resume.pdf`,
  /** Your own figure from your previous portfolio. Leave empty to hide. */
  yearsExperience: '04+',
  statement:
    'From custom web applications and powerful e-commerce experiences to search intelligence and AI-powered enterprise products, I transform ideas into digital experiences built for real-world impact.',
  heroParagraph:
    'Web apps, online stores, search-ready websites and AI products. Built to solve a real business problem, not to fill a page.',

  /** Optional. Shown in the hero only when filled in. */
  location: 'Kanpur, India',
  availability: '',

  /** Contact + social links. Leave a value empty to hide that link. */
  email: 'sachansatyam19@gmail.com',
  /** Shown with a WhatsApp icon. `whatsapp` is the number in international format, digits only. */
  phoneDisplay: '+91 74082 72129',
  whatsapp: '917408272129',
  whatsappMessage: "Hi Satyam, I saw your portfolio and I'd like to talk about a project.",
  /** Your portrait, from /public. Empty hides it. */
  photo: `${base}satyam.webp`,
  links: {
    linkedin: '',
    github: '',
    twitter: '',
  },

  about: {
    bio: [
      "I'm Satyam. I build the whole thing: the React screen you click, the Node.js or Spring Boot API behind it, the WordPress theme the client edits on Monday morning, and the SEO that gets it found.",
      'Lately that has meant websites for a car customisation studio, a B2B export marketplace, a luxury leather care brand, an electronics store, a construction firm, an elevator company and an IT services business. I also clean up hacked WordPress sites and keep them secure after launch.',
      'I work from Kanpur, India. On the side I am learning how retrieval and AI can make business software actually useful. I like projects where the website has a clear job to do.',
    ],
    /** Add real entries only, e.g. { title: 'Role', org: 'Company', period: '2024 to Present', detail: '' } */
    experience: [] as { title: string; org: string; period: string; detail?: string }[],
    /** e.g. { title: 'B.Tech, Computer Science', org: 'University', period: '2020 to 2024' } */
    education: [] as { title: string; org: string; period: string }[],
    /** Verified achievements only. */
    achievements: [] as string[],
    process: [
      { step: 'Discover', text: 'Understand the business, the audience and what the website or product must achieve.' },
      { step: 'Plan', text: 'Define structure, content, platform and technical approach before any code is written.' },
      { step: 'Build', text: 'Develop clean, responsive, maintainable code with regular previews along the way.' },
      { step: 'Optimise', text: 'Tune performance, accessibility, metadata and structured data so the site is easy to find and use.' },
      { step: 'Support', text: 'Hand over with documentation and stay available for improvements and maintenance.' },
    ],
    collaboration: [
      'Clear scope and priorities agreed up front',
      'Regular progress updates and shareable previews',
      'Direct communication, no layers in between',
      'Open to full-time roles, freelance projects and long-term work',
    ],
  },
} as const;

export const siteUrl: string =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  (typeof window !== 'undefined' ? window.location.origin : '');
