const {checkCodePolicy} = require('./codePolicy');

describe('codePolicy', () => {
  test('allows a self-contained MUI widget', () => {
    const result = checkCodePolicy('const PreviewComponent = () => <Button>Save</Button>;', {
      '@material-ui/core': ['Button'],
    });
    expect(result.allowed).toBe(true);
    expect(result.violations).toEqual([]);
  });

  test('rejects fetch( and eval(', () => {
    expect(checkCodePolicy('fetch("https://evil.example")', {}).allowed).toBe(false);
    expect(checkCodePolicy('eval("1+1")', {}).allowed).toBe(false);
    expect(checkCodePolicy('const PreviewComponent = () => { fetch("/x"); };', {}).violations.length).toBeGreaterThan(0);
  });

  test('does not flag style keys such as top', () => {
    const result = checkCodePolicy('const styles = {top: 0, parent: "row"};', {});
    expect(result.allowed).toBe(true);
  });
});
