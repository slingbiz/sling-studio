import React, {useEffect, useState} from 'react';
import {Box, Button, MenuItem, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import MuiPhoneNumber from 'material-ui-phone-number';
import IntlMessages from '../../../../@sling/utility/IntlMessages';
import {countries} from '../../../../shared/constants/CountryList';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateCompanyInfo,
  updateStoreInfo,
} from '../../../../redux/actions/AccountAction';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../../../aiBuilder/slingTheme';

const validationStoreSchema = yup.object({
  orgName: yup
    .string()
    .required(<IntlMessages id='validation.orgNameRequired' />),
  companyName: yup
    .string()
    .required(<IntlMessages id='validation.companyNameRequired' />),
  address1: yup
    .string()
    .required(<IntlMessages id='validation.address1Required' />),
  city: yup.string().required(<IntlMessages id='validation.cityRequired' />),
  country: yup
    .string()
    .required(<IntlMessages id='validation.countryRequired' />),
});

const validationCompanySchema = yup.object({
  storeName: yup
    .string()
    .required(<IntlMessages id='validation.titleRequired' />),
  clientUrl: yup
    .string()
    .required('A base domain url of your frontend is required for previews'),
  storeDescription: yup
    .string()
    .required(<IntlMessages id='validation.widgetTypeRequired' />),
});

const initialValuesCompany = {
  storeName: '',
  clientUrl: '',
  storeDescription: '',
  wlIp: '',
};
const initialValuesStore = {
  email: '',
  orgName: '',
  companyName: '',
  address1: '',
  address2: '',
  phoneNumber: '',
  city: '',
  zipCode: '',
  country: '',
  region: '',
};

const useStyles = makeStyles(() => ({
  page: {
    padding: '12px 28px 32px',
    background: '#fff',
    fontFamily: 'Open Sans, sans-serif',
  },
  section: {
    padding: '8px 0 28px',
    borderBottom: '1px solid #eee',
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 8,
    },
  },
  sectionHead: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    background: '#fff',
    padding: '8px 0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    lineHeight: 1.35,
    fontFamily: 'Open Sans, sans-serif',
  },
  sectionHint: {
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.5,
    marginTop: 6,
    maxWidth: 640,
    fontFamily: 'Open Sans, sans-serif',
  },
  fields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4px 20px',
    width: '100%',
    '@media (max-width: 720px)': {
      gridTemplateColumns: '1fr',
    },
  },
  fieldWide: {
    gridColumn: '1 / -1',
  },
  fieldWrap: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: SLING_INK,
    marginBottom: 6,
    display: 'block',
    fontFamily: 'Open Sans, sans-serif',
  },
  field: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      background: SLING_CREAM,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px',
      fontSize: 14,
    },
    '& .MuiFormHelperText-root': {
      fontSize: 14,
    },
  },
  primaryBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    flexShrink: 0,
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexShrink: 0,
  },
}));

const CommonTextField = ({classes, label, required, select, wide, children, ...props}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <Box className={`${classes.fieldWrap}${wide ? ` ${classes.fieldWide}` : ''}`}>
      <Typography
        className={classes.fieldLabel}
        component='label'
        htmlFor={props.id || props.name}>
        {label}
        {required ? ' *' : ''}
      </Typography>
      <TextField
        id={props.id || props.name}
        {...props}
        {...field}
        select={select}
        required={required}
        helperText={errorText}
        error={!!errorText}
        variant='outlined'
        fullWidth
        className={classes.field}>
        {children}
      </TextField>
    </Box>
  );
};

