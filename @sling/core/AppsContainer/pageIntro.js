export const pagesLanding = {
  title: 'Page templates',
  description: 'A template is the layout. Routes pick which one a URL uses.',
};

export const pagesSectionCopy = {
  layout:
    'Arrange widgets on this template. The live shop changes when you publish.',
  preview: 'Open this template on a real storefront URL.',
  basic: 'Name and details for this template.',
};

export const routesCopy = {
  title: 'Routes',
  description: 'A route is a URL. Pick the template shoppers see at that path.',
};

export const themeCopy = {
  title: 'Theme',
  description:
    'Brand colors for the storefront. Studio chrome stays Sling orange.',
};

export const settingsCopy = {
  'company-details': {
    title: 'Company',
    description: 'This workspace’s name, store URL, and company details.',
  },
  'keys-usage': {
    title: 'Keys & usage',
    description: 'API key and client id for this workspace. Copy them into your frontend.',
  },
  members: {
    title: 'Members',
    description: 'Who can work in this workspace, and as what role.',
  },
  audit: {
    title: 'Audit',
    description: 'A log of what changed. Read-only.',
  },
};

export const widgetsCopy = {
  'widgets-integration': {
    title: 'Widgets',
    description: 'Building blocks for templates. Edit one, then pages can use it.',
  },
  'ai-generate': {
    title: 'AI Generate',
    description: 'Describe a widget. AI writes the JSX. Props stay yours.',
  },
  'review-queue': {
    title: 'Review Queue',
    description: 'Widgets waiting for a publisher or admin to approve.',
  },
};

export const mediaCopy = {
  gallery: {
    title: 'Gallery',
    description: 'Images and files you pick into widgets and pages.',
  },
};

export const settingIntro = (pageKey) =>
  settingsCopy[pageKey] || settingsCopy['company-details'];

export const widgetIntro = (pageKey) =>
  widgetsCopy[pageKey] || widgetsCopy['widgets-integration'];

export const pagesIntro = (all) => {
  if (!all) {
    return pagesLanding;
  }
  const section = all[1] || all[0];
  return {
    description:
      pagesSectionCopy[section] || pagesLanding.description,
  };
};
