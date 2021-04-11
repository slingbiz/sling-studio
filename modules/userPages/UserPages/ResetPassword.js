import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 24,
  },
  card: {
    maxWidth: 576,
    width: '100%',
    textAlign: 'center',
    padding: 24,
    overflow: 'hidden',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.up('lg')]: {
      padding: 32,
    },
    [theme.breakpoints.up('xl')]: {
      padding: '48px 64px',
    },
  },
  form: {
    textAlign: 'left',
  },
  textField: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 44,
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

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required(<IntlMessages id='validation.enterOldPassword' />),
  newPassword: yup
    .string()
    .required(<IntlMessages id='validation.enterNewPassword' />),
  confirmPassword: yup
    .string()
    .required(<IntlMessages id='validation.reTypePassword' />),
});

const ResetPassword = () => {
  const classes = useStyles();
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box
        pb={6}
        py={{xl: 8}}
        display='flex'
        flex={1}
        flexDirection='column'
        alignItems='center'
        justifyContent='center'>
        <Card className={classes.card}>
          <Box
            mb={{xs: 5, xl: 8}}
            display='flex'
            alignItems='center'
            justifyContent='center'>
            <Box mr={2}>
              <img
                className={classes.logo}
                src={'/images/logo-icon-large.png'}
                alt='crema'
                title='crema'
              />
            </Box>
            <Box mb={1.5} fontWeight={Fonts.BOLD} fontSize={20}>
              <IntlMessages id='common.resetPassword' />
            </Box>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setErrors, resetForm}) => {
              if (data.newPassword !== data.confirmPassword) {
                setErrors({
                  confirmPassword: (
                    <IntlMessages id='validation.passwordMisMatch' />
                  ),
                });
              } else {
                resetForm();
              }
            }}>
            {({isSubmitting}) => (
              <Form className={classes.form} noValidate autoComplete='off'>
                <Box mb={{xs: 6, xl: 8}}>
                  <MyTextField
                    name='oldPassword'
                    label={<IntlMessages id='common.oldPassword' />}
                    className={classes.textField}
                    variant='outlined'
                    type='password'
                  />
                </Box>

                <Box mb={{xs: 6, xl: 8}}>
                  <MyTextField
                    name='newPassword'
                    label={<IntlMessages id='common.newPassword' />}
                    className={classes.textField}
                    variant='outlined'
                    type='password'
                  />
                </Box>

                <Box mb={{xs: 6, xl: 8}}>
                  <MyTextField
                    name='confirmPassword'
                    label={<IntlMessages id='common.retypePassword' />}
                    className={classes.textField}
                    variant='outlined'
                    type='password'
                  />
                </Box>

                <Button
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                  className={classes.button}
                  type='submit'>
                  <IntlMessages id='common.resetMyPassword' />
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default ResetPassword;
