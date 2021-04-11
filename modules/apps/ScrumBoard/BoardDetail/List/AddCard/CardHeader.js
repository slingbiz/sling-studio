import React from 'react';
import Box from '@material-ui/core/Box';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import IntlMessages from '../../../../../../@crema/utility/IntlMessages';
import {useDropzone} from 'react-dropzone';
import CardCheckedList from './CardCheckedList';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../../../shared/constants/AppEnums';

const CardHeader = (props) => {
  const {onClickDeleteIcon, onAddAttachments} = props;
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        return {
          id: Math.floor(Math.random() * 10000),
          file,
          preview: URL.createObjectURL(file),
        };
      });
      onAddAttachments(files);
    },
  });

  const useStyles = makeStyles((theme) => ({
    iconRoot: {
      marginRight: 8,
      color: grey[600],
      cursor: 'pointer',
    },
    pointer: {
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);

  return (
    <Box
      pt={5}
      pb={3}
      px={{xs: 3, lg: 5, xl: 7}}
      display='flex'
      alignItems='center'
      justifyContent='space-between'>
      <Box component='h5' px={3} fontWeight={Fonts.BOLD} fontSize={16}>
        <IntlMessages id='scrumboard.board' />
      </Box>
      <Box px={3} display='flex' alignItems='center'>
        <Box {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <AttachFileIcon className={classes.iconRoot} />
        </Box>
        <Box>
          <DeleteIcon
            className={classes.iconRoot}
            onClick={onClickDeleteIcon}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CardHeader;

CardCheckedList.prototype = {
  onClickDeleteIcon: PropTypes.func,
  onCloseAddCard: PropTypes.func,
  onAddAttachments: PropTypes.func,
};
