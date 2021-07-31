import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';

const ConfirmationDialog = ({open, onDeny, onConfirm, title, dialogTitle}) => {
  const useStyle = makeStyles({
    btn: {
      marginLeft: 8,
      fontWeight: Fonts.MEDIUM,
    },
    contentText: {
      color: grey[600],
    },
  });
  const classes = useStyle();

  return (
    <Dialog open={open} onClose={() => onDeny(false)}>
      <Box px={{xs: 5, md: 7}} pt={{xs: 4, md: 6}} pb={{xs: 2, md: 4}}>
        <Box
          mb={3}
          component='h4'
          fontWeight={Fonts.MEDIUM}
          className='font-bold'
          id='alert-dialog-title'>
          {dialogTitle}
        </Box>
        <Box>
          <DialogContentText
            className={classes.contentText}
            id='alert-dialog-description'>
            {title}
          </DialogContentText>
        </Box>
        <Box pt={2}>
          <Button
            className={classes.btn}
            onClick={() => onDeny(false)}
            color='primary'>
            <IntlMessages id='common.no' />
          </Button>
          <Button
            className={classes.btn}
            onClick={onConfirm}
            color='primary'
            autoFocus>
            <IntlMessages id='common.yes' />
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmationDialog;

ConfirmationDialog.propTypes = {
  dialogTitle: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onDeny: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
