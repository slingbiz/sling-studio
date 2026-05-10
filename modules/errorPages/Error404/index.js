import React from 'react';
import Button from '@material-ui/core/Button';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../@sling/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import AuthHeroPanel from '../../auth/AuthHeroPanel';

const useStyles = makeStyles((theme) => ({
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
  contentWrapper: {
    width: '100%',
    maxWidth: 420,
    textAlign: 'center',
  },
  imgRoot: {
    cursor: 'pointer',
    display: 'inline-block',
    width: 140,
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
  btnRoot: {
    borderRadius: theme.overrides?.MuiCard?.root?.borderRadius || 12,
    width: '100%',
    fontWeight: Fonts.BOLD,
    fontSize: 16,
    textTransform: 'capitalize',
    height: 50,
  },
}));

const Error404 = () => {
  const router = useRouter();
  const classes = useStyles();

  const onGoBackToHome = () => {
    router.push('/');
  };

  return (
    <Box className={classes.splitRoot}>
      <Box className={classes.splitLeft}>
        <Box className={classes.contentWrapper}>
          <Box mb={4}>
            <img
              className={classes.imgRoot}
              src='/images/sling-fe.png'
              alt='sling-logo'
            />
          </Box>

          <Typography className={classes.pageTitle} component='h1'>
            <IntlMessages id='error.404Error' />
          </Typography>
          <Typography className={classes.pageSubtitle}>
            <IntlMessages id='error.message1' />
          </Typography>

          <Box mt={4}>
            <Button
              variant='contained'
              color='secondary'
              className={classes.btnRoot}
              onClick={onGoBackToHome}>
              <IntlMessages id='error.goBackToHome' />
            </Button>
          </Box>
        </Box>
      </Box>
      <AuthHeroPanel
        headline='Page Not Found'
        subtitle='The page you are looking for might have been removed or is temporarily unavailable.'
      />
    </Box>
  );
};

export default Error404;
