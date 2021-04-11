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
  },
  card: {
    maxWidth: 1024,
    width: '100%',
    textAlign: 'center',
    padding: 32,
    overflow: 'hidden',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.up('sm')]: {
      padding: 48,
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 32,
      paddingRight: 64,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: 80,
      paddingRight: 80,
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
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const UnlockScreen = () => {
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
            <Grid item xs={12} md={6}>
              <img
                className={classes.styledImg}
                src={'/images/userPageImages/Unlock.png'}
                alt='crema'
                title='crema'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box mb={{xs: 6, xl: 8}} fontWeight={Fonts.BOLD} fontSize={20}>
                <IntlMessages id='common.unlockScreen' />
              </Box>
              <Box mb={{xs: 5, xl: 8}} fontSize={14}>
                <Typography component='span'>
                  <IntlMessages id='common.unlockScreenTextOne' />
                </Typography>
                <Typography component='span'>
                  <IntlMessages id='common.unlockScreenTextTwo' />
                </Typography>
              </Box>
              <Formik
                validateOnChange={true}
                initialValues={{
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(data, {resetForm}) => {
                  resetForm();
                }}>
                {({isSubmitting}) => (
                  <Form className={classes.form}>
                    <Box mb={{xs: 5, lg: 8}}>
                      <MyTextField
                        name='password'
                        label={<IntlMessages id='common.password' />}
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
                      <IntlMessages id='common.unlockItForMe' />
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default UnlockScreen;
