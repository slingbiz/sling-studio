import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';
import AppGrid from '../../../../@crema/core/AppGrid';

const Share = (props) => {
  const useStyles = makeStyles((theme) => ({
    shareitem: {
      width: 65,
      color: theme.palette.primary.contrastText,
      padding: '6px 5px',
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles(props);

  const {data} = props;

  return (
    <AppCard height={1} title='Share'>
      <AppGrid
        data={data}
        itemPadding={5}
        responsive={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
        }}
        renderRow={(data, index) => (
          <Box key={index} bgcolor={data.color} className={classes.shareitem}>
            <i className={'zmdi zmdi-' + data.icon} />
            <Box component='span' ml={1}>
              {data.value}
            </Box>
          </Box>
        )}
      />
    </AppCard>
  );
};

export default Share;

Share.propTypes = {
  data: PropTypes.array.isRequired,
};
