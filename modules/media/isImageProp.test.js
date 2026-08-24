const {isImageProp} = require('./isImageProp');

describe('isImageProp', () => {
  test('treats Image dataType as an image prop', () => {
    expect(isImageProp({name: 'title', dataType: 'image'})).toBe(true);
  });

  test('treats media type as an image prop', () => {
    expect(isImageProp({name: 'hero', type: 'media'})).toBe(true);
  });

  test('matches image-like names case-insensitively', () => {
    expect(isImageProp({name: 'Logo'})).toBe(true);
    expect(isImageProp({name: 'thumbnailUrl'})).toBe(true);
    expect(isImageProp({name: 'banner'})).toBe(true);
    expect(isImageProp({name: 'avatar'})).toBe(true);
  });

  test('does not treat a normal string prop as an image', () => {
    expect(
      isImageProp({name: 'title', dataType: 'string', type: 'static'}),
    ).toBe(false);
  });
});
