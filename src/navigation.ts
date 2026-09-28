import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'START', href: getPermalink('/start') },
    { text: 'BUILD', href: getPermalink('/build') },
    { text: 'SERVICES', href: getPermalink('/services') },
    { text: 'LEARN', href: getPermalink('/learn') },
    { text: 'TOOLS', href: getPermalink('/tools') },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Explore',
      links: [
        { text: 'Start', href: getPermalink('/start') },
        { text: 'Build', href: getPermalink('/build') },
        { text: 'Services', href: getPermalink('/services') },
        { text: 'Learn', href: getPermalink('/learn') },
        { text: 'Tools', href: getPermalink('/tools') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `Powered by <a class="font-semibold hover:underline" href="/">Vebpartner</a>.`,
};
