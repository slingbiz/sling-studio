export const HOSTED_DEMO_EMAIL = 'demo@slingcms.com';

export function isLocalStudioApi(url = process.env.NEXT_PUBLIC_SERVICE_URL) {
  return /localhost|127\.0\.0\.1/.test(String(url || ''));
}

export function getSigninInitialValues(url) {
  if (isLocalStudioApi(url)) {
    return {email: '', password: ''};
  }
  return {email: HOSTED_DEMO_EMAIL, password: HOSTED_DEMO_EMAIL};
}
