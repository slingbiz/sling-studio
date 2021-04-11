import React from 'react';
import {Card, makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    aboutImgCard: {
      display: 'flex',
      flexDirection: 'column',
      '@media (min-width: 768px)': {
        flexDirection: 'row',
      },
    },
    aboutImg: {
      width: '100%',
      '@media (min-width: 768px)': {
        width: '40%',
        order: 2,
      },
      [theme.breakpoints.up('xl')]: {
        maxHeight: 300,
      },
      '& > img': {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      },
    },
    aboutImgContent: {
      width: '100%',
      padding: 20,
      '@media (min-width: 768px)': {
        width: '60%',
        order: 1,
      },
    },
    contactButton: {
      fontWeight: Fonts.LIGHT,
      fontSize: 14,
      marginRight: 16,
      marginBottom: 8,
      [theme.breakpoints.up('xl')]: {
        marginRight: 24,
      },
    },
    readButton: {
      fontWeight: Fonts.MEDIUM,
      fontSize: 14,
      marginBottom: 8,
      backgroundColor: 'white',
      color: 'black',
    },
  };
});
const Introduction = (props) => {
  const classes = useStyles(props);

  return (
    <Card>
      <Box className={classes.aboutImgCard}>
        <Box className={classes.aboutImg}>
          <img
            src={'/images/AboutUs.png'}
            alt='about us'
            title='aboutUs'
          />
        </Box>
        <Box className={classes.aboutImgContent}>
          <Box component='h2' mb={4} fontWeight={Fonts.BOLD} fontSize={16}>
            <IntlMessages id='extra.aboutUs' />
          </Box>
          <Box component='p' mb={5}>
            <IntlMessages id='extra.aboutContent' />
          </Box>
          <Box display='flex' alignItems='center' flexWrap='wrap'>
            <Button
              variant='contained'
              color='primary'
              className={classes.contactButton}>
              <IntlMessages id='extra.contactUs' />
            </Button>
            <Button variant='contained' className={classes.readButton}>
              <IntlMessages id='dashboard.readMore' />
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Introduction;
