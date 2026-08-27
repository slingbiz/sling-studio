export function createdAtFromRoute(route = {}) {
  if (route.createdAt) {
    const fromField = new Date(route.createdAt);
    if (!Number.isNaN(fromField.getTime())) {
      return fromField;
    }
  }
  const id = String(route._id || route.id || '');
  if (/^[a-fA-F0-9]{24}$/.test(id)) {
    return new Date(parseInt(id.slice(0, 8), 16) * 1000);
  }
  return null;
}

export function formatCreated(route) {
  const date = createdAtFromRoute(route);
  if (!date) {
    return '—';
  }
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
