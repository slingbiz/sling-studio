import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Checkbox, makeStyles} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../shared/constants/AppEnums';
import {grey} from '@material-ui/core/colors/index';
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
    padding: 32,
    overflow: 'hidden',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0,
    },
  },
  gridContainer: {
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
    },
  },
  gridItem: {
    textAlign: 'center',
  },
  form: {
    textAlign: 'left',
    marginBottom: 24,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 32,
    },
  },
  button: {
    width: '100%',
    height: 44,
  },
  pointer: {
    cursor: 'pointer',
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
  name: yup.string().required(<IntlMessages id='validation.nameRequired' />),
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
  confirmPassword: yup
    .string()
    .required(<IntlMessages id='validation.reTypePassword' />),
});

const Signup = () => {
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
          <Grid container spacing={5} className={classes.gridContainer}>
            <Grid item xs={12} lg={6} className={classes.gridItem}>
              <img
                className={classes.styledImg}
                src={'/images/userPageImages/Signup.png'}
                alt='crema'
                title='crema'
              />
            </Grid>

            <Grid item xs={12} lg={6} className={classes.gridItem}>
              <Box mb={{xs: 6, xl: 8}} fontWeight={Fonts.BOLD} fontSize={20}>
                <IntlMessages id='common.signup' />
              </Box>

              <Formik
                validateOnChange={true}
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(data, {setErrors, resetForm}) => {
                  if (data.password !== data.confirmPassword) {
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
                    <Box mb={{xs: 5, xl: 8}}>
                      <MyTextField
                        label={<IntlMessages id='common.name' />}
                        name='name'
                        variant='outlined'
                        className={classes.textField}
                      />
                    </Box>

                    <Box mb={{xs: 5, xl: 8}}>
                      <MyTextField
                        label={<IntlMessages id='common.email' />}
                        name='email'
                        variant='outlined'
                        className={classes.textField}
                      />
                    </Box>

                    <Box mb={{xs: 5, xl: 8}}>
                      <MyTextField
                        label={<IntlMessages id='common.password' />}
                        name='password'
                        type='password'
                        variant='outlined'
                        className={classes.textField}
                      />
                    </Box>

                    <Box mb={{xs: 5, xl: 8}}>
                      <MyTextField
                        label={<IntlMessages id='common.retypePassword' />}
                        name='confirmPassword'
                        type='password'
                        variant='outlined'
                        className={classes.textField}
                      />
                    </Box>

                    <Box
                      mb={{xs: 5, xl: 6}}
                      display='flex'
                      flexWrap='wrap'
                      alignItems='center'>
                      <Box ml={-3}>
                        <Checkbox />
                      </Box>
                      <Box component='span' mr={2} fontSize={14}>
                        <IntlMessages id='common.iAgreeTo' />
                      </Box>
                      <Box
                        component='span'
                        color='primary.main'
                        fontWeight={Fonts.BOLD}
                        fontSize={14}
                        className={classes.pointer}>
                        <IntlMessages id='common.termConditions' />
                      </Box>
                    </Box>
                    <Button
                      variant='contained'
                      color='primary'
                      disabled={isSubmitting}
                      className={classes.button}
                      type='submit'>
                      <IntlMessages id='common.signup' />
                    </Button>
                  </Form>
                )}
              </Formik>

              <Box
                textAlign='center'
                color={grey[700]}
                fontSize={14}
                fontWeight={Fonts.BOLD}>
                <Box component='span' mr={1}>
                  <IntlMessages id='common.alreadyHaveAccount' />
                </Box>
                <Box
                  component='span'
                  color='primary.main'
                  fontWeight={Fonts.MEDIUM}
                  className={classes.pointer}>
                  <IntlMessages id='common.signInHere' />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default Signup;
