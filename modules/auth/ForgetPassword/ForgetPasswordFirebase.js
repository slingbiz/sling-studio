import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import InfoView from '../../../@crema/core/InfoView';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {onForgetPasswordFirebaseUser} from '../../../redux/actions';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import Link from 'next/link';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'inline-block',
    cursor: 'pointer',
    width: 140,
  },
  card: {
    maxWidth: 576,
    width: '100%',
    textAlign: 'center',
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('sm')]: {
      padding: 40,
    },
    [theme.breakpoints.up('md')]: {
      padding: 48,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: 48,
      paddingRight: 48,
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      width: 130,
      height: 9,
      borderBottomRightRadius: 80,
      borderBottomLeftRadius: 80,
      marginRight: 'auto',
      marginLeft: 'auto',
      backgroundColor: theme.palette.primary.main,
    },
  },
  form: {
    textAlign: 'left',
  },
  textField: {
    width: '100%',
  },
  btnRoot: {
    width: '100%',
    fontWeight: Fonts.REGULAR,
    textTransform: 'capitalize',
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
  },
  textSecondary: {
    color: theme.palette.primary.main,
    marginLeft: 10,
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
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
});

const ForgetPasswordFirebase = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <Box flex={1} display='flex' flexDirection='column' justifyContent='center'>
      <Box mb={{xs: 6, md: 8, xl: 18}} textAlign='center'>
        <img
          className={classes.image}
          src={'/images/logo-white-with-name.png'}
          alt='crema-logo'
        />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Card className={classes.card}>
          <Box
            component='h2'
            mb={{xs: 6, xl: 8}}
            color='text.primary'
            fontWeight={Fonts.REGULAR}
            fontSize={{xs: 24, xl: 26}}
            textTransform='uppercase'>
            <IntlMessages id='common.forgetPassword' />
          </Box>
          <Box mb={{xs: 6, xl: 12}} fontSize={18}>
            <Typography>
              <IntlMessages id='common.forgetPasswordTextOne' /> <br />
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
              dispatch(onForgetPasswordFirebaseUser(data.email));
              setSubmitting(false);
              resetForm();
            }}>
            {({isSubmitting}) => (
              <Form className={classes.form}>
                <Box mb={{xs: 5, lg: 8}}>
                  <MyTextField
                    placeholder='Email'
                    name='email'
                    label={<IntlMessages id='common.emailAddress' />}
                    className={classes.textField}
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <Button
                    variant='contained'
                    color='secondary'
                    disabled={isSubmitting}
                    className={classes.btnRoot}
                    type='submit'>
                    <IntlMessages id='common.sendNewPassword' />
                  </Button>
                </Box>

                <Box
                  pt={3}
                  textAlign='center'
                  fontSize={15}
                  className={classes.textGrey}>
                  <IntlMessages id='common.alreadyHavePassword' />
                  <Link
                    href='/signin'
                   >
                    <a  className={clsx(
                      classes.underlineNone,
                      classes.textSecondary,
                    )}><IntlMessages id='common.signIn' /></a>
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>

          <InfoView />
        </Card>
      </Box>
    </Box>
  );
};

export default ForgetPasswordFirebase;
