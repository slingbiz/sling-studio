const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'Route.js'), 'utf8');
const getFn = src.slice(
  src.indexOf('export const getRoutesList'),
  src.indexOf('export const updateRoute'),
);

describe('getRoutesList', () => {
  test('quiet reads skip the overlay loader and do not post quiet to the API', () => {
    expect(getFn).toMatch(/const \{quiet, \.\.\.apiFilters\}/);
    expect(getFn).toMatch(/if \(!quiet\)/);
    expect(getFn).toMatch(/Api\.post\(`\$\{GET_ROUTES_LIST_API\}`, apiFilters\)/);
  });
});
