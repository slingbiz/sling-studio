import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useDispatch } from 'react-redux'
import { addImage } from '../../../../redux/actions'
import FormData from 'form-data'

const useStyles = makeStyles((theme) => ({
  boxLayoutView: { padding: '1.5em' },

  appBar: {
    position: 'relative',
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  mainContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
    textAlign: 'center',
    "& .MuiInputBase-input": {
      width: 400,
    }
  },
  formContainer: {
    width: "100%",
  },
  btn: {
    width: 200,
    marginTop: 30,
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AddImage = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [imgKey, setImgKey] = useState('');
  const [altText, setAltText] = useState('');
  const [imgFile, setImgFile] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append(
      "myFile",
      imgFile,
      imgFile.name
    );

    const addData = {
      name,
      key: imgKey,
      alt_text: altText,
      url: formData,
    }

    dispatch(addImage(addData))
    setOpen(false)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton onClick={handleClose}>
            <ArrowBackIcon />
          </IconButton>
          <Button autoFocus={true} color='inherit' onClick={handleClose}>
            Cancel
          </Button>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit} >
        <Grid container spacing={3} className={classes.mainContainer} >
          <Grid item xs={12}>
            <Typography variant='h5' component='h5' style={{ fontWeight: "bold" }} >Add Image</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Name'
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Image Key'
              variant="outlined"
              value={imgKey}
              onChange={(e) => setImgKey(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Alt Text'
              variant="outlined"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="file"
              variant="outlined"
              onChange={(e) => setImgFile(e.target.files[0])}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" color="primary" variant="contained" className={classes.btn}>Save</Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
export default AddImage;
