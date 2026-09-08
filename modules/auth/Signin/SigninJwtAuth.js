import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';

import InfoView from '../../../@sling/core/InfoView';
import {onJwtSignIn} from '../../../redux/actions';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@sling/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import {
  HOSTED_DEMO_EMAIL,
  getHostedDemoValues,
  getSigninInitialValues,
  isLocalStudioApi,
} from './signinInitialValues';
import {
  SLING_CREAM,
  SLING_MUTED,
  SLING_ORANGE,
  authButtonStyles,
  authFieldStyles,
  authLinkStyles,
} from '../authChrome';

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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    fontSize: 14,
    color: SLING_MUTED,
  },
  link: authLinkStyles,
  demo: {
    width: '100%',
    height: 44,
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Open Sans, Helvetica Neue, Arial, sans-serif',
    textTransform: 'none',
    borderRadius: 8,
    boxShadow: 'none',
    backgroundColor: '#fff',
    color: SLING_ORANGE,
    border: `1px solid ${SLING_ORANGE}`,
    '&:hover': {
      backgroundColor: SLING_CREAM,
      boxShadow: 'none',
    },
  },
  demoHint: {
    margin: '-8px 0 16px',
    fontSize: 14,
    color: SLING_MUTED,
  },
}));

const SigninJwtAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {messages} = useIntl();
  const classes = useStyles();
  const showDemo = !isLocalStudioApi();

  return (
    <Box>
      <Formik
        validateOnChange={true}
        initialValues={getSigninInitialValues()}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting}) => {
          setSubmitting(true);
          dispatch(
            onJwtSignIn({email: data.email, password: data.password}, router),
          );
          setSubmitting(false);
        }}>
        {({isSubmitting, setValues}) => (
          <Form className={classes.formRoot} noValidate autoComplete='off'>
            {showDemo ? (
              <>
                <Button
                  type='button'
                  className={classes.demo}
                  onClick={() => setValues(getHostedDemoValues())}>
                  Try demo credentials
                </Button>
                <Box className={classes.demoHint}>
                  Fills {HOSTED_DEMO_EMAIL}
                </Box>
              </>
            ) : null}
            <Box mb={2.5}>
              <MyTextField
                placeholder={messages['common.email']}
                name='email'
                label={<IntlMessages id='common.email' />}
                variant='outlined'
                className={classes.field}
              />
            </Box>
            <Box mb={2}>
              <MyTextField
                type='password'
                placeholder={messages['common.password']}
                label={<IntlMessages id='common.password' />}
                name='password'
                variant='outlined'
                className={classes.field}
              />
            </Box>
            <Button
              type='submit'
              disabled={isSubmitting}
              className={classes.submit}>
              Sign in
            </Button>
            <Box className={classes.footer}>
              <Link href='/forget-password' className={classes.link}>
                Forgot password
              </Link>
              <Box component='span'>
                No account?{' '}
                <Link href='/signup' className={classes.link}>
                  Sign up
                </Link>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <InfoView />
    </Box>
  );
};

export default SigninJwtAuth;
