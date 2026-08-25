const {whoLabel} = require('./whoLabel');

describe('audit whoLabel', () => {
  test('prefers name then email, Someone only when there is no actor', () => {
    expect(whoLabel({actorName: 'Ankur Pata', actorEmail: 'ankur@sling.biz'})).toBe('Ankur Pata');
    expect(
      whoLabel({
        actorEmail: 'other@sling.biz',
        metadata: {actorName: 'Ankur Pata', actorEmail: 'ankur@sling.biz'},
      })
    ).toBe('Ankur Pata');
    expect(whoLabel({metadata: {actorName: 'Ankur Pata'}})).toBe('Ankur Pata');
    expect(whoLabel({actorEmail: 'ankur@sling.biz'})).toBe('ankur@sling.biz');
    expect(whoLabel({metadata: {actorEmail: 'ankur@sling.biz'}})).toBe('ankur@sling.biz');
    expect(whoLabel({})).toBe('Someone in this workspace');
    expect(whoLabel({metadata: {}})).toBe('Someone in this workspace');
  });
});
