const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'aiGenerate.js'), 'utf8');
const stream = fs.readFileSync(
  path.join(__dirname, '../modules/createPage/streamPageGenerate.js'),
  'utf8',
);

describe('Studio generate client', () => {
  test('Create talks to this CMS API with a Studio login, not api.baloon.dev', () => {
    expect(src).toMatch(/\/v1\/ai/);
    expect(src).toMatch(/Authorization/);
    expect(src).not.toMatch(/baloon/);
    expect(src).not.toMatch(/NEXT_PUBLIC_AI_SERVICE_URL/);
    expect(stream).toMatch(/generateHeaders/);
    expect(stream).toMatch(/\/page\/generate\/stream/);
  });
});
