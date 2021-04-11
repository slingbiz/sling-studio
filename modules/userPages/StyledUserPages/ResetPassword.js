import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => ({
  styledImg: {
    display: 'inline-block',
    [theme.breakpoints.up('lg')]: {
      paddingRight: 40,
    },
  },
  textField: {
    width: '100%',
  },
  card: {
    maxWidth: 1024,
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    padding: 32,
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.up('md')]: {
      padding: 48,
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: 48,
      paddingLeft: 32,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: 80,
      paddingLeft: 80,
    },
  },
  grid: {
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      alignSelf: 'center',
    },
  },
  form: {
    textAlign: 'left',
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
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} className={classes.grid}>
              <Box pr={{lg: 10}} display='inline-block'>
                <img
                  className={classes.styledImg}
                  src={'/images/userPageImages/ResetPassword.png'}
                  alt='crema'
                  title='crema'
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box mb={{xs: 6, xl: 8}} fontWeight={Fonts.BOLD} fontSize={20}>
                <IntlMessages id='common.resetPassword' />
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
                  <Box textAlign='left' clone>
                    <Form noValidate autoComplete='off'>
                      <Box mb={{xs: 5, lg: 8}}>
                        <MyTextField
                          name='oldPassword'
                          label={<IntlMessages id='common.oldPassword' />}
                          className={classes.textField}
                          variant='outlined'
                          type='password'
                        />
                      </Box>

                      <Box mb={{xs: 5, lg: 8}}>
                        <MyTextField
                          name='newPassword'
                          label={<IntlMessages id='common.newPassword' />}
                          className={classes.textField}
                          variant='outlined'
                          type='password'
                        />
                      </Box>

                      <Box mb={{xs: 5, lg: 8}}>
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
                        {<IntlMessages id='common.resetMyPassword' />}
                      </Button>
                    </Form>
                  </Box>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default ResetPassword;
