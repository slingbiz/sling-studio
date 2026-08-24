const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('WidgetsDetail routes', () => {
  test('does not keep Market Place as a Coming Soon destination', () => {
    expect(src).not.toMatch(/MarketPlace/);
    expect(src).not.toMatch(/Coming Soon/);
    expect(src).toMatch(/'market-place':\s*'widgets-integration'/);
  });
});
