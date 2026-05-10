import React from 'react';
import SigninJwtAuth from './SigninJwtAuth';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IntlMessages from '../../../@sling/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import AuthHeroPanel from '../AuthHeroPanel';

const useStyles = makeStyles((theme) => ({
  imgRoot: {
    cursor: 'pointer',
    display: 'inline-block',
    width: 140,
  },
  splitRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'stretch',
      minHeight: '100vh',
    },
  },
  splitLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(4, 3),
    [theme.breakpoints.up('md')]: {
      flex: '0 0 50%',
      padding: theme.spacing(4, 6),
    },
  },
  formWrapper: {
    width: '100%',
    maxWidth: 420,
  },
  pageTitle: {
    fontWeight: Fonts.BOLD,
    fontSize: 26,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  pageSubtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    fontSize: 14,
  },
}));

const Signin = (props) => {
  const {messages} = useIntl();
  const classes = useStyles(props);

  return (
    <Box className={classes.splitRoot}>
      <Box className={classes.splitLeft}>
        <Box className={classes.formWrapper}>
          <Box mb={4} textAlign='center'>
            <img
              className={classes.imgRoot}
              src='/images/sling-fe.png'
              alt='sling-logo'
            />
          </Box>

          <Typography className={classes.pageTitle} component='h1' align='center'>
            <IntlMessages id='common.login' />
          </Typography>
          <Typography className={classes.pageSubtitle} align='center'>
            <IntlMessages id='common.authHeroSubtitleLogin' />
          </Typography>

          <SigninJwtAuth />
        </Box>
      </Box>
      <AuthHeroPanel
        headline={messages['common.authHeroHeadlineLogin']}
        subtitle={messages['common.authHeroSubtitleLogin']}
      />
    </Box>
  );
};

export default Signin;
