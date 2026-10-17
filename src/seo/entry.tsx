import { renderToStaticMarkup } from 'react-dom/server';
import { faqs } from '../data/faq';
import { profile, siteUrl } from '../data/profile';
import { projects } from '../data/projects';
import { sectionRoutes } from '../data/sections';
import { projectTitle } from '../utils/categories';
import { homeGraph, projectGraph } from './schema';
import { HomeStatic, ProjectStatic } from './StaticPage';

/** One prerendered page: where to write it and what goes in <head> and #root. */
export interface PrerenderPage {
  path: string;
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'website' | 'profile' | 'article';
  jsonLd: string;
  body: string;
  indexable: boolean;
}

const json = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

export function pages(): PrerenderPage[] {
  const homeBody = renderToStaticMarkup(<HomeStatic />);
  const homeLd = json(homeGraph());

  const sectionPages: PrerenderPage[] = sectionRoutes.map((s) => ({
    path: s.path,
    title: s.title,
    description: s.description,
    canonical: `${siteUrl}/`,
    image: `${siteUrl}/og-image.jpg`,
    type: s.id === 'home' ? 'profile' : 'website',
    jsonLd: homeLd,
    body: homeBody,
    indexable: s.id === 'home',
  }));

  const projectPages: PrerenderPage[] = projects.map((p) => ({
    path: `/projects/${p.slug}`,
    title: projectTitle(p, profile.name),
    description: p.summary.length > 158 ? `${p.summary.slice(0, 155).replace(/\s+\S*$/, '')}…` : p.summary,
    canonical: `${siteUrl}/projects/${p.slug}`,
    image: p.images[0] ? `${siteUrl}${p.images[0].src}` : `${siteUrl}/og-image.jpg`,
    type: 'article',
    jsonLd: json(projectGraph(p)),
    body: renderToStaticMarkup(<ProjectStatic project={p} />),
    indexable: true,
  }));

  return [...sectionPages, ...projectPages];
}

/** /llms.txt: a plain-language summary for AI assistants (llmstxt.org format). */
export function llmsTxt(): string {
  const { about } = profile;
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.headline}. Based in ${profile.location}. ${profile.openTo}.`,
    '',
    profile.statement,
    '',
    '## Contact',
    `- Website: ${siteUrl}/`,
    `- Email: ${profile.email}`,
    `- WhatsApp: ${profile.phoneDisplay}`,
    ...Object.entries(profile.links).filter(([, v]) => v).map(([k, v]) => `- ${({ linkedin: 'LinkedIn', github: 'GitHub', twitter: 'X' } as Record<string, string>)[k] ?? k}: ${v}`),
    `- Résumé: ${siteUrl}/Resume.pdf`,
    '',
    '## Experience',
    ...about.experience.map((e) => `- ${e.title}, ${e.org} (${e.period}): ${e.detail ?? ''}`),
    '',
    '## Education and certifications',
    ...about.education.map((e) => `- ${e.title}, ${e.org}`),
    ...about.achievements.map((a) => `- ${a}`),
    '',
    '## Services',
    ...sectionRoutes.filter((s) => s.path.startsWith('/services/')).map((s) => `- ${s.label}: ${s.description}`),
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.title}](${siteUrl}/projects/${p.slug}): ${p.subtitle}.${p.liveUrl ? ` Live: ${p.liveUrl}` : ''}`),
    '',
    '## FAQ',
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, '']),
  ];
  return lines.join('\n');
}

export { siteUrl };
