import React, {useContext} from 'react';
import AppContext from '../../../utility/AppContext';
import Box from '@material-ui/core/Box';
import {Button, makeStyles} from '@material-ui/core';
import clsx from 'clsx';

const AppFixedFooter = (props) => {
  const {footer, footerType} = useContext(AppContext);

  const useStyles = makeStyles((theme) => ({
    footer: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 99,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      margin: '0',
      '& .footerContainer': {
        padding: '5px 20px',
        [theme.breakpoints.up('xl')]: {
          padding: '10px 20px',
        },
      },
    },
    btnRoot: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  }));

  const classes = useStyles(props);

  return (
    <>
      {footer && footerType === 'fixed' ? (
        <Box className={clsx(classes.footer, 'footer fixed-footer')}>
          <Box
            className='footerContainer'
            alignItems='center'
            flexDirection='row'
            display='flex'>
            <Box>Copy right @crema 2020</Box>
            <Box ml='auto'>
              <Button className={classes.btnRoot} color='primary'>
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default AppFixedFooter;
