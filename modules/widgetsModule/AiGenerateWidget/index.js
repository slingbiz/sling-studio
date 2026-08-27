import React, {useState, useEffect, useContext} from 'react';
import {
  makeStyles,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Icon,
  Chip,
} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppsHeader from '../../../@sling/core/AppsContainer/AppsHeader';
import {useDispatch} from 'react-redux';
import {
  generateWidget,
  saveGeneratedWidget,
  submitForReview,
  publishWidgetAction,
  updateWidget,
} from '../../../redux/actions/Widgets';
import {useAuthUser} from '../../../@sling/utility/AppHooks';
import {Form, Formik} from 'formik';
import {useRouter} from 'next/router';
import WidgetEditorTabs, {emptyProp} from '../WidgetEditor/WidgetEditorTabs';
import {SERVICE_URL} from '../../../shared/constants/Services';
import {getAiBase, generateHeaders, generateErrorMessage} from '../../../shared/aiGenerate';
import ApiAuth from '../../../@sling/services/ApiAuthConfig';
import {SLING_ORANGE, SLING_CREAM} from '../../aiBuilder/slingTheme';
import {resolveWidgetTheme} from '../../aiBuilder/widgetTheme';
import AppContext from '../../../@sling/utility/AppContext';

const STARTER_PROMPTS = [
  'Login form with email, password, and remember-me',
  'Three-tier pricing table',
  'Hero banner with headline and CTA',
  'Testimonial cards',
  'FAQ accordion',
  'Newsletter signup',
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: '28px 32px 40px',
    overflow: 'auto',
    background: `linear-gradient(180deg, ${SLING_CREAM} 0%, #ffffff 220px)`,
  },
  hero: {
    maxWidth: 760,
    margin: '0 auto 8px',
    textAlign: 'center',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    color: SLING_ORANGE,
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 1.25,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: 15,
    marginBottom: 24,
  },
  promptCard: {
    maxWidth: 760,
    margin: '0 auto 24px',
    padding: 20,
    borderRadius: 12,
    border: '1px solid #f5efef',
    boxShadow: '0 8px 24px rgba(255, 152, 0, 0.08)',
    backgroundColor: '#fff',
  },
  promptField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 6,
      backgroundColor: '#fff',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: SLING_ORANGE,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: SLING_ORANGE,
        borderWidth: 2,
      },
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    justifyContent: 'center',
  },
  chip: {
    borderColor: '#ffd59a',
    backgroundColor: SLING_CREAM,
    color: '#7a4a00',
    '&:hover': {
      backgroundColor: '#ffe3b8',
    },
  },
  actionBar: {
    display: 'flex',
    gap: 12,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  editorActionBar: {
    display: 'flex',
    gap: 12,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  editorStatus: {
    marginRight: 'auto',
  },
  generateBtn: {
    fontWeight: Fonts.MEDIUM,
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    borderRadius: 6,
    padding: '10px 22px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f57c00',
      boxShadow: '0 4px 12px rgba(255, 152, 0, 0.28)',
    },
    '&:disabled': {
      backgroundColor: '#ffd59a',
      color: '#fff',
    },
  },
  ghostBtn: {
    fontWeight: Fonts.MEDIUM,
    textTransform: 'none',
    color: SLING_ORANGE,
    borderColor: SLING_ORANGE,
    borderRadius: 6,
  },
  resultSection: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  metaCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    border: '1px solid #f5efef',
  },
  metaChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  metaChip: {
    maxWidth: '100%',
  },
  '@keyframes pulse': {
    '0%, 100%': {opacity: 0.5},
    '50%': {opacity: 1},
  },
  statusBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    margin: '0 auto 16px',
    maxWidth: 760,
    padding: '8px 12px',
    backgroundColor: SLING_CREAM,
    borderRadius: 6,
    border: '1px solid #ffd59a',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: SLING_ORANGE,
    animation: '$pulse 1.5s ease-in-out infinite',
  },
  errorCard: {
    maxWidth: 760,
    margin: '0 auto 16px',
    padding: 12,
    borderColor: '#f44336',
  },
  headerIcon: {
    color: SLING_ORANGE,
  },
  collapsedPrompt: {
    maxWidth: 1100,
    margin: '0 auto 12px',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #f5efef',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  collapsedPromptText: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
}));

