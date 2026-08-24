import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {makeStyles} from '@material-ui/core/styles';
import {
  Box,
  Button,
  Icon,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {useField} from 'formik';
import {useDispatch} from 'react-redux';
import IntlMessages from '../../../@sling/utility/IntlMessages';
import {capital} from '../../../@sling/utility/Utils';
import {FETCH_ERROR} from '../../../shared/constants/ActionTypes';
import {AllIcons} from '../../../shared/constants/IconList';
import SandboxedPreview from '../../aiBuilder/components/SandboxedPreview';
import {SLING_ORANGE, SLING_CREAM, SLING_INK} from '../../aiBuilder/slingTheme';
import GalleryPickerModal from '../../media/GalleryPickerModal';
import {isImageProp} from '../../media/isImageProp';
import WidgetHistory from './WidgetHistory';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

const TABS = [
  {id: 'widget', label: 'Widget'},
  {id: 'code', label: 'Code'},
  {id: 'meta', label: 'Meta & Props'},
];

const HISTORY_TAB = {id: 'history', label: 'History'};

const propType = [
  {label: 'Responsive', value: 'response-derived'},
  {label: 'Static', value: 'static'},
  {label: 'Derived', value: 'static-derived'},
];

const propDataType = [
  {label: 'String', value: 'string'},
  {label: 'Number', value: 'number'},
  {label: 'Image', value: 'image'},
];

const ownershipOptions = [
  {label: 'Private', value: 'private'},
  {label: 'Public', value: 'public'},
];

export const emptyProp = {
  name: '',
  propType: '',
  dataType: '',
  default: '',
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    fontFamily: 'Open Sans, sans-serif',
  },
  tabBar: {
    display: 'flex',
    gap: 8,
    borderBottom: '1px solid #eee',
    marginBottom: 16,
  },
  tab: {
    textTransform: 'none',
    fontWeight: 600,
    minWidth: 0,
    padding: '10px 16px',
    borderRadius: 0,
    color: '#6b6f76',
    borderBottom: '2px solid transparent',
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
  },
  tabSelected: {
    color: SLING_ORANGE,
    borderBottom: `2px solid ${SLING_ORANGE}`,
  },
  previewContainer: {
    border: '1px solid #f5efef',
    borderRadius: 8,
    overflow: 'hidden',
    height: 480,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  previewPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 480,
    boxSizing: 'border-box',
    backgroundColor: SLING_CREAM,
    borderRadius: 8,
    border: `1px dashed ${SLING_ORANGE}`,
    gap: 12,
  },
  codeWrap: {
    border: '1px solid #e6e6e6',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#fff',
  },
  codeChrome: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    background: SLING_CREAM,
    borderBottom: '1px solid #f0e6d8',
  },
  codeChromeLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: SLING_ORANGE,
    fontFamily: 'Open Sans, sans-serif',
  },
  metaPane: {
    fontFamily: 'Open Sans, sans-serif',
  },
  fields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4px 20px',
    width: '100%',
    '@media (max-width: 720px)': {
      gridTemplateColumns: '1fr',
    },
  },
  fieldWide: {
    gridColumn: '1 / -1',
  },
  fieldWrap: {
    marginBottom: 14,
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
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px',
      fontSize: 14,
    },
    '& .MuiSelect-root': {
      fontSize: 14,
    },
    '& .MuiFormHelperText-root': {
      fontSize: 14,
    },
  },
  metaImport: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: '10px 12px',
    background: SLING_CREAM,
    borderRadius: 8,
    border: '1px solid #f0e6d8',
  },
  importLabel: {
    fontSize: 14,
    color: '#6b6f76',
    fontFamily: 'Open Sans, sans-serif',
  },
  importBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    borderColor: SLING_ORANGE,
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 8,
    fontFamily: 'Open Sans, sans-serif',
  },
  sampleLink: {
    display: 'flex',
    color: SLING_ORANGE,
    fontSize: 14,
    alignItems: 'center',
    textDecoration: 'none',
    fontFamily: 'Open Sans, sans-serif',
  },
  propsHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  titleRequiredProp: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
  },
  addBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
  },
  propsBox: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: 8,
    border: '1px solid #eee',
    overflow: 'hidden',
  },
  propsTableHead: {
    display: 'grid',
    gridTemplateColumns: 'minmax(120px, 1.2fr) 130px minmax(200px, 1.8fr) 140px 44px',
    gap: 12,
    padding: '12px 12px 10px',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
    background: SLING_CREAM,
    fontFamily: 'Open Sans, sans-serif',
  },
  propsRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(120px, 1.2fr) 130px minmax(200px, 1.8fr) 140px 44px',
    gap: 12,
    alignItems: 'center',
    padding: '10px 12px',
    borderTop: '1px solid #f0e6d8',
  },
  deleteBtn: {
    color: '#6b6f76',
    padding: 6,
    visibility: 'visible',
    opacity: 1,
  },
  defaultCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  galleryBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    borderColor: SLING_ORANGE,
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 8,
    fontFamily: 'Open Sans, sans-serif',
    padding: '6px 12px',
    minWidth: 0,
    flexShrink: 0,
    visibility: 'visible',
    opacity: 1,
  },
  hiddenInput: {
    display: 'none',
  },
}));

