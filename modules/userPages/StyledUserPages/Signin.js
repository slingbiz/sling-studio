import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from '@material-ui/core/Button';
import {Checkbox, makeStyles} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import Box from '@material-ui/core/Box';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => ({
  styledImg: {
    height: 430,
    display: 'inline-block',
    [theme.breakpoints.up('lg')]: {
      paddingRight: 40,
    },
    [theme.breakpoints.up('xl')]: {
      height: 'auto',
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
  },
  grid: {
    textAlign: 'center',
  },
  form: {
    textAlign: 'left',
    marginBottom: 16,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 48,
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: 24,
    },
  },
  button: {
    width: '100%',
    height: 44,
  },
  iconColor: {
    color: theme.palette.text.primary,
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
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const Signin = (props) => {
  const classes = useStyles(props);
  const {messages} = useIntl();
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
              <img
                className={classes.styledImg}
                src={'/images/userPageImages/login.png'}
                alt='crema'
                title='crema'
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.grid}>
              <Box mb={{xs: 3, xl: 8}} fontWeight={Fonts.BOLD} fontSize={20}>
                <IntlMessages id='common.login' />
              </Box>

              <Formik
                validateOnChange={true}
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(data, {setSubmitting, resetForm}) => {
                  resetForm();
                }}>
                {({isSubmitting}) => (
                  <Form className={classes.form} noValidate autoComplete='off'>
                    <Box mb={{xs: 5, xl: 10}}>
                      <MyTextField
                        placeholder={messages['common.email']}
                        label={<IntlMessages id='common.email' />}
                        name='email'
                        variant='outlined'
                        className={classes.textField}
                      />
                    </Box>

                    <Box mb={{xs: 3, xl: 8}}>
                      <MyTextField
                        type='password'
                        placeholder={messages['common.password']}
                        label={<IntlMessages id='common.password' />}
                        name='password'
                        variant='outlined'
                        className={classes.textField}
                      />
                    </Box>

                    <Box
                      mb={{xs: 3, xl: 8}}
                      display='flex'
                      flexDirection={{xs: 'column', sm: 'row'}}
                      alignItems={{sm: 'center'}}>
                      <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'>
                        <Box ml={-3}>
                          <Checkbox />
                        </Box>
                        <Box component='span' fontSize={14}>
                          <IntlMessages id='common.rememberMe' />
                        </Box>
                      </Box>
                      <Box
                        component='span'
                        ml={{xs: 0, sm: 'auto'}}
                        mt={{xs: 2, sm: 0}}
                        color='primary.main'
                        fontWeight={Fonts.BOLD}
                        fontSize={14}
                        className={classes.pointer}>
                        <IntlMessages id='common.forgetPassword' />
                      </Box>
                    </Box>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      disabled={isSubmitting}
                      className={classes.button}>
                      <IntlMessages id='common.login' />
                    </Button>
                  </Form>
                )}
              </Formik>

              <Box
                mb={3}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                justifyContent={{sm: 'center'}}
                alignItems={{sm: 'center'}}>
                <Box component='span' color={grey[600]} fontSize={14} mr={4}>
                  <IntlMessages id='common.orLoginWith' />
                </Box>
                <Box display='inline-block'>
                  <IconButton>
                    <FacebookIcon className={classes.iconColor} />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon className={classes.iconColor} />
                  </IconButton>
                  <IconButton>
                    <TwitterIcon className={classes.iconColor} />
                  </IconButton>
                </Box>
              </Box>

              <Box color={grey[700]} fontSize={14} fontWeight={Fonts.BOLD}>
                <Box component='span' mr={2}>
                  <IntlMessages id='common.dontHaveAccount' />
                </Box>
                <Box
                  component='span'
                  color='primary.main'
                  className={classes.pointer}>
                  <IntlMessages id='common.signup' />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default Signin;
