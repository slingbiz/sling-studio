import React, {useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {Grid, makeStyles, MenuItem} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import TextField from '@material-ui/core/TextField';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import * as yup from 'yup';
import {Form, Formik, useField} from 'formik';
import IntlMessages from '../../../../@sling/utility/IntlMessages';
import Typography from '@material-ui/core/Typography';
import MuiPhoneNumber from 'material-ui-phone-number';
import {Stack} from '@mui/material';
import {countries} from '../../../../shared/constants/CountryList';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateCompanyInfo,
  updateStoreInfo,
} from '../../../../redux/actions/AccountAction';

const CommonTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
      style={{marginTop: 10, marginBottom: 10}}
    />
  );
};

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
  // phoneNumber: yup.number().required('Phone number is not valid'),
  country: yup
    .string()
    .required(<IntlMessages id='validation.countryRequired' />),
});

const validationCompanySchema = yup.object({
  storeName: yup
    .string()
    .required(<IntlMessages id='validation.titleRequired' />),
  storeDomain: yup
    .string()
    .required(<IntlMessages id='validation.descriptionRequired' />),
  storeDescription: yup
    .string()
    .required(<IntlMessages id='validation.widgetTypeRequired' />),
});

const useStyles = makeStyles((theme) => ({
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.up('xl')]: {
      // paddingTop: 32,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    gap: 7,
  },
  button: {
    width: 100,
    backgroundColor: orange[500],
    color: theme.palette.primary.contrastText,
    fontWeight: Fonts.BOLD,
    paddingRight: 20,
    paddingLeft: 20,
  },
  btnSubmit: {
    fontSize: 16,
    fontWeight: Fonts.BOLD,
    backgroundColor: orange[500],
    margin: 'auto',
    marginTop: 20,
    width: 150,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: theme.palette.secondary.contrastText,
    },
  },
  basicFormTxt: {
    margin: 10,
  },
  body: {
    padding: 20,
  },
  navInfo: {
    textAlign: 'justify',
    marginTop: 15,
  },
}));

