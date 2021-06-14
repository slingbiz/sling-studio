import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

const NewRowModal = (props) => {
  const {openNewRow, handleCloseNewRow, section} = props;
  return (
    <Dialog
      onClose={handleCloseNewRow}
      maxWidth={'md'}
      aria-labelledby='customized-dialog-title'
      open={openNewRow}>
      <DialogTitle id='customized-dialog-title' onClose={handleCloseNewRow}>
        Modal title - {section.toUpperCase()}
      </DialogTitle>
      <DialogContent dividers>
        <Box></Box>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseNewRow} color='primary'>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewRowModal;
