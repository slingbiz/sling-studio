import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import Editor from '@monaco-editor/react';
import {useDispatch} from 'react-redux';
import GalleryPickerModal from '../../../media/GalleryPickerModal';
import {isImageProp} from '../../../media/isImageProp';
import {updateWidget} from '../../../../redux/actions';

const SLING_ORANGE = '#ff9800';
const SLING_CREAM = '#fff8f0';
const SLING_INK = '#163a5f';

const GALLERY_HELPER =
  'Pick an image from this workspace’s gallery. The URL is stored on the prop.';

const ADD_PROP_HELPER = "This widget's code must read the new prop.";

const SOURCE_OPTIONS = [
  {value: 'static', label: 'Static'},
  {value: 'response-derived', label: 'Response derived'},
  {value: 'static-derived', label: 'Static derived'},
  {value: 'media', label: 'Media'},
  {value: 'json', label: 'JSON'},
];

const DATA_TYPES = [
  {value: 'string', label: 'String'},
  {value: 'number', label: 'Number'},
  {value: 'image', label: 'Image'},
];

const staticHelperMap = {
  'response-derived':
    'Value picked from the API response. Please specify the Object key location to be picked from the API response.',
  'static-derived':
    'Values inside curly braces will be replaced from props before rendering',
  static: 'Static values to be used by the component',
  media: GALLERY_HELPER,
  json: 'Enter a valid JSON object.',
};

const displayPropValue = (value) => {
  if (typeof value === 'string' || typeof value === 'number') return value;
  return '';
};

const widgetUpdateBody = (widget, nextProps) => {
  const {_id, id, __v, createdAt, updatedAt, ...rest} = widget || {};
  return {
    ...rest,
    type: rest.type || 'widget',
    code: rest.code || '',
    props: nextProps,
  };
};

const emptyAddForm = () => ({
  name: '',
  dataType: 'string',
  defaultValue: '',
});

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    fontFamily: 'Open Sans, sans-serif',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
    width: '100%',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
    lineHeight: 1.35,
  },
  primaryBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    flexShrink: 0,
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
    '&:disabled': {backgroundColor: '#ffcc80', color: '#fff'},
  },
  outlineBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    border: '1px solid #ff9800',
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 8,
    padding: '7px 16px',
    background: '#fff',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: SLING_CREAM},
  },
  emptyCopy: {
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
    color: SLING_INK,
    lineHeight: 1.5,
    padding: '4px 0 8px',
  },
  propCard: {
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    boxSizing: 'border-box',
  },
  propName: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
    marginBottom: 12,
    lineHeight: 1.35,
  },
  fieldWrap: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: SLING_INK,
    marginBottom: 6,
    display: 'block',
    fontFamily: 'Open Sans, sans-serif',
  },
  field: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      background: SLING_CREAM,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px',
      fontSize: 14,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiSelect-root': {
      fontSize: 14,
      fontFamily: 'Open Sans, sans-serif',
    },
  },
  valueRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
  },
  galleryBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 8,
    fontFamily: 'Open Sans, sans-serif',
    padding: '10px 12px',
    minWidth: 0,
    flexShrink: 0,
    visibility: 'visible',
    opacity: 1,
  },
  helper: {
    fontSize: 14,
    color: '#6b6f76',
    fontFamily: 'Open Sans, sans-serif',
    marginTop: 6,
    lineHeight: 1.45,
  },
  editor: {
    height: '300px',
    border: '1px solid #e6e6e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dialogPaper: {
    borderRadius: 12,
    padding: '8px 4px 4px',
    width: 480,
    maxWidth: '92vw',
    fontFamily: 'Open Sans, sans-serif',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  addError: {
    fontSize: 14,
    color: '#c62828',
    fontFamily: 'Open Sans, sans-serif',
    margin: '4px 0 8px',
  },
}));

