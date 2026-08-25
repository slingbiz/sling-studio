const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'AccountAction.js'), 'utf8');
const getFn = src.slice(
  src.indexOf('export const getCompanyInfo'),
  src.indexOf('export const updateCompanyInfo'),
);

describe('getCompanyInfo', () => {
  test('does not fire the overlay loader while hydrating the store URL', () => {
    expect(getFn).not.toMatch(/FETCH_START/);
    expect(getFn).not.toMatch(/FETCH_SUCCESS/);
    expect(getFn).toMatch(/UPDATE_ACCOUNT/);
  });
});
