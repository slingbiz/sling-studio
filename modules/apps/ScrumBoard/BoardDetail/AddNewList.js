import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {grey, red} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    backgroundColor: grey[100],
    border: `1px dashed ${grey[400]}`,
  },
  pointer: {
    cursor: 'pointer',
  },
  addIconRoot: {
    color: grey[500],
    fontWeight: Fonts.LIGHT,
  },
  btnRoot: {
    backgroundColor: red[500],
    color: theme.palette.primary.contrastText,
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 12,
    '&:hover, &:focus': {
      backgroundColor: red[800],
      color: theme.palette.primary.contrastText,
    },
  },
}));

const AddNewList = (props) => {
  const {onAddList} = props;
  const [isAddList, setAddList] = useState(false);

  const [listName, setListName] = useState('');

  const onClickAddButton = () => {
    if (listName !== '') {
      onAddList(listName);
      setAddList(false);
      setListName('');
    }
  };

  const classes = useStyles(props);

  return (
    <Box py={4} px={6} mb={2} clone>
      <Card>
        <Box display='flex' alignItems='center'>
          <Avatar className={classes.avatar} onClick={() => setAddList(true)}>
            <AddIcon className={classes.addIconRoot} />
          </Avatar>
          <Box display='flex'>
            <Box ml={5} fontWeight={Fonts.MEDIUM} fontSize={15}>
              <IntlMessages id='scrumboard.addAList' />
            </Box>
            {isAddList ? (
              <Box px={3} textAlign='right'>
                <CloseIcon
                  className={classes.pointer}
                  onClick={() => setAddList(false)}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        {isAddList ? (
          <Box>
            <TextField
              fullWidth
              margin='normal'
              label={<IntlMessages id='scrumboard.cardTitle' />}
              value={listName}
              onChange={(event) => setListName(event.target.value)}
            />
            <Button className={classes.btnRoot} onClick={onClickAddButton}>
              <IntlMessages id='common.add' />
            </Button>
          </Box>
        ) : null}
      </Card>
    </Box>
  );
};

export default AddNewList;

AddNewList.prototype = {
  onAddList: PropTypes.func,
};
