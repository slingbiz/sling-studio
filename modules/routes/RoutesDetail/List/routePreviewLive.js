export function collectLayoutWidgetKeys(root) {
  const keys = [];
  const walkRows = (rows) => {
    (rows || []).forEach((row) => {
      (row?.cells || []).forEach((cell) => {
        if (cell?.key) {
          keys.push(cell.key);
        }
        if (cell?.rows) {
          walkRows(cell.rows);
        }
      });
    });
  };
  Object.values(root || {}).forEach((section) => walkRows(section?.rows));
  return [...new Set(keys)];
}

export function unpublishedTemplateKeys(keys, widgets) {
  const byKey = {};
  (Array.isArray(widgets) ? widgets : []).forEach((widget) => {
    if (widget?.key) {
      byKey[widget.key] = widget;
    }
  });
  return (keys || []).filter((key) => {
    const widget = byKey[key];
    if (!widget) {
      return false;
    }
    const status = widget.status;
    return Boolean(status) && status !== 'published';
  });
}

export function isRoutePreviewLive(route, root, widgets, attempts = []) {
  const keys = collectLayoutWidgetKeys(root);
  if (unpublishedTemplateKeys(keys, widgets).length) {
    return false;
  }
  const path = route?.url_string || '';
  const attempt = (attempts || []).find(
    (item) => item.path === path || item.pageKey === route?.page_template,
  );
  if (attempt && !attempt.published) {
    return false;
  }
  return true;
}
