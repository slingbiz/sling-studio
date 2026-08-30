const {initialUrl, isPublicAuthPath, hasStudioSession} = require('./AppConst');

describe('signed-in landing', () => {
  test('sends a signed-in person to Create', () => {
    expect(initialUrl).toBe('/create');
  });

  test('treats / and /signin as auth screens', () => {
    expect(isPublicAuthPath('/')).toBe(true);
    expect(isPublicAuthPath('/signin')).toBe(true);
    expect(isPublicAuthPath('/signin/')).toBe(true);
    expect(isPublicAuthPath('/signup')).toBe(true);
    expect(isPublicAuthPath('/create')).toBe(false);
    expect(isPublicAuthPath('/pages')).toBe(false);
  });

  test('hasStudioSession is false without a token', () => {
    expect(hasStudioSession()).toBe(false);
  });
});

