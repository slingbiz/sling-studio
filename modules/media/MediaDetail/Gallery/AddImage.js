import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Box,
  Icon,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch, useSelector} from 'react-redux';
import {addImage, uploadImage} from '../../../../redux/actions';
import FormData from 'form-data';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../../../aiBuilder/slingTheme';

const useStyles = makeStyles(() => ({
  dialogPaper: {
    borderRadius: 12,
    padding: '8px 4px 4px',
    width: 480,
    maxWidth: '92vw',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: SLING_INK,
    marginBottom: 6,
    marginTop: 16,
    fontFamily: 'Open Sans, sans-serif',
  },
  dialogField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      background: SLING_CREAM,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
  },
  primaryBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
    '&:disabled': {backgroundColor: '#ffcc80', color: '#fff'},
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
    marginBottom: 8,
  },
  previewBox: {
    marginTop: 16,
    padding: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #e6e6e6',
    position: 'relative',
    height: 150,
    backgroundColor: SLING_CREAM,
    borderRadius: 8,
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: 2,
  },
  selectImageButton: {
    backgroundColor: SLING_CREAM,
    padding: 20,
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px dashed #e6e6e6',
    width: '100%',
    borderRadius: 8,
    fontSize: 14,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
    display: 'block',
    marginTop: 16,
  },
  fileInput: {
    display: 'none',
  },
  hint: {
    fontSize: 14,
    color: '#6b6f76',
    marginTop: 8,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    marginTop: 8,
  },
}));

const AddImage = ({open, setOpen}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const fileInputIdRef = useRef(`image-upload-${Math.random().toString(36).slice(2)}`);

  const [name, setName] = useState('');
  const [altText, setAltText] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState('');
  const [fileSize, setFileSize] = useState(null);
  const maxFileSize = 2 * 1024 * 1024;

  const {uploadedImageUrl: reduxUploadedImageUrl} = useSelector(
    ({media}) => media,
  );

  useEffect(() => {
    if (reduxUploadedImageUrl) {
      setUploadedImageUrl(reduxUploadedImageUrl);
    }
  }, [reduxUploadedImageUrl]);

  const resetForm = () => {
    setName('');
    setAltText('');
    setImgFile(null);
    setUploadedImageUrl(null);
    setError('');
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setError('');
    if (!file) return;
    if (file.size > maxFileSize) {
      setError('File size exceeds the 2MB limit');
      return;
    }
    setImgFile(file);
    setFileSize((file.size / 1024 / 1024).toFixed(2) + ' MB');
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadImage(formData));
  };

  const handleRemoveImage = () => {
    setUploadedImageUrl(null);
    setImgFile(null);
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!uploadedImageUrl) {
      setError('Upload an image first');
      return;
    }
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    const formData = new FormData();
    formData.append('image_url', uploadedImageUrl);
    formData.append('name', name.trim());
    formData.append('altText', altText);
    dispatch(addImage(formData));
    resetForm();
    setOpen(false);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{paper: classes.dialogPaper}}>
      <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
        <Typography className={classes.dialogTitle}>Upload image</Typography>
        <IconButton aria-label='Close upload' size='small' onClick={handleClose}>
          <Icon>close</Icon>
        </IconButton>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Typography className={classes.fieldLabel}>Name</Typography>
          <TextField
            className={classes.dialogField}
            variant='outlined'
            placeholder='Hero banner'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Typography className={classes.fieldLabel}>Alt text</Typography>
          <TextField
            className={classes.dialogField}
            variant='outlined'
            placeholder='What is in the image'
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />

          {uploadedImageUrl && (
            <div className={classes.previewBox}>
              <img
                src={uploadedImageUrl}
                alt='Uploaded preview'
                className={classes.previewImage}
              />
              <IconButton
                className={classes.closeIcon}
                size='small'
                onClick={handleRemoveImage}>
                <CloseIcon />
              </IconButton>
            </div>
          )}

          <label htmlFor={fileInputIdRef.current} className={classes.selectImageButton}>
            {imgFile ? `${imgFile.name}${fileSize ? ` · ${fileSize}` : ''}` : 'Select image'}
            <input
              type='file'
              id={fileInputIdRef.current}
              accept='image/jpeg,image/png,image/gif,image/jpg'
              ref={fileInputRef}
              className={classes.fileInput}
              onChange={handleImageUpload}
              disabled={!!uploadedImageUrl}
            />
          </label>
          <Typography className={classes.hint}>
            Max 2MB. jpg, jpeg, png, or gif.
          </Typography>
          {error && <Typography className={classes.errorText}>{error}</Typography>}
          <Box className={classes.dialogFooter}>
            <Button
              type='submit'
              className={classes.primaryBtn}
              disabled={!uploadedImageUrl || !name.trim()}>
              Save
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddImage;
