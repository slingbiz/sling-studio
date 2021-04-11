import React from 'react';
import {makeStyles} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import InputBase from '@material-ui/core/InputBase';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useDispatch} from 'react-redux';
import {showMessage} from '../../../../redux/actions';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import Box from '@material-ui/core/Box';
import {red} from '@material-ui/core/colors';
import AppCard from '../../../../@crema/core/AppCard';

const useStyles = makeStyles((theme) => ({
  crInput: {
    width: '100%',
    height: '100%',
    '& input[type="text"]': {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      backgroundColor: 'white',
      color: 'black',
      padding: '12px 16px',
      fontSize: 14,
    },

    '& .MuiFormHelperText-root.Mui-error': {
      color: 'white',
    },
  },
  crBtn: {
    width: '100%',
  },
}));

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return <InputBase {...props} {...field} error={!!errorText} />;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
});

const Subscribe = (props) => {
  const dispatch = useDispatch();

  const {messages} = useIntl();

  const classes = useStyles(props);

  return (
    <AppCard
      height={1}
      style={{backgroundColor: red[600], color: 'white'}}
      titleStyle={{color: 'white'}}
      title={messages['dashboard.subscribe']}>
      <Box component='p' mb={6} pr={4} fontSize={14}>
        <IntlMessages id='dashboard.subscribeContent' />
      </Box>
      <Formik
        validateOnChange={true}
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          dispatch(
            showMessage(<IntlMessages id='message.thankYouSubscription' />),
          );
          setSubmitting(false);
          resetForm();
        }}>
        {({isSubmitting}) => (
          <Box textAlign='left' mt={8} clone>
            <Form>
              <Box display='flex'>
                <Box width='75%'>
                  <MyTextField
                    placeholder={messages['common.email']}
                    name='email'
                    label={<IntlMessages id='common.emailAddress' />}
                    inputProps={{
                      'aria-label': 'naked',
                    }}
                    className={classes.crInput}
                  />
                </Box>
                <Box ml={5} width={80} color='primary.contrastText'>
                  <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                    className={classes.crBtn}
                    type='submit'>
                    <Box fontSize={{xs: 30, xl: 48}} clone>
                      <ChevronRightIcon />
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </AppCard>
  );
};

export default Subscribe;
