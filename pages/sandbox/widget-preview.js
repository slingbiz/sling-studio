import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {createRoot} from 'react-dom/client';
import Head from 'next/head';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {makeStyles} from '@material-ui/core/styles';
import * as Babel from '@babel/standalone';
import {createScope} from '../../modules/aiBuilder/config';

// This page renders AI-generated widget code and nothing else. It is loaded
// into an iframe with `sandbox="allow-scripts"` (deliberately no
// `allow-same-origin`), which puts it in a unique opaque browser origin: it
// cannot read the Studio app's cookies, localStorage, or session, and it
// cannot reach into the parent window. `_app.js` skips all of its normal
// providers (auth, redux, analytics) for this route, so nothing sensitive is
// ever loaded into this document in the first place — the opaque origin is
// the hard guarantee, skipping providers just keeps this page's own attack
// surface minimal.
const CSP = [
  "default-src 'none'",
  "script-src 'self' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join('; ');

const PARENT_MESSAGE_SOURCE = 'sling-studio-parent';
const SANDBOX_MESSAGE_SOURCE = 'sling-sandbox';

function postToParent(type, payload) {
  if (window.parent === window) return;
  // targetOrigin can't be the real parent origin: this frame's opaque
  // sandbox origin means the browser would never match it, so '*' is used
  // here deliberately. That's safe because the message carries only render
  // status/errors, nothing secret, and the parent independently verifies
  // `event.source` before trusting anything it receives back.
  window.parent.postMessage({source: SANDBOX_MESSAGE_SOURCE, type, ...payload}, '*');
}

export default function WidgetPreviewSandbox() {
  const mountRef = useRef(null);
  const rootRef = useRef(null);
  const nonceRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    nonceRef.current = params.get('nonce');

    function renderCode(code, dependencies, themeOverrides) {
      try {
        const scope = createScope({
          React,
          useState,
          useEffect,
          useCallback,
          useMemo,
          useRef,
          useContext,
          makeStyles,
          PropTypes,
          clsx,
          moment,
          dependencies,
          themeOverrides,
        });

        const {code: transpiled} = Babel.transform(code, {presets: ['react']});
        const {ThemedComponent, ...factoryScope} = scope;
        const scopeKeys = Object.keys(factoryScope);
        const scopeValues = scopeKeys.map((key) => factoryScope[key]);

        // eslint-disable-next-line no-new-func
        const factory = new Function(
          ...scopeKeys,
          `${transpiled}
            if (typeof PreviewComponent === 'function') return PreviewComponent;
            if (typeof Component === 'function') return Component;
            return null;`,
        );

        const Component = factory(...scopeValues);
        if (typeof Component !== 'function') {
          throw new Error('Generated code did not define a PreviewComponent.');
        }

        if (!rootRef.current && mountRef.current) {
          rootRef.current = createRoot(mountRef.current);
        }
        rootRef.current.render(
          React.createElement(
            ThemedComponent,
            null,
            React.createElement(Component),
          ),
        );

        postToParent('RENDER_SUCCESS', {
          nonce: nonceRef.current,
          height: document.body.scrollHeight,
        });
      } catch (error) {
        postToParent('RENDER_ERROR', {
          nonce: nonceRef.current,
          message: (error && error.message) || 'Failed to render generated widget.',
        });
      }
    }

    function handleMessage(event) {
      // event.source identity holds regardless of this frame's opaque
      // origin, unlike event.origin — it's the check that actually matters.
      if (event.source !== window.parent) return;
      const data = event.data;
      if (!data || data.source !== PARENT_MESSAGE_SOURCE) return;
      if (!nonceRef.current || data.nonce !== nonceRef.current) return;

      if (data.type === 'RENDER') {
        renderCode(data.code, data.dependencies, data.themeOverrides);
      }
    }

    window.addEventListener('message', handleMessage);
    postToParent('READY', {});

    return () => {
      window.removeEventListener('message', handleMessage);
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <title>Sling widget preview</title>
      </Head>
      <div
        id="sling-sandbox-root"
        ref={mountRef}
        style={{minHeight: '100vh', background: '#fff', padding: 16, boxSizing: 'border-box'}}
      />
    </>
  );
}
