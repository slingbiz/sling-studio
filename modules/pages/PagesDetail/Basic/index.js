import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import {red} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import TextField from '@material-ui/core/TextField';

const Basic = (props) => {
  const useStyles = makeStyles((theme) => ({
    selectBox: {
      cursor: 'pointer',
      '& .MuiOutlinedInput-input': {
        paddingBottom: 10,
        paddingTop: 10,
      },
      '& .MuiSelect-select': {
        paddingLeft: 10,
      },
    },
    taskBtn: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
    },
    pointer: {
      cursor: 'pointer',
    },
    mr12: {
      marginRight: 12,
    },
    minWidth100: {
      minWidth: 100,
      width: '100%',
    },
    avtr50: {
      height: 50,
      width: 50,
    },
    datePicker: {
      marginTop: 0,
    },
    divider: {
      marginTop: 20,
      marginBottom: 20,
    },
    textArea: {
      width: '100%',
      marginBottom: 16,
    },
    option: {
      padding: 8,
      cursor: 'pointer',
    },
    button: {
      backgroundColor: red[500],
      color: theme.palette.primary.contrastText,
      fontWeight: Fonts.LIGHT,
      paddingRight: 20,
      paddingLeft: 20,
      '&:hover, &:focus': {
        backgroundColor: red[700],
        color: theme.palette.secondary.contrastText,
      },
    },
  }));

  const classes = useStyles(props);

  const {messages} = useIntl();

  return (
    <Box px={6} py={8}>
      <Divider className={classes.divider} />

      <TextField
        multiline
        className={classes.textArea}
        rows='6'
        variant='outlined'
        placeholder={messages['common.writeComment']}
        value={'comment'}
      />
      <Button className={classes.button} onClick={() => {}}>
        <IntlMessages id='todo.submitComment' />
      </Button>
    </Box>
  );
};

export default Basic;
