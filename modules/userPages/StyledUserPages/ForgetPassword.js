import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {makeStyles, Typography} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => ({
  styledImg: {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textField: {
    width: '100%',
  },
  card: {
    maxWidth: 1024,
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
});

const ForgetPassword = () => {
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
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Box width='100%' height='100%'>
                <img
                  className={classes.styledImg}
                  src={'/images/userPageImages/ForgotPassword.png'}
                  alt='crema'
                  title='crema'
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box p={{xs: 8, lg: 12}} px={{xl: 16}} py={{xl: 12}}>
                <Box mb={{xs: 4, xl: 8}} fontWeight={Fonts.BOLD} fontSize={20}>
                  <IntlMessages id='common.forgetPassword' />
                </Box>
                <Box mb={{xs: 6, xl: 10}} fontSize={14}>
                  <Typography component='p'>
                    <IntlMessages id='common.forgetPasswordTextOne' />
                  </Typography>
                  <Typography component='p'>
                    <IntlMessages id='common.forgetPasswordTextTwo' />
                  </Typography>
                </Box>
                <Formik
                  validateOnChange={true}
                  initialValues={{
                    email: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(data, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    setSubmitting(false);
                    resetForm();
                  }}>
                  {({isSubmitting}) => (
                    <Form className={classes.form}>
                      <Box mb={{xs: 5, lg: 8, xl: 12}}>
                        <MyTextField
                          name='email'
                          label={<IntlMessages id='common.emailAddress' />}
                          className={classes.textField}
                          variant='outlined'
                        />
                      </Box>

                      <Button
                        variant='contained'
                        color='primary'
                        disabled={isSubmitting}
                        className={classes.button}
                        type='submit'>
                        Send password
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default ForgetPassword;
