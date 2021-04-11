import React, {useEffect} from 'react';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Field, Form, useField} from 'formik';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import {KeyboardDatePicker} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {red} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import GridContainer from '../../../../@crema/core/GridContainer';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  userControl: {
    width: '100%',

    '& .MuiOutlinedInput-input': {
      paddingTop: 8,
      paddingBottom: 6,
      minHeight: 42,
    },
  },
  crDatePicker: {
    border: 'solid 1px #ccc',
    borderRadius: 4,
    padding: '3px 6px',

    '& .MuiInputLabel-shrink': {
      padding: '4px 0 0 6px',
    },
  },
  form: {
    width: '100%',
  },
  textField: {
    width: '100%',
    fontWeight: Fonts.LIGHT,
    marginBottom: 20,
    marginTop: 16,
  },
  field: {
    width: '100%',
  },
  avatar: {
    marginRight: 8,
  },
  formControl: {
    width: '100%',
  },
  textArea: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    [theme.breakpoints.up('xl')]: {
      marginTop: 32,
      marginBottom: 32,
    },
  },
  button: {
    backgroundColor: red[600],
    fontWeight: Fonts.LIGHT,
    color: theme.palette.primary.contrastText,
    padding: '12px 16px',
    width: 192,
    '&:hover, &:focus': {
      backgroundColor: red[700],
      color: theme.palette.secondary.contrastText,
    },
  },
  pointer: {
    cursor: 'pointer',
    inputVariant: 'outlined',
  },
  selectBox: {
    cursor: 'pointer',
    '& .MuiOutlinedInput-input': {
      paddingBottom: 10,
      paddingTop: 10,
    },
    '& .MuiSelect-select': {
      paddingLeft: 10,
    },
    '&:before': {
      display: 'none',
    },
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const AddTaskForm = (props) => {
  const {
    values,
    setFieldValue,
    isSubmitting,
    setTaskLabels,
    taskLabels,
  } = props;

  const labelList = useSelector(({todoApp}) => todoApp.labelList);

  const [labelWidth, setLabelWidth] = React.useState(0);

  const priorityList = useSelector(({todoApp}) => todoApp.priorityList);

  const staffList = useSelector(({todoApp}) => todoApp.staffList);

  const inputLabel = React.useRef(null);

  useEffect(() => {
    setLabelWidth(50);
  }, []);

  const classes = useStyles(props);

  const {messages} = useIntl();

  return (
    <Form className={classes.form} noValidate autoComplete='off'>
      <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
        <MyTextField
          className={classes.textField}
          variant='outlined'
          label={<IntlMessages id='todo.taskTitle' />}
          name='title'
        />

        <Box mb={5}>
          <GridContainer>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl className={classes.userControl} variant='outlined'>
                <InputLabel
                  ref={inputLabel}
                  id='demo-simple-select-outlined-label'>
                  <IntlMessages id='common.staff' />
                </InputLabel>
                <Field
                  name='assignedTo'
                  labelWidth={labelWidth}
                  className={classes.field}
                  type='select'
                  as={Select}>
                  {staffList.map((staff) => {
                    return (
                      <MenuItem
                        value={staff.id}
                        key={staff.id}
                        className={classes.pointer}>
                        <Box display='flex' alignItems='center'>
                          {staff.image ? (
                            <Avatar
                              className={classes.avatar}
                              src={staff.image}
                            />
                          ) : (
                            <Avatar className={classes.avatar}>
                              {staff.name.toUpperCase()}
                            </Avatar>
                          )}
                          <span>{staff.name}</span>
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Field>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box width={1} clone>
                <KeyboardDatePicker
                  autoOk
                  format='YYYY/MM/DD'
                  variant='inline'
                  inputVariant='outlined'
                  label={<IntlMessages id='common.selectDate' />}
                  name='date'
                  value={values.date}
                  onChange={(value) => setFieldValue('date', value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl className={classes.formControl} variant='outlined'>
                <InputLabel
                  ref={inputLabel}
                  id='demo-simple-select-outlined-label'>
                  <IntlMessages id='common.priority' />
                </InputLabel>
                <Field
                  name='priority'
                  type='select'
                  labelWidth={labelWidth}
                  as={Select}>
                  {priorityList.map((priority) => {
                    return (
                      <MenuItem
                        value={priority.type}
                        key={priority.id}
                        className={classes.pointer}>
                        {priority.name}
                      </MenuItem>
                    );
                  })}
                </Field>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                multiple
                id='tags-outlined'
                options={labelList}
                getOptionLabel={(option) => option.name}
                value={taskLabels}
                onChange={(event, value) => setTaskLabels(value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label={<IntlMessages id='common.label' />}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </GridContainer>
        </Box>

        <Box mb={5}>
          <MyTextField
            name='content'
            multiline
            className={classes.textArea}
            rows='6'
            variant='outlined'
            placeholder={messages['common.description']}
          />
        </Box>

        <Divider className={classes.divider} />
      </Box>
      <Box px={8} py={4} bgcolor='grey.300'>
        <Button
          className={classes.btnRoot}
          color='secondary'
          variant='contained'
          disabled={isSubmitting}
          type='submit'>
          <IntlMessages id='common.save' />
        </Button>
      </Box>
    </Form>
  );
};

export default AddTaskForm;

AddTaskForm.defaultProps = {
  isSubmitting: false,
};

AddTaskForm.prototype = {
  values: PropTypes.object.isRequired,
  taskLabels: PropTypes.array.isRequired,
  setTaskLabels: PropTypes.func,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
};
