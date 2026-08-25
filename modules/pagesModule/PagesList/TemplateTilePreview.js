import React, {useContext, useEffect, useRef, useState} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {
  LivePreviewGate,
  LivePreviewContext,
} from '../PagesDetail/Layout/WidgetLibraryPreview';
import PreviewIframe from '../PagesDetail/Preview/Modal/PreviewIframe';

export const DEFAULT_TEMPLATE_THUMB = '/images/cards/pagelayout_default.png';
const SCALE = 0.25;
const TILE_HEIGHT = 240;

export {LivePreviewGate};

const useDotStyles = makeStyles({
  dots: {
    position: 'absolute',
    right: 12,
    bottom: 10,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#ff9800',
    animation: '$pulse 1.2s ease-in-out infinite',
    '&:nth-child(2)': {animationDelay: '0.2s'},
    '&:nth-child(3)': {animationDelay: '0.4s'},
  },
  '@keyframes pulse': {
    '0%, 80%, 100%': {opacity: 0.25},
    '40%': {opacity: 1},
  },
});

const PreviewWaitDots = () => {
  const classes = useDotStyles();
  return (
    <Box className={classes.dots} aria-label='Loading preview'>
      <span className={classes.dot} />
      <span className={classes.dot} />
      <span className={classes.dot} />
    </Box>
  );
};

export const TemplateTilePreview = ({id, previewUrl, emptyHint}) => {
  const wrapRef = useRef(null);
  const {request, release, generation} = useContext(LivePreviewContext);
  const [live, setLive] = useState(false);
  const [frameStatus, setFrameStatus] = useState('loading');
  const wantsLive = Boolean(previewUrl);

  useEffect(() => {
    setFrameStatus('loading');
  }, [previewUrl]);

  useEffect(() => {
    if (!wantsLive) {
      release(id);
      setLive(false);
      return undefined;
    }
    setLive(request(id));
    return () => release(id);
  }, [wantsLive, id, request, release]);

  useEffect(() => {
    if (!wantsLive || live) {
      return;
    }
    setLive(request(id));
  }, [generation, wantsLive, live, id, request]);

  const waiting = Boolean(previewUrl) && frameStatus === 'loading';

  return (
    <Box
      ref={wrapRef}
      style={{
        height: TILE_HEIGHT,
        overflow: 'hidden',
        background: '#fff8f0',
        borderBottom: '1px solid #eee',
        pointerEvents: 'none',
        position: 'relative',
      }}>
      <img
        src={DEFAULT_TEMPLATE_THUMB}
        alt=''
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {live && previewUrl ? (
        <Box
          style={{
            position: 'relative',
            zIndex: 1,
            width: `${100 / SCALE}%`,
            height: `${100 / SCALE}%`,
            transform: `scale(${SCALE})`,
            transformOrigin: 'top left',
          }}>
          <PreviewIframe
            urlToPreview={previewUrl}
            chromeScale={SCALE}
            silent
            onStatusChange={setFrameStatus}
          />
        </Box>
      ) : null}
      {waiting ? <PreviewWaitDots /> : null}
      {!previewUrl ? (
        <Box
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
            background: 'rgba(255,248,240,0.94)',
            padding: '8px 12px',
          }}>
          <Typography
            style={{
              fontSize: 14,
              color: '#6b6f76',
              fontFamily: 'Open Sans, sans-serif',
              lineHeight: 1.45,
            }}>
            {emptyHint ||
              'Assign a route to see this page on the storefront.'}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
