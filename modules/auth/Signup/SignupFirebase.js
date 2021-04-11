import React from 'react';
import TextField from '@material-ui/core/TextField';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from '@material-ui/core/Button';
import {Checkbox} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch} from 'react-redux';

import InfoView from '../../../@crema/core/InfoView';
import {
  onSignUpFirebaseUser,
  signInUserWithFacebook,
  signInUserWithGithub,
  signInUserWithGoogle,
  signInUserWithTwitter,
} from '../../../redux/actions';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {Fonts} from '../../../shared/constants/AppEnums';
import Grid from '@material-ui/core/Grid';
import {GridContainer} from '../../../@crema';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
  formRoot: {
    textAlign: 'left',
  },
  myTextFieldRoot: {
    width: '100%',
  },
  checkboxRoot: {
    marginLeft: -12,
  },
  pointer: {
    cursor: 'pointer',
  },
  btnRoot: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    width: '10rem',
    fontWeight: Fonts.LIGHT,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  dividerRoot: {
    marginBottom: 10,
    marginLeft: -48,
    marginRight: -48,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 20,
    },
  },
  iconButtonRoot: {
    marginLeft: 4,
    marginRight: 4,
    color: theme.palette.grey[500],
    '&:hover, &:focus': {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 8,
      marginRight: 8,
    },
  },
  textLg: {
    fontSize: 18,
  },
  textPrimary: {
    color: theme.palette.text.primary,
  },
  colorTextPrimary: {
    color: theme.palette.primary.main,
  },
  underlineNone: {
    textDecoration: 'none',
  },
  textGrey: {
    color: theme.palette.grey[500],
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

const SignupFirebase = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles(props);
  return (
    <Box flex={1} display='flex' flexDirection='column'>
      <Box
        px={{xs: 6, sm: 10, xl: 15}}
        pt={8}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setErrors, setSubmitting}) => {
            if (data.password !== data.confirmPassword) {
              setErrors({
                confirmPassword: (
                  <IntlMessages id='validation.passwordMisMatch' />
                ),
              });
            } else {
              setSubmitting(true);
              dispatch(
                onSignUpFirebaseUser({
                  email: data.email,
                  password: data.password,
                  name: data.name,
                }),
              );
              setSubmitting(false);
            }
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label={<IntlMessages id='common.name' />}
                  name='name'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label={<IntlMessages id='common.email' />}
                  name='email'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <GridContainer>
                <Grid item xs={12} md={6}>
                  <Box mb={{xs: 0, xl: 4}}>
                    <MyTextField
                      label={<IntlMessages id='common.password' />}
                      name='password'
                      type='password'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box mb={{xs: 3, xl: 4}}>
                    <MyTextField
                      label={<IntlMessages id='common.retypePassword' />}
                      name='confirmPassword'
                      type='password'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                </Grid>
              </GridContainer>

              <Box
                mb={{xs: 3, xl: 4}}
                display='flex'
                alignItems='center'
                fontSize={15}>
                <Box display='flex' alignItems='center'>
                  <Checkbox className={classes.checkboxRoot} />
                  <Box
                    className={classes.textGrey}
                    component='span'
                    mr={2}
                    fontSize={15}>
                    <IntlMessages id='common.iAgreeTo' />
                  </Box>
                </Box>
                <Box
                  color='primary.main'
                  component='span'
                  fontSize={15}
                  className={classes.pointer}>
                  <IntlMessages id='common.termConditions' />
                </Box>
              </Box>

              <Box
                mb={6}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}>
                <Button
                  variant='contained'
                  color='secondary'
                  disabled={isSubmitting}
                  className={classes.btnRoot}
                  type='submit'>
                  <IntlMessages id='common.signup' />
                </Button>

                <Box
                  ml={{sm: 4}}
                  mt={{xs: 3, sm: 0}}
                  color='text.secondary'
                  fontSize={15}>
                  <Box className={classes.textGrey} component='span' mr={1}>
                    <IntlMessages id='common.alreadyHaveAccount' />
                  </Box>
                  <Box component='span'>
                    <Link
                      href='/signin'
                    >
                      <a   className={clsx(
                        classes.underlineNone,
                        classes.colorTextPrimary,
                      )}>  <IntlMessages id='common.signIn' /></a>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        bgcolor={grey[100]}
        px={{xs: 6, sm: 10, xl: 15}}
        py={2}
        display='flex'
        flexDirection={{xs: 'column', sm: 'row'}}
        justifyContent='center'
        alignItems='center'>
        <Box
          component='span'
          className={classes.textGrey}
          mr={{sm: 4}}
          fontSize={15}>
          <IntlMessages id='auth.orSignupWith' />
        </Box>
        <Box display='inline-block'>
          <IconButton
            className={classes.iconButtonRoot}
            onClick={() => dispatch(signInUserWithGoogle())}>
            <i className='zmdi zmdi-google' />
          </IconButton>
          <IconButton
            className={classes.iconButtonRoot}
            onClick={() => dispatch(signInUserWithFacebook())}>
            <FacebookIcon />
          </IconButton>
          <IconButton
            className={classes.iconButtonRoot}
            onClick={() => dispatch(signInUserWithGithub())}>
            <GitHubIcon />
          </IconButton>
          <IconButton
            className={classes.iconButtonRoot}
            onClick={() => dispatch(signInUserWithTwitter())}>
            <TwitterIcon />
          </IconButton>
        </Box>
      </Box>

      <InfoView />
    </Box>
  );
};

export default SignupFirebase;
