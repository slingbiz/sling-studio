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
export const initialUrl = '/pages/'; // this url will open after login
export const emailVerificationUrl = '/pages/'; // this url will open after login
export const signUpUrl = '/signup/'; // this url will open after login
export const companyRegistrationUrl = '/account-setup/'; // this url will open after login
