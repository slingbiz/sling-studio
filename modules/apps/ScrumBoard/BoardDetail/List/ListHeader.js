import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  onDeleteSelectedList,
  onEditBoardList,
} from '../../../../../redux/actions/ScrumboardApp';
import {useDispatch} from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmationDialog from '../../../../../@crema/core/ConfirmationDialog';
import CheckIcon from '@material-ui/icons/Check';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const ListHeader = (props) => {
  const {list, boardId} = props;
  const dispatch = useDispatch();

  const [isEditListName, setEditListName] = useState(false);

  const [editedListName, setEditedListName] = useState('');

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onDeleteBoardList = () => {
    dispatch(onDeleteSelectedList(boardId, list.id));
    setDeleteDialogOpen(false);
  };

  const onEditButtonClick = () => {
    setEditedListName(list.name);
    setEditListName(!isEditListName);
  };

  const onEditListName = () => {
    if (editedListName !== '') {
      const editedList = {...list, name: editedListName};
      dispatch(onEditBoardList(boardId, editedList));
      setEditListName(false);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      marginBottom: 8,
      minHeight: isEditListName ? '5.5rem' : '3.5rem',
    },
    pointer: {
      cursor: 'pointer',
    },
    marginLeft12: {
      marginLeft: 12,
    },
    textFieldRoot: {
      marginTop: 0,
    },
  }));

  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <Box display='flex' alignItems='center'>
        {!isEditListName ? (
          <>
            <Box componet='h5' fontSize={15} fontWeight={Fonts.MEDIUM}>
              {list.name}
            </Box>
            <Box ml='auto' display='flex' alignItems='center'>
              <EditIcon
                className={clsx(classes.marginLeft12, classes.pointer)}
                onClick={onEditButtonClick}
              />
              <DeleteIcon
                className={clsx(classes.marginLeft12, classes.pointer)}
                onClick={() => setDeleteDialogOpen(true)}
              />
            </Box>
          </>
        ) : (
          <>
            <Box mr={3}>
              <TextField
                fullWidth
                className={classes.textFieldRoot}
                margin='normal'
                label={<IntlMessages id='scrumboard.listTitle' />}
                value={editedListName}
                onChange={(event) => setEditedListName(event.target.value)}
              />
            </Box>
            <Box ml='auto' display='flex' alignItems='center'>
              <CheckIcon className={classes.pointer} onClick={onEditListName} />
              <CloseIcon
                className={clsx(classes.marginLeft12, classes.pointer)}
                onClick={() => setEditListName(false)}
              />
            </Box>
          </>
        )}
      </Box>

      {isDeleteDialogOpen ? (
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={onDeleteBoardList}
          title={<IntlMessages id='scrumboard.deleteMessage' />}
          dialogTitle={<IntlMessages id='common.deleteItem' />}
        />
      ) : null}
    </Card>
  );
};

export default ListHeader;

ListHeader.prototype = {
  list: PropTypes.object.isRequired,
  boardId: PropTypes.number.isRequired,
};
