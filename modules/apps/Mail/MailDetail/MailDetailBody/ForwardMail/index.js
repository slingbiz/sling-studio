import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button/index';
import InputAdornment from '@material-ui/core/InputAdornment/index';
import {Form, Formik, useField} from 'formik/dist/index';
import * as yup from 'yup';
import IntlMessages from '../../../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useAuthUser} from '../../../../../../@crema/utility/AppHooks';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontWeight: Fonts.MEDIUM,
  },
  pointer: {
    cursor: 'pointer',
  },
  textareaAutosize: {
    width: '100%',
    '& .MuiInput-underline:before': {
      display: 'none',
    },
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: grey[700],
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: grey[800],
      color: theme.palette.primary.contrastText,
    },
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
  to: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  cc: yup.string().email(<IntlMessages id='validation.emailFormat' />),
});

const MailForward = (props) => {
  const {onSubmitForwardedMail, selectedMail} = props;
  const [isShowCC, onShowCC] = useState(false);

  const onShowCcInput = () => {
    onShowCC(true);
  };

  const user = useAuthUser();

  const {messages} = useIntl();

  const classes = useStyles(props);

  return (
    <Box border={1} borderColor='grey.300' borderRadius='0.125rem' mt={4} p={5}>
      <Formik
        validateOnChange={true}
        initialValues={{
          to: '',
          cc: '',
          content: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          const mail = {
            id: Math.floor(Math.random()) * 1000000,
            isChecked: false,
            isStarred: selectedMail.isStarred,
            isReplied: selectedMail.isReplied,
            label: selectedMail.label,
            sentBy: user.displayName,
            subject: selectedMail.subject,
            isAttachment: true,
            sentAt: '10.30am',
            sentOn: moment().format('llll'),
            isRead: true,
            folderValue: 122,
            senderMailId: user.email,
            ...data,
          };
          onSubmitForwardedMail(mail);
          resetForm();
          setSubmitting(false);
        }}>
        {({isSubmitting, values, handleChange}) => (
          <Form>
            <Box display='flex' alignItems='center'>
              <MyTextField
                fullWidth
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position='start'
                      className={classes.fontBold}>
                      <IntlMessages id='common.to' />
                    </InputAdornment>
                  ),
                }}
                name='to'
              />

              <Box
                component='span'
                ml={4}
                className={classes.pointer}
                onClick={onShowCcInput}>
                <IntlMessages id='common.cc' />
              </Box>
            </Box>

            {isShowCC ? (
              <MyTextField
                placeholder={messages['common.cc']}
                fullWidth
                margin='normal'
                name='cc'
              />
            ) : null}

            <Box mb={4}>
              <TextField
                className={classes.textareaAutosize}
                rows='7'
                name='content'
                multiline
                value={values.content}
                onChange={handleChange}
              />
            </Box>

            <Button
              className={classes.btnRoot}
              type='submit'
              disabled={isSubmitting}>
              <IntlMessages id='common.send' />
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default MailForward;

MailForward.prototype = {
  onSubmitForwardedMail: PropTypes.func,
  selectedMail: PropTypes.object.isRequired,
};
