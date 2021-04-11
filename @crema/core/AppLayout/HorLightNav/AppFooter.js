import React, {useContext} from 'react';
import AppContext from '../../../utility/AppContext';
import Box from '@material-ui/core/Box';
import {Button, makeStyles} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  footer: {
    margin: 'auto -20px 0',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      marginLeft: '-32px',
      marginRight: '-32px',
    },
    '& .footerContainer': {
      padding: '5px 20px',
      [theme.breakpoints.up('md')]: {
        paddingLeft: 32,
        paddingRight: 32,
      },
      [theme.breakpoints.up('xl')]: {
        padding: '10px 32px',
      },
    },
  },
  btnRoot: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

const AppFooter = (props) => {
  const {footer, footerType} = useContext(AppContext);

  const classes = useStyles(props);

  return (
    <>
      {footer && footerType === 'fluid' ? (
        <Box className={clsx(classes.footer, 'footer')}>
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

export default AppFooter;
