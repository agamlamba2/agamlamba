// Detail-page / reel covers (uploaded to src/assets/project-covers/).
import coverTaste from '../assets/project-covers/img_project_cover_taste.webp';
import coverUta from '../assets/project-covers/img_project_cover_uta.webp';
import coverSimplicity from '../assets/project-covers/img_project_cover_simplicity.webp';
import coverHomein from '../assets/project-covers/img_project_cover_homein.webp';
import coverWestpac from '../assets/project-covers/img_project_cover_westpac.webp';
import coverCbaHbh from '../assets/project-covers/img_project_cover_cba_hbh.webp';
import coverDehancer from '../assets/project-covers/img_project_cover_dehancer.webp';
import coverDla from '../assets/project-covers/img_project_cover_dla.webp';
import coverJxt from '../assets/project-covers/img_project_cover_jxt.webp';
import coverKincircle from '../assets/project-covers/img_project_cover_kincircle.webp';
import coverMybeepr from '../assets/project-covers/img_project_cover_mybeepr.webp';
import coverQuesteMoney from '../assets/project-covers/img_project_cover_questemoney.webp';
import coverRewards from '../assets/project-covers/img_project_cover_rewards.webp';
import coverTravelAssist from '../assets/project-covers/img_project_cover_travel_assist.webp';
import coverWorksmart from '../assets/project-covers/img_project_cover_worksmart.webp';
import coverYudu from '../assets/project-covers/img_project_cover_yudu.webp';

// Homepage "Featured work" covers (separate art from the detail-page covers).
import featuredTaste from '../assets/images/img_featured_project_cover_taste.webp';
import featuredUta from '../assets/images/img_featured_project_cover_uta.webp';
import featuredSimplicity from '../assets/images/img_featured_project_cover_simplicity.webp';
import featuredHomein from '../assets/images/img_featured_project_cover_homein.webp';
import featuredWestpac from '../assets/images/img_featured_project_cover_westpac.webp';

// Single source of truth for the reel (/project), the project detail pages
// (/:slug) and the homepage "Featured work" section (featured: true only).
// Order below matches the app order on agamlamba.com.
//
// To flesh out a case study, add blocks to `sections`:
//   { type: 'text', heading?: '…', body: '…' }
//   { type: 'image', src: importedImage, caption?: '…', fullBleed?: true }
//   { type: 'duo', src: [imgA, imgB] }   // two images side by side
export const projects = [
  {
    slug: 'dehancer',
    title: 'Dehancer',
    desc: 'Product Design',
    cover: coverDehancer,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'taste',
    title: 'Taste.com.au',
    desc: 'Product Design: Web Redesign & Research',
    cover: coverTaste,
    featured: true,
    featuredCover: featuredTaste,
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
    featured: true,
    featuredCover: featuredUta,
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
    featured: true,
    featuredCover: featuredSimplicity,
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
    featured: true,
    featuredCover: featuredHomein,
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
    featured: true,
    featuredCover: featuredWestpac,
    meta: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Scope', value: 'App, Website, Branding' },
      { label: 'Client', value: 'Westpac' },
    ],
    overview:
      'Rethinking everyday banking — a refreshed mobile experience spanning app, web, and brand.',
    sections: [],
  },
  {
    slug: 'cba-hbh',
    title: 'CBA HBH',
    desc: 'Product Design',
    cover: coverCbaHbh,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'kincircle',
    title: 'Kincircle',
    desc: 'Platform Design',
    cover: coverKincircle,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'questemoney',
    title: 'QuesteMoney',
    desc: 'Product Design',
    cover: coverQuesteMoney,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'travel-assist',
    title: 'Travel Assist',
    desc: 'Product Design',
    cover: coverTravelAssist,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'dla',
    title: 'DLA',
    desc: 'Product Design',
    cover: coverDla,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'worksmart',
    title: 'Worksmart',
    desc: 'Product Design',
    cover: coverWorksmart,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'mybeepr',
    title: 'myBeepr',
    desc: 'Product Design',
    cover: coverMybeepr,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'westpac-altitude-rewards',
    title: 'Westpac Altitude Rewards',
    desc: 'Product Design',
    cover: coverRewards,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'jxt',
    title: 'JXT',
    desc: 'Product Design',
    cover: coverJxt,
    meta: [],
    overview: '',
    sections: [],
  },
  {
    slug: 'yudu',
    title: 'Yudu',
    desc: 'Product Design',
    cover: coverYudu,
    meta: [],
    overview: '',
    sections: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug) => projects.find((p) => p.slug === slug);
