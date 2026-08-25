import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Box from '@material-ui/core/Box';
import SandboxedPreview from '../../../aiBuilder/components/SandboxedPreview';
import {SLING_WIDGET_THEME} from '../../../aiBuilder/slingTheme';

export const LAYOUT_INK = '#163a5f';
export const LAYOUT_WELL = '#e8eef4';
export const SLING_ORANGE = '#ff9800';
export const SLING_CREAM = '#fff8f0';

const MAX_LIVE = 3;

export const LivePreviewContext = createContext({
  request: () => false,
  release: () => {},
  generation: 0,
});

export function LivePreviewGate({children}) {
  const holdersRef = useRef(new Set());
  const [generation, setGeneration] = useState(0);

  const request = useCallback((id) => {
    if (holdersRef.current.has(id)) return true;
    if (holdersRef.current.size >= MAX_LIVE) return false;
    holdersRef.current.add(id);
    return true;
  }, []);

  const release = useCallback((id) => {
    if (holdersRef.current.delete(id)) {
      setGeneration((n) => n + 1);
    }
  }, []);

  return (
    <LivePreviewContext.Provider value={{request, release, generation}}>
      {children}
    </LivePreviewContext.Provider>
  );
}

export function widgetThumbUrl(item) {
  if (!item) return '';
  return (
    item.image ||
    item.screenshot ||
    item.previewUrl ||
    item.thumbnail ||
    item.url ||
    ''
  );
}

const WidgetLibraryPreview = ({item}) => {
  const id = item?._id || item?.key || item?.name;
  const {request, release, generation} = useContext(LivePreviewContext);
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [live, setLive] = useState(false);
  const thumb = widgetThumbUrl(item);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const root = el.closest('[data-widget-library]') || null;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {root, rootMargin: '48px', threshold: 0.12},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const wantsLive = visible && !thumb && Boolean(item?.code);

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
    if (!wantsLive || live) return;
    setLive(request(id));
  }, [generation, wantsLive, live, id, request]);

  return (
    <Box
      ref={wrapRef}
      data-preview-slot='true'
      style={{
        width: '100%',
        height: 88,
        borderRadius: 6,
        overflow: 'hidden',
        background: SLING_CREAM,
        border: '1px solid #e6e6e6',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {thumb ? (
        <img
          src={thumb}
          alt={item.name || 'Widget preview'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : live && item.code ? (
        <Box
          style={{
            width: '250%',
            height: 220,
            transform: 'scale(0.4)',
            transformOrigin: 'top left',
          }}>
          <SandboxedPreview
            code={item.code}
            dependencies={item.dependencies}
            themeOverrides={SLING_WIDGET_THEME}
            style={{height: 220}}
          />
        </Box>
      ) : (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: LAYOUT_INK,
            fontSize: 14,
            fontFamily: 'Open Sans, sans-serif',
            padding: 8,
            textAlign: 'center',
          }}>
          {item.code ? 'Preview' : 'No preview'}
        </Box>
      )}
    </Box>
  );
};

export default WidgetLibraryPreview;
