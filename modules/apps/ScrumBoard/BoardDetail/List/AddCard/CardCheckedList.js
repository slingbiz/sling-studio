import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../../../@crema/utility/IntlMessages';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';
import {Fonts} from '../../../../../../shared/constants/AppEnums';
import Hidden from '@material-ui/core/Hidden';

const CardCheckedList = (props) => {
  const {
    onAddNewCheckedItem,
    checkedList,
    onSetCheckedItemText,
    onDeleteCheckedItem,
  } = props;
  const useStyles = makeStyles((theme) => ({
    btnRoot: {
      backgroundColor: red[500],
      color: theme.palette.primary.contrastText,
      fontWeight: Fonts.LIGHT,
      textTransform: 'capitalize',
      paddingLeft: 16,
      paddingRight: 16,
      '&:hover, &:focus': {
        backgroundColor: red[800],
        color: theme.palette.primary.contrastText,
      },
    },
    checkboxRoot: {
      marginRight: 8,
    },
    textFieldRoot: {
      width: '100%',
      '& .inputprops-root': {
        width: '100%',
        margin: 'auto',
      },
    },
    avatarRoot: {
      backgroundColor: red[500],
      color: theme.palette.primary.contrastText,
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);

  return (
    <Box mb={8}>
      <Box mb={4} display='flex' alignItems='center'>
        <Box>
          <Box component='h4'>
            <IntlMessages id='scrumboard.checkedLists' />
          </Box>
        </Box>
        <Box ml='auto' px='8'>
          <Button
            className={classes.btnRoot}
            onClick={() => onAddNewCheckedItem()}>
            <IntlMessages id='scrumboard.addNew' />
          </Button>
        </Box>
      </Box>

      {checkedList.map((checkedItem) => {
        return (
          <Box display='flex' alignItems='center' key={checkedItem.id}>
            <Box mb={4} flex={1} display='flex' alignItems='center'>
              <Hidden xsDown>
                {' '}
                <Checkbox className={classes.checkboxRoot} />
              </Hidden>
              <TextField
                className={classes.textFieldRoot}
                variant='outlined'
                InputProps={{
                  className: 'inputprops-root',
                }}
                value={checkedItem.title}
                onChange={(e) =>
                  onSetCheckedItemText(e.target.value, checkedItem.id)
                }
              />
            </Box>
            <Box component='span' mb={4} ml={3}>
              <Avatar
                className={classes.avatarRoot}
                onClick={() => onDeleteCheckedItem(checkedItem.id)}>
                <DeleteIcon />
              </Avatar>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default CardCheckedList;

CardCheckedList.defaultProps = {
  checkedList: [],
};

CardCheckedList.prototype = {
  onAddNewCheckedItem: PropTypes.func,
  checkedList: PropTypes.array,
  onSetCheckedItemText: PropTypes.func,
  onDeleteCheckedItem: PropTypes.func,
};
