import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import {Fonts} from '../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  p10: {padding: 10},
  imgRoot: {
    cursor: 'pointer',
    display: 'inline-block',
    width: 140,
  },
  cardRoot: {
    maxWidth: '36rem',
    minHeight: '36rem',
    width: '100%',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  const classes = useStyles(props);

  return (
    <>
      <Box
        flex={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'>
          <Card className={classes.cardRoot}>
            <Typography
              variant='h6'
              component='h6'
              color='text.primary'
              style={{marginBottom: 20}}>
              Sling Pro.
            </Typography>

            <Box
              px={{xs: 6, sm: 10, xl: 15}}
              display='flex'
              style={{height: '100%'}}
              flexDirection='column'
              justifyContent='center'
              alignItems='center'>
              <Box style={{height: '100%'}}>
                <Box mb={{xs: 6, md: 8, xl: 18}} textAlign='center'>
                  <img
                    className={classes.imgRoot}
                    src={`${
                      process.env.imageBasePath || ''
                    }/images/sling-fe.png`}
                    alt='sling-logo'
                  />
                </Box>
                <Box className={classes.p10}>
                  <Link color='inherit' href='https://sling.biz/documentation/'>
                    <a target={'_blank'}>Learn More</a>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
      <Box
        style={{
          position: 'fixed',
          width: '100%',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
        }}></Box>
    </>
  );
};

export default Signin;
