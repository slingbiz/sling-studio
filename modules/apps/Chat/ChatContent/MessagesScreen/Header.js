import React, {useState} from 'react';
import UserInfo from '../../ChatSideBar/UserInfo';
import Box from '@material-ui/core/Box';
import {Checkbox, IconButton, makeStyles} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import ConfirmationDialog from '../../../../../@crema/core/ConfirmationDialog';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .user-info': {
      width: '100%',
    },
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const Header = ({selectedUser, deleteConversation}) => {
  const [isMoreIcon, onOpenMoreIcon] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onViewMoreOpen = (event) => {
    onOpenMoreIcon(event.currentTarget);
  };

  const onViewMoreClose = () => {
    onOpenMoreIcon(null);
  };

  const toggleDeleteDialog = () => {
    setDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const onDeleteConversation = () => {
    deleteConversation();
    toggleDeleteDialog();
  };

  const classes = useStyles();
  return (
    <Box width={1} display='flex' alignItems='center' className={classes.root}>
      <UserInfo user={selectedUser} showStatus={true} />
      <Box ml='auto' display='flex' alignItems='center'>
        <Box mr={{sm: 4}} component='span' color='text.disabled'>
          <Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} />
        </Box>

        <Tooltip title={<IntlMessages id='common.more' />}>
          <Box ml={2} component='span' color='text.disabled'>
            <IconButton onClick={onViewMoreOpen}>
              <MoreVertIcon className={classes.pointer} />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={isMoreIcon}
        open={Boolean(isMoreIcon)}
        onClose={onViewMoreClose}>
        <MenuItem onClick={toggleDeleteDialog}>
          <IntlMessages id='chatApp.deleteConversation' />
        </MenuItem>
        <MenuItem>
          <IntlMessages id='chatApp.mute' />
        </MenuItem>
        <MenuItem>
          <IntlMessages id='chatApp.hide' />
        </MenuItem>
      </Menu>

      {isDeleteDialogOpen ? (
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={onDeleteConversation}
          title={<IntlMessages id='chatApp.deleteTitle' />}
          dialogTitle={<IntlMessages id='chatApp.deleteContent' />}
        />
      ) : null}
    </Box>
  );
};

export default Header;

Header.defaultProps = {};

Header.prototype = {
  selectedUser: PropTypes.object.isRequired,
  deleteConversation: PropTypes.func,
};
