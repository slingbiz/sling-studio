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
