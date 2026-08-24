const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const detailSrc = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');

describe('Settings → Company Details', () => {
  test('SettingsDetail renders the Company Details page', () => {
    expect(detailSrc).toMatch(/'company-details':\s*CompanyDetails/);
  });

  test('Save is the primary action on the right in Sling orange', () => {
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/justifyContent:\s*['"]space-between['"]/);
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(src).toMatch(/>\s*Save\s*</);
    expect(src).toMatch(/updateCompanyInfo/);
    expect(src).toMatch(/updateStoreInfo/);
  });

  test('uses Sling type scale, not Linear 12px', () => {
    expect(src).toMatch(/primaryBtn:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/sectionTitle:[\s\S]*fontSize:\s*16/);
    expect(src).toMatch(/fieldLabel:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/Open Sans/);
    expect(src).not.toMatch(/fontSize:\s*12/);
    expect(src).not.toMatch(/fontSize:\s*13/);
  });

  test('fields use cream fill with labels above', () => {
    expect(src).toMatch(/SLING_CREAM|#fff8f0/);
    expect(src).toMatch(/background:\s*SLING_CREAM/);
    expect(src).toMatch(/fieldLabel/);
    expect(src).toMatch(/htmlFor=/);
  });

  test('fields fill the page in two columns, not a narrow left stack', () => {
    expect(src).toMatch(/fields:[\s\S]*gridTemplateColumns:\s*['"]1fr 1fr['"]/);
    expect(src).toMatch(/fieldWide/);
    expect(src).not.toMatch(/maxWidth:\s*560/);
  });

  test('keeps site and company fields and save actions', () => {
    expect(src).toMatch(/name=['"]storeName['"]/);
    expect(src).toMatch(/name=['"]clientUrl['"]/);
    expect(src).toMatch(/name=['"]storeDescription['"]/);
    expect(src).toMatch(/name=['"]wlIp['"]/);
    expect(src).toMatch(/name=['"]orgName['"]/);
    expect(src).toMatch(/name=['"]companyName['"]/);
    expect(src).toMatch(/name=['"]email['"]/);
    expect(src).toMatch(/name=['"]phoneNumber['"]/);
    expect(src).toMatch(/name=['"]address1['"]/);
    expect(src).toMatch(/name=['"]address2['"]/);
    expect(src).toMatch(/name=['"]city['"]/);
    expect(src).toMatch(/name=['"]zipCode['"]/);
    expect(src).toMatch(/name=['"]region['"]/);
    expect(src).toMatch(/name=['"]country['"]/);
    expect(src).toMatch(/Formik/);
  });
});
