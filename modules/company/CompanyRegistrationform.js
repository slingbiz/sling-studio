import React, {useState} from 'react';
import * as yup from 'yup';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../shared/constants/AppEnums';
import Stack from '@mui/material/Stack';
import {Button, Divider, Link, TextField} from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import MuiPhoneNumber from 'material-ui-phone-number';
import ReCAPTCHA from 'react-google-recaptcha';
import {countries} from '../../shared/constants/CountryList';
import {Form, Formik, useField} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {InfoView} from '../../@sling';
import {onRegisterForm1} from '../../redux/actions/AccountAction';
import {onSignOutFirebaseUser} from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minHeight: '70vh',
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    margin: 5,
    padding: 25,
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
    gap: 5,
  },
  btnSubmit: {
    margin: 'auto',
    marginTop: 10,
    width: 150,
  },
}));

const validationSchema = yup.object({
  // phone: yup.number().required(<IntlMessages id='validation.phoneRequired' />),
  orgName: yup
    .string()
    .required(<IntlMessages id='validation.orgNameRequired' />),
  companyName: yup
    .string()
    .required(<IntlMessages id='validation.companyNameRequired' />),
  address1: yup
    .string()
    .required(<IntlMessages id='validation.address1Required' />),
  city: yup.string().required(<IntlMessages id='validation.cityRequired' />),
  zipCode: yup.string().required(<IntlMessages id='validation.zipRequired' />),
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
      style={{marginBottom: 10}}
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const MyPhoneField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <MuiPhoneNumber
      {...props}
      {...field}
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
            dispatch(onRegisterForm1({...data, user: user.id})).then(() => {
              props.changeStepper();
              console.log('submit');
              setSubmitting(false);
            });
          }}>
          {({isSubmitting, handleChange}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box sx={{fontSize: 14, alignSelf: 'start'}}>
                Logged in as {user.email} &nbsp;
                <Box
                  onClick={() => dispatch(onSignOutFirebaseUser())}
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
                <Box
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: '500',
                    fontSize: 15,
                  }}>
                  Organization details
                </Box>
                <Box>Fields marked with * are required</Box>{' '}
              </Box>
              <MyTextField
                name='orgName'
                id='outlined-basic'
                label='Organization Name *'
                variant='outlined'
                margin='dense'
              />
              <MyTextField
                name='companyName'
                id='outlined-basic'
                label='Company Name *'
                variant='outlined'
                margin='dense'
              />
              <MyTextField
                disabled
                name='email'
                id='outlined-basic'
                label='Primary Email'
                variant='outlined'
                margin='dense'
              />
              <MuiPhoneNumber
                name='phoneNumber'
                defaultCountry={'pl'}
                onChange={handleChange('phoneNumber')}
              />
              <Box
                sx={{
                  typography: 'subtitle2',
                  alignSelf: 'left',
                  marginTop: 20,
                }}>
                ADDRESS
              </Box>
              <MyTextField
                name='address1'
                id='outlined-basic'
                label='Address 1'
                variant='outlined'
                margin='dense'
              />
              <MyTextField
                name='address2'
                id='outlined-basic'
                label='Address 2'
                variant='outlined'
                margin='dense'
              />
              <Stack direction='row' spacing={2} alignItems='center'>
                <MyTextField
                  name='city'
                  id='outlined-basic'
                  label='City'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                />
                <MyTextField
                  fullWidth
                  name='zipCode'
                  id='outlined-basic'
                  label='ZIP / Postal code'
                  variant='outlined'
                  margin='dense'
                />
              </Stack>
              <Stack direction='row' spacing={2} alignItems='center'>
                <MyTextField
                  name='country'
                  fullWidth
                  id='outlined-select-currency'
                  select
                  label='Select'
                  helperText='Please select your country'>
                  {countries.map((option) => (
                    <MenuItem key={option.code} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </MyTextField>
                <MyTextField
                  name='region'
                  fullWidth
                  id='outlined-basic'
                  label='Region'
                  variant='outlined'
                  margin='dense'
                />
              </Stack>
              <ReCAPTCHA
                sitekey='6Ld4N9oeAAAAAB12j_vhaEyc4WX26ec2qkV6VPW-'
                style={{margin: 'auto', marginTop: '20px'}}
              />
              <Button
                variant='contained'
                className={classes.btnSubmit}
                type='submit'
                disabled={isSubmitting}
                color='primary'>
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
