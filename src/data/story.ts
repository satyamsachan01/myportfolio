/**
 * The story that runs through the site. You walked through the gate; now you cross
 * one hall after another and each world breaks one of four seals.
 * Edit freely. Keep each line short, like something said out loud.
 */
export interface Chapter {
  id: string;
  numeral: string;
  name: string;
  /** One or two short sentences in the narrator's voice. */
  line: string;
  /** Only the four worlds carry a seal. */
  seal?: string;
}

export const chapters: Record<string, Chapter> = {
  home: {
    id: 'home', numeral: 'I', name: 'Through the gate',
    line: 'You made it in. Four seals guard this place, and each one opens a different part of how I work.',
  },
  engineering: {
    id: 'engineering', numeral: 'II', name: 'The Foundry', seal: 'Seal of Logic',
    line: 'The first hall still smells of fresh concrete. Nothing here is decoration. Every beam carries load and every screen has a job.',
  },
  commerce: {
    id: 'commerce', numeral: 'III', name: 'The Market Hall', seal: 'Seal of Trade',
    line: 'Past the foundry the light turns warm. Shelves, counters, a checkout with no queue. This is where an idea starts paying for itself.',
  },
  search: {
    id: 'search', numeral: 'IV', name: 'The Signal Archive', seal: 'Seal of Signals',
    line: 'A room full of questions. Every page is a lantern, and my job is making sure the right one is lit when someone comes looking.',
  },
  intelligence: {
    id: 'intelligence', numeral: 'V', name: 'The Quiet Chamber', seal: 'Seal of Thought',
    line: 'Deeper in, it goes quiet. Documents, data and tools talk to each other here, and a useful answer finds its way out.',
  },
  projects: {
    id: 'projects', numeral: 'VI', name: 'The Vault',
    line: 'All four seals are open. Behind them is the work that is already out in the world.',
  },
  about: {
    id: 'about', numeral: 'VII', name: 'The builder’s room',
    line: 'Every world has someone who built it. This is the room where I sit.',
  },
  contact: {
    id: 'contact', numeral: 'VIII', name: 'The last door',
    line: 'This one stays closed until you bring an idea.',
  },
};

export const sealOrder = ['engineering', 'commerce', 'search', 'intelligence'] as const;
