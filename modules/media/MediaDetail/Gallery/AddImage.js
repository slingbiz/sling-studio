import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, uploadImage } from '../../../../redux/actions';
import FormData from 'form-data';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: { padding: '1.5em' },
  appBar: { position: 'relative' },
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
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    textAlign: 'center',
    maxWidth: 400,
    '& .MuiInputBase-input': {
      width: 400,
    },
  },
  formContainer: {
    width: '100%',
  },
  btn: {
    width: 200,
    marginTop: 30,
  },
  previewBox: {
    marginTop: 20,
    padding: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #ccc',
    position: 'relative',
    height: '150px',
    backgroundColor: '#f9f9f9',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: '2px',
    boxShadow: '0px 0px 2px rgba(0,0,0,0.2)',
  },
  fileDetails: {
    marginTop: 10,
    textAlign: 'left',
  },
  selectImageButton: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px dashed #ccc',
    width: '100%',
    '&:hover': {
      backgroundColor: '#e8e8e8',
    },
  },
  fileInput: {
    display: 'none',
  },
  errorText: {
    color: 'red',
    fontSize: '0.85rem',
    marginTop: 5,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AddImage = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Reference to the file input for resetting
  const fileInputRef = useRef(null);

  // Local state for form fields
  const [name, setName] = useState('');
  const [imgKey, setImgKey] = useState('');
  const [altText, setAltText] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState('');
  const [fileSize, setFileSize] = useState(null);
  const maxFileSize = 2 * 1024 * 1024; // 2 MB

  const { uploadedImageUrl: reduxUploadedImageUrl } = useSelector(
    ({ media }) => media,
  );

  useEffect(() => {
    if (reduxUploadedImageUrl) {
      setUploadedImageUrl(reduxUploadedImageUrl);
    }
  }, [reduxUploadedImageUrl]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setError('');

    if (!file) return;

    // Validate file size (limit to 2MB)
    if (file.size > maxFileSize) {
      setError('File size exceeds the 2MB limit');
      return;
    }

    setImgFile(file);
    setFileSize((file.size / 1024 / 1024).toFixed(2) + ' MB');

    // Create form data and dispatch the upload action
    const formData = new FormData();
    formData.append('file', file);

    dispatch(uploadImage(formData)); // Dispatch the upload action to upload image and get the URL
  };

  // Handle removing the image
  const handleRemoveImage = () => {
    setUploadedImageUrl(null);
    setImgFile(null);
    setFileSize(null);
    
    // Reset the file input value so that users can upload the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';  // This clears the input element
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!uploadedImageUrl) {
      alert('Please upload an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image_url', uploadedImageUrl);
    formData.append('name', name);
    formData.append('imgKey', imgKey);
    formData.append('altText', altText);

    dispatch(addImage(formData)); // Dispatch action to save image metadata
    setOpen(false);
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} className={classes.mainContainer}>
          <Grid item xs={12}>
            <Typography
              variant='h5'
              component='h5'
              fullWidth
              style={{ fontWeight: 'bold' }}>
              Add Image
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Name'
              variant='outlined'
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Image Key'
              variant='outlined'
              fullWidth
              value={imgKey}
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/[^a-zA-Z0-9]/g, ''); // remove any character that's not a letter or number
                setImgKey(filteredValue);
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Alt Text'
              variant='outlined'
              fullWidth
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          </Grid>

          {/* File Upload Section */}
          {/* Preview Section */}
          {uploadedImageUrl && (
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={classes.previewBox}>
                <img
                  src={uploadedImageUrl}
                  alt='Uploaded Preview'
                  className={classes.previewImage}
                />
                <IconButton
                  className={classes.closeIcon}
                  size='small'
                  onClick={handleRemoveImage}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
          )}

          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <label htmlFor='image-upload' className={classes.selectImageButton}>
              {imgFile ? imgFile.name : 'Select Image'}
              <input
                type='file'
                id='image-upload'
                ref={fileInputRef} // Add the ref here
                className={classes.fileInput}
                onChange={handleImageUpload}
                disabled={!!uploadedImageUrl} // Disable if an image is already uploaded
              />
            </label>
            <Typography variant='caption'>
              Max file size: 2MB | Permitted file types: jpg, jpeg, png, gif
            </Typography>
            {error && (
              <Typography className={classes.errorText}>{error}</Typography>
            )}
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              className={classes.btn}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default AddImage;
