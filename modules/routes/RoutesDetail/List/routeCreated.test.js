const {createdAtFromRoute, formatCreated} = require('./routeCreated');

describe('route created date', () => {
  test('uses createdAt when the API sends it', () => {
    const date = createdAtFromRoute({createdAt: '2026-08-27T08:41:00.000Z'});
    expect(date.toISOString()).toBe('2026-08-27T08:41:00.000Z');
  });

  test('falls back to the Mongo id timestamp so old routes still show a date', () => {
    const date = createdAtFromRoute({_id: '68aee0000000000000000001'});
    expect(date.getTime()).toBe(parseInt('68aee000', 16) * 1000);
  });

  test('shows an em dash when there is no date', () => {
    expect(formatCreated({})).toBe('—');
  });
});
