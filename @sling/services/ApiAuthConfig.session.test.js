jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    create: jest.fn(() => ({
      interceptors: {
        request: {use: jest.fn()},
        response: {use: jest.fn()},
      },
    })),
    defaults: {headers: {common: {}}},
  },
}));

const loadRefresh = () => {
  jest.resetModules();
  const axios = require('axios').default;
  return {
    refreshAccessToken: require('./ApiAuthConfig').refreshAccessToken,
    mockPost: axios.post,
  };
};

describe('ApiAuthConfig session refresh', () => {
  beforeEach(() => {
    localStorage.clear();
    delete window.location;
    window.location = {replace: jest.fn(), href: ''};
  });

  test('reads access.token and refresh.token and persists token for withData', async () => {
    const {refreshAccessToken, mockPost} = loadRefresh();
    mockPost.mockReset();
    mockPost.mockResolvedValue({
      data: {
        access: {token: 'new-access'},
        refresh: {token: 'new-refresh'},
      },
    });
    localStorage.setItem('refreshToken', 'old-refresh');

    const token = await refreshAccessToken();

    expect(token).toBe('new-access');
    expect(localStorage.getItem('accessToken')).toBe('new-access');
    expect(localStorage.getItem('token')).toBe('new-access');
    expect(localStorage.getItem('refreshToken')).toBe('new-refresh');
    const [, , config] = mockPost.mock.calls[0];
    expect(config?.headers?.Authorization).toBeUndefined();
  });

  test('single-flights concurrent refresh calls', async () => {
    const {refreshAccessToken, mockPost} = loadRefresh();
    mockPost.mockReset();
    let resolvePost;
    mockPost.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePost = resolve;
        }),
    );
    localStorage.setItem('refreshToken', 'old-refresh');

    const first = refreshAccessToken();
    const second = refreshAccessToken();

    expect(mockPost).toHaveBeenCalledTimes(1);
    resolvePost({
      data: {
        access: {token: 'new-access'},
        refresh: {token: 'new-refresh'},
      },
    });
    await expect(Promise.all([first, second])).resolves.toEqual([
      'new-access',
      'new-access',
    ]);
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  test('clears user and replace()s /signin once on failure', async () => {
    const {refreshAccessToken, mockPost} = loadRefresh();
    mockPost.mockReset();
    mockPost.mockRejectedValue(new Error('refresh failed'));
    localStorage.setItem('user', JSON.stringify({id: 'u1'}));
    localStorage.setItem('accessToken', 'expired');
    localStorage.setItem('token', 'expired');
    localStorage.setItem('refreshToken', 'stale');

    await expect(refreshAccessToken()).rejects.toMatchObject({
      __sessionExpired: true,
    });
    await expect(refreshAccessToken()).rejects.toMatchObject({
      __sessionExpired: true,
    });

    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(window.location.replace).toHaveBeenCalledWith('/signin');
    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.href).not.toBe('/signin');
  });
});

const fs = require('fs');
const path = require('path');

describe('ApiAuthConfig session source', () => {
  const src = fs.readFileSync(path.join(__dirname, 'ApiAuthConfig.js'), 'utf8');

  test('parses nested access.token and skips refresh-token interceptor recursion', () => {
    expect(src).toMatch(/response\.data(?:\?)?\.access(?:\?)?\.token/);
    expect(src).toMatch(/response\.data(?:\?)?\.refresh(?:\?)?\.token/);
    expect(src).toMatch(/\/auth\/refresh-tokens/);
    expect(src).toMatch(/location\.replace\(\s*['"]\/signin['"]\s*\)/);
    expect(src).toMatch(/removeItem\(\s*['"]user['"]\s*\)/);
    expect(src).toMatch(/__sessionExpired/);
  });
});
