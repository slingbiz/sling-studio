const IMAGE_NAME_RE =
  /image|img|src|logo|banner|thumbnail|photo|icon|hero|avatar/i;

export function isImageProp({name, dataType, type} = {}) {
  if (String(dataType || '').toLowerCase() === 'image') return true;
  if (String(type || '').toLowerCase() === 'media') return true;
  if (name && IMAGE_NAME_RE.test(String(name))) return true;
  return false;
}

export default isImageProp;
