const actorMeta = (event) => (event && event.metadata) || {};

export const whoName = (event) =>
  (event && event.actorName) || actorMeta(event).actorName || '';

export const whoEmail = (event) =>
  (event && event.actorEmail) || actorMeta(event).actorEmail || '';

export const whoLabel = (event) =>
  whoName(event) || whoEmail(event) || 'Someone in this workspace';
