import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../constants/AppEnums';
import orange from '@material-ui/core/colors/orange';

const useStyles = makeStyles((theme) => ({
  alertBtn: {
    color: theme.palette.primary.contrastText,
    fontWeight: Fonts.BOLD,
    paddingRight: 20,
    paddingLeft: 20,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: theme.palette.secondary.contrastText,
    },
  },
  btnBack: {color: theme.palette.gray[600]},
}));

export default function AlertModal(props) {
  const {open, handleClose} = props;
  const classes = useStyles(props);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{'Save Changes'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Sling is running in read-only mode. Changes will not be saved.
          </DialogContentText>
          <DialogContentText>
            Please contact us for a trial/demo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
            className={classes.btnBack}>
            Back
          </Button>
          <Button
            variant='contained'
            onClick={handleClose}
            color='secondary'
            className={classes.alertBtn}
            autoFocus={true}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
