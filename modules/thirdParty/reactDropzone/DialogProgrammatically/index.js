import React from 'react';
import {useDropzone} from 'react-dropzone';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const DialogProgrammatically = (props) => {
  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className='container'>
      <Box mb={2} {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Box component='p' mb={2}>
          Drag 'n' drop some files here
        </Box>
        <Button color='primary' variant='contained' onClick={open}>
          Open File Dialog
        </Button>
      </Box>
      <aside>
        <h6>Files</h6>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};
export default DialogProgrammatically;
