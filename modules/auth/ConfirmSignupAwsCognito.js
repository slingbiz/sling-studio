import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import ReactCodeInput from 'react-code-input';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import { useRouter } from 'next/router'
import {fetchError, onConfirmCognitoUserSignup} from '../../redux/actions';
import InfoView from '../../@crema/core/InfoView';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../shared/constants/AppEnums';

const ConfirmSignupAwsCognito = (props) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [pin, setPin] = useState('');

  const {messages} = useIntl();

  const handleSubmit = () => {
    const {email} = props.location.state || {};
    if (email && pin.length === 6) {
      dispatch(onConfirmCognitoUserSignup(email, pin, router));
    } else if (!email) {
      router.push('/signup');
      fetchError(messages['validation.tryAgain']);
    } else {
      fetchError(messages['validation.pinLength']);
    }
  };

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
    btnRoot: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      width: '100%',
      fontWeight: Fonts.MEDIUM,
      fontSize: 16,
      paddingTop: 12,
      paddingBottom: 12,
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
            <IntlMessages id='common.emailVerification' />
          </Box>
          <Box mb={{xs: 5, xl: 10}} fontSize={18}>
            <Typography>
              <IntlMessages id='common.verificationMessage' />
            </Typography>
          </Box>

          <Box mb={{xs: 6, xl: 10}}>
            <ReactCodeInput
              type='password'
              value={pin}
              fields={6}
              onChange={(value) => setPin(value)}
            />
          </Box>

          <Button
            variant='contained'
            color='secondary'
            className={classes.btnRoot}
            onClick={handleSubmit}>
            <IntlMessages id='common.submit' />
          </Button>
          <InfoView />
        </Card>
      </Box>
    </Box>
  );
};

export default ConfirmSignupAwsCognito;