const initialValuesCompany = {
  storeName: '',
  storeDomain: '',
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

const CompanyDetails = (props) => {
  const classes = useStyles(props);
  const [companyState, setCompanyState] = useState(initialValuesCompany);
  const [storeState, setStoreState] = useState(initialValuesStore);
  const {account} = useSelector(({account}) => account);
  const {user} = useSelector(({auth}) => auth);
  const {messages} = useIntl();
  const {titleKey, pageKey} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    setCompanyState({
      ...companyState,
      storeName: account?.storeName,
      storeDomain: account?.storeDomain,
      storeDescription: account?.storeDescription,
      wlIp: account?.wlIp,
    });
    setStoreState({
      ...storeState,
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
    });
  }, [account]);

  return (
    <>
      {/* <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          <Typography variant='h6'>{titleKey}</Typography>
        </Box>
      </AppsHeader> */}
      <Grid
        px={6}
        pb={8}
        direction='row'
        container
        spacing={10}
        className={classes.body}>
        {/* <Box fontWeight={Fonts.BOLD} component='h3'> */}
        {/* </Box> */}
        <Grid xs={4} item>
          <Box>
            <Typography variant='h5' gutterBottom='true'>
              Site Settings
            </Typography>
            <Typography
              variant='body1'
              gutterBottom='true'
              className={classes.navInfo}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi,
              adipisci quo distinctio totam unde eius error nesciunt repellat
              nam dolor iure quos nulla quia minima officia fugit dolorem iste,
              similique dolores libero aliquid! Fuga, quos aspernatur hic
              exercitationem corporis cum expedita iste. Temporibus beatae
              ducimus perferendis dolorum molestias incidunt magni!
            </Typography>
          </Box>
        </Grid>
        <Grid xs={8} className={classes.boxSection} item>
          <Typography variant='h5' gutterBottom='true'>
            General Information
          </Typography>
          <Formik
            enableReinitialize
            validateOnChange={true}
            initialValues={companyState}
            validationSchema={validationCompanySchema}
            onSubmit={(data, {setSubmitting}) => {
              console.log(data);
              setSubmitting(true);
              dispatch(updateCompanyInfo(account.id, data));
              setSubmitting(false);
            }}>
            {({isSubmitting, setFieldValue, values, handleChange}) => (
              <Form className={classes.formRoot} noValidate autoComplete='off'>
                <CommonTextField
                  required
                  size='small'
                  fullWidth
                  label={<IntlMessages id='common.storeName' />}
                  name='storeName'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
                <CommonTextField
                  required
                  size='small'
                  fullWidth
                  name='storeDomain'
                  label={<IntlMessages id='common.storeDomain' />}
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
                <CommonTextField
                  required
                  size='small'
                  fullWidth
                  name='storeDescription'
                  label={<IntlMessages id='common.storeDescription' />}
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
                <CommonTextField
                  size='small'
                  fullWidth
                  name='wlIp'
                  label={<IntlMessages id='common.wlIp' />}
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />

                <Button
                  variant='contained'
                  className={classes.btnSubmit}
                  type='submit'
                  disabled={isSubmitting}
                  color='primary'>
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
      <Divider />
      <Grid direction='row' container spacing={10} className={classes.body}>
        <Grid xs={4} item>
          <Box>
            <Typography variant='h5' gutterBottom='true'>
              Company Information
            </Typography>
            <Typography
              variant='body1'
              gutterBottom='true'
              className={classes.navInfo}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi,
              adipisci quo distinctio totam unde eius error nesciunt repellat
              nam dolor iure quos nulla quia minima officia fugit dolorem iste,
              similique dolores libero aliquid! Fuga, quos aspernatur hic
              exercitationem corporis cum expedita iste. Temporibus beatae
              ducimus perferendis dolorum molestias incidunt magni!
            </Typography>
          </Box>
        </Grid>
        <Grid xs={8} className={classes.boxSection} item>
          <Typography variant='h5' gutterBottom='true'>
            Store Information
          </Typography>
          <Formik
            enableReinitialize
            validateOnChange={true}
            initialValues={storeState}
            validationSchema={validationStoreSchema}
            onSubmit={(data, {setSubmitting}) => {
              console.log(data);
              setSubmitting(true);
              dispatch(updateStoreInfo(account.id, data));
              setSubmitting(false);
            }}>
            {({isSubmitting, setFieldValue, values, handleChange}) => (
              <Form className={classes.formRoot} noValidate autoComplete='off'>
                <CommonTextField
                  required
                  name='orgName'
                  id='outlined-basic'
                  label='Organization Name'
                  variant='outlined'
                  margin='dense'
                />
                <CommonTextField
                  required
                  name='companyName'
                  id='outlined-basic'
                  label='Company Name '
                  variant='outlined'
                  margin='dense'
                />
                <CommonTextField
                  required
                  name='email'
                  id='outlined-basic'
                  label='Primary Email'
                  variant='outlined'
                  margin='dense'
                />
                <MuiPhoneNumber
                  required
                  value={values.phoneNumber}
                  size='small'
                  name='phoneNumber'
                  label='Phone '
                  variant='outlined'
                  margin='dense'
                  defaultCountry={'ae'}
                  onChange={handleChange('phoneNumber')}
                />
                <Box
                  sx={{
                    alignSelf: 'left',
                    marginTop: 20,
                  }}>
                  <Typography variant='subtitle2'>ADDRESS</Typography>
                </Box>
                <CommonTextField
                  required
                  name='address1'
                  id='outlined-basic'
                  label='Address 1'
                  variant='outlined'
                  margin='dense'
                />
                <CommonTextField
                  name='address2'
                  id='outlined-basic'
                  label='Address 2'
                  variant='outlined'
                  margin='dense'
                />
                <Stack direction='row' spacing={2} alignItems='baseline'>
                  <CommonTextField
                    required
                    name='city'
                    id='outlined-basic'
                    label='City '
                    variant='outlined'
                    margin='dense'
                    fullWidth
                  />
                  <CommonTextField
                    required
                    fullWidth
                    name='zipCode'
                    id='outlined-basic'
                    label='ZIP / Postal code'
                    variant='outlined'
                    margin='dense'
                  />
                </Stack>
                <Stack direction='row' spacing={2} alignItems='baseline'>
                  <CommonTextField
                    required
                    name='region'
                    fullWidth
                    id='outlined-basic'
                    label='Region'
                    variant='outlined'
                    margin='dense'
                  />
                  <CommonTextField
                    required
                    name='country'
                    fullWidth
                    id='outlined-select-currency'
                    select
                    variant='outlined'
                    margin='dense'
                    label='Country'
                    style={{margin: 10}}
                    helperText='Please select your country'>
                    {countries.map((option) => (
                      <MenuItem key={option.code} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </CommonTextField>
                </Stack>
                <Button
                  variant='contained'
                  className={classes.btnSubmit}
                  type='submit'
                  disabled={isSubmitting}
                  color='primary'>
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyDetails;
