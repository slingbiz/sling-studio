const {keysFromPattern, buildSample, samplesFromRoute} = require('./routePattern');

describe('route URL helpers', () => {
  test('reads dynamic keys from angle brackets', () => {
    expect(keysFromPattern('/<city>/products')).toEqual(['city']);
    expect(keysFromPattern('/blog/<slug>/in/<city>')).toEqual(['slug', 'city']);
    expect(keysFromPattern('/about')).toEqual([]);
  });

  test('fills a sample URL from the pattern', () => {
    expect(buildSample('/<city>/products', {city: 'dubai'})).toBe(
      '/dubai/products',
    );
  });

  test('reads sample values back from a saved route', () => {
    expect(
      samplesFromRoute({
        url_string: '/<city>/products',
        sample_string: '/dubai/products',
      }),
    ).toEqual({city: 'dubai'});
  });
});
