const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'Widgets.js'), 'utf8');

describe('getWidgets list payload', () => {
  const getFn = src.slice(
    src.indexOf('export const getWidgets'),
    src.indexOf('export const deleteWidget'),
  );
  const deleteFn = src.slice(
    src.indexOf('export const deleteWidget'),
    src.indexOf('export const generateWidget'),
  );

  test('dispatches widgets, totalCount, and append', () => {
    expect(getFn).toMatch(/Array\.isArray\(raw\) \? raw : raw\?\.widgets/);
    expect(getFn).toMatch(/totalCount/);
    expect(getFn).toMatch(/append:\s*Boolean/);
  });

  test('does not fire the overlay loader on load-more', () => {
    expect(getFn).toMatch(/if\s*\(!append && !quiet\)[\s\S]{0,80}FETCH_START/);
  });

  test('refetches the first page of 8 after delete', () => {
    expect(deleteFn).toMatch(/page:\s*0/);
    expect(deleteFn).toMatch(/size:\s*8/);
    expect(deleteFn).not.toMatch(/size:\s*1000/);
  });
});
