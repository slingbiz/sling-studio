import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  onUpdateReadStatus,
  onUpdateStarredStatus,
} from '../../../../../redux/actions';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {grey} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: 'pointer',
  },
  moreVertIconRoot: {
    color: grey[700],
    display: 'block',
  },
}));

const MoreOptions = (props) => {
  const {checkedMails, setCheckedMails, path} = props;

  let unReadOption;
  let readOption;
  let starredOption;
  let unStarredOption;

  const dispatch = useDispatch();

  const mailList = useSelector(({mailApp}) => mailApp.mailList);

  const [isMoreIcon, onOpenMoreIcon] = useState(null);

  mailList.map((mail) => {
    if (checkedMails.includes(mail.id) && mail.isRead) {
      unReadOption = true;
    }
    if (checkedMails.includes(mail.id) && !mail.isRead) {
      readOption = true;
    }
    if (checkedMails.includes(mail.id) && mail.isStarred) {
      unStarredOption = true;
    }
    if (checkedMails.includes(mail.id) && !mail.isStarred) {
      starredOption = true;
    }
    return null;
  });

  const onViewMoreOpen = (event) => {
    onOpenMoreIcon(event.currentTarget);
  };

  const onViewMoreClose = () => {
    onOpenMoreIcon(null);
  };

  const onChangeReadStatus = (statusValue) => {
    const status = !!statusValue;
    dispatch(onUpdateReadStatus(checkedMails, status));
    setCheckedMails([]);
    onOpenMoreIcon(null);
  };

  const onChangeAllReadStatus = (statusValue) => {
    const status = !!statusValue;
    const checkedMails = mailList.map((mail) => mail.id);
    dispatch(onUpdateReadStatus(checkedMails, status));
    setCheckedMails([]);
    onOpenMoreIcon(null);
  };

  const onChangeAllStarred = (status) => {
    const checkedMails = mailList.map((mail) => mail.id);
    dispatch(
      onUpdateStarredStatus(checkedMails, status, path[path.length - 1]),
    );
    setCheckedMails([]);
    onOpenMoreIcon(null);
  };

  const onChangeStarredStatus = (status) => {
    dispatch(
      onUpdateStarredStatus(checkedMails, status, path[path.length - 1]),
    );
    setCheckedMails([]);
    onOpenMoreIcon(null);
  };

  const classes = useStyles(props);

  return (
    <>
      {checkedMails.length > 0 ? (
        <Box>
          <Tooltip title={<IntlMessages id='common.more' />}>
            <MoreVertIcon
              className={clsx(classes.pointer, classes.moreVertIconRoot)}
              onClick={onViewMoreOpen}
            />
          </Tooltip>

          <Menu
            anchorEl={isMoreIcon}
            open={Boolean(isMoreIcon)}
            onClose={onViewMoreClose}>
            {readOption ? (
              <MenuItem onClick={() => onChangeReadStatus(1)}>
                <IntlMessages id='mailApp.markAsRead' />
              </MenuItem>
            ) : null}
            {unReadOption ? (
              <MenuItem onClick={() => onChangeReadStatus(0)}>
                <IntlMessages id='mailApp.markAsUnread' />
              </MenuItem>
            ) : null}
            {starredOption ? (
              <MenuItem onClick={() => onChangeStarredStatus(1)}>
                <IntlMessages id='mailApp.markAsImportant' />
              </MenuItem>
            ) : null}
            {unStarredOption ? (
              <MenuItem onClick={() => onChangeStarredStatus(0)}>
                <IntlMessages id='mailApp.markAsNotImportant' />
              </MenuItem>
            ) : null}
          </Menu>
        </Box>
      ) : (
        <Box>
          <Tooltip title={<IntlMessages id='common.more' />}>
            <MoreVertIcon
              className={clsx(classes.pointer, classes.moreVertIconRoot)}
              onClick={onViewMoreOpen}
            />
          </Tooltip>

          <Menu
            anchorEl={isMoreIcon}
            open={Boolean(isMoreIcon)}
            onClose={onViewMoreClose}>
            <MenuItem onClick={() => onChangeAllReadStatus(1)}>
              <IntlMessages id='mailApp.markAllAsRead' />
            </MenuItem>
            <MenuItem onClick={() => onChangeAllReadStatus(0)}>
              <IntlMessages id='mailApp.markAllAsUnread' />
            </MenuItem>
            <MenuItem onClick={() => onChangeAllStarred(1)}>
              <IntlMessages id='mailApp.markAllAsImportant' />
            </MenuItem>
            <MenuItem onClick={() => onChangeAllStarred(0)}>
              <IntlMessages id='mailApp.markAllAsNotImportant' />
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
};

export default MoreOptions;

MoreOptions.defaultProps = {
  checkedMails: [],
};

MoreOptions.prototype = {
  checkedMails: PropTypes.array.isRequired,
  setCheckedMails: PropTypes.func,
  path: PropTypes.any.isRequired,
};