const slingEditorOptions = {
  readOnly: false,
  minimap: {enabled: false},
  fontSize: 14,
  lineNumbers: 'on',
  wordWrap: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: {top: 12, bottom: 12},
};

const handleEditorBeforeMount = (monaco) => {
  monaco.editor.defineTheme('sling-cream', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#ffffff',
      'editor.lineHighlightBackground': '#fff8f0',
      'editorLineNumber.foreground': '#c4a574',
      'editorCursor.foreground': '#ff9800',
      'editor.selectionBackground': '#ff980033',
    },
  });
};

const CommonTextField = ({classes, label, required, select, wide, children, ...props}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <Box className={`${classes.fieldWrap}${wide ? ` ${classes.fieldWide}` : ''}`}>
      <Typography
        className={classes.fieldLabel}
        component='label'
        htmlFor={props.id || props.name}>
        {label}
        {required ? ' *' : ''}
      </Typography>
      <TextField
        id={props.id || props.name}
        {...props}
        {...field}
        select={select}
        required={required}
        helperText={errorText}
        error={!!errorText}
        variant='outlined'
        fullWidth
        className={classes.field}>
        {children}
      </TextField>
    </Box>
  );
};

const ItemProp = ({classes, props, index, updateState}) => {
  const dispatch = useDispatch();
  const [pickerOpen, setPickerOpen] = useState(false);
  const row = props[index];
  const showGallery = isImageProp({
    name: row.name,
    dataType: row.dataType,
    type: row.type,
  });

  const patch = (key, value) => {
    const updatedState = [...props];
    updatedState[index] = {
      ...props[index],
      [key]: value,
    };
    updateState(updatedState);
  };

  return (
    <>
    <Box className={classes.propsRow}>
      <TextField
        required
        size='small'
        variant='outlined'
        className={classes.field}
        value={props[index].name}
        onChange={(e) => patch('name', e.target.value)}
        inputProps={{'aria-label': 'Prop Name'}}
      />
      <TextField
        size='small'
        variant='outlined'
        required
        select
        className={classes.field}
        value={props[index].dataType}
        onChange={(e) => patch('dataType', e.target.value)}
        inputProps={{'aria-label': 'Data Type'}}>
        {propDataType.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Box className={classes.defaultCell}>
        <TextField
          required
          size='small'
          variant='outlined'
          className={classes.field}
          value={props[index].default}
          onChange={(e) => patch('default', e.target.value)}
          inputProps={{'aria-label': 'Default Value'}}
        />
        {showGallery && (
          <Button
            variant='outlined'
            className={classes.galleryBtn}
            aria-label='Pick from gallery'
            onClick={() => setPickerOpen(true)}>
            Gallery
          </Button>
        )}
      </Box>
      <TextField
        size='small'
        variant='outlined'
        required
        select
        className={classes.field}
        value={props[index].propType}
        onChange={(e) => patch('propType', e.target.value)}
        inputProps={{'aria-label': 'Prop Type'}}>
        {propType.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <IconButton
        aria-label='delete'
        className={classes.deleteBtn}
        onClick={() => {
          if (props.length > 1) {
            updateState(props.slice(0, index).concat(props.slice(index + 1)));
          } else {
            dispatch({
              type: FETCH_ERROR,
              payload: 'Must have minimume one props',
            });
          }
        }}>
        <CloseOutlined fontSize='small' />
      </IconButton>
    </Box>
    <GalleryPickerModal
      open={pickerOpen}
      onClose={() => setPickerOpen(false)}
      onSelect={(url) => {
        patch('default', url);
        setPickerOpen(false);
      }}
    />
    </>
  );
};

const WidgetEditorTabs = ({
  code = '',
  onCodeChange,
  dependencies,
  themeOverrides,
  props,
  onPropsChange,
  showImport = false,
  onImportJson,
  streaming = false,
  initialTab = 'widget',
  onPreviewError,
  widgetId,
  canRestore = false,
  onRestored,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabs = widgetId ? TABS.concat(HISTORY_TAB) : TABS;

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleJsonFileChosen = (file) => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      try {
        const json = JSON.parse(fileReader.result);
        onImportJson?.(json);
      } catch (error) {
        dispatch({
          type: FETCH_ERROR,
          payload: 'Please select valid JSON file',
        });
      }
    };
    fileReader.readAsText(file);
  };

  const canPreview = Boolean(code) && !streaming;

  return (
    <Box className={classes.root}>
      <Box className={classes.tabBar}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            className={`${classes.tab} ${
              activeTab === tab.id ? classes.tabSelected : ''
            }`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </Button>
        ))}
      </Box>

      {activeTab === 'widget' &&
        (canPreview ? (
          <Box className={classes.previewContainer}>
            <SandboxedPreview
              code={code}
              dependencies={dependencies}
              themeOverrides={themeOverrides}
              style={{height: 480, background: '#fff'}}
              onError={onPreviewError}
            />
          </Box>
        ) : (
          <Box className={classes.previewPlaceholder}>
            <Icon style={{fontSize: 48, color: SLING_ORANGE, opacity: 0.45}}>
              widgets
            </Icon>
            <Typography variant='body2' color='textSecondary'>
              {streaming ? 'Preview will appear when code is ready' : 'No live preview'}
            </Typography>
          </Box>
        ))}

      {activeTab === 'code' && (
        <Box className={classes.codeWrap}>
          <Box className={classes.codeChrome}>
            <Typography className={classes.codeChromeLabel}>Code</Typography>
          </Box>
          <MonacoEditor
            height='432px'
            language='javascript'
            theme='sling-cream'
            value={code || ''}
            onChange={(value) => onCodeChange?.(value || '')}
            beforeMount={handleEditorBeforeMount}
            options={{
              ...slingEditorOptions,
              readOnly: streaming || !onCodeChange,
            }}
          />
        </Box>
      )}

      {activeTab === 'meta' && (
        <Box className={classes.metaPane}>
          {showImport && (
            <Box className={classes.metaImport}>
              <Typography className={classes.importLabel}>Import JSON</Typography>
              <Box style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <input
                  accept='*/*'
                  className={classes.hiddenInput}
                  id='pick-json-file'
                  type='file'
                  onChange={(e) => {
                    handleJsonFileChosen(e.target.files[0]);
                    e.target.value = null;
                  }}
                />
                <label htmlFor='pick-json-file'>
                  <Button
                    variant='outlined'
                    className={classes.importBtn}
                    component='span'>
                    Import File
                  </Button>
                </label>
                <a
                  href={'/files/widget.json'}
                  download={'/files/widget.json'}
                  className={classes.sampleLink}>
                  Sample JSON
                  <CloudDownloadIcon style={{height: 18, width: 18, marginLeft: 4}} />
                </a>
              </Box>
            </Box>
          )}

          <Box className={classes.fields}>
            <CommonTextField
              classes={classes}
              required
              label={<IntlMessages id='common.title' />}
              name='name'
            />
            <CommonTextField classes={classes} required label={'Key'} name='key' />
            <CommonTextField
              classes={classes}
              required
              wide
              name='description'
              label={<IntlMessages id='common.description' />}
            />
            <CommonTextField
              classes={classes}
              required
              name='icon'
              select
              label={<IntlMessages id='common.widgetIcon' />}>
              {AllIcons.map((cat, index) =>
                cat.icons.map((item, i) => (
                  <MenuItem value={item.ligature} key={`${index}+${i}`}>
                    <Box
                      sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <Icon>{item.ligature}</Icon>
                      <Typography
                        style={{
                          marginLeft: 5,
                          textTransform: 'capitalize',
                        }}>
                        {capital(item.name)}
                      </Typography>
                    </Box>
                  </MenuItem>
                )),
              )}
            </CommonTextField>
            <CommonTextField
              classes={classes}
              name='ownership'
              select
              label='Ownership'>
              {ownershipOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CommonTextField>
          </Box>

          <Box className={classes.propsHead}>
            <Typography
              variant='h3'
              component='h2'
              className={classes.titleRequiredProp}>
              Required Props
            </Typography>
            <Button
              className={classes.addBtn}
              aria-label='add prop'
              onClick={() => onPropsChange((props || []).concat(emptyProp))}>
              Add
            </Button>
          </Box>
          {props?.length > 0 && (
            <Box className={classes.propsBox}>
              <Box className={classes.propsTableHead}>
                <span>Prop Name</span>
                <span>Data Type</span>
                <span>Default Value</span>
                <span>Prop Type</span>
                <span />
              </Box>
              {props.map((prop, index) => (
                <ItemProp
                  classes={classes}
                  props={props}
                  key={`${prop.name || 'prop'}-${index}`}
                  index={index}
                  updateState={onPropsChange}
                />
              ))}
            </Box>
          )}
        </Box>
      )}

      {activeTab === 'history' && widgetId && (
        <WidgetHistory
          widgetId={widgetId}
          canRestore={canRestore}
          onRestored={onRestored}
        />
      )}
    </Box>
  );
};

export default WidgetEditorTabs;
