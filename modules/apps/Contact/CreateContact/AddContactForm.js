import React, {useEffect} from 'react';
import {Box, Button, Select} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {useSelector} from 'react-redux';
import {useDropzone} from 'react-dropzone';
import {useIntl} from 'react-intl';
import {grey} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import PropTypes from 'prop-types';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {KeyboardDatePicker} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Fonts} from '../../../../shared/constants/AppEnums';

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

const AddContactForm = (props) => {
  const {
    values,
    userImage,
    setUserImage,
    setFieldValue,
    handleAddContactClose,
  } = props;
  const labelList = useSelector(({contactApp}) => contactApp.labelList);

  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  useEffect(() => {
    setLabelWidth(90);
  }, []);

  const {messages} = useIntl();

  const useStyles = makeStyles((theme) => ({
    avatar: {
      width: 55,
      height: 55,
      marginBottom: 8,
      cursor: 'pointer',
    },
    myTextField: {
      width: '100%',
      marginBottom: 16,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 24,
      },
    },
    btnRoot: {
      paddingLeft: 32,
      paddingRight: 32,
    },
    fieldRoot: {
      width: '100%',
      padding: 16,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    widthFull: {
      width: '100%',
    },
    pointer: {
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);

  return (
    <Form className='' noValidate autoComplete='off'>
      <Box
        p={5}
        display='flex'
        flexDirection='column'
        alignItems='center'
        borderBottom={`1px solid ${grey[300]}`}>
        <Box {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <Avatar className={classes.avatar} src={userImage} />
          </label>
        </Box>
        <Box component='h4' fontWeight={Fonts.MEDIUM}>
          {values.name}
        </Box>
      </Box>

      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box pb={5} mb={5} borderBottom={`1px solid ${grey[300]}`}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontSize={16}
              fontWeight={Fonts.MEDIUM}>
              <IntlMessages id='contactApp.personalDetails' />
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.name' />}
                name='name'
              />

              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.email' />}
                name='email'
              />

              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.phone' />}
                name='contact'
              />

              <KeyboardDatePicker
                autoOk
                disableFuture
                className={classes.myTextField}
                format='MM/DD/YYYY'
                variant='outlined'
                inputVariant='outlined'
                label={<IntlMessages id='common.birthday' />}
                name='birthday'
                value={values.birthday}
                onChange={(value) => setFieldValue('birthday', value)}
              />

              <FormControl variant='outlined' className={classes.widthFull}>
                <InputLabel
                  ref={inputLabel}
                  id='demo-simple-select-outlined-label'>
                  <IntlMessages id='common.selectLabel' />
                </InputLabel>
                <Field
                  name='label'
                  type='select'
                  as={Select}
                  labelWidth={labelWidth}
                  className={classes.myTextField}>
                  {labelList.map((label) => {
                    return (
                      <MenuItem
                        value={label.id}
                        key={label.id}
                        className={classes.pointer}>
                        {label.name}
                      </MenuItem>
                    );
                  })}
                </Field>
              </FormControl>

              <MyTextField
                className={classes.widthFull}
                variant='outlined'
                label={<IntlMessages id='common.website' />}
                name='website'
              />
            </Box>
          </Box>

          <Box pb={5} mb={5} borderBottom={`1px solid ${grey[300]}`}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontWeight={Fonts.MEDIUM}
              fontSize={16}>
              <IntlMessages id='common.otherDetails' />
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.company' />}
                name='company'
              />

              <MyTextField
                className={classes.widthFull}
                variant='outlined'
                label={<IntlMessages id='common.address' />}
                name='address'
              />
            </Box>
          </Box>

          <Box pb={5} mb={5} borderBottom={`1px solid ${grey[300]}`}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontWeight={Fonts.MEDIUM}
              fontSize={16}>
              <IntlMessages id='common.socialMedia' />
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.facebookId' />}
                name='facebookId'
              />

              <MyTextField
                className={classes.widthFull}
                variant='outlined'
                label={<IntlMessages id='common.twitterId' />}
                name='twitterId'
              />
            </Box>
          </Box>

          <Box>
            <Box component='h6' mb={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
              <IntlMessages id='common.notes' />
            </Box>

            <MyTextField
              name='notes'
              multiline
              className={classes.fieldRoot}
              rows='4'
              variant='outlined'
              placeholder={messages['common.notes']}
            />
          </Box>
        </Box>

        <Box px={8} py={4} bgcolor='grey.300'>
          <Button
            className={classes.btnRoot}
            color='secondary'
            variant='contained'
            type='submit'>
            <IntlMessages id='common.save' />
          </Button>
          <Button
            className={classes.btnRoot}
            color='secondary'
            onClick={handleAddContactClose}>
            <IntlMessages id='common.cancel' />
          </Button>
        </Box>
      </Scrollbar>
    </Form>
  );
};

export default AddContactForm;

AddContactForm.prototype = {
  values: PropTypes.object.isRequired,
  userImage: PropTypes.object.isRequired,
  setUserImage: PropTypes.func,
  setFieldValue: PropTypes.func,
  handleAddContactClose: PropTypes.func,
};
