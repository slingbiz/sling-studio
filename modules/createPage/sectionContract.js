export const createCopy = {
  title: 'Create',
  description:
    'Describe a page. We split it into widgets. Process saves drafts, a template, and a route — nothing goes live until you publish.',
};

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

export function buildLayoutRoot(savedWidgets) {
  return {
    header: {},
    body: {
      rows: savedWidgets.map((widget) => ({
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
    footer: {},
  };
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
