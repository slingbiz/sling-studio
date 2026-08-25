import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import AppsContainer from '../../@sling/core/AppsContainer';
import AppContext from '../../@sling/utility/AppContext';
import {FETCH_ERROR} from '../../shared/constants/ActionTypes';
import {createCopy} from './sectionContract';
import SectionPreview from './SectionPreview';
import {streamPageFromPrompt} from './streamPageGenerate';
import {processGeneratedPage} from '../../redux/actions/CreatePage';
import {resolveWidgetTheme} from '../aiBuilder/widgetTheme';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../aiBuilder/slingTheme';

const STARTERS = [
  {
    label: 'Clinic landing',
    prompt: 'A clinic landing page with a hero, hours, and a contact form',
  },
  {
    label: 'Blog home',
    prompt: 'A simple blog home with featured posts and a newsletter',
  },
  {
    label: 'About page',
    prompt: 'An about page with a story, team photos, and a CTA',
  },
  {
    label: 'Product listing',
    prompt: 'A product listing with a hero and three feature cards',
  },
];

const useStyles = makeStyles(() => ({
  page: {
    padding: '28px 32px 40px',
    background: '#fff',
    fontFamily: 'Open Sans, sans-serif',
    minHeight: '100%',
  },
  emptyPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: 480,
  },
  promptWrap: {
    maxWidth: 640,
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    margin: 0,
    color: SLING_INK,
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 1.3,
    fontFamily: 'Open Sans, sans-serif',
  },
  description: {
    margin: '8px auto 24px',
    color: '#6b6f76',
    fontSize: 14,
    lineHeight: 1.5,
    fontFamily: 'Open Sans, sans-serif',
    maxWidth: 520,
  },
  field: {
    width: '100%',
    textAlign: 'left',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      background: SLING_CREAM,
      fontSize: 14,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
  },
  starters: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
    marginTop: 16,
    width: '100%',
  },
  starterBtn: {
    textTransform: 'none',
    justifyContent: 'flex-start',
    textAlign: 'left',
    height: 44,
    padding: '0 14px',
    border: '1px solid #ffd59a',
    background: SLING_CREAM,
    color: '#7a4a00',
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 8,
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#ffe3b8', boxShadow: 'none'},
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  primaryBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
    '&:disabled': {backgroundColor: '#ffcc80', color: '#fff'},
  },
  ghostBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    border: `1px solid ${SLING_ORANGE}`,
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 8,
    padding: '7px 16px',
    background: '#fff',
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: SLING_CREAM, boxShadow: 'none'},
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: 48,
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  summaryText: {
    fontSize: 14,
    color: '#6b6f76',
  },
  streamPane: {
    border: '1px solid #ffd59a',
    background: SLING_CREAM,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  streamStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
  },
  streamDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: SLING_ORANGE,
    animation: '$pulse 1.2s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%': {opacity: 1},
    '50%': {opacity: 0.35},
    '100%': {opacity: 1},
  },
  streamCode: {
    marginTop: 10,
    maxHeight: 168,
    overflow: 'auto',
    background: SLING_INK,
    color: SLING_CREAM,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: 13,
    lineHeight: 1.5,
    padding: 12,
    borderRadius: 6,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  canvas: {
    border: '1px solid #e6e6e6',
    borderRadius: 10,
    overflow: 'visible',
    background: '#fff',
  },
  canvasHint: {
    padding: 28,
    fontSize: 14,
    color: '#6b6f76',
    textAlign: 'center',
  },
  doneTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: SLING_INK,
    marginBottom: 8,
  },
  doneHint: {
    fontSize: 14,
    color: '#6b6f76',
    marginBottom: 20,
    maxWidth: 560,
  },
  doneActions: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
}));

const CreatePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const {theme} = useContext(AppContext);
  const tenantTheme = resolveWidgetTheme(theme);

  const [prompt, setPrompt] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [streamText, setStreamText] = useState('');
  const [result, setResult] = useState(null);
  const [done, setDone] = useState(null);
  const abortRef = useRef(null);
  const streamLogRef = useRef(null);

  const sections = result?.sections || [];
  const count = sections.length;
  const visibleCode = streamText.split('\n').slice(-40).join('\n');

  useEffect(() => {
    if (streamLogRef.current) {
      streamLogRef.current.scrollTop = streamLogRef.current.scrollHeight;
    }
  }, [streamText]);

  const resetPreview = () => {
    abortRef.current?.abort();
    setStreaming(false);
    setResult(null);
    setStreamText('');
    setStatusMessage('');
    setDone(null);
  };

  const generate = async () => {
    if (!prompt.trim() || prompt.trim().length < 5) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setStreaming(true);
    setDone(null);
    setResult({page: null, sections: []});
    setStreamText('');
    setStatusMessage('Streaming…');
    try {
      const data = await streamPageFromPrompt(
        prompt.trim(),
        tenantTheme,
        {
          onStatus: setStatusMessage,
          onCodeToken: (text) => setStreamText((prev) => prev + text),
          onPage: (page) =>
            setResult((prev) => ({page, sections: prev?.sections || []})),
          onSection: (section) =>
            setResult((prev) => {
              const current = prev?.sections || [];
              if (current.some((item) => item.id === section.id)) return prev;
              return {page: prev?.page || null, sections: [...current, section]};
            }),
          onComplete: (payload) => setResult(payload),
        },
        ac.signal,
      );
      setResult(data);
    } catch (error) {
      if (error.name === 'AbortError') return;
      dispatch({
        type: FETCH_ERROR,
        payload: error.message || 'Could not generate this page.',
      });
      setResult(null);
    } finally {
      setStreaming(false);
    }
  };

  const processPage = async () => {
    if (!result?.page || !result.sections?.length) return;
    setProcessing(true);
    const saved = await dispatch(
      processGeneratedPage({
        page: result.page,
        sections: result.sections,
        prompt: prompt.trim(),
      }),
    );
    setProcessing(false);
    if (saved) setDone(saved);
  };

  const working = streaming || processing;
  const showBuilder = streaming || result;

  return (
    <AppsContainer fullView>
      <Box className={classes.page}>
        {done ? (
          <>
            <Typography className={classes.doneTitle}>
              This page is {done.widgetCount} draft widgets
            </Typography>
            <Typography className={classes.doneHint}>
              Process saved the sections as widgets, a page template, and the
              route {done.path}. Edit them in Widgets and Page templates. Nothing
              is live until you publish.
            </Typography>
            <Box className={classes.doneActions}>
              <Button
                className={classes.primaryBtn}
                onClick={() => router.push(`/pages/${done.pageKey}/layout?edit=1`)}>
                Open template
              </Button>
              <Button
                className={classes.ghostBtn}
                onClick={() => router.push('/widgets/widgets-integration')}>
                Widgets
              </Button>
              <Button
                className={classes.ghostBtn}
                onClick={() => router.push('/routes')}>
                Routes
              </Button>
            </Box>
          </>
        ) : !showBuilder ? (
          <Box className={classes.emptyPage}>
            <Box className={classes.promptWrap}>
              <Box component='h1' className={classes.heading}>
                {createCopy.title}
              </Box>
              <Typography className={classes.description}>
                {createCopy.description}
              </Typography>
              <TextField
                className={classes.field}
                variant='outlined'
                multiline
                rows={4}
                placeholder='I want a landing page for…'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    generate();
                  }
                }}
              />
              <Box className={classes.starters}>
                {STARTERS.map((item) => (
                  <Button
                    key={item.label}
                    className={classes.starterBtn}
                    onClick={() => setPrompt(item.prompt)}>
                    {item.label}
                  </Button>
                ))}
              </Box>
              <Box className={classes.actions}>
                <Button
                  className={classes.primaryBtn}
                  onClick={generate}
                  disabled={prompt.trim().length < 5}>
                  Generate
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Box className={classes.summary}>
              <Typography className={classes.summaryText}>
                {streaming
                  ? statusMessage || 'Streaming…'
                  : `This page will be ${count} widget${count === 1 ? '' : 's'}. Hover a section to lift it as a tile. Process saves the same code — we do not generate again.`}
              </Typography>
              <Box style={{display: 'flex', gap: 8}}>
                <Button
                  className={classes.ghostBtn}
                  onClick={resetPreview}
                  disabled={processing}>
                  Start over
                </Button>
                <Button
                  className={classes.primaryBtn}
                  onClick={processPage}
                  disabled={working || count < 5}>
                  {processing ? 'Processing…' : 'Process'}
                </Button>
              </Box>
            </Box>
            {streaming && (
              <Box className={classes.streamPane}>
                <Box className={classes.streamStatus}>
                  <Box className={classes.streamDot} />
                  Streaming
                  {streamText
                    ? ` · ${streamText.length.toLocaleString()} chars received`
                    : ''}
                </Box>
                <Box
                  ref={streamLogRef}
                  className={classes.streamCode}
                  component='pre'>
                  {visibleCode || 'Waiting for the first lines…'}
                </Box>
              </Box>
            )}
            {processing ? (
              <Box className={classes.loader}>
                <CircularProgress style={{color: SLING_ORANGE}} />
              </Box>
            ) : (
              <Box className={classes.canvas}>
                {count ? (
                  sections.map((section) => (
                    <SectionPreview
                      key={section.id}
                      section={section}
                      themeOverrides={tenantTheme}
                    />
                  ))
                ) : (
                  <Typography className={classes.canvasHint}>
                    The page appears here as each section finishes.
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </AppsContainer>
  );
};

export default CreatePage;
