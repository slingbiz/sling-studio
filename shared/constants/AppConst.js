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
export const initialUrl = '/dashboards/health-care'; // this url will open after login
