import {generateSlug} from 'random-word-slugs';

export const buildPreviewUrl = (route, clientUrl) => {
  if (!route || !clientUrl) {
    return '';
  }
  let url = route.sample_string || route.url_string || '';
  url = url.replace(/<.*?>/g, () =>
    generateSlug(1, {
      format: 'lower',
      partsOfSpeech: ['noun'],
    }),
  );
  const slash = url.startsWith('/') || clientUrl.endsWith('/') ? '' : '/';
  return `${clientUrl}${slash}${url}`;
};
