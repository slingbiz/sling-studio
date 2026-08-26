import React, {useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import AppsContainer from '../../@sling/core/AppsContainer';
import AppContext from '../../@sling/utility/AppContext';
import {FETCH_ERROR} from '../../shared/constants/ActionTypes';
import {createCopy, ensureWidgetLabel} from './sectionContract';
import SectionPreview from './SectionPreview';
import ProcessedSetup from './ProcessedSetup';
import GenerateProgress from './GenerateProgress';
import {streamPageFromPrompt} from './streamPageGenerate';
import {
  findCreateAttempt,
  loadCreateAttempts,
  saveCreateAttempt,
} from './createAttempts';
import {processGeneratedPage, publishGeneratedPage} from '../../redux/actions/CreatePage';
import {resolveWidgetTheme} from '../aiBuilder/widgetTheme';
import {SLING_CREAM, SLING_ORANGE} from '../aiBuilder/slingTheme';
import {useAuthUser} from '../../@sling/utility/AppHooks';

const STUDIO_INK = '#163a5f';

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
    background: SLING_CREAM,
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
  promptCard: {
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 12,
    boxShadow: '0 1px 3px rgba(22,58,95,0.12), 0 1px 2px rgba(22,58,95,0.08)',
    padding: '28px 28px 24px',
    textAlign: 'center',
  },
  heading: {
    margin: 0,
    color: STUDIO_INK,
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
      background: '#fff',
      fontSize: 14,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d5dde6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#163a5f',
    },
    '& .MuiOutlinedInput-input': {
      color: '#163a5f',
    },
    '& .MuiOutlinedInput-input::placeholder': {
      color: '#6b6f76',
      opacity: 1,
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
    border: '1px solid #d5dde6',
    background: '#fff',
    color: STUDIO_INK,
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 8,
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#e8eef4', borderColor: STUDIO_INK, boxShadow: 'none'},
  },
  starterBtnSelected: {
    backgroundColor: '#e8eef4',
    borderColor: STUDIO_INK,
    color: STUDIO_INK,
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
  followUp: {
    display: 'flex',
    gap: 8,
    marginTop: 16,
    alignItems: 'flex-end',
  },
  followField: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      background: '#fff',
      fontSize: 14,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d5dde6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#163a5f',
    },
    '& .MuiOutlinedInput-input': {
      color: '#163a5f',
    },
    '& .MuiOutlinedInput-input::placeholder': {
      color: '#6b6f76',
      opacity: 1,
    },
  },
  recents: {
    marginTop: 24,
    textAlign: 'left',
  },
  recentsTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: STUDIO_INK,
    marginBottom: 8,
  },
  recentItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    textTransform: 'none',
    border: '1px solid #eee',
    borderRadius: 8,
    padding: '10px 12px',
    marginBottom: 8,
    background: '#fff',
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#e8eef4', boxShadow: 'none'},
  },
  recentName: {
    fontSize: 14,
    fontWeight: 600,
    color: STUDIO_INK,
  },
  recentMeta: {
    fontSize: 14,
    color: '#6b6f76',
  },
}));

const CreatePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const {theme} = useContext(AppContext);
  const tenantTheme = resolveWidgetTheme(theme);
  const user = useAuthUser();
  const canPublish =
    user?.role === 'owner' || user?.role === 'admin' || user?.role === 'publisher';

  const [prompt, setPrompt] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [progressLines, setProgressLines] = useState([]);
  const [result, setResult] = useState(null);
  const [done, setDone] = useState(null);
  const [view, setView] = useState('setup');
  const [attempts, setAttempts] = useState([]);
  const abortRef = useRef(null);
  const lastProgressRef = useRef(Date.now());
  const replaceOnSection = useRef(true);
  const setupId =
    typeof router.query?.setup === 'string' ? router.query.setup : '';

  const sections = result?.sections?.length
    ? result.sections
    : done?.sections || [];
  const count = sections.length;

  const pushProgress = (line) => {
    const text = String(line || '').trim();
    if (!text || /stream/i.test(text)) return;
    lastProgressRef.current = Date.now();
    setProgressLines((prev) => {
      if (prev[prev.length - 1] === text) return prev;
      return [...prev, text].slice(-12);
    });
  };

  const restoreAttempt = (item) => {
    if (!item) return;
    setDone(item);
    setView('setup');
    setPrompt(item.prompt || '');
    if (item.sections?.length || item.widgets?.length) {
      setResult({
        page:
          item.page || {
            title: item.title,
            path: item.path,
            key: item.pageKey,
          },
        sections:
          item.sections?.length > 0
            ? item.sections
            : (item.widgets || []).map((widget) => ({
                id: widget._id || widget.key,
                label: widget.name,
                name: widget.name,
                key: widget.key,
                code: widget.code,
                dependencies: widget.dependencies,
                props: widget.props,
              })),
      });
    }
  };

  const goToSetup = (item) => {
    restoreAttempt(item);
    const id = item.pageKey || item.id;
    if (!id) return;
    router.replace({pathname: '/create', query: {setup: id}}, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    setAttempts(loadCreateAttempts());
  }, []);

  useEffect(() => {
    if (!router.isReady || !setupId) return;
    if (done?.pageKey === setupId || done?.id === setupId) return;
    restoreAttempt(findCreateAttempt(setupId));
  }, [router.isReady, setupId, done?.pageKey, done?.id]);

  useEffect(() => {
    if (!streaming) return undefined;
    const idle = [
      'Still writing widgets…',
      'Laying out the page…',
      'This usually takes a short minute…',
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (Date.now() - lastProgressRef.current < 4000) return;
      pushProgress(idle[i % idle.length]);
      i += 1;
    }, 4000);
    return () => clearInterval(timer);
  }, [streaming]);

  const resetPreview = () => {
    abortRef.current?.abort();
    setStreaming(false);
    setResult(null);
    setProgressLines([]);
    setDone(null);
    setView('setup');
    setFollowUp('');
  };

  const closeSetup = () => {
    resetPreview();
    router.replace('/create', undefined, {shallow: true});
  };

  const runStream = async (nextPrompt, options = {}) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setStreaming(true);
    setDone(null);
    setProgressLines([
      options.followUp ? 'Updating this page…' : 'Reading your description…',
    ]);
    lastProgressRef.current = Date.now();
    replaceOnSection.current = true;
    try {
      const data = await streamPageFromPrompt(
        nextPrompt,
        tenantTheme,
        {
          onStatus: pushProgress,
          onPage: (page) => {
            pushProgress(
              page?.title ? `Named the page “${page.title}”` : 'Named the page',
            );
            setResult((prev) => ({
              page,
              sections: replaceOnSection.current ? [] : prev?.sections || [],
            }));
          },
          onSection: (section) => {
            const labeled = {
              ...section,
              label: ensureWidgetLabel(section.label),
              name: ensureWidgetLabel(section.name || section.label),
            };
            pushProgress(`Wrote ${labeled.label}`);
            setResult((prev) => {
              if (replaceOnSection.current) {
                replaceOnSection.current = false;
                return {page: prev?.page || null, sections: [labeled]};
              }
              const current = prev?.sections || [];
              if (current.some((item) => item.id === labeled.id)) return prev;
              return {page: prev?.page || null, sections: [...current, labeled]};
            });
          },
          onComplete: (payload) => {
            pushProgress('Page is ready to process');
            setResult({
              page: payload.page,
              sections: (payload.sections || []).map((section) => ({
                ...section,
                label: ensureWidgetLabel(section.label),
                name: ensureWidgetLabel(section.name || section.label),
              })),
            });
          },
        },
        ac.signal,
        options,
      );
      setResult({
        page: data.page,
        sections: (data.sections || []).map((section) => ({
          ...section,
          label: ensureWidgetLabel(section.label),
          name: ensureWidgetLabel(section.name || section.label),
        })),
      });
    } catch (error) {
      if (error.name === 'AbortError') return;
      dispatch({
        type: FETCH_ERROR,
        payload: error.message || 'Could not generate this page.',
      });
      if (!options.followUp) setResult(null);
    } finally {
      setStreaming(false);
    }
  };

  const generate = async () => {
    if (!prompt.trim() || prompt.trim().length < 5) return;
    setResult(null);
    await runStream(prompt.trim());
  };

  const improve = async () => {
    if (!followUp.trim() || !result?.page) return;
    const note = followUp.trim();
    setFollowUp('');
    await runStream(prompt.trim(), {
      followUp: note,
      previous: {
        page: result.page,
        sections: (result.sections || []).map((section) => ({
          id: section.id,
          label: section.label,
          name: section.name,
        })),
      },
    });
  };

  const processPage = async () => {
    if (!result?.page || !result.sections?.length) return;
    setProcessing(true);
    setProgressLines(['Saving draft widgets…']);
    const saved = await dispatch(
      processGeneratedPage({
        page: result.page,
        sections: result.sections,
        prompt: prompt.trim(),
        onStatus: pushProgress,
      }),
    );
    setProcessing(false);
    if (saved) {
      const record = {
        ...saved,
        at: Date.now(),
        page: result.page,
        sections: result.sections,
      };
      setAttempts(saveCreateAttempt(record));
      goToSetup(record);
    }
  };

  const publishPage = async () => {
    if (!done?.widgets?.length) return;
    setPublishing(true);
    const published = await dispatch(publishGeneratedPage({widgets: done.widgets}));
    setPublishing(false);
    if (published) {
      const next = {
        ...done,
        published: true,
        widgets: published,
        sections: result?.sections || done.sections,
        page: result?.page || done.page,
      };
      setAttempts(saveCreateAttempt(next));
      setDone(next);
    }
  };

  const working = streaming || processing;
  const showBuilder = Boolean(result?.page || result?.sections?.length);

  return (
    <AppsContainer fullView>
      <Box className={classes.page}>
        {done && view === 'preview' && sections.some((section) => section.code) ? (
          <>
            <Box className={classes.summary}>
              <Typography className={classes.summaryText}>
                This is the page Create generated. It is still a draft until you
                publish.
              </Typography>
              <Button
                className={classes.ghostBtn}
                onClick={() => setView('setup')}>
                Back to setup
              </Button>
            </Box>
            <Box className={classes.canvas}>
              {sections.map((section) => (
                <SectionPreview
                  key={section.id || section.key}
                  section={section}
                  themeOverrides={tenantTheme}
                />
              ))}
            </Box>
          </>
        ) : done ? (
          <ProcessedSetup
            setup={done}
            themeOverrides={tenantTheme}
            canPublish={canPublish}
            publishing={publishing}
            onPublish={publishPage}
            onClose={closeSetup}
            onOpen={(path) => router.push(path)}
            onViewPage={
              sections.some((section) => section.code)
                ? () => setView('preview')
                : undefined
            }
          />
        ) : !showBuilder ? (
          <Box className={classes.emptyPage}>
            <Box className={classes.promptWrap}>
              <Box className={classes.promptCard}>
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
                  placeholder='Describe this page'
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
                      className={
                        prompt === item.prompt
                          ? `${classes.starterBtn} ${classes.starterBtnSelected}`
                          : classes.starterBtn
                      }
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
              {attempts.length ? (
                <Box className={classes.recents}>
                  <Typography className={classes.recentsTitle}>
                    Recent pages
                  </Typography>
                  <Typography className={classes.recentMeta} style={{marginBottom: 8}}>
                    Open one to get back to the generated page and its drafts.
                  </Typography>
                  {attempts.map((item) => (
                    <Button
                      key={item.id || item.pageKey || item.at}
                      className={classes.recentItem}
                      onClick={() => {
                        if (item.widgets?.length || item.pageKey) {
                          goToSetup(item);
                          return;
                        }
                        setPrompt(item.prompt || '');
                      }}>
                      <Box className={classes.recentName}>
                        {item.title || item.prompt || 'Untitled page'}
                      </Box>
                      <Box className={classes.recentMeta}>
                        {item.published ? 'Published' : 'Draft'}
                        {item.path ? ` · ${item.path}` : ''}
                      </Box>
                    </Button>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
        ) : (
          <>
            <Box className={classes.summary}>
              <Typography className={classes.summaryText}>
                {`This page is broken into ${count} widgets. Each one can be governed, given props, and published on its own.`}
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
                  {processing ? 'Saving drafts…' : 'Process'}
                </Button>
              </Box>
            </Box>
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
                  Widgets land here when the page is ready.
                </Typography>
              )}
            </Box>
            <Box className={classes.followUp}>
              <TextField
                className={classes.followField}
                variant='outlined'
                placeholder='Ask to change this page…'
                value={followUp}
                disabled={working || count < 5}
                onChange={(e) => setFollowUp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    improve();
                  }
                }}
              />
              <Button
                className={classes.primaryBtn}
                onClick={improve}
                disabled={working || count < 5 || !followUp.trim()}>
                Improve
              </Button>
            </Box>
          </>
        )}
        <GenerateProgress
          open={streaming || processing}
          title={processing ? 'Saving drafts' : 'Creating this page'}
          hint='A line lands here as each step finishes.'
          lines={progressLines}
          stopLabel={processing ? 'Working…' : 'Stop'}
          onStop={processing ? undefined : resetPreview}
        />
      </Box>
    </AppsContainer>
  );
};

export default CreatePage;
