import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, CircularProgress} from '@material-ui/core';
import {SLING_ORANGE} from '../slingTheme';

const PARENT_MESSAGE_SOURCE = 'sling-studio-parent';
const SANDBOX_MESSAGE_SOURCE = 'sling-sandbox';

function createNonce() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Renders AI-generated widget code inside an isolated iframe instead of
// eval'ing it directly in the Studio window. `sandbox="allow-scripts"`
// (no allow-same-origin) puts the framed document in a unique opaque
// origin: it cannot read Studio's cookies/localStorage/session.
// The framed document is a standalone HTML runtime, not a Next.js page —
// loading Studio's _app/webpack in this sandbox crashes on cookie and
// localStorage access and blanks the preview.
const SandboxedPreview = ({
  code,
  dependencies,
  themeOverrides,
  className,
  style,
  onError,
  fitContent = false,
}) => {
  const iframeRef = useRef(null);
  const nonceRef = useRef(createNonce());
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const fitContentRef = useRef(fitContent);
  fitContentRef.current = fitContent;
  const [isReady, setIsReady] = useState(false);
  const [painted, setPainted] = useState(false);
  const [contentHeight, setContentHeight] = useState(80);
  // Load the iframe only after the message listener is attached. A cached
  // sandbox document can post READY during first paint, before useEffect,
  // and then the preview stays blank forever.
  const [frameSrc, setFrameSrc] = useState('');

  useEffect(() => {
    function handleMessage(event) {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (!data || data.source !== SANDBOX_MESSAGE_SOURCE) return;

      if (data.type === 'READY') {
        setIsReady(true);
        return;
      }
      if (data.nonce !== nonceRef.current) return;

      if (data.type === 'HEIGHT' && fitContentRef.current && data.height) {
        setContentHeight(Math.max(40, Math.ceil(data.height)));
      }

      if (data.type === 'RENDER_SUCCESS') {
        setPainted(true);
        if (fitContentRef.current && data.height) {
          setContentHeight(Math.max(40, Math.ceil(data.height)));
        }
        onErrorRef.current?.(null);
      } else if (data.type === 'RENDER_ERROR') {
        setPainted(true);
        onErrorRef.current?.(data.message || 'Failed to render generated widget.');
      }
    }

    window.addEventListener('message', handleMessage);
    setFrameSrc(`/preview-runtime/widget-preview.html?nonce=${nonceRef.current}`);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!isReady || !code || !iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      {
        source: PARENT_MESSAGE_SOURCE,
        type: 'RENDER',
        nonce: nonceRef.current,
        code,
        dependencies,
        themeOverrides,
        fitContent: fitContentRef.current,
      },
      // The sandbox frame has an opaque origin, so it can never match a
      // real targetOrigin string here — '*' is required. Specificity comes
      // from posting directly to this iframe's own contentWindow reference,
      // not from an origin check.
      '*',
    );
  }, [isReady, code, dependencies, themeOverrides, fitContent]);

  useEffect(() => {
    setPainted(false);
  }, [code]);

  const height = fitContent ? contentHeight : style?.height || 480;

  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        background: '#fff',
      }}>
      {!painted && (
        <Box
          aria-label='Loading preview'
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            zIndex: 1,
          }}>
          <CircularProgress size={22} style={{color: SLING_ORANGE}} />
        </Box>
      )}
      <iframe
        ref={iframeRef}
        title='Widget preview'
        src={frameSrc || undefined}
        sandbox='allow-scripts'
        scrolling={fitContent ? 'no' : 'yes'}
        className={className}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
      />
    </Box>
  );
};

SandboxedPreview.propTypes = {
  code: PropTypes.string,
  dependencies: PropTypes.object,
  themeOverrides: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  onError: PropTypes.func,
  fitContent: PropTypes.bool,
};

export default SandboxedPreview;
