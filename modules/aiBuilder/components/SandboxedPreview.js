import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

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
const SandboxedPreview = ({code, dependencies, themeOverrides, className, style, onError}) => {
  const iframeRef = useRef(null);
  const nonceRef = useRef(createNonce());
  const [isReady, setIsReady] = useState(false);
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

      if (data.type === 'RENDER_SUCCESS') {
        onError?.(null);
      } else if (data.type === 'RENDER_ERROR') {
        onError?.(data.message || 'Failed to render generated widget.');
      }
    }

    window.addEventListener('message', handleMessage);
    setFrameSrc(`/preview-runtime/widget-preview.html?nonce=${nonceRef.current}`);
    return () => window.removeEventListener('message', handleMessage);
  }, [onError]);

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
      },
      // The sandbox frame has an opaque origin, so it can never match a
      // real targetOrigin string here — '*' is required. Specificity comes
      // from posting directly to this iframe's own contentWindow reference,
      // not from an origin check.
      '*',
    );
  }, [isReady, code, dependencies, themeOverrides]);

  return (
    <iframe
      ref={iframeRef}
      title='Widget preview'
      src={frameSrc || undefined}
      sandbox='allow-scripts'
      className={className}
      style={{width: '100%', height: 480, border: 'none', display: 'block', ...style}}
    />
  );
};

SandboxedPreview.propTypes = {
  code: PropTypes.string,
  dependencies: PropTypes.object,
  themeOverrides: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  onError: PropTypes.func,
};

export default SandboxedPreview;
