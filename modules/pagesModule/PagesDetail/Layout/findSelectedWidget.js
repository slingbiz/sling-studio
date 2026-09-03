const token = (value) => String(value || '').trim().toLowerCase();

export function findSelectedWidget(widgets, key) {
  if (key == null || key === '') return undefined;
  const needle = token(key);
  if (!needle) return undefined;
  const list = Array.isArray(widgets) ? widgets : [];
  return list.find((widget) => {
    if (!widget) return false;
    return [widget.key, widget.id, widget._id, widget.name].some(
      (field) => token(field) === needle,
    );
  });
}

export function canAddWidgetProp({disabled, selectedKey} = {}) {
  return !disabled && Boolean(selectedKey);
}

export function isPrivateOwnedWidget(widget) {
  if (!widget) return false;
  return token(widget.ownership) === 'private';
}

export function shouldUpdateWidgetSchema(widget) {
  return isPrivateOwnedWidget(widget) && Boolean(widget._id || widget.id);
}

export function applyPropToInstance(cellProps, name, instance) {
  if (!cellProps || !name) return cellProps;
  cellProps[name] = instance;
  return cellProps;
}

export function removeInstanceProp(cellProps, name) {
  if (!cellProps || !name) return cellProps;
  delete cellProps[name];
  return cellProps;
}