export default function TemplateProps({
  cellProps,
  disabled,
  selectedWidget,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const propsMap = cellProps || {};
  const [, setTick] = useState(0);
  const bump = () => setTick((n) => n + 1);
  const [jsonDraft, setJsonDraft] = useState({});
  const [jsonError, setJsonError] = useState({});
  const [pickerKey, setPickerKey] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState(emptyAddForm());
  const [addError, setAddError] = useState('');

  const writeProp = (propKey, patch) => {
    const next = {
      ...(propsMap[propKey] || {}),
      ...patch,
    };
    if (cellProps) {
      cellProps[propKey] = next;
    }
    bump();
  };

  const handleSourceChange = (propKey, type) => {
    writeProp(propKey, {type});
  };

  const handleValueChange = (propKey, value) => {
    writeProp(propKey, {value});
  };

  const handleJsonChange = (propKey, value) => {
    setJsonDraft({...jsonDraft, [propKey]: value});
    try {
      const parsed = JSON.parse(value);
      setJsonError({...jsonError, [propKey]: false});
      writeProp(propKey, {value: parsed});
    } catch (e) {
      setJsonError({...jsonError, [propKey]: true});
    }
  };

  const closeAdd = () => {
    setAddOpen(false);
    setAddForm(emptyAddForm());
    setAddError('');
  };

  const existingNames = () => {
    const fromCell = Object.keys(propsMap);
    const fromSchema = (selectedWidget?.props || [])
      .map((p) => p && p.name)
      .filter(Boolean);
    return new Set(
      [...fromCell, ...fromSchema].map((n) => String(n).trim().toLowerCase()),
    );
  };

  const handleSaveProp = () => {
    const name = String(addForm.name || '').trim();
    if (!name) {
      setAddError('Enter a prop name.');
      return;
    }
    if (existingNames().has(name.toLowerCase())) {
      setAddError('A prop with this name already exists.');
      return;
    }
    const widgetId = selectedWidget?._id || selectedWidget?.id;
    if (!widgetId) {
      setAddError('Select a widget on the canvas first.');
      return;
    }

    const dataType = addForm.dataType || 'string';
    const defaultVal = addForm.defaultValue;
    const instanceType = dataType === 'image' ? 'media' : 'static';
    const schemaProp = {
      name,
      propType: 'static',
      dataType,
      default: defaultVal,
    };
    const namedProps = (selectedWidget.props || []).filter((p) => p && p.name);
    const nextSchema = [...namedProps, schemaProp];
    const instance = {
      type: instanceType,
      dataType,
      default: defaultVal,
      value: defaultVal,
    };

    if (cellProps) {
      cellProps[name] = instance;
    }
    bump();

    dispatch(updateWidget(widgetId, widgetUpdateBody(selectedWidget, nextSchema)));
    closeAdd();
  };

  const propKeys = Object.keys(propsMap);
  const canAdd = !disabled && Boolean(selectedWidget?._id || selectedWidget?.id);

  return (
    <Box className={classes.root}>
      <Box className={classes.headerRow}>
        <Typography className={classes.headerTitle}>Widget Props</Typography>
        <Button
          className={classes.primaryBtn}
          disabled={!canAdd}
          onClick={() => {
            setAddForm(emptyAddForm());
            setAddError('');
            setAddOpen(true);
          }}>
          Add prop
        </Button>
      </Box>

      {propKeys.length === 0 ? (
        <Box className={classes.emptyCopy}>This widget has no props yet.</Box>
      ) : (
        propKeys.map((propKey) => {
          const propObj = propsMap[propKey] || {};
          const showGallery =
            propObj.type !== 'json' &&
            isImageProp({
              name: propKey,
              dataType: propObj.dataType,
              type: propObj.type,
            });
          const rawValue =
            jsonDraft[propKey] !== undefined
              ? jsonDraft[propKey]
              : propObj.value;
          const tempValue = displayPropValue(propObj.value);

          return (
            <Box key={propKey} className={classes.propCard}>
              <Typography className={classes.propName}>{propKey}</Typography>
              <Box className={classes.fieldWrap}>
                <Typography
                  className={classes.fieldLabel}
                  component='label'
                  htmlFor={`source-${propKey}`}>
                  Source
                </Typography>
                <TextField
                  id={`source-${propKey}`}
                  className={classes.field}
                  select
                  variant='outlined'
                  fullWidth
                  disabled={disabled}
                  value={propObj.type || 'static'}
                  onChange={(event) =>
                    handleSourceChange(propKey, event.target.value)
                  }>
                  {SOURCE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box className={classes.fieldWrap} style={{marginBottom: 0}}>
                <Typography
                  className={classes.fieldLabel}
                  component='label'
                  htmlFor={`value-${propKey}`}>
                  Value
                </Typography>
                {propObj.type === 'json' ? (
                  <>
                    <Editor
                      height='300px'
                      defaultLanguage='json'
                      theme='vs-dark'
                      value={
                        typeof rawValue === 'string'
                          ? rawValue
                          : JSON.stringify(rawValue ?? {}, null, 2)
                      }
                      options={{
                        minimap: {enabled: false},
                        automaticLayout: true,
                        wordWrap: 'on',
                        readOnly: disabled,
                      }}
                      onChange={(value) => handleJsonChange(propKey, value)}
                      className={classes.editor}
                    />
                    {jsonError[propKey] && (
                      <FormHelperText error>Invalid JSON format</FormHelperText>
                    )}
                    <Typography className={classes.helper}>
                      {staticHelperMap.json}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Box className={classes.valueRow}>
                      <TextField
                        id={`value-${propKey}`}
                        className={classes.field}
                        variant='outlined'
                        disabled={disabled}
                        value={tempValue}
                        style={{flex: 1}}
                        onChange={(event) =>
                          handleValueChange(propKey, event.target.value)
                        }
                      />
                      {showGallery && (
                        <Button
                          className={classes.galleryBtn}
                          aria-label='Pick from gallery'
                          disabled={disabled}
                          onClick={() => setPickerKey(propKey)}>
                          Gallery
                        </Button>
                      )}
                    </Box>
                    <Typography className={classes.helper}>
                      {showGallery
                        ? GALLERY_HELPER
                        : staticHelperMap[propObj.type]}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          );
        })
      )}

      <Dialog
        open={addOpen}
        onClose={closeAdd}
        classes={{paper: classes.dialogPaper}}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          px={2}
          pt={1}>
          <Typography className={classes.dialogTitle}>Add prop</Typography>
          <IconButton aria-label='Close' size='small' onClick={closeAdd}>
            <Icon>close</Icon>
          </IconButton>
        </Box>
        <DialogContent>
          <Box className={classes.fieldWrap}>
            <Typography
              className={classes.fieldLabel}
              component='label'
              htmlFor='prop-name'>
              Prop name
            </Typography>
            <TextField
              id='prop-name'
              className={classes.field}
              variant='outlined'
              fullWidth
              autoFocus
              value={addForm.name}
              onChange={(e) =>
                setAddForm({...addForm, name: e.target.value})
              }
            />
          </Box>
          <Box className={classes.fieldWrap}>
            <Typography
              className={classes.fieldLabel}
              component='label'
              htmlFor='prop-data-type'>
              Data type
            </Typography>
            <TextField
              id='prop-data-type'
              className={classes.field}
              select
              variant='outlined'
              fullWidth
              value={addForm.dataType}
              onChange={(e) =>
                setAddForm({...addForm, dataType: e.target.value})
              }>
              {DATA_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className={classes.fieldWrap}>
            <Typography
              className={classes.fieldLabel}
              component='label'
              htmlFor='prop-default'>
              Default value
            </Typography>
            <TextField
              id='prop-default'
              className={classes.field}
              variant='outlined'
              fullWidth
              value={addForm.defaultValue}
              onChange={(e) =>
                setAddForm({...addForm, defaultValue: e.target.value})
              }
            />
          </Box>
          <Typography className={classes.helper}>{ADD_PROP_HELPER}</Typography>
          {addError ? (
            <Typography className={classes.addError}>{addError}</Typography>
          ) : null}
          <Box className={classes.dialogFooter}>
            <Button className={classes.outlineBtn} onClick={closeAdd}>
              Cancel
            </Button>
            <Button className={classes.primaryBtn} onClick={handleSaveProp}>
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <GalleryPickerModal
        open={Boolean(pickerKey)}
        onClose={() => setPickerKey(null)}
        onSelect={(url) => {
          if (!pickerKey) return;
          handleValueChange(pickerKey, url);
          setPickerKey(null);
        }}
      />
    </Box>
  );
}
