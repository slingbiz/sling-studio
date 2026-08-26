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

const FULL_WIDTH = {sm: 12, md: 12, lg: 12};
const HALF_WIDTH = {sm: 12, md: 6, lg: 6};
const THIRD_WIDTH = {sm: 12, md: 6, lg: 4};

function cellFromWidget(widget, muiWidths) {
  return {
    key: widget.key,
    type: widget.type || 'widget',
    payload: {
      muiWidths,
      props: propsToPayload(widget.props),
    },
  };
}

export function layoutRowsFromWidgets(savedWidgets) {
  const list = savedWidgets || [];
  if (list.length < 3) {
    return list.map((widget) => ({
      cells: [cellFromWidget(widget, FULL_WIDTH)],
    }));
  }

  const rows = [
    {cells: [cellFromWidget(list[0], FULL_WIDTH)]},
  ];
  const middle = list.slice(1, -1);
  let i = 0;
  while (i < middle.length) {
    const left = middle.length - i;
    if (left === 1) {
      rows.push({cells: [cellFromWidget(middle[i], FULL_WIDTH)]});
      i += 1;
    } else if (left === 3 || (left >= 5 && left % 2 === 1)) {
      rows.push({
        cells: middle
          .slice(i, i + 3)
          .map((widget) => cellFromWidget(widget, THIRD_WIDTH)),
      });
      i += 3;
    } else {
      rows.push({
        cells: [
          cellFromWidget(middle[i], HALF_WIDTH),
          cellFromWidget(middle[i + 1], HALF_WIDTH),
        ],
      });
      i += 2;
    }
  }
  rows.push({cells: [cellFromWidget(list[list.length - 1], FULL_WIDTH)]});
  return rows;
}

export function buildLayoutRoot(savedWidgets) {
  return normalizeLayoutRoot({
    header: {rows: []},
    body: {rows: layoutRowsFromWidgets(savedWidgets)},
    footer: {rows: []},
  });
}

export function uniquePageKey(base) {
  const slug = slugFromTitle(base);
  return `${slug}-${Date.now().toString(36)}`;
}

export function slugFromTitle(value) {
  return (
    String(value || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48)
      .replace(/-$/, '') || 'page'
  );
}

export function uniqueRoutePath({title, key, preferred, taken = []} = {}) {
  const takenSet = new Set(
    (taken || []).map((item) => {
      const raw = String(item || '').trim();
      if (!raw || raw === '/') return '/';
      return `/${raw.replace(/^\/+|\/+$/g, '')}`;
    }),
  );
  const preferredRaw = String(preferred || '').trim();
  const preferredPath =
    preferredRaw && preferredRaw !== '/'
      ? `/${preferredRaw
          .replace(/^\/+|\/+$/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9/-]+/g, '-')
          .replace(/\/+/g, '/')}`
      : '';
  const slug = slugFromTitle(title || key || preferredPath.replace(/^\//, ''));
  let base = preferredPath || `/${slug}`;
  if (!base || base === '/') base = `/${slug}`;
  if (base === '/') base = '/page';
  if (!takenSet.has(base)) return base;
  let n = 2;
  while (takenSet.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
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
