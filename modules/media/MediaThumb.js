import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import {SLING_CREAM, SLING_INK} from '../aiBuilder/slingTheme';

const wrapStyle = {
  width: '100%',
  height: '100%',
  background: SLING_CREAM,
  overflow: 'hidden',
};

const placeholderStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: SLING_CREAM,
  color: SLING_INK,
  fontSize: 14,
  fontFamily: 'Open Sans, sans-serif',
  textAlign: 'center',
};

const MediaThumb = ({src, alt = '', className, style, objectFit = 'cover'}) => {
  const [failed, setFailed] = useState(false);
  const url = typeof src === 'string' ? src.trim() : src;

  useEffect(() => {
    setFailed(false);
  }, [url]);

  return (
    <Box className={className} style={{...wrapStyle, ...style}}>
      {!url || failed ? (
        <Box style={placeholderStyle}>No image</Box>
      ) : (
        <img
          src={url}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            display: 'block',
          }}
          onError={() => setFailed(true)}
        />
      )}
    </Box>
  );
};

export default MediaThumb;
