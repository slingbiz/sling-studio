import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../../@sling/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {
  FormHelperText,
  Icon,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import {AddCircle, AddIcCallOutlined, CloseOutlined} from '@material-ui/icons';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_ERROR} from '../../../../shared/constants/ActionTypes';
import {createWidget, updateWidget} from '../../../../redux/actions';
import {red} from '@material-ui/core/colors';
import {AllIcons} from '../../../../shared/constants/IconList';
const useStyles = makeStyles((theme) => ({
  boxLayoutView: {padding: '1.5em'},
  dialog: {
    overflow: 'scroll',
  },
  appBar: {
    position: 'relative',
    width: '100%',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    marginTop: 20,
    marginBottom: 10,
  },
  textTruncate: {
    padding: '10px 0',
  },
  componentBox: {
    height: '8em',
    width: '100%',
    border: '1px solid #d6d3d3',
    borderRadius: '4px',
    justifyContent: 'center',
    margin: '0.5em',
    flex: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  parentHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#edf5ed',
    padding: 20,
    borderRadius: 5,
    // border: '1px solid #000',
    // borderRadius: 5,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  titleAddWidget: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '10px 20px',
  },
  myTextFieldRoot: {
    marginTop: 10,
  },
  titleRiquiredProp: {
    fontSize: 18,
    fontWeight: '700',
  },
  iconImage: {
    width: 100,
    height: 75,
    marginLeft: 20,
    objectFit: 'cover',
    border: '0px none',
    outline: '0px',
    textDecoration: 'none',
  },
  titleRequired: {
    fontSize: 14,
    marginTop: 5,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const componentType = [
  {
    label: 'Widget',
    value: 'widget',
  },
  {
    label: 'Block',
    value: 'blocks',
  },
  {
    label: 'Component',
    value: 'component',
  },
  {
    label: 'Editable',
    value: 'editable',
  },
];
const propType = [
  {
    label: 'Responsive',
    value: 'responsive',
  },
  {
    label: 'Static',
    value: 'static',
  },
  {
    label: 'Derived',
    value: 'derived',
  },
];
const propDataType = [
  {
    label: 'String',
    value: 'string',
  },
  {
    label: 'Number',
    value: 'number',
  },
];

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.titleRequired' />),
  description: yup
    .string()
    .required(<IntlMessages id='validation.descriptionRequired' />),
  type: yup
    .string()
    .required(<IntlMessages id='validation.widgetTypeRequired' />),
  icon: yup
    .string()
    .required(<IntlMessages id='validation.widgetIconRequired' />),
});

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
          var updatedState = [...props];
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
          var updatedState = [...props];
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
          var updatedState = [...props];
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
          var updatedState = [...props];
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

const initialProps = {
  name: '',
  propType: '',
  dataType: '',
  default: '',
};

var initialValues = {
  name: '',
  description: '',
  type: '',
  icon: '',
  ownership: 'private',
};

const AddWidgetModal = ({open, setOpen, updateProp = null}) => {
  const classes = useStyles();
  const {messages} = useIntl();
  const [props, setprops] = useState([initialProps]);
  const dispatch = useDispatch();
  const {user} = useSelector(({auth}) => auth);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    initialValues = {
      name: '',
      description: '',
      type: '',
      icon: '',
      ownership: 'private',
    };
    if (updateProp) {
      initialValues = {
        ...initialValues,
        name: updateProp.name,
        description: updateProp.description,
        type: updateProp.type,
        icon: updateProp.icon,
      };
      setprops(updateProp.props);
    }
  }, []);

  const handleJsonFileChosen = (file) => {
    console.log('isfile', file.name);
    if (file) {
      var fileReader = new FileReader();
      fileReader.onloadend = () => {
        try {
          const json = JSON.parse(fileReader.result);
          initialValues = {
            ...initialValues,
            name: json.name,
            description: json.description,
            type: json.type,
            icon: json.icon,
          };
          setprops(json.props);
        } catch (error) {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Please select valid JSON file',
          });
        }
      };
      fileReader.readAsText(file);
    }
  };
  return (
    <Dialog
      maxWidth='md'
      fullWidth='true'
      className={{paper: classes.dialog}}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar} color='transparent'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {' Widgets / Add a Widget'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Card
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '1.5em',
          padding: '2em',
          alignItems: 'stretch',
          overflowY: 'scroll',
        }}>
        <Box className={classes.parentHeader}>
          <Box>
            <Typography variant='h6' component='h2'>
              Autofill Widget
            </Typography>
            <Typography variant='body1' component='h2' mt={5}>
              Save time by importing JSON file
            </Typography>
          </Box>
          <input
            accept='*/*'
            className={classes.input}
            style={{display: 'none'}}
            id='pick-json-file'
            type='file'
            onChange={(e) => {
              handleJsonFileChosen(e.target.files[0]);
              e.target.value = null;
            }}
          />
          <label htmlFor='pick-json-file'>
            <Button variant='contained' color='primary' component='span'>
              Import File
            </Button>
          </label>
        </Box>
        <Divider variant='fullWidth' className={classes.divider} />
        <Typography
          variant='h3'
          component='h2'
          className={classes.titleAddWidget}>
          Add Widget Manually
        </Typography>

        <Formik
          enableReinitialize
          validateOnChange={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            if (updateProp) {
              dispatch(
                updateWidget(updateProp._id, {
                  ...data,
                  props: props,
                }),
              );
            } else {
              dispatch(createWidget({...data, props: props, user: user.uid}));
            }
            handleClose();
            setSubmitting(false);
          }}>
          {({isSubmitting, setFieldValue, values}) => (
            <Form className={classes.body} autoComplete='off'>
              <CommonTextField
                required
                size='small'
                fullWidth
                label={<IntlMessages id='common.title' />}
                name='name'
                variant='outlined'
                className={classes.myTextFieldRoot}
              />
              <CommonTextField
                required
                size='small'
                fullWidth
                name='description'
                label={<IntlMessages id='common.description' />}
                variant='outlined'
                className={classes.myTextFieldRoot}
              />

              {/* <input
                name='icon'
                accept='image/*'
                className={classes.input}
                style={{display: 'none'}}
                id='raised-button-file'
                multiple
                type='file'
                onChange={(e) => {
                  handleFileChosen(e.target.files[0]);
                  setselectIcon(e.target.files[0]);
                  setFieldValue('icon', e.target.files[0].name);
                }}
              />
              <label
                htmlFor='raised-button-file'
                style={{display: 'flex', alignItems: 'center', marginTop: 10}}>
                <Button
                  style={{marginTop: 10, marginBottom: 10}}
                  color='primary'
                  variant='contained'
                  component='span'
                  className={classes.button}>
                  Upload
                </Button>
                <Typography style={{marginLeft: 10}}>{values.icon}</Typography>
                <img
                  src={selectIcon && URL.createObjectURL(selectIcon)}
                  className={classes.iconImage}
                />
              </label> */}
              <CommonTextField
                size='small'
                variant='outlined'
                required
                name='icon'
                fullWidth
                select
                placeholder={messages['common.widgetIcon']}
                label={<IntlMessages id='common.widgetIcon' />}>
                {AllIcons.map((cat, index) => {
                  return cat.icons.map((item, i) => {
                    return (
                      <MenuItem value={item.ligature} key={`${index}+${i}`}>
                        <Box
                          sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                          }}>
                          <Icon>{item.ligature}</Icon>
                          <Typography style={{marginLeft: 5}}>
                            {item.name}
                          </Typography>
                        </Box>
                      </MenuItem>
                    );
                  });
                })}
              </CommonTextField>
              <CommonTextField
                size='small'
                variant='outlined'
                required
                name='type'
                fullWidth
                select
                placeholder={messages['common.widgettype']}
                label={<IntlMessages id='common.widgettype' />}>
                {componentType.map((option) => (
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
                  className={classes.titleRiquiredProp}>
                  Required Props
                </Typography>
                <IconButton
                  aria-label='add prop'
                  onClick={() => setprops(props?.concat(initialProps))}>
                  <AddCircle />
                </IconButton>
              </Box>
              {props?.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#f6f7fa',
                    borderRadius: '5px',
                    padding: '20px 0px',
                  }}>
                  {props.map((prop, index) => (
                    <ItemProp
                      props={props}
                      key={index}
                      index={index}
                      updateState={(state) => setprops(state)}
                    />
                  ))}
                </Box>
              )}
              <Box sx={{marginLeft: 'auto', marginTop: 30}}>
                <Button
                  variant='outlined'
                  onClick={handleClose}
                  style={{marginRight: 15}}>
                  Cancel
                </Button>
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  variant='contained'
                  color='secondary'>
                  {updateProp ? 'update' : 'Save'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Dialog>
  );
};
export default AddWidgetModal;
