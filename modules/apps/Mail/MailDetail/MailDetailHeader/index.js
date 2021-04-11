import React from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import LabelSharpIcon from '@material-ui/icons/LabelSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArchiveIcon from '@material-ui/icons/Archive';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import {onUpdateSelectedMail} from '../../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import {Box} from '@material-ui/core';
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: 'pointer',
  },
}));
const MailDetailHeader = (props) => {
  const {selectedMail} = props;
  const dispatch = useDispatch();

  const router = useRouter()

  const labelList = useSelector(({mailApp}) => mailApp.labelList);

  const [isLabelOpen, onOpenLabel] = React.useState(null);

  const [isMoreIcon, onOpenMoreIcon] = React.useState(null);

  const onClickBackButton = () => {
    router.back();
  };

  const onLabelOpen = (event) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onViewMoreOpen = (event) => {
    onOpenMoreIcon(event.currentTarget);
  };

  const onViewMoreClose = () => {
    onOpenMoreIcon(null);
  };

  const onSelectLabel = (event) => {
    const mail = selectedMail;
    mail.label = event.target.value;
    dispatch(onUpdateSelectedMail(mail));
    onOpenLabel(null);
  };

  const onChangeMailFolder = (type) => {
    const mail = selectedMail;
    mail.folderValue = type;
    dispatch(onUpdateSelectedMail(mail, type));
    router.back();
  };

  const onChangeReadStatus = () => {
    const mail = selectedMail;
    mail.isRead = false;
    dispatch(onUpdateSelectedMail(mail));
    router.back();
  };

  const onChangeStarredStatus = () => {
    const mail = selectedMail;
    mail.isStarred = !mail.isStarred;
    dispatch(onUpdateSelectedMail(mail));
    onOpenMoreIcon(null);
  };

  const classes = useStyles(props);
  if (!selectedMail) return null;
  return (
    <>
      <Tooltip title={<IntlMessages id='common.back' />}>
        <Box mx={2} my={0.5} component='span' color='text.disabled'>
          <KeyboardBackspaceIcon
            onClick={onClickBackButton}
            className={classes.pointer}
          />
        </Box>
      </Tooltip>

      <Box ml='auto'>
        <Tooltip title={<IntlMessages id='common.archive' />}>
          <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
            <ArchiveIcon
              className={classes.pointer}
              onClick={() => onChangeMailFolder(127)}
            />
          </Box>
        </Tooltip>

        <Tooltip title={<IntlMessages id='common.reportSpam' />}>
          <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
            <InfoSharpIcon
              className={classes.pointer}
              onClick={() => onChangeMailFolder(125)}
            />
          </Box>
        </Tooltip>

        <Tooltip title={<IntlMessages id='common.trash' />}>
          <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
            <DeleteSharpIcon
              className={classes.pointer}
              onClick={() => onChangeMailFolder(126)}
            />
          </Box>
        </Tooltip>

        <Tooltip title={<IntlMessages id='mailApp.markAsUnread' />}>
          <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
            <MarkunreadIcon
              className={classes.pointer}
              onClick={() => onChangeReadStatus()}
            />
          </Box>
        </Tooltip>

        <Tooltip title={<IntlMessages id='common.label' />}>
          <Box ml={{xs: 2, sm: 4}} component='span' color='text.disabled'>
            <LabelSharpIcon
              className={classes.pointer}
              value={1}
              onClick={onLabelOpen}
            />
          </Box>
        </Tooltip>

        <Menu
          anchorEl={isLabelOpen}
          open={Boolean(isLabelOpen)}
          onClose={onLabelClose}>
          {labelList.map((label) => {
            return (
              <MenuItem onClick={onSelectLabel} value={label.id} key={label.id}>
                {label.name}
              </MenuItem>
            );
          })}
        </Menu>

        <Tooltip title={<IntlMessages id='common.more' />}>
          <Box ml={2} component='span' color='text.disabled'>
            <MoreVertIcon
              className={classes.pointer}
              onClick={onViewMoreOpen}
            />
          </Box>
        </Tooltip>

        <Menu
          anchorEl={isMoreIcon}
          open={Boolean(isMoreIcon)}
          onClose={onViewMoreClose}>
          <MenuItem onClick={onChangeReadStatus}>
            <IntlMessages id='mailApp.markAsUnread' />
          </MenuItem>
          <MenuItem onClick={onChangeStarredStatus}>
            {selectedMail.isStarred ? (
              <IntlMessages id='mailApp.markAsNotImportant' />
            ) : (
              <IntlMessages id='mailApp.markAsImportant' />
            )}
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default MailDetailHeader;

MailDetailHeader.prototype = {
  selectedMail: PropTypes.object.isRequired,
};
