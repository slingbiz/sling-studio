import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';

const CategoryItem = (props) => {
  const {item, handleChange} = props;
  return (
    <ListItem key={item.id} className='item-hover'>
      <ListItemIcon>
        <Box ml={-2}>
          <Checkbox
            color='primary'
            checked={item.isChecked}
            onChange={(e) => handleChange(e, item)}
          />
        </Box>
      </ListItemIcon>
      <ListItemText
        primary={
          <Box
            component='span'
            color={`${!item.isChecked ? 'text.secondary' : ''}`}
            fontSize={14}>
            {item.name}
          </Box>
        }
      />
    </ListItem>
  );
};

export default CategoryItem;

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
