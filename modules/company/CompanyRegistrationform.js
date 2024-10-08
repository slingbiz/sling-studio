import React, {useState} from 'react';
import * as yup from 'yup';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';
import {Button, Divider, TextField} from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import MuiPhoneNumber from 'material-ui-phone-number';
import {countries} from '../../shared/constants/CountryList';
import {Form, Formik, useField} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {onCompanyRegistrationForm} from '../../redux/actions/AccountAction';
import {onJwtAuthSignout} from '../../redux/actions';
import {Fonts} from '../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    // minHeight: '70vh',
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    margin: 5,
    padding: 45,
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    // margin: 5,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.up('xl')]: {
      paddingTop: 32,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    gap: 7,
  },
  btnSubmit: {
    margin: 'auto',
    marginTop: 10,
    width: 150,
    color: '#fff',
  },
  btnRoot: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    width: '100%',
    height: 50,
    marginTop: 20,
    fontSize: 16,
    color: theme.palette.common.white,
    fontWeight: Fonts.BOLD,
    textTransform: 'capitalize',
  },
  rowStack: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  // phoneNumber: yup
  //   .string() // Change this from number to string to validate phone numbers
  //   .required(<IntlMessages id='validation.phoneRequired' />),
  // orgName: yup
  //   .string()
  //   .required(<IntlMessages id='validation.orgNameRequired' />),
  // companyName: yup
  //   .string()
  //   .required(<IntlMessages id='validation.companyNameRequired' />),
  // address1: yup
  //   .string()
  //   .required(<IntlMessages id='validation.address1Required' />),
  // city: yup.string().required(<IntlMessages id='validation.cityRequired' />),
  // phoneNumber: yup.number().required('Phone number is not valid'),
  // country: yup
  //   .string()
  //   .required(<IntlMessages id='validation.countryRequired' />),
});

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  // console.log(field);
  return (
    <TextField
      {...props}
      {...field}
      style={{margin: 10, height: '2rem'}}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const CompanyRegistrationform = (props) => {
  const dispatch = useDispatch();
  const {user, loading} = useSelector(({auth}) => auth);
  const classes = useStyles(props);

  return (
    <Box
      sx={{
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}>
      <Card className={classes.cardRoot}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            email: user.email,
            orgName: '',
            companyName: '',
            address1: '',
            address2: '',
            phoneNumber: '',
            city: '',
            zipCode: '',
            country: '',
            region: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            console.log('data', data);
            setSubmitting(true);
            dispatch(onCompanyRegistrationForm(data)).then((res) => {
              console.dir('company', res);
              setSubmitting(false);
              if (res.status == 201) {
                props.changeStepper();
              }
              console.log('submit');
            });
          }}>
          {({isSubmitting, handleChange, values, setFieldValue}, ...props) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Box
                  sx={{
                    fontWeight: '500',
                    fontSize: 20,
                  }}>
                  Organization details
                </Box>
                <Box sx={{fontSize: 14, alignSelf: 'start'}}>
                  Logged in as {user.email} &nbsp;
                  <Box
                    onClick={() => dispatch(onJwtAuthSignout())}
                    color='primary.main'
                    sx={{
                      textDecoration: 'underline',
                      display: 'inline',
                      cursor: 'pointer',
                    }}
                    href='text'>
                    Log out
                  </Box>
                </Box>
              </Box>

              <Divider
                variant='fullWidth'
                style={{marginBottom: 10, marginTop: 10}}
              />
              <Box
                sx={{
                  my: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Box>Fields marked with * are required</Box>{' '}
              </Box>
              {/* <MyTextField
                name='orgName'
                id='outlined-basic'
                label='Organization Name *'
                variant='outlined'
                margin='dense'
              /> */}
              <Stack
                direction='row'
                spacing={2}
                alignItems='baseline'
                className={classes.rowStack}>
                <MyTextField
                  name='companyName'
                  fullWidth
                  id='outlined-basic'
                  label='Company Name'
                  variant='outlined'
                  // margin='dense'
                />
              </Stack>

              <Stack
                direction='row'
                spacing={2}
                alignItems='baseline'
                className={classes.rowStack}>
                <MyTextField
                  disabled
                  fullWidth
                  name='email'
                  // id='outlined-basic'
                  label='Primary Email'
                  variant='outlined'
                  // margin='dense'
                  style={{
                    margin: 10,
                    padding: '0', // Ensure no extra padding is added
                    height: '3.5rem', // Consistent height
                  }}
                />
                <MuiPhoneNumber
                  name='phoneNumber'
                  style={{margin: 10}}
                  fullWidth
                  label={'Phone *'}
                  variant='outlined'
                  margin='dense'
                  defaultCountry={'ae'}
                  value={values.phoneNumber} // Make sure this is connected to form state
                  onChange={(value) => setFieldValue('phoneNumber', value)} // Manually update the form field
                />
              </Stack>

              <Box
                sx={{
                  typography: 'subtitle2',
                  alignSelf: 'left',
                  marginTop: 20,
                }}>
                ADDRESS
              </Box>
              <Stack
                direction='row'
                spacing={2}
                alignItems='baseline'
                style={{marginTop: 0}}
                className={classes.rowStack}>
                <MyTextField
                  name='address1'
                  fullWidth
                  id='outlined-basic'
                  label='Address'
                  variant='outlined'
                />
              </Stack>

              <Stack
                direction='row'
                spacing={2}
                alignItems='baseline'
                className={classes.rowStack}>
                <MyTextField
                  name='city'
                  id='outlined-basic'
                  label='City'
                  variant='outlined'
                  fullWidth
                />
                <MyTextField
                  name='country'
                  fullWidth
                  id='outlined-select-currency'
                  select
                  variant='outlined'
                  label='Country'
                  style={{margin: 10}}
                  helperText='Please select your country'>
                  {countries.map((option) => (
                    <MenuItem key={option.code} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </MyTextField>
                {/* <MyTextField
                  fullWidth
                  name='zipCode'
                  id='outlined-basic'
                  label='ZIP / Postal code'
                  variant='outlined'
                  margin='dense'
                /> */}
              </Stack>

              {/*<ReCAPTCHA*/}
              {/*  sitekey='6LdBA_YeAAAAAGjA_tg6stXHgjy4azk8QIK-buFc'*/}
              {/*  style={{margin: 'auto', marginTop: '20px'}}*/}
              {/*/>*/}
              <Button
                variant='contained'
                color='secondary'
                type='submit'
                disabled={isSubmitting}
                className={classes.btnRoot}>
                Finish
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default CompanyRegistrationform;
