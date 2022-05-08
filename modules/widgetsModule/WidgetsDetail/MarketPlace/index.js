import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() => ({
  media: {
    height: 300,
    width: '100%',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
  },
}));

const MarketPlace = () => {
  const classes = useStyles();
  return (
    <>
      <AppsHeader>
        <Box
          fontWeight={Fonts.BOLD}
          component='h3'
          style={{textTransform: 'capitalize'}}>
          Market Place
        </Box>
      </AppsHeader>
      <Box
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Box style={{display: 'flex', alignItems: 'center', fontSize: 18}}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <CardMedia
              className={classes.media}
              image={'/images/cards/widgets-marketplace.png'}
              title='Sling Market Place'
            />
            <Box style={{fontWeight: 'bold', marginTop: 30}}>
              Explore Ready to Use Widgets in the Market Place.
            </Box>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                marginTop: 15,
              }}>
              <Button
                color='secondary'
                onClick={() => {
                  window.open(`${process.env.GUIDE_URL}`, '_blank');
                }}>
                Coming Soon
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MarketPlace;
