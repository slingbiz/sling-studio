export const createCopy = {
  title: 'Create',
  description:
    'Describe a page. We break it into widgets you govern, give props, and publish on their own. Each one stays in Sling, with the same restrictions as the rest of the CMS.',
};

export function ensureWidgetLabel(label) {
  const raw = String(label || 'Section').trim() || 'Section';
  if (/\bwidget$/i.test(raw)) return raw;
  return `${raw} widget`;
}

export function displayWidgetName(label) {
  const raw = String(label || 'Section').trim() || 'Section';
  return raw.replace(/\s+widget$/i, '').trim() || 'Section';
}

export function propsToPayload(props = []) {
  const ret = {};
  (Array.isArray(props) ? props : []).forEach((item) => {
    const name = item.name || item.key;
    if (!name) return;
    const defaultVal = item.default ?? item.value ?? '';
    ret[name] = {
      type: item.propType || item.type || 'string',
      value: defaultVal,
      default: defaultVal,
    };
  });
  return ret;
}

export function normalizeLayoutRoot(root) {
  const asSection = (section) => ({
    ...(section && typeof section === 'object' ? section : {}),
    rows: Array.isArray(section?.rows) ? section.rows : [],
  });
  return {
    header: asSection(root?.header),
    body: asSection(root?.body),
    footer: asSection(root?.footer),
  };
}

export function buildLayoutRoot(savedWidgets) {
  return normalizeLayoutRoot({
    header: {rows: []},
    body: {
      rows: (savedWidgets || []).map((widget) => ({
        cells: [
          {
            key: widget.key,
            type: widget.type || 'widget',
            payload: {
              muiWidths: {sm: 12, md: 12, lg: 12},
              props: propsToPayload(widget.props),
            },
          },
        ],
      })),
    },
    footer: {rows: []},
  });
}

export function uniquePageKey(base) {
  const slug =
    String(base || 'page')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'page';
  return `${slug}-${Date.now().toString(36)}`;
}

export function uniqueWidgetKey(base, used) {
  let key = String(base || 'Widget').replace(/[^a-zA-Z0-9]/g, '') || 'Widget';
  if (!/^[A-Z]/.test(key)) {
    key = key.charAt(0).toUpperCase() + key.slice(1);
  }
  let next = key;
  let n = 2;
  while (used.has(next)) {
    next = `${key}${n}`;
    n += 1;
  }
  used.add(next);
  return next;
}
