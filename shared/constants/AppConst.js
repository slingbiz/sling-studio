export const authRole = {
  admin: ['admin'],
  user: ['user', 'admin'],
};

export const defaultUser = {
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: 'user',
  photoURL: 'https://via.placeholder.com/150',
};
// export const initialUrl = '/account-setup'; // this url will open after login
export const initialUrl = '/create'; // signed-in home

export const isPublicAuthPath = (pathname) => {
  const p = String(pathname || '').replace(/\/$/, '') || '/';
  return p === '/' || p === '/signin' || p === '/signup';
};

export const hasStudioSession = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  return Boolean(token && token !== 'undefined' && token !== 'null');
};
export const emailVerificationUrl = '/pages/'; // this url will open after login
export const signUpUrl = '/signup/'; // this url will open after login
export const companyRegistrationUrl = '/account-setup/'; // this url will open after login
