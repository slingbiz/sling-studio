import React, {useEffect, useRef, useState} from 'react';
import {Box, CircularProgress, Typography} from '@material-ui/core';

const SLING_ORANGE = '#ff9800';
const SLING_CREAM = '#fff8f0';
const LOAD_TIMEOUT_MS = 15000;

const overlayStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: SLING_CREAM,
  zIndex: 1,
  padding: 16,
  textAlign: 'center',
};

const PreviewIframe = ({urlToPreview}) => {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [frameSrc, setFrameSrc] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setFailed(false);
    setFrameSrc(urlToPreview || '');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setLoading(false);
      setFailed(true);
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timerRef.current);
  }, [urlToPreview]);

  const handleLoad = () => {
    clearTimeout(timerRef.current);
    setLoading(false);
    setFailed(false);
  };

  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: SLING_CREAM,
      }}>
      {loading && (
        <Box aria-label='Loading preview' style={overlayStyle}>
          <CircularProgress style={{color: SLING_ORANGE}} />
        </Box>
      )}
      {failed && !loading && (
        <Box style={overlayStyle}>
          <Typography
            style={{
              fontSize: 14,
              fontFamily: 'Open Sans, sans-serif',
              color: '#212121',
            }}>
            Preview didn't load. Check the URL.
          </Typography>
        </Box>
      )}
      {frameSrc ? (
        <iframe
          title='Page preview'
          src={frameSrc}
          width='100%'
          height='100%'
          onLoad={handleLoad}
          style={{
            border: 'none',
            display: 'block',
            opacity: loading || failed ? 0 : 1,
          }}
        />
      ) : null}
    </Box>
  );
};

export default PreviewIframe;
