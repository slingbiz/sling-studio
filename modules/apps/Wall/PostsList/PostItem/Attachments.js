import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import {fade} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import AppGrid from '../../../../../@crema/core/AppGrid';
import MediaViewer from '../../../../../@crema/core/MedialViewer';

const useStyles = makeStyles((theme) => ({
  imgView: {
    cursor: 'pointer',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    maxHeight: 240,
    height: '100%',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
  },
  imgCount: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: fade(theme.palette.common.black, 0.5),
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
}));

const Attachments = ({attachments}) => {
  const classes = useStyles();

  const [index, setIndex] = useState(-1);

  const onClose = () => {
    setIndex(-1);
  };

  return (
    <Box mb={5}>
      <AppGrid
        itemPadding={8}
        data={attachments.length > 4 ? attachments.slice(0, 4) : attachments}
        column={attachments.length > 3 ? 2 : attachments.length}
        renderRow={(item, index) => (
          <Box key={index} className={classes.imgView}>
            <img
              src={item.preview}
              alt='attachment'
              onClick={() => setIndex(index)}
            />
            {attachments.length > 4 && index === 3 && (
              <Box className={classes.imgCount}>+ {attachments.length - 3}</Box>
            )}
          </Box>
        )}
      />
      <MediaViewer
        index={index}
        medias={attachments.map((data) => {
          return {
            src: data.preview,
            metaData: {
              type: 'image',
            },
          };
        })}
        onClose={onClose}
      />
    </Box>
  );
};

export default Attachments;

Attachments.prototype = {
  attachments: PropTypes.array.isRequired,
};
