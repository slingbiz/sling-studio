import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';

import InfoView from '../../../@sling/core/InfoView';
import {onJwtUserSignUp} from '../../../redux/actions';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@sling/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import {
  SLING_MUTED,
  authButtonStyles,
  authFieldStyles,
  authLinkStyles,
} from '../authChrome';

const useStyles = makeStyles(() => ({
  formRoot: {
    textAlign: 'left',
  },
  field: authFieldStyles,
  submit: {
    ...authButtonStyles,
    marginTop: 8,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: SLING_MUTED,
    textAlign: 'right',
  },
  link: authLinkStyles,
  error: {
    marginTop: 12,
    fontSize: 14,
    color: '#c62828',
  },
}));

const MyTextField = ({serverError, ...props}) => {
  const [field, meta] = useField(props);
  const errorText =
    (meta.error && meta.touched ? meta.error : '') || serverError || '';
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

const SignupJwtAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const signupError = useSelector(({common}) => common.error);
  const signupErrorText = signupError ? String(signupError) : '';
  const emailTakenError = /email already taken/i.test(signupErrorText)
    ? signupErrorText
    : '';
  const classes = useStyles();

  return (
    <Box>
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
              onJwtUserSignUp(
                {
                  email: data.email,
                  password: data.password,
                  name: data.name,
                },
                router,
              ),
            );
            setSubmitting(false);
          }
        }}>
        {({isSubmitting}) => (
          <Form className={classes.formRoot} noValidate autoComplete='off'>
            <Box mb={2.5}>
              <MyTextField
                label={<IntlMessages id='common.name' />}
                name='name'
                variant='outlined'
                className={classes.field}
              />
            </Box>
            <Box mb={2.5}>
              <MyTextField
                label={<IntlMessages id='common.email' />}
                name='email'
                variant='outlined'
                className={classes.field}
                serverError={emailTakenError}
              />
            </Box>
            <Box mb={2.5}>
              <MyTextField
                label={<IntlMessages id='common.password' />}
                name='password'
                type='password'
                variant='outlined'
                className={classes.field}
              />
            </Box>
            <Box mb={2}>
              <MyTextField
                label={<IntlMessages id='common.retypePassword' />}
                name='confirmPassword'
                type='password'
                variant='outlined'
                className={classes.field}
              />
            </Box>
            <Button
              disabled={isSubmitting}
              className={classes.submit}
              type='submit'>
              Create account
            </Button>
            {signupErrorText && !emailTakenError ? (
              <Box className={classes.error} role='alert'>
                {signupErrorText}
              </Box>
            ) : null}
            <Box className={classes.footer}>
              Already have an account?{' '}
              <Link href='/signin' className={classes.link}>
                Sign in
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
      <InfoView />
    </Box>
  );
};

export default SignupJwtAuth;
