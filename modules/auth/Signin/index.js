import React, {useState} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SigninJwtAuth from './SigninJwtAuth';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@sling/utility/IntlMessages';
import {makeStyles, fade} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';
import {AUTH_HERO_UNSPLASH_URL} from '../../../shared/constants/authHero';

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
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      flex: '0 0 46%',
      maxWidth: 560,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(6),
    },
  },
  heroSide: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      flex: 1,
      minHeight: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `linear-gradient(125deg, ${fade(theme.palette.primary.main, 0.9)} 0%, ${fade(
        theme.palette.secondary.main,
        0.38,
      )} 55%, ${fade(theme.palette.primary.main, 0.82)} 100%), url("${AUTH_HERO_UNSPLASH_URL}")`,
    },
  },
  cardRoot: {
    maxWidth: '36rem',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 440,
    },
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative',
    paddingTop: 20,
    [theme.breakpoints.up('xl')]: {
      paddingTop: 32,
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
  muiTabsFull: {
    marginLeft: 0,
    marginRight: 0,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '& .MuiTabs-flexContainer': {
      '& .MuiTab-root': {
        flex: 1,
      },
    },
  },
  muiTab: {
    fontWeight: Fonts.MEDIUM,
    fontSize: 16,
    paddingBottom: 16,
    paddingTop: 16,
    marginLeft: 8,
    marginRight: 8,
    color: theme.palette.text.secondary,
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
}));

const Signin = (props) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const classes = useStyles(props);

  return (
    <Box className={classes.splitRoot}>
      <Box className={classes.splitLeft}>
        <Box mt={{xs: 6, md: 4}} mb={{xs: 3, md: 4}} textAlign='center'>
          <img
            className={classes.imgRoot}
            src='/images/sling-fe.png'
            alt='sling-logo'
          />
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          width='100%'>
          <Card className={classes.cardRoot}>
            <Box px={{xs: 6, sm: 10, xl: 15}}>
              <Box
                component='h2'
                mb={{xs: 3, xl: 6}}
                color='text.primary'
                fontWeight={Fonts.REGULAR}
                fontSize={{xs: 24, xl: 26}}>
                <IntlMessages id='common.login' />
              </Box>
            </Box>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              aria-label='simple tabs example'
              className={classes.muiTabsFull}>
              <Tab className={classes.muiTab} {...a11yProps(0)} />
            </Tabs>

            <>
              <SigninJwtAuth />
            </>
          </Card>
        </Box>
      </Box>
      <Box className={classes.heroSide} role='presentation' />
    </Box>
  );
};

export default Signin;
