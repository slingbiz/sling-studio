import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const Categories = ({data}) => {
  return (
    <Box
      display='flex'
      justifyContent='space-around'
      flexWrap='wrap'
      pl={{xl: 5}}>
      {data.map((item) => {
        return (
          <Box
            px={3}
            position='relative'
            display='flex'
            flex={1}
            alignItems='center'
            key={item.id}>
            <Box
              component='span'
              height={{xs: 12, xl: 16}}
              width={{xs: 12, xl: 16}}
              p={1}
              display='block'
              borderRadius='50%'
              bgcolor={item.colorName}
            />
            <Box
              component='p'
              color='text.secondary'
              ml={3}
              fontSize={14}
              style={{textTransform: 'uppercase'}}>
              {item.name}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Categories;

Categories.defaultProps = {
  data: [],
};

Categories.propTypes = {
  data: PropTypes.array,
};
