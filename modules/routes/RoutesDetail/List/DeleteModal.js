import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
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
        <DialogTitle id='alert-dialog-title'>{'Delete Route'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
            className={classes.btnBack}>
            Yes
          </Button>
          <Button
            variant='contained'
            onClick={handleClose}
            color='secondary'
            className={classes.alertBtn}
            autoFocus>
            No
          </Button>
          <Button
            variant='contained'
            onClick={handleClose}
            color='secondary'
            className={classes.alertBtn}
            autoFocus
            disabled>
            Reroute to other page - Pro Feature
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
