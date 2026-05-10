import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles, fade} from '@material-ui/core/styles';
import {Fonts} from '../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flex: 1,
      minHeight: '100vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: `linear-gradient(160deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${fade(theme.palette.secondary.main, 0.85)} 100%)`,
    },
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: 420,
    padding: theme.spacing(4),
  },
  logoImg: {
    width: 160,
    marginBottom: theme.spacing(5),
    filter: 'brightness(0) invert(1)',
    opacity: 0.95,
  },
  headline: {
    color: '#fff',
    fontWeight: Fonts.BOLD,
    fontSize: 28,
    lineHeight: 1.3,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      fontSize: 32,
    },
  },
  subtitle: {
    color: fade('#ffffff', 0.82),
    fontSize: 16,
    lineHeight: 1.6,
    [theme.breakpoints.up('lg')]: {
      fontSize: 17,
    },
  },
  circle1: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: '50%',
    border: `1px solid ${fade('#ffffff', 0.1)}`,
    top: -60,
    right: -80,
    zIndex: 1,
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: '50%',
    backgroundColor: fade('#ffffff', 0.04),
    bottom: 60,
    left: -50,
    zIndex: 1,
  },
  circle3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: '50%',
    border: `1px solid ${fade('#ffffff', 0.08)}`,
    top: '40%',
    right: 40,
    zIndex: 1,
  },
  dot1: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: fade('#ffffff', 0.2),
    top: '25%',
    left: '20%',
    zIndex: 1,
  },
  dot2: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: fade('#ffffff', 0.15),
    bottom: '30%',
    right: '25%',
    zIndex: 1,
  },
}));

const AuthHeroPanel = ({headline, subtitle}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <span className={classes.circle1} />
      <span className={classes.circle2} />
      <span className={classes.circle3} />
      <span className={classes.dot1} />
      <span className={classes.dot2} />

      <Box className={classes.content}>
        <img
          className={classes.logoImg}
          src='/images/sling-fe.png'
          alt='Sling'
        />
        <Typography className={classes.headline} component='h2'>
          {headline}
        </Typography>
        <Typography className={classes.subtitle}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthHeroPanel;
