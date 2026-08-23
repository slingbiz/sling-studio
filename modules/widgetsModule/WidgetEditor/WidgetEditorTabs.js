import React, {useEffect, useState} from 'react';
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
import {AddCircle, CloseOutlined} from '@material-ui/icons';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {useField} from 'formik';
import {useDispatch} from 'react-redux';
import IntlMessages from '../../../@sling/utility/IntlMessages';
import {capital} from '../../../@sling/utility/Utils';
import {FETCH_ERROR} from '../../../shared/constants/ActionTypes';
import {AllIcons} from '../../../shared/constants/IconList';
import SandboxedPreview from '../../aiBuilder/components/SandboxedPreview';

const BRAND_ORANGE = '#ff9800';

const TABS = [
  {id: 'widget', label: 'Widget'},
  {id: 'code', label: 'Code'},
  {id: 'meta', label: 'Meta & Props'},
];

const propType = [
  {label: 'Responsive', value: 'response-derived'},
  {label: 'Static', value: 'static'},
  {label: 'Derived', value: 'static-derived'},
];

const propDataType = [
  {label: 'String', value: 'string'},
  {label: 'Number', value: 'number'},
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    color: theme.palette.text.secondary,
    borderBottom: '2px solid transparent',
  },
  tabSelected: {
    color: BRAND_ORANGE,
    borderBottom: `2px solid ${BRAND_ORANGE}`,
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
    backgroundColor: '#fff8ee',
    borderRadius: 8,
    border: `1px dashed ${BRAND_ORANGE}`,
    gap: 12,
  },
  codePane: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: '#f5efef',
    fontFamily:
      "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontSize: 13,
    lineHeight: 1.7,
    padding: '16px 20px',
    borderRadius: 8,
    overflowX: 'auto',
    overflowY: 'scroll',
    height: 480,
    boxSizing: 'border-box',
    whiteSpace: 'pre',
    wordBreak: 'normal',
    border: 'none',
    outline: 'none',
    resize: 'none',
  },
  metaImport: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: '10px 12px',
    background: '#fafafa',
    borderRadius: 6,
  },
  titleRequiredProp: {
    fontSize: 18,
    fontWeight: 700,
  },
  propsBox: {
    display: 'flex',
    flexDirection: 'column',
    background: '#f6f7fa',
    borderRadius: 5,
    padding: '20px 0px',
  },
  hiddenInput: {
    display: 'none',
  },
}));

const CommonTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
      style={{marginTop: 10, marginBottom: 10}}
    />
  );
};

const ItemProp = ({props, index, updateState}) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
      }}>
      <Typography variant='h6' style={{marginLeft: 15, fontSize: 18}}>
        {index + 1}
      </Typography>
      <TextField
        required
        size='small'
        label={<IntlMessages id='common.propName' />}
        variant='outlined'
        value={props[index].name}
        onChange={(e) => {
          const updatedState = [...props];
          updatedState[index] = {
            ...props[index],
            name: e.target.value,
          };
          updateState(updatedState);
        }}
      />
      <TextField
        size='small'
        variant='outlined'
        required
        style={{width: 150}}
        select
        label={<IntlMessages id='common.dataType' />}
        value={props[index].dataType}
        onChange={(e) => {
          const updatedState = [...props];
          updatedState[index] = {
            ...props[index],
            dataType: e.target.value,
          };
          updateState(updatedState);
        }}>
        {propDataType.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        size='small'
        label={<IntlMessages id='common.default' />}
        variant='outlined'
        value={props[index].default}
        onChange={(e) => {
          const updatedState = [...props];
          updatedState[index] = {
            ...props[index],
            default: e.target.value,
          };
          updateState(updatedState);
        }}
      />
      <TextField
        size='small'
        variant='outlined'
        required
        label={<IntlMessages id='common.propType' />}
        style={{width: 150}}
        select
        value={props[index].propType}
        onChange={(e) => {
          const updatedState = [...props];
          updatedState[index] = {
            ...props[index],
            propType: e.target.value,
          };
          updateState(updatedState);
        }}>
        {propType.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <IconButton
        aria-label='delete'
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
        <CloseOutlined />
      </IconButton>
    </Box>
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
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(initialTab);

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
        {TABS.map((tab) => (
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
            <Icon style={{fontSize: 48, color: BRAND_ORANGE, opacity: 0.45}}>
              widgets
            </Icon>
            <Typography variant='body2' color='textSecondary'>
              {streaming ? 'Preview will appear when code is ready' : 'No live preview'}
            </Typography>
          </Box>
        ))}

      {activeTab === 'code' &&
        (onCodeChange ? (
          <textarea
            className={classes.codePane}
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            spellCheck={false}
            readOnly={streaming}
          />
        ) : (
          <Box className={classes.codePane}>{code}</Box>
        ))}

      {activeTab === 'meta' && (
        <Box>
          {showImport && (
            <Box className={classes.metaImport}>
              <Typography variant='body2' color='textSecondary'>
                Import JSON
              </Typography>
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
                  <Button variant='outlined' color='primary' component='span' size='small'>
                    Import File
                  </Button>
                </label>
                <a
                  href={'/files/widget.json'}
                  download={'/files/widget.json'}
                  style={{
                    display: 'flex',
                    color: 'grey',
                    fontSize: 12,
                    alignItems: 'center',
                  }}>
                  Sample JSON
                  <CloudDownloadIcon style={{height: 18, width: 18, marginLeft: 4}} />
                </a>
              </Box>
            </Box>
          )}

          <CommonTextField
            required
            size='small'
            fullWidth
            label={<IntlMessages id='common.title' />}
            name='name'
            variant='outlined'
          />
          <CommonTextField
            required
            size='small'
            fullWidth
            label={'Key'}
            name='key'
            variant='outlined'
          />
          <CommonTextField
            required
            size='small'
            fullWidth
            name='description'
            label={<IntlMessages id='common.description' />}
            variant='outlined'
          />
          <CommonTextField
            size='small'
            variant='outlined'
            required
            name='icon'
            fullWidth
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
            size='small'
            variant='outlined'
            name='ownership'
            fullWidth
            select
            label='Ownership'>
            {ownershipOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CommonTextField>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 25,
            }}>
            <Typography
              variant='h3'
              component='h2'
              className={classes.titleRequiredProp}>
              Required Props
            </Typography>
            <IconButton
              aria-label='add prop'
              onClick={() => onPropsChange((props || []).concat(emptyProp))}>
              <AddCircle />
            </IconButton>
          </Box>
          {props?.length > 0 && (
            <Box className={classes.propsBox}>
              {props.map((prop, index) => (
                <ItemProp
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
    </Box>
  );
};

export default WidgetEditorTabs;
