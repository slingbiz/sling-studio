const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const moduleSrc = fs.readFileSync(path.join(__dirname, '../../index.js'), 'utf8');
const sidebarSrc = fs.readFileSync(
  path.join(__dirname, '../../RoutesSideBar/index.js'),
  'utf8',
);

describe('Routes list', () => {
  test('Add route is the primary action on the right', () => {
    expect(src).toMatch(/Add route/);
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/justifyContent:\s*['"]space-between['"]/);
    expect(src).toMatch(/primaryBtn:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/#ff9800/);
    expect(src).not.toMatch(/palette\.primary\.main/);
    expect(src).not.toMatch(/orange\[500\]/);
    expect(src).not.toMatch(/Add New Route/);
  });

  test('search sits on the left and Edit, Preview, Layout, Delete stay visible', () => {
    expect(src).toMatch(/placeholder='Search routes'/);
    expect(src).toMatch(/toolbarLeft/);
    expect(src).toMatch(/aria-label='Preview'/);
    expect(src).toMatch(/aria-label='Layout'/);
    expect(src).toMatch(/aria-label='Edit'/);
    expect(src).toMatch(/aria-label='Delete'/);
    expect(src).toMatch(/boxShadow:\s*'none !important'/);
    expect(src).toMatch(/variant='text'/);
    expect(moduleSrc).not.toMatch(/AppsHeader/);
    expect(moduleSrc).toMatch(/description=\{routesCopy\.description\}/);
  });

  test('add and edit pick a page template in one Members-style modal', () => {
    expect(src).toMatch(/htmlFor='routeName'/);
    expect(src).toMatch(/htmlFor='routePattern'/);
    expect(src).toMatch(/htmlFor='pageTemplate'/);
    expect(src).toMatch(/fields:[\s\S]*gridTemplateColumns:\s*['"]1fr 1fr['"]/);
    expect(src).toMatch(/#fff8f0/);
    expect(src).toMatch(/>\s*Save\s*</);
    expect(src).toMatch(/>\s*Cancel\s*</);
    expect(src).not.toMatch(/from '\.\/NewRoute'/);
    expect(src).not.toMatch(/from '\.\/Regex'/);
    expect(src).not.toMatch(/label='Regex'/);
  });

  test('shows one orange loader and an empty state, not a task table while loading', () => {
    expect(src).toMatch(/!loaded/);
    expect(src).toMatch(/CircularProgress/);
    expect(src).toMatch(/No routes yet/);
    expect(src).toMatch(/No routes match this search/);
    expect(src).toMatch(/Routes \{visible\.length\}/);
    expect(src).not.toMatch(/TaskListItem/);
    expect(src).not.toMatch(/CheckedTasksActions/);
  });

  test('layout opens the page template, not a nested editor on this screen', () => {
    expect(src).toMatch(/\/pages\/\$\{route\.page_template\}\/layout/);
    expect(src).not.toMatch(/from '.*EditLayout'/);
  });
});

describe('Routes module', () => {
  test('has no Guide and old URLs land on /routes', () => {
    expect(moduleSrc).toMatch(/fullView/);
    expect(moduleSrc).toMatch(/router\.replace\('\/routes'\)/);
    expect(moduleSrc).toMatch(/key === 'guide'/);
    expect(moduleSrc).toMatch(/key === 'routes-list'/);
    expect(sidebarSrc).toMatch(/export const folderList = \[\]/);
    expect(sidebarSrc).not.toMatch(/Guide/);
    expect(sidebarSrc).not.toMatch(/All Page Routes/);
  });
});
