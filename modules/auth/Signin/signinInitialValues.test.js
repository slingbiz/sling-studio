const {
  HOSTED_DEMO_EMAIL,
  getHostedDemoValues,
  getSigninInitialValues,
  isLocalStudioApi,
} = require('./signinInitialValues');

describe('login starts empty', () => {
  test('localhost API gets empty fields', () => {
    expect(isLocalStudioApi('http://localhost:10001')).toBe(true);
    expect(getSigninInitialValues('http://localhost:10001')).toEqual({
      email: '',
      password: '',
    });
  });

  test('hosted API also starts empty; demo is an explicit action', () => {
    expect(isLocalStudioApi('https://api.sling.biz')).toBe(false);
    expect(getSigninInitialValues('https://api.sling.biz')).toEqual({
      email: '',
      password: '',
    });
    expect(getHostedDemoValues()).toEqual({
      email: HOSTED_DEMO_EMAIL,
      password: HOSTED_DEMO_EMAIL,
    });
  });
});