function getAiBaseUrl() {
  return getAiBase();
}

function getApiBaseUrl() {
  return (SERVICE_URL || '').replace(/\/$/, '');
}

async function streamGenerate(prompt, themeConfig, callbacks) {
  const baseUrl = getAiBaseUrl();
  if (!baseUrl) {
    throw new Error('AI_SERVICE_UNAVAILABLE');
  }

  const res = await fetch(`${baseUrl}/widget/generate/stream`, {
    method: 'POST',
    headers: generateHeaders(),
    body: JSON.stringify({prompt, themeConfig}),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(generateErrorMessage(res, data));
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const {done, value} = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, {stream: true});
    const events = buffer.split('\n\n');
    buffer = events.pop();
    for (const event of events) {
      for (const line of event.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        try {
          const data = JSON.parse(line.slice(6));
          switch (data.type) {
            case 'status':
              callbacks.onStatus?.(data.message);
              break;
            case 'code_start':
              callbacks.onCodeStart?.();
              break;
            case 'code_token':
              callbacks.onCodeToken?.(data.text);
              break;
            case 'complete':
              callbacks.onComplete?.(data.widget);
              break;
            case 'error':
              callbacks.onError?.(data.message);
              break;
            default:
              break;
          }
        } catch {
          // ignore malformed SSE chunks
        }
      }
    }
  }
}

