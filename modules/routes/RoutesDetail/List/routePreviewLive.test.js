const {
  collectLayoutWidgetKeys,
  unpublishedTemplateKeys,
  isRoutePreviewLive,
} = require('./routePreviewLive');

describe('route preview live check', () => {
  const root = {
    body: {
      rows: [
        {cells: [{key: 'YtHeader', type: 'widget'}]},
        {cells: [{key: 'YtVideoGrid', type: 'widget'}]},
      ],
    },
  };

  test('collects widget keys from the template layout', () => {
    expect(collectLayoutWidgetKeys(root)).toEqual(['YtHeader', 'YtVideoGrid']);
  });

  test('draft template widgets are unpublished', () => {
    expect(
      unpublishedTemplateKeys(['YtHeader'], [{key: 'YtHeader', status: 'draft'}]),
    ).toEqual(['YtHeader']);
    expect(
      unpublishedTemplateKeys(['YtHeader'], [{key: 'YtHeader', status: 'published'}]),
    ).toEqual([]);
  });

  test('unpublished branch is not treated as a live site preview', () => {
    const route = {url_string: '/video-stream', page_template: 'video-stream'};
    expect(
      isRoutePreviewLive(route, root, [{key: 'YtHeader', status: 'draft'}], []),
    ).toBe(false);
    expect(
      isRoutePreviewLive(
        route,
        root,
        [{key: 'YtHeader', status: 'published'}, {key: 'YtVideoGrid', status: 'published'}],
        [],
      ),
    ).toBe(true);
    expect(
      isRoutePreviewLive(route, root, [], [{path: '/video-stream', published: false}]),
    ).toBe(false);
  });
});
