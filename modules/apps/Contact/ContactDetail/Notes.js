import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textareaAutosizeRoot: {
    width: '100%',
  },
}));

const Notes = (props) => {
  const {contact} = props;
  const {messages} = useIntl();

  const classes = useStyles(props);

  return (
    <Box pr={{xs: 5, lg: 8, xl: 10}} py={5}>
      <Box component='h6' m={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
        <IntlMessages id='common.notes' />
      </Box>

      <TextField
        multiline
        className={classes.textareaAutosizeRoot}
        rows='4'
        placeholder={messages['common.notes']}
        name='notes'
        value={contact.notes}
        variant='outlined'
        disabled
      />
    </Box>
  );
};

export default Notes;

Notes.prototype = {
  contact: PropTypes.object.isRequired,
};
