import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const AddNewTag = (props) => {
  const {onAddNewTag} = props;
  const [newTag, setNewTag] = useState('');

  const [isAddNewTag, setAddNewTag] = useState(false);

  const onAddTag = () => {
    onAddNewTag(newTag);
    setNewTag('');
    setAddNewTag(false);
  };
  const useStyles = makeStyles((theme) => ({
    pointer: {
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);

  return (
    <>
      {isAddNewTag ? (
        <Box m={2} display='flex' alignItems='center'>
          <Box component='span'>
            <TextField
              label={<IntlMessages id='common.tag' />}
              variant='outlined'
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
          </Box>
          <Box component='span' mx={3}>
            <CheckIcon className={classes.pointer} onClick={onAddTag} />
          </Box>
          <CloseIcon
            className={classes.pointer}
            onClick={() => setAddNewTag(false)}
          />
        </Box>
      ) : (
        <Box
          component='p'
          m={2}
          ml={3}
          color='secondary.main'
          className={classes.pointer}
          fontSize={{xs: 16, xl: 18}}
          fontWeight={Fonts.MEDIUM}
          onClick={() => setAddNewTag(true)}>
          <IntlMessages id='dashboard.addNewTag' />
        </Box>
      )}
    </>
  );
};

export default AddNewTag;

AddNewTag.propTypes = {
  onAddNewTag: PropTypes.func,
};
