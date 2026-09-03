const fs = require('fs');
const path = require('path');
const {
  findSelectedWidget,
  canAddWidgetProp,
  shouldUpdateWidgetSchema,
  applyPropToInstance,
  removeInstanceProp,
} = require('./findSelectedWidget');

const src = fs.readFileSync(path.join(__dirname, 'TemplateProps.js'), 'utf8');
const settings = fs.readFileSync(
  path.join(__dirname, 'LayoutSettings.js'),
  'utf8',
);

describe('findSelectedWidget', () => {
  const widgets = [
    {
      key: 'ListingSearchBar',
      _id: 'pub-1',
      name: 'Listing Search Bar',
      ownership: 'public',
    },
    {id: 'abc', name: 'ProductFilters', ownership: 'private'},
    {_id: 'xyz', key: 'MyWidget', ownership: 'private'},
  ];

  test('matches key, id, name, and _id case-insensitively', () => {
    expect(findSelectedWidget(widgets, 'listingsearchbar')._id).toBe('pub-1');
    expect(findSelectedWidget(widgets, 'abc').name).toBe('ProductFilters');
    expect(findSelectedWidget(widgets, 'listing search bar').key).toBe(
      'ListingSearchBar',
    );
    expect(findSelectedWidget(widgets, 'xyz').key).toBe('MyWidget');
  });

  test('returns undefined when the canvas widget is not in the list', () => {
    expect(findSelectedWidget(widgets, 'Nope')).toBeUndefined();
    expect(findSelectedWidget([], 'ListingSearchBar')).toBeUndefined();
    expect(findSelectedWidget(null, 'ListingSearchBar')).toBeUndefined();
    expect(findSelectedWidget(widgets, '')).toBeUndefined();
  });
});

describe('canAddWidgetProp', () => {
  test('allows Add without a Mongo widget when a canvas cell is selected', () => {
    expect(
      canAddWidgetProp({disabled: false, selectedKey: 'ListingSearchBar'}),
    ).toBe(true);
  });

  test('blocks Add when no cell is selected', () => {
    expect(canAddWidgetProp({disabled: true, selectedKey: ''})).toBe(false);
    expect(canAddWidgetProp({disabled: false, selectedKey: ''})).toBe(false);
    expect(canAddWidgetProp({disabled: true, selectedKey: 'ListingSearchBar'})).toBe(
      false,
    );
  });
});

describe('shouldUpdateWidgetSchema', () => {
  test('private widgets with an id can updateWidget', () => {
    expect(shouldUpdateWidgetSchema({ownership: 'private', _id: '1'})).toBe(true);
    expect(shouldUpdateWidgetSchema({ownership: 'private', id: '1'})).toBe(true);
  });

  test('public and built-in widgets must not updateWidget', () => {
    expect(
      shouldUpdateWidgetSchema({ownership: 'public', _id: '1'}),
    ).toBe(false);
    expect(shouldUpdateWidgetSchema({key: 'ListingSearchBar'})).toBe(false);
    expect(shouldUpdateWidgetSchema(undefined)).toBe(false);
  });
});

describe('instance prop write and delete', () => {
  test('writes and deletes the slot on this instance', () => {
    const cellProps = {viewType: {type: 'static', value: 'grid'}};
    applyPropToInstance(cellProps, 'headline', {
      type: 'static',
      dataType: 'string',
      value: 'Hi',
    });
    expect(cellProps.headline.value).toBe('Hi');
    removeInstanceProp(cellProps, 'headline');
    expect(cellProps.headline).toBeUndefined();
    expect(cellProps.viewType.value).toBe('grid');
  });
});

describe('TemplateProps gallery pick', () => {
  test('no longer tells people to use Image Constants', () => {
    expect(src).not.toMatch(/Image Constants/);
    expect(src).not.toMatch(/Array of Image/);
    expect(src).toMatch(/workspace/);
    expect(src).toMatch(/URL is stored on the prop/);
  });

  test('shows a always-visible Gallery button for image props', () => {
    expect(src).toMatch(/isImageProp/);
    expect(src).toMatch(/>\s*Gallery\s*</);
    expect(src).toMatch(/galleryBtn:[\s\S]*visibility:\s*['"]visible['"]/);
    expect(src).toMatch(/type === 'media'|type:\s*propObj\.type/);
  });

  test('picking writes a single image url string onto the prop value', () => {
    expect(src).toMatch(/GalleryPickerModal/);
    expect(src).toMatch(/handleValueChange\(pickerKey, url\)/);
    expect(src).not.toMatch(/getMediaConstants/);
  });
});

describe('TemplateProps inspector', () => {
  test('labels Source and Value on always-open cards', () => {
    expect(src).toMatch(/>\s*Source\s*</);
    expect(src).toMatch(/>\s*Value\s*</);
    expect(src).toMatch(/Response derived/);
    expect(src).toMatch(/Static derived/);
    expect(src).not.toMatch(/AccordionSummary/);
    expect(src).not.toMatch(/CheckCircleIcon/);
    expect(src).not.toMatch(/CancelIcon/);
  });

  test('Add prop modal has name, data type, and default, then updateWidget for private only', () => {
    expect(src).toMatch(/>\s*Add prop\s*</);
    expect(src).toMatch(/Prop name/);
    expect(src).toMatch(/Data type/);
    expect(src).toMatch(/Default value/);
    expect(src).toMatch(/label: 'String'/);
    expect(src).toMatch(/label: 'Number'/);
    expect(src).toMatch(/label: 'Image'/);
    expect(src).toMatch(/widget code must read this name/);
    expect(src).toMatch(/updateWidget/);
    expect(src).toMatch(/shouldUpdateWidgetSchema/);
    expect(src).toMatch(/propType: 'static'/);
    expect(src).not.toMatch(/Add New Prop/);
  });

  test('empty state tells people to click Add prop', () => {
    expect(src).toMatch(/Click Add prop to create a slot/);
    expect(src).toMatch(/>\s*Add prop\s*</);
    expect(src).not.toMatch(/Add props for this widget in Widgets/);
    expect(src).not.toMatch(/This widget has no props yet/);
  });

  test('rejects empty and duplicate names', () => {
    expect(src).toMatch(/Enter a prop name/);
    expect(src).toMatch(/already exists/);
  });

  test('writes values as they type into cellProps', () => {
    expect(src).toMatch(/cellProps\[propKey\] = next/);
    expect(src).toMatch(/applyPropToInstance\(cellProps, name, instance\)/);
  });

  test('Delete is always visible and removes the instance slot', () => {
    expect(src).toMatch(/>\s*Delete\s*</);
    expect(src).toMatch(/deleteBtn:[\s\S]*visibility:\s*['"]visible['"]/);
    expect(src).toMatch(/removeInstanceProp\(cellProps, propKey\)/);
    expect(src).toMatch(/handleDeleteProp/);
  });

  test('Add is enabled from the selected canvas cell, not a Mongo id', () => {
    expect(src).toMatch(/canAddWidgetProp\(\{disabled, selectedKey\}\)/);
    expect(src).not.toMatch(
      /canAdd = !disabled && Boolean\(selectedWidget\?._id/,
    );
  });
});

describe('LayoutSettings passes the selected widget', () => {
  test('finds selectedWidget loosely and passes it into TemplateProps', () => {
    expect(settings).toMatch(/findSelectedWidget\(widgets \|\| \[\], key\)/);
    expect(settings).toMatch(/selectedWidget=\{selectedWidget\}/);
    expect(settings).toMatch(/selectedKey=\{key\}/);
  });
});
