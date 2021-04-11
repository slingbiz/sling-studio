import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import ReactCodeInput from 'react-code-input';
import {useDispatch} from 'react-redux';
import {fetchError, onSetNewCognitoPassword} from '../../redux/actions';
import { useRouter } from 'next/router'
import InfoView from '../../@crema/core/InfoView';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../@crema/utility/IntlMessages';
import Typography from '@material-ui/core/Typography';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../shared/constants/AppEnums';

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
  newPassword: yup
    .string()
    .required(<IntlMessages id='validation.enterNewPassword' />),
  confirmPassword: yup
    .string()
    .required(<IntlMessages id='validation.reTypePassword' />),
});

const ResetPasswordAwsCognito = (props) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [pin, setPin] = useState('');

  const {messages} = useIntl();

  const useStyles = makeStyles((theme) => ({
    imgRoot: {
      cursor: 'pointer',
      display: 'inline-block',
      width: 140,
    },
    cardRoot: {
      maxWidth: '32rem',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      padding: 24,
      [theme.breakpoints.up('sm')]: {
        padding: 40,
      },
      [theme.breakpoints.up('md')]: {
        padding: 48,
      },
      [theme.breakpoints.up('xl')]: {
        padding: 64,
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
    formRoot: {
      position: 'relative',
    },
    myTextFieldRoot: {
      width: '100%',
    },
    btnRoot: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      width: '100%',
      fontWeight: Fonts.MEDIUM,
      fontSize: 16,
      paddingTop: 12,
      paddingBottom: 12,
      textTransform: 'capitalize',
    },
  }));
  const classes = useStyles(props);

  return (
    <Box flex={1} display='flex' flexDirection='column' justifyContent='center'>
      <Box mb={{xs: 6, md: 8, xl: 18}} textAlign='center'>
        <img
          className={classes.imgRoot}
          src={'/images/logo-white-with-name.png'}
          alt='crema-logo'
        />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Card className={classes.cardRoot}>
          <Box
            component='h2'
            mb={{xs: 6, xl: 8}}
            color='text.primary'
            fontWeight={Fonts.REGULAR}
            fontSize={{xs: 24, sm: 26}}
            textTransform='uppercase'>
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
            onSubmit={(data, {setErrors, resetForm, setSubmitting}) => {
              const {email} = props.location.state;
              if (pin.length !== 6) {
                dispatch(fetchError(messages['validation.pinLength']));
              } else if (data.newPassword !== data.confirmPassword) {
                setErrors({
                  confirmPassword: (
                    <IntlMessages id='validation.passwordMisMatch' />
                  ),
                });
              } else {
                setSubmitting(true);
                dispatch(
                  onSetNewCognitoPassword(
                    email,
                    pin,
                    data.newPassword,
                    router,
                  ),
                );
                resetForm();
                setSubmitting(false);
              }
            }}>
            {({isSubmitting}) => (
              <Form className={classes.formRoot} noValidate autoComplete='off'>
                <Box mb={{xs: 5, lg: 8}}>
                  <Box mb={6} fontSize={{xs: 16, sm: 18}}>
                    <Typography>
                      <IntlMessages id='common.verificationMessage' />
                    </Typography>
                  </Box>

                  <ReactCodeInput
                    type='password'
                    value={pin}
                    fields={6}
                    onChange={(value) => setPin(value)}
                  />
                </Box>

                <Box mb={{xs: 5, lg: 8}}>
                  <MyTextField
                    name='newPassword'
                    label={<IntlMessages id='common.newPassword' />}
                    className={classes.myTextFieldRoot}
                    variant='outlined'
                    type='password'
                  />
                </Box>

                <Box mb={{xs: 5, lg: 8}}>
                  <MyTextField
                    name='confirmPassword'
                    label={<IntlMessages id='common.retypePassword' />}
                    className={classes.myTextFieldRoot}
                    variant='outlined'
                    type='password'
                  />
                </Box>

                <Button
                  variant='contained'
                  type='submit'
                  disabled={isSubmitting}
                  color='secondary'
                  className={classes.btnRoot}>
                  <IntlMessages id='common.resetMyPassword' />
                </Button>
              </Form>
            )}
          </Formik>
          <InfoView />
        </Card>
      </Box>
    </Box>
  );
};

export default ResetPasswordAwsCognito;
