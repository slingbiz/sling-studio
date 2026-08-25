const STORAGE_KEY = 'sling-create-attempts';
const MAX_ATTEMPTS = 8;

function compactWidget(widget) {
  if (!widget) return widget;
  return {
    _id: widget._id || widget.id,
    id: widget.id,
    key: widget.key,
    name: widget.name,
    status: widget.status,
    type: widget.type,
    code: widget.code,
    dependencies: widget.dependencies,
    props: widget.props,
  };
}

function compactSection(section) {
  if (!section) return section;
  return {
    id: section.id,
    label: section.label,
    name: section.name,
    key: section.key,
    code: section.code,
    dependencies: section.dependencies,
    props: section.props,
  };
}

export function compactCreateAttempt(attempt) {
  if (!attempt) return attempt;
  const widgets = (attempt.widgets || []).map(compactWidget);
  return {
    id: attempt.id || attempt.pageKey,
    pageKey: attempt.pageKey,
    path: attempt.path,
    title: attempt.title,
    prompt: attempt.prompt,
    published: attempt.published,
    at: attempt.at,
    page: attempt.page || null,
    widgets,
    sections:
      attempt.sections?.length > 0
        ? attempt.sections.map(compactSection)
        : widgets.map((widget) => ({
            id: widget._id || widget.key,
            label: widget.name,
            name: widget.name,
            key: widget.key,
            code: widget.code,
            dependencies: widget.dependencies,
            props: widget.props,
          })),
  };
}

function stripCodes(attempt) {
  return {
    ...attempt,
    widgets: (attempt.widgets || []).map(({code, dependencies, ...rest}) => rest),
    sections: (attempt.sections || []).map(({code, dependencies, ...rest}) => rest),
  };
}

export function loadCreateAttempts() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch (err) {
    return [];
  }
}

export function findCreateAttempt(id) {
  if (!id) return null;
  return (
    loadCreateAttempts().find((item) => item.id === id || item.pageKey === id) ||
    null
  );
}

export function saveCreateAttempt(attempt) {
  if (typeof window === 'undefined' || !attempt) return loadCreateAttempts();
  let compact = compactCreateAttempt(attempt);
  const rest = loadCreateAttempts().filter(
    (item) => item.id !== compact.id && item.pageKey !== compact.pageKey,
  );
  const write = (record) => {
    const next = [record, ...rest].slice(0, MAX_ATTEMPTS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };
  try {
    return write(compact);
  } catch (err) {
    try {
      return write(stripCodes(compact));
    } catch (quota) {
      return loadCreateAttempts();
    }
  }
}
