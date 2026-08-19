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
// origin: it cannot read Studio's cookies/localStorage/session, and the
// page it loads (pages/sandbox/widget-preview.js) skips all of the app's
// normal providers, so nothing sensitive is ever within its reach.
const SandboxedPreview = ({code, dependencies, className, style, onError}) => {
  const iframeRef = useRef(null);
  const nonceRef = useRef(createNonce());
  const [isReady, setIsReady] = useState(false);

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
      },
      // The sandbox frame has an opaque origin, so it can never match a
      // real targetOrigin string here — '*' is required. Specificity comes
      // from posting directly to this iframe's own contentWindow reference,
      // not from an origin check.
      '*',
    );
  }, [isReady, code, dependencies]);

  return (
    <iframe
      ref={iframeRef}
      title='Widget preview'
      src={`/sandbox/widget-preview?nonce=${nonceRef.current}`}
      sandbox='allow-scripts'
      className={className}
      style={{width: '100%', border: 'none', ...style}}
    />
  );
};

SandboxedPreview.propTypes = {
  code: PropTypes.string,
  dependencies: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  onError: PropTypes.func,
};

export default SandboxedPreview;