const CompanyDetails = () => {
  const classes = useStyles();
  const [companyState, setCompanyState] = useState(initialValuesCompany);
  const [storeState, setStoreState] = useState(initialValuesStore);
  const {account} = useSelector(({account}) => account);
  const dispatch = useDispatch();

  useEffect(() => {
    setCompanyState((prev) => ({
      ...prev,
      storeName: account?.storeName,
      clientUrl: account?.clientUrl,
      storeDescription: account?.storeDescription,
      wlIp: account?.wlIp,
    }));
    setStoreState((prev) => ({
      ...prev,
      email: account?.email,
      orgName: account?.orgName,
      companyName: account?.companyName,
      address1: account?.address1,
      address2: account?.address2,
      phoneNumber: account?.phoneNumber,
      city: account?.city,
      zipCode: account?.zipCode,
      country: account?.country,
      region: account?.region,
    }));
  }, [account]);

  return (
    <>
      <Box className={classes.page}>
        <Box className={classes.section}>
          <Formik
            enableReinitialize
            validateOnChange={true}
            initialValues={companyState}
            validationSchema={validationCompanySchema}
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              dispatch(updateCompanyInfo(account.id, data));
              setSubmitting(false);
            }}>
            {({isSubmitting}) => (
              <Form noValidate autoComplete='off'>
                <Box className={classes.sectionHead}>
                  <Box>
                    <Typography className={classes.sectionTitle}>
                      Site settings
                    </Typography>
                    <Typography className={classes.sectionHint}>
                      General information about your frontend website. The base
                      URL is used for every route added in Studio.
                    </Typography>
                  </Box>
                  <Box className={classes.actions}>
                    <Button
                      className={classes.primaryBtn}
                      type='submit'
                      disabled={isSubmitting}>
                      Save
                    </Button>
                  </Box>
                </Box>
                <Box className={classes.fields}>
                  <CommonTextField
                    classes={classes}
                    required
                    name='storeName'
                    label={<IntlMessages id='common.storeName' />}
                  />
                  <CommonTextField
                    classes={classes}
                    required
                    name='clientUrl'
                    label='Frontend store domain'
                  />
                  <CommonTextField
                    classes={classes}
                    required
                    wide
                    name='storeDescription'
                    label={<IntlMessages id='common.storeDescription' />}
                  />
                  <CommonTextField
                    classes={classes}
                    wide
                    name='wlIp'
                    label={<IntlMessages id='common.wlIp' />}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

        <Box className={classes.section}>
          <Formik
            enableReinitialize
            validateOnChange={true}
            initialValues={storeState}
            validationSchema={validationStoreSchema}
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              dispatch(updateStoreInfo(account.id, data));
              setSubmitting(false);
            }}>
            {({isSubmitting, values, setFieldValue}) => (
              <Form noValidate autoComplete='off'>
                <Box className={classes.sectionHead}>
                  <Box>
                    <Typography className={classes.sectionTitle}>
                      Company information
                    </Typography>
                    <Typography className={classes.sectionHint}>
                      This address is used on invoices. The email here is your
                      primary contact.
                    </Typography>
                  </Box>
                  <Box className={classes.actions}>
                    <Button
                      className={classes.primaryBtn}
                      type='submit'
                      disabled={isSubmitting}>
                      Save
                    </Button>
                  </Box>
                </Box>
                <Box className={classes.fields}>
                  <CommonTextField
                    classes={classes}
                    required
                    name='orgName'
                    label='Organization name'
                  />
                  <CommonTextField
                    classes={classes}
                    required
                    name='companyName'
                    label='Company name'
                  />
                  <CommonTextField
                    classes={classes}
                    required
                    disabled
                    name='email'
                    label='Primary email'
                  />
                  <Box className={classes.fieldWrap}>
                    <Typography className={classes.fieldLabel} component='label'>
                      Phone *
                    </Typography>
                    <MuiPhoneNumber
                      required
                      value={values.phoneNumber || ''}
                      name='phoneNumber'
                      variant='outlined'
                      fullWidth
                      defaultCountry={'ae'}
                      className={classes.field}
                      onChange={(value) => setFieldValue('phoneNumber', value)}
                    />
                  </Box>
                  <CommonTextField
                    classes={classes}
                    required
                    wide
                    name='address1'
                    label='Address 1'
                  />
                  <CommonTextField
                    classes={classes}
                    wide
                    name='address2'
                    label='Address 2'
                  />
                  <CommonTextField
                    classes={classes}
                    required
                    name='city'
                    label='City'
                  />
                  <CommonTextField
                    classes={classes}
                    name='zipCode'
                    label='ZIP / Postal code'
                  />
                  <CommonTextField
                    classes={classes}
                    required
                    name='region'
                    label='Region'
                  />
                  <CommonTextField
                    classes={classes}
                    required
                    name='country'
                    select
                    label='Country'>
                    {countries.map((option) => (
                      <MenuItem key={option.code} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </CommonTextField>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default CompanyDetails;
