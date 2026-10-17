import { chapters } from './story';
import type { NavItem } from './types';

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', sections: ['home'] },
  { id: 'engineering', label: 'Services', sections: ['engineering', 'commerce', 'search', 'intelligence'] },
  { id: 'projects', label: 'Projects', sections: ['projects'] },
  { id: 'about', label: 'About', sections: ['about'] },
  { id: 'contact', label: 'Contact', sections: ['contact'] },
];

/** The journey shown on the side rail, built from the story chapters. */
export const journey = ['home', 'engineering', 'commerce', 'search', 'intelligence', 'projects', 'about', 'contact'].map((id) => ({
  id,
  numeral: chapters[id].numeral,
  label: chapters[id].name,
  seal: !!chapters[id].seal,
}));
