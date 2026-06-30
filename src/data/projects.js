import coverTaste from '../assets/images/img_project_cover_taste.webp';
import coverUta from '../assets/images/img_project_cover_uta.webp';
import coverSimplicity from '../assets/images/img_project_cover_simplicity.webp';
import coverHomein from '../assets/images/img_project_cover_homein.webp';
import coverWestpac from '../assets/images/img_project_cover_westpac.webp';

// Single source of truth for the Featured Work cards and the project detail
// pages. To flesh out a case study, add blocks to `sections`:
//   { type: 'text', heading?: '…', body: '…' }
//   { type: 'image', src: importedImage, caption?: '…', fullBleed?: true }
//   { type: 'duo', src: [imgA, imgB] }   // two images side by side
export const projects = [
  {
    slug: 'taste',
    title: 'Taste.com.au',
    desc: 'Product Design: Web Redesign & Research',
    cover: coverTaste,
    meta: [
      { label: 'Role', value: 'Lead Product Designer' },
      { label: 'Scope', value: 'Web Redesign, Research' },
      { label: 'Platform', value: 'Responsive Web' },
    ],
    overview:
      'A ground-up redesign of Australia’s largest food platform, grounded in research and focused on making everyday recipe discovery effortless.',
    sections: [],
  },
  {
    slug: 'uta-app',
    title: 'Universal Task Assistant',
    desc: 'Product Design: App & Branding',
    cover: coverUta,
    meta: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Scope', value: 'App, Branding' },
      { label: 'Platform', value: 'iOS & Android' },
    ],
    overview:
      'An AI-assisted task companion — from brand identity through to a focused, accessible mobile experience.',
    sections: [],
  },
  {
    slug: 'simplicity-accelerator',
    title: 'Simplicity Accelerator',
    desc: 'Product Design: Responsive Web Design & Platform Redesign',
    cover: coverSimplicity,
    meta: [
      { label: 'Role', value: 'Lead Product Designer' },
      { label: 'Scope', value: 'Platform Redesign' },
      { label: 'Platform', value: 'Responsive Web' },
    ],
    overview:
      'Reimagining the Simplicity experience — a responsive platform redesign that simplifies complex workflows end to end.',
    sections: [],
  },
  {
    slug: 'home-in',
    title: 'Home-in (CommBank)',
    desc: 'Multi-channel Design Strategy',
    cover: coverHomein,
    meta: [
      { label: 'Role', value: 'Design Strategy' },
      { label: 'Scope', value: 'Multi-channel Strategy' },
      { label: 'Client', value: 'CommBank' },
    ],
    overview:
      'A digital home-buying concierge, designed across channels to simplify one of life’s most complex journeys.',
    sections: [],
  },
  {
    slug: 'westpac-app',
    title: 'Westpac Mobile Banking',
    desc: 'Product Design: App, Website, and Branding',
    cover: coverWestpac,
    meta: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Scope', value: 'App, Website, Branding' },
      { label: 'Client', value: 'Westpac' },
    ],
    overview:
      'Rethinking everyday banking — a refreshed mobile experience spanning app, web, and brand.',
    sections: [],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
