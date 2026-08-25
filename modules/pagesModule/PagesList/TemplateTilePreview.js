import React, {useContext, useEffect, useRef, useState} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  LivePreviewGate,
  LivePreviewContext,
} from '../PagesDetail/Layout/WidgetLibraryPreview';
import PreviewIframe from '../PagesDetail/Preview/Modal/PreviewIframe';

const SCALE = 0.25;

export {LivePreviewGate};

export const TemplateTilePreview = ({id, previewUrl, emptyHint}) => {
  const wrapRef = useRef(null);
  const {request, release, generation} = useContext(LivePreviewContext);
  const [visible, setVisible] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) {
      return undefined;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {rootMargin: '80px', threshold: 0.12},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const wantsLive = visible && Boolean(previewUrl);

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

  return (
    <Box
      ref={wrapRef}
      style={{
        height: 180,
        overflow: 'hidden',
        background: '#fff8f0',
        borderBottom: '1px solid #eee',
        pointerEvents: 'none',
        position: 'relative',
      }}>
      {live && previewUrl ? (
        <Box
          style={{
            width: `${100 / SCALE}%`,
            height: `${100 / SCALE}%`,
            transform: `scale(${SCALE})`,
            transformOrigin: 'top left',
          }}>
          <PreviewIframe urlToPreview={previewUrl} chromeScale={SCALE} />
        </Box>
      ) : (
        <Box
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            textAlign: 'center',
          }}>
          <Typography
            style={{
              fontSize: 14,
              color: '#6b6f76',
              fontFamily: 'Open Sans, sans-serif',
              lineHeight: 1.45,
            }}>
            {previewUrl
              ? 'Loading preview…'
              : emptyHint ||
                'Assign a route to see this page on the storefront.'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
