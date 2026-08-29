const {
  HOSTED_DEMO_EMAIL,
  getSigninInitialValues,
  isLocalStudioApi,
} = require('./signinInitialValues');

describe('self-host login does not prefill the hosted demo account', () => {
  test('localhost API gets empty fields', () => {
    expect(isLocalStudioApi('http://localhost:10001')).toBe(true);
    expect(getSigninInitialValues('http://localhost:10001')).toEqual({
      email: '',
      password: '',
    });
  });

  test('hosted API keeps the demo account', () => {
    expect(isLocalStudioApi('https://api.sling.biz')).toBe(false);
    expect(getSigninInitialValues('https://api.sling.biz')).toEqual({
      email: HOSTED_DEMO_EMAIL,
      password: HOSTED_DEMO_EMAIL,
    });
  });
});