const AiGenerateWidget = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const {theme} = useContext(AppContext);
  const user = useAuthUser();
  const canPublish = user?.role === 'owner' || user?.role === 'admin' || user?.role === 'publisher';
  const tenantTheme = resolveWidgetTheme(theme);
  const [prompt, setPrompt] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [streamingCode, setStreamingCode] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [widget, setWidget] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState(null);
  const [promptOpen, setPromptOpen] = useState(true);
  const [editorProps, setEditorProps] = useState([emptyProp]);

  useEffect(() => {
    if (Array.isArray(widget?.props) && widget.props.length) {
      setEditorProps(widget.props);
    }
  }, [widget]);

  const persistWidget = async (widgetData) => {
    setStatusMessage('Saving widget...');
    setStreamingCode(widgetData.code || '');
    const saved = await dispatch(saveGeneratedWidget(widgetData, prompt));
    if (saved) {
      setWidget(saved);
      setPhase('complete');
      setPromptOpen(false);
      setStatusMessage('');
      return;
    }
    setError('Failed to save widget. Preview is still available.');
    setWidget(widgetData);
    setPhase('complete');
    setPromptOpen(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setStreaming(true);
    setPromptOpen(false);
    setPhase('thinking');
    setStreamingCode('');
    setWidget(null);
    setEditorProps([emptyProp]);
    setSubmitted(false);
    setPublished(false);
    setPreviewError(null);
    setError(null);
    setStatusMessage('AI is designing your widget...');

    try {
      await streamGenerate(prompt.trim(), tenantTheme, {
        onStatus: (msg) => setStatusMessage(msg),
        onCodeStart: () => {
          setPhase('coding');
          setStatusMessage('Writing code...');
        },
        onCodeToken: (text) => {
          setStreamingCode((prev) => prev + text);
        },
        onComplete: async (widgetData) => {
          try {
            await persistWidget(widgetData);
          } catch (saveErr) {
            setError(saveErr.message);
            setWidget(widgetData);
            setPhase('complete');
            setPromptOpen(false);
          }
          setStreaming(false);
        },
        onError: (msg) => {
          setError(msg);
          setStreaming(false);
          setPhase('idle');
          setStatusMessage('');
        },
      });
    } catch (err) {
      try {
        setStatusMessage('Generating without stream...');
        const apiBase = getApiBaseUrl();
        if (apiBase) {
          const client = await ApiAuth();
          const res = await client.post(`${apiBase}/v1/widgets/generate`, {
            prompt: prompt.trim(),
            themeConfig: tenantTheme,
          });
          if (res?.data?.widget) {
            setWidget(res.data.widget);
            setStreamingCode(res.data.widget.code || '');
            setPhase('complete');
            setPromptOpen(false);
            setStreaming(false);
            setStatusMessage('');
            return;
          }
        }
        const saved = await dispatch(generateWidget(prompt.trim(), tenantTheme));
        if (saved) {
          setWidget(saved);
          setStreamingCode(saved.code || '');
          setPhase('complete');
          setPromptOpen(false);
          setStreaming(false);
          setStatusMessage('');
          return;
        }
        throw err;
      } catch (fallbackErr) {
        setError(fallbackErr.message || err.message);
        setStreaming(false);
        setPhase('idle');
        setStatusMessage('');
      }
    }
  };

  const widgetId = widget?._id || widget?.id;

  const handleSaveEditor = async (data) => {
    if (!widgetId) return;
    const payload = {
      ...data,
      type: 'widget',
      props: editorProps,
      code: data.code || streamingCode,
    };
    await dispatch(updateWidget(widgetId, payload));
    setWidget((prev) => ({...prev, ...payload}));
  };

  const handleSubmitForReview = async () => {
    if (!widgetId) return;
    const result = await dispatch(submitForReview(widgetId));
    if (result) setSubmitted(true);
  };

  const handlePublish = async () => {
    if (!widgetId) return;
    const result = await dispatch(publishWidgetAction(widgetId));
    if (result) {
      setWidget(result);
      setPublished(true);
    }
  };

  const statusLabel = published
    ? 'published'
    : submitted
    ? 'pending review'
    : (widget?.status || 'draft').replace('_', ' ');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const isWorking = phase === 'thinking' || phase === 'coding';

  return (
    <Box className={classes.root}>
      <AppsHeader>
        <Button className={classes.ghostBtn} variant='outlined' onClick={() => router.push('/widgets/widgets-integration')}>
          Back to Widgets
        </Button>
      </AppsHeader>

      <Box className={classes.content}>
        {promptOpen && (
          <Box className={classes.hero}>
            <Typography className={classes.eyebrow}>
              <Icon style={{fontSize: 16}}>auto_awesome</Icon>
              Governed AI
            </Typography>
            <Typography className={classes.title}>
              Describe a widget. Sling generates a tenant-private component.
            </Typography>
            <Typography className={classes.subtitle}>
              Generated code stays in your workspace, goes through review, and never leaks to another client.
            </Typography>
          </Box>
        )}

        {!promptOpen ? (
          <Paper
            className={classes.collapsedPrompt}
            elevation={0}
            onClick={() => setPromptOpen(true)}>
            <Icon style={{color: SLING_ORANGE}}>expand_more</Icon>
            <Typography className={classes.collapsedPromptText}>
              {prompt || 'Edit prompt'}
            </Typography>
            <Chip size='small' label='Edit prompt' variant='outlined' />
          </Paper>
        ) : (
          <Paper className={classes.promptCard} elevation={0}>
            {phase === 'complete' && (
              <Box style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 8}}>
                <Chip
                  size='small'
                  label='Collapse'
                  variant='outlined'
                  onClick={() => setPromptOpen(false)}
                />
              </Box>
            )}
            <TextField
              className={classes.promptField}
              multiline
              rows={3}
              variant='outlined'
              placeholder='e.g. A login form with email, password, and a Remember me checkbox'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={streaming}
              helperText='Enter to generate · Shift+Enter for a new line'
            />
            <Box className={classes.chips}>
              {STARTER_PROMPTS.map((idea) => (
                <Chip
                  key={idea}
                  className={classes.chip}
                  size='small'
                  label={idea}
                  onClick={() => setPrompt(idea)}
                  disabled={streaming}
                />
              ))}
            </Box>
            <Box className={classes.actionBar}>
              <Button
                className={classes.generateBtn}
                variant='contained'
                onClick={handleGenerate}
                disabled={streaming || !prompt.trim()}
                startIcon={<Icon>auto_awesome</Icon>}>
                {streaming ? 'Generating...' : 'Generate Widget'}
              </Button>
              {widget && !streaming && (
                <Button
                  className={classes.ghostBtn}
                  variant='outlined'
                  onClick={handleGenerate}
                  startIcon={<Icon>refresh</Icon>}>
                  Regenerate
                </Button>
              )}
            </Box>
          </Paper>
        )}

        {error && (
          <Paper variant='outlined' className={classes.errorCard}>
            <Typography variant='body2' color='error'>
              {error}
            </Typography>
          </Paper>
        )}

        {isWorking && (
          <Box className={classes.statusBar}>
            <Box className={classes.statusDot} />
            <Typography variant='body2' color='textSecondary'>
              {statusMessage}
            </Typography>
          </Box>
        )}

        {(isWorking || phase === 'complete') && (
          <Box className={classes.resultSection}>
            {phase === 'complete' && widget && (
              <Paper className={classes.metaCard} variant='outlined'>
                <Box className={classes.metaChips}>
                  {widget.name && (
                    <Chip className={classes.metaChip} size='small' label={widget.name} color='default' />
                  )}
                  {widget.key && (
                    <Chip className={classes.metaChip} size='small' label={widget.key} variant='outlined' />
                  )}
                  <Chip
                    size='small'
                    label={`v${widget.version || 1}`}
                    variant='outlined'
                  />
                  <Chip
                    size='small'
                    label={statusLabel}
                    variant='outlined'
                  />
                  <Chip
                    size='small'
                    label='AI'
                    style={{backgroundColor: SLING_ORANGE, color: '#fff'}}
                  />
                  {widget.description && (
                    <Chip className={classes.metaChip} size='small' label={widget.description} variant='outlined' />
                  )}
                </Box>
              </Paper>
            )}

            <Formik
              enableReinitialize
              initialValues={{
                name: widget?.name || '',
                key: widget?.key || '',
                description: widget?.description || '',
                icon: widget?.icon || '',
                ownership: widget?.ownership || 'private',
                type: 'widget',
                code: widget?.code || streamingCode,
              }}
              onSubmit={handleSaveEditor}>
              {({values, setFieldValue, isSubmitting}) => (
                <Form>
                  <WidgetEditorTabs
                    code={streamingCode || values.code}
                    onCodeChange={(next) => {
                      setStreamingCode(next);
                      setFieldValue('code', next);
                    }}
                    dependencies={widget?.dependencies}
                    themeOverrides={tenantTheme}
                    props={editorProps}
                    onPropsChange={setEditorProps}
                    streaming={isWorking}
                    initialTab={isWorking ? 'code' : 'widget'}
                    onPreviewError={setPreviewError}
                    widgetId={widgetId}
                    canRestore={canPublish}
                    onRestored={(next) => {
                      setWidget(next);
                      setStreamingCode(next?.code || '');
                      setPublished(false);
                      setSubmitted(false);
                      if (Array.isArray(next?.props) && next.props.length) {
                        setEditorProps(next.props);
                      }
                    }}
                  />
                  {previewError && (
                    <Paper variant='outlined' style={{padding: 10, marginTop: 8, borderColor: '#f44336'}}>
                      <Typography variant='body2' color='error'>
                        Preview error: {previewError}
                      </Typography>
                    </Paper>
                  )}
                  {phase === 'complete' && widget && (
                    <Box className={classes.editorActionBar}>
                      <Typography
                        className={classes.editorStatus}
                        variant='body2'
                        color='textSecondary'>
                        {published
                          ? 'Published'
                          : submitted
                          ? 'In review'
                          : 'Saved as draft'}
                      </Typography>
                      <Button
                        type='submit'
                        variant='outlined'
                        className={classes.ghostBtn}
                        disabled={isSubmitting || !widgetId}>
                        Save changes
                      </Button>
                      {canPublish ? (
                        <Button
                          className={classes.generateBtn}
                          variant='contained'
                          type='button'
                          onClick={handlePublish}
                          disabled={published || !widgetId}
                          startIcon={<Icon>publish</Icon>}>
                          {published ? 'Published' : 'Publish'}
                        </Button>
                      ) : (
                        <Button
                          className={classes.generateBtn}
                          variant='contained'
                          type='button'
                          onClick={handleSubmitForReview}
                          disabled={submitted || published || !widgetId}
                          startIcon={<Icon>rate_review</Icon>}>
                          {submitted
                            ? 'Submitted for Review'
                            : 'Submit for Review'}
                        </Button>
                      )}
                    </Box>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AiGenerateWidget;
