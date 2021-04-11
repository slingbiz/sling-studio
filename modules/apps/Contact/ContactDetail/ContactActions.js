import React from 'react';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import AppsStarredIcon from '../../../../@crema/core/AppsStarredIcon';
import {makeStyles} from '@material-ui/core/styles';

const ContactActions = (props) => {
  const {onDeleteContact, onChangeStarred, onOpenEditContact, contact} = props;

  const useStyles = makeStyles((theme) => ({
    pointer: {
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);
  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center'>
      <Box ml={2}>
        <EditIcon
          className={classes.pointer}
          onClick={() => onOpenEditContact(contact)}
        />
      </Box>
      <Box ml={2}>
        <AppsStarredIcon item={contact} onChange={onChangeStarred} />
      </Box>
      <Box ml={2}>
        <DeleteIcon className={classes.pointer} onClick={onDeleteContact} />
      </Box>
    </Box>
  );
};

export default ContactActions;

ContactActions.prototype = {
  onDeleteContact: PropTypes.func,
  contact: PropTypes.object.isRequired,
  onChangeStarred: PropTypes.func,
  onOpenEditContact: PropTypes.func,
};
