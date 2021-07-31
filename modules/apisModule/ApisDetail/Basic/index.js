import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';

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
      backgroundColor: orange[500],
      color: theme.palette.primary.contrastText,
      fontWeight: Fonts.BOLD,
      paddingRight: 20,
      paddingLeft: 20,
      '&:hover, &:focus': {
        backgroundColor: orange[700],
        color: theme.palette.secondary.contrastText,
      },
    },
    basicFormTxt: {
      margin: 10,
    },
  }));

  const classes = useStyles(props);

  const {messages} = useIntl();
  const {titleKey} = props;
  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Meta Tags & SEO
        </Box>
      </AppsHeader>
      <Box px={6} pb={8}>
        {/*<ListItemText style={{marginTop: '0px'}}>{'}</ListItemText>*/}
        <Box p={6} mb={6} className={classes.boxSection}>
          <TextField
            id='standard-full-width'
            label='Page Name'
            className={classes.basicFormTxt}
            value={`${titleKey}`}
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id='standard-full-width'
            label='Page Title'
            className={classes.basicFormTxt}
            helperText='Best selling products in your {{city}}}.'
            // helperText=''
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id='standard-full-width'
            label='Meta Description'
            className={classes.basicFormTxt}
            // placeholder='Placeholder'
            helperText='Found {{count}} products matching your search.'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel
            control={<Switch value='checkedC' />}
            label='Allow Bots'
          />
        </Box>

        <Divider className={classes.divider} />

        <Button className={classes.button} onClick={() => {}}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default Basic;
