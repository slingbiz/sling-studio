import React from 'react';
import Box from '@material-ui/core/Box';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const SideBarItem = ({item, classes, onGetFaqData, selectionId}) => {
  return (
    <ListItem
      button
      className={clsx(classes.listItem, {
        active: item.id === selectionId,
      })}
      onClick={() => onGetFaqData(item.id)}>
      <Box mr={3} color='text.primary'>
        <ListItemIcon className={classes.listItemIcon}>
          {item.icon}
        </ListItemIcon>
      </Box>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

export default SideBarItem;

SideBarItem.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectionId: PropTypes.func,
};
