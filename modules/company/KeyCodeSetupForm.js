import React, {useState} from 'react';
import * as yup from 'yup';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {orange, grey} from '@material-ui/core/colors';

import {Button, Divider, TextField} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import {onCompanyKeyCodeSetupForm} from '../../redux/actions/AccountAction';
import {useRouter} from 'next/router';
import {Fonts} from '../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 10,
    [theme.breakpoints.up('xl')]: {},
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    margin: 5,
    width: '100%',
    padding: 15,
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.up('xl')]: {},
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  btnSubmit: {
    fontSize: 16,
    fontWeight: Fonts.BOLD,
    backgroundColor: orange[500],
    marginLeft: 15,
    width: 150,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
    },
  },
  btnCancel: {
    fontSize: 16,
    fontWeight: Fonts.BOLD,
    // backgroundColor: 'gray',
    marginLeft: 15,
    width: 150,
    '&:hover, &:focus': {
      backgroundColor: grey[300],
    },
  },
  cardBody: {
    width: '100%',
    flex: 2,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  entryBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    marginTop: 15,
    gap: 10,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const URL =
  /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const validationSchema = yup.object({
  // secret: yup
  //   .string()
  //   .required(<IntlMessages id='validation.secretRequired' />),
  // database: yup
  //   .string()
  //   .required(<IntlMessages id='validation.databaseRequired' />),
  clientUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?|((localhost|[\w-]+):[0-9]+)$/,
      'Enter correct url!',
    )
    .required('Please enter a valid domain'),
});

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

const KeyCodeSetupForm = (props) => {
  const [value, setValue] = useState(0);
  const {user, loading} = useSelector(({auth}) => auth);
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {account} = useSelector(({account}) => account);

  const copyToClipBoard = async () => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(account.apiKey);
    } else {
      return document.execCommand('copy', true, account.apiKey);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}>
      <Box className={classes.cardRoot}>
        <Formik
          validateOnChange={true}
          initialValues={{
            clientUrl: 'http://localhost:4087',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            dispatch(onCompanyKeyCodeSetupForm(user.id, data)).then((res) => {
              setSubmitting(false);
              if (res.status == 201) {
                router.replace('/pages');
              }
            });
          }}>
          {({isSubmitting, values, setFieldValue}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: ['column', 'column', 'column'],
                  justifyContent: 'space-between',
                }}
                style={{marginBottom: 10}}>
                <Box
                  sx={{
                    fontWeight: '500',
                    fontSize: 20,
                    marginBottom: 10,
                  }}>
                  Environment Setup
                </Box>
                {/* <Box style={{marginBottom: 10}}> Note</Box> */}
                <Box style={{marginBottom: 10, fontWeight: 600}}>
                  Note: Please copy and update API Key in the .env of your
                  Sling FE repository.
                </Box>{' '}
                {/* <Box style={{marginBottom: 10}}>
                  This can also be copied later from the URL
                  https://studio.sling.biz/settings/keys-usage or{' '}
                  {`<your-studio>/settings/keys-usage`}
                </Box> */}
              </Box>
              <Divider variant='fullWidth' />
              <Box className={classes.entryBox}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    paddingRight: 20,
                  }}>
                  <Box sx={{fontSize: 18, fontWeight: '800'}}>Your Keys</Box>
                  <Box sx={{marginTop: 5, fontSize: 12, textAlign: 'justify'}}>
                    Please use your secret key inside your Sling Client to
                    access activity from your dashboard. You can also view it
                    from your Settings section on Sling Studio.
                  </Box>
                </Box>
                <Card variant='elevation' className={classes.cardBody}>
                  <Box sx={{fontWeight: 700, fontSize: 14}}>API Key</Box>
                  <Box sx={{display: 'flex', marginTop: 10}}>
                    <TextField
                      value={account?.apiKey}
                      size='small'
                      fullWidth
                      variant='outlined'
                      InputProps={{
                        readOnly: true,
                      }}
                      className={classes.inputText}
                    />

                    <Button
                      onClick={copyToClipBoard}
                      variant='contained'
                      className={classes.btnSubmit}
                      type='submit'
                      color='primary'>
                      Copy
                    </Button>
                  </Box>
                </Card>
              </Box>
              <Box className={classes.entryBox}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    paddingRight: 20,
                  }}>
                  <Box sx={{fontWeight: 700, fontSize: 18}}>
                    Frontend Domain URL *
                  </Box>
                  <Box sx={{marginTop: 5, fontSize: 12, textAlign: 'justify'}}>
                    This is the default domain which will be used for the
                    preview of any pages (page-routes) you have configured using
                    any page templates
                  </Box>
                </Box>
                <Card variant='elevation' className={classes.cardBody}>
                  <MyTextField
                    marginTop={15}
                    name='clientUrl'
                    id='outlined-basic'
                    label='Frontend Domain URL *'
                    placeholder='http://localhost:4087'
                    breadcrumb={'sling.biz'}
                    variant='outlined'
                    margin='dense'
                  />
                </Card>
              </Box>
              {/*<Box className={classes.entryBox}>*/}
              {/*  <Box*/}
              {/*    sx={{*/}
              {/*      display: 'flex',*/}
              {/*      flexDirection: 'column',*/}
              {/*      flex: 1,*/}
              {/*      paddingRight: 20,*/}
              {/*    }}>*/}
              {/*    <Box sx={{fontSize: 25, fontWeight: '800'}}>Database</Box>*/}
              {/*    <Box sx={{marginTop: 5, fontSize: 12, textAlign: 'justify'}}>*/}
              {/*      Lorem ipsum dolor, sit amet consectetur adipisicing elit.*/}
              {/*      Cum quas quidem sed, quibusdam porro reiciendis illum*/}
              {/*      tempore fugiat. Exercitationem, omnis quos in asperiores*/}
              {/*      minus, consectetur maxime voluptas recusandae similique*/}
              {/*    </Box>*/}
              {/*  </Box>*/}
              {/*  <Card variant='elevation' className={classes.cardBody}>*/}
              {/*    <FormControl>*/}
              {/*      <FormLabel id='demo-radio-buttons-group-label'>*/}
              {/*        Select one of database*/}
              {/*      </FormLabel>*/}
              {/*      <RadioGroup*/}
              {/*        aria-labelledby='demo-radio-buttons-group-label'*/}
              {/*        name='database'*/}
              {/*        value={values.database.toString()}*/}
              {/*        onChange={(event) => {*/}
              {/*          setFieldValue('database', event.currentTarget.value);*/}
              {/*        }}*/}
              {/*        defaultValue='female'>*/}
              {/*        <FormControlLabel*/}
              {/*          value='Functional database'*/}
              {/*          control={<Radio />}*/}
              {/*          label='Functional database'*/}
              {/*        />*/}
              {/*        <FormControlLabel*/}
              {/*          value='Blank database'*/}
              {/*          control={<Radio />}*/}
              {/*          label='Blank database'*/}
              {/*        />*/}
              {/*        <FormControlLabel*/}
              {/*          value='Other database'*/}
              {/*          control={<Radio />}*/}
              {/*          label='Other database'*/}
              {/*        />*/}
              {/*      </RadioGroup>*/}
              {/*    </FormControl>*/}
              {/*  </Card>*/}
              {/*</Box>*/}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'end',
                  marginTop: 50,
                }}>
                <Button
                  variant='text'
                  color='gray'
                  className={classes.btnCancel}
                  onClick={() => router.replace('/')}>
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  className={classes.btnSubmit}
                  type='submit'
                  disabled={isSubmitting}
                  color='primary'>
                  Finish
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default KeyCodeSetupForm;
