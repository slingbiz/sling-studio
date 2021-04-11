import React from 'react';
import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button/index';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  textField: {
    borderBottom: '1px solid',
    borderColor: 'grey.300',
  },
  textareaAutosize: {
    width: '100%',
    '& .MuiInput-underline:before': {
      display: 'none',
    },
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: grey[700],
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: grey[800],
      color: theme.palette.primary.contrastText,
    },
  },
}));

const ReplyMail = (props) => {
  const {selectedMail, onSubmitMail} = props;

  const classes = useStyles(props);

  return (
    <Box p={5} mt={4} border={1} borderColor='grey.300' borderRadius='0.125rem'>
      <TextField
        fullWidth
        margin='normal'
        value={selectedMail.senderMailId}
        className={classes.textField}
      />

      <Box mb={4}>
        <TextField
          className={classes.textareaAutosize}
          rows='7'
          name='content'
          multiline
        />
      </Box>

      <Button className={classes.btnRoot} onClick={onSubmitMail}>
        <IntlMessages id='common.send' />
      </Button>
    </Box>
  );
};

export default ReplyMail;

ReplyMail.prototype = {
  selectedMail: PropTypes.object.isRequired,
  onSubmitMail: PropTypes.func,
};
