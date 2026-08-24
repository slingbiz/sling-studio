import React, {useState, useRef, useEffect} from 'react';
import {
  makeStyles,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Icon,
  LinearProgress,
} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppsHeader from '../../../@sling/core/AppsContainer/AppsHeader';
import {useDispatch} from 'react-redux';
import {saveGeneratedWidget, submitForReview} from '../../../redux/actions/Widgets';
import SandboxedPreview from '../../aiBuilder/components/SandboxedPreview';
import Chip from '@material-ui/core/Chip';
import {useRouter} from 'next/router';
import {AI_SERVICE_URL} from '../../../shared/constants/Services';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: 20,
    overflow: 'auto',
  },
  promptSection: {
    marginBottom: 24,
  },
  promptField: {
    width: '100%',
  },
  actionBar: {
    display: 'flex',
    gap: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  resultSection: {
    marginTop: 24,
  },
  previewContainer: {
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 400,
  },
  metaCard: {
    padding: 16,
    marginBottom: 16,
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  btn: {
    fontWeight: Fonts.MEDIUM,
    textTransform: 'capitalize',
  },
  // Streaming code view
  codePane: {
    backgroundColor: '#1e1e2e',
    color: '#cdd6f4',
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontSize: 13,
    lineHeight: 1.7,
    padding: '16px 20px',
    borderRadius: 8,
    overflow: 'auto',
    minHeight: 400,
    maxHeight: 500,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    position: 'relative',
  },
  '@keyframes blink': {
    '0%, 100%': {opacity: 1},
    '50%': {opacity: 0},
  },
  cursor: {
    display: 'inline-block',
    width: 2,
    height: '1em',
    backgroundColor: theme.palette.primary.main,
    animation: '$blink 1s step-end infinite',
    verticalAlign: 'text-bottom',
    marginLeft: 1,
  },
  '@keyframes pulse': {
    '0%, 100%': {opacity: 0.5},
    '50%': {opacity: 1},
  },
  previewPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    border: `1px dashed ${theme.palette.grey[300]}`,
    gap: 12,
  },
  placeholderIcon: {
    fontSize: 48,
    color: theme.palette.grey[300],
    animation: '$pulse 2s ease-in-out infinite',
  },
  statusBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    padding: '8px 12px',
    backgroundColor: theme.palette.primary.main + '10',
    borderRadius: 6,
    border: `1px solid ${theme.palette.primary.main}30`,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    animation: '$pulse 1.5s ease-in-out infinite',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: theme.palette.text.secondary,
    marginBottom: 8,
  },
}));

async function streamGenerate(prompt, themeConfig, callbacks) {
  const baseUrl = (AI_SERVICE_URL || '').replace(/\/$/, '');
  const res = await fetch(`${baseUrl}/widget/generate/stream`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({prompt, themeConfig}),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Generation failed (${res.status})`);
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
            case 'status': callbacks.onStatus?.(data.message); break;
            case 'code_start': callbacks.onCodeStart?.(); break;
            case 'code_token': callbacks.onCodeToken?.(data.text); break;
            case 'complete': callbacks.onComplete?.(data.widget); break;
            case 'error': callbacks.onError?.(data.message); break;
          }
        } catch {}
      }
    }
  }
}

const AiGenerateWidget = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | thinking | coding | complete
  const [streamingCode, setStreamingCode] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [widget, setWidget] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current && phase === 'coding') {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [streamingCode, phase]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setStreaming(true);
    setPhase('thinking');
    setStreamingCode('');
    setWidget(null);
    setSubmitted(false);
    setPreviewError(null);
    setError(null);
    setStatusMessage('AI is designing your widget...');

    try {
      await streamGenerate(prompt.trim(), null, {
        onStatus: (msg) => setStatusMessage(msg),
        onCodeStart: () => {
          setPhase('coding');
          setStatusMessage('Writing code...');
        },
        onCodeToken: (text) => {
          setStreamingCode((prev) => prev + text);
        },
        onComplete: async (widgetData) => {
          setStatusMessage('Saving widget...');
          setStreamingCode(widgetData.code);
          setWidget(widgetData);
          setPhase('complete');
          try {
            const saved = await dispatch(saveGeneratedWidget(widgetData, prompt));
            if (saved) {
              setWidget({...widgetData, ...saved});
              setStatusMessage('');
            } else {
              setError('Failed to save widget — preview still available');
              setStatusMessage('');
            }
          } catch (saveErr) {
            setError(saveErr.message);
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
      setError(err.message);
      setStreaming(false);
      setPhase('idle');
      setStatusMessage('');
    }
  };

  const handleSubmitForReview = async () => {
    if (!widget?._id) return;
    const result = await dispatch(submitForReview(widget._id));
    if (result) setSubmitted(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate();
  };

  const isWorking = phase === 'thinking' || phase === 'coding';

  return (
    <Box className={classes.root}>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3' style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <Icon>auto_awesome</Icon>
          AI Widget Generator
        </Box>
        <Button className={classes.btn} variant='text' color='primary' onClick={() => router.push('/widgets/widgets-integration')}>
          Back to Widgets
        </Button>
      </AppsHeader>

      <Box className={classes.content}>
        {/* Prompt */}
        <Box className={classes.promptSection}>
          <Typography variant='body1' gutterBottom>
            Describe the widget you want to generate:
          </Typography>
          <TextField
            className={classes.promptField}
            multiline
            rows={3}
            variant='outlined'
            placeholder='e.g. A pricing table with three tiers showing features and pricing'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={streaming}
          />
          <Box className={classes.actionBar}>
            <Button
              className={classes.btn}
              variant='contained'
              color='primary'
              onClick={handleGenerate}
              disabled={streaming || !prompt.trim()}
              startIcon={<Icon>auto_awesome</Icon>}>
              {streaming ? 'Generating...' : 'Generate Widget'}
            </Button>
            {widget && !streaming && (
              <Button
                className={classes.btn}
                variant='outlined'
                color='primary'
                onClick={handleGenerate}
                startIcon={<Icon>refresh</Icon>}>
                Regenerate
              </Button>
            )}
          </Box>
        </Box>

        {/* Error */}
        {error && (
          <Paper variant='outlined' style={{padding: 12, marginBottom: 16, borderColor: '#f44336'}}>
            <Typography variant='body2' color='error'>{error}</Typography>
          </Paper>
        )}

        {/* Status bar during streaming */}
        {isWorking && (
          <Box className={classes.statusBar}>
            <Box className={classes.statusDot} />
            <Typography variant='body2' color='textSecondary'>
              {statusMessage}
            </Typography>
          </Box>
        )}

        {/* Streaming / Result area */}
        {(isWorking || phase === 'complete') && (
          <Box className={classes.resultSection}>
            {/* Metadata card - only when complete */}
            {phase === 'complete' && widget && (
              <Paper className={classes.metaCard} variant='outlined'>
                <Box className={classes.metaRow}>
                  <Typography variant='subtitle2'>Name:</Typography>
                  <Typography variant='body2'>{widget.name}</Typography>
                </Box>
                <Box className={classes.metaRow}>
                  <Typography variant='subtitle2'>Key:</Typography>
                  <Chip size='small' label={widget.key} variant='outlined' />
                </Box>
                {widget.description && (
                  <Box className={classes.metaRow}>
                    <Typography variant='subtitle2'>Description:</Typography>
                    <Typography variant='body2'>{widget.description}</Typography>
                  </Box>
                )}
                <Box className={classes.metaRow}>
                  <Typography variant='subtitle2'>Status:</Typography>
                  <Chip size='small' label={submitted ? 'pending review' : (widget.status || 'draft').replace('_', ' ')} color={submitted ? 'primary' : 'default'} variant='outlined' />
                  <Chip size='small' label='AI' color='primary' style={{height: 20, fontSize: 10}} />
                </Box>
                {widget._id && (
                  <Box style={{marginTop: 12}}>
                    <Button className={classes.btn} variant='contained' color='primary' onClick={handleSubmitForReview} disabled={submitted} startIcon={<Icon>rate_review</Icon>}>
                      {submitted ? 'Submitted for Review' : 'Submit for Review'}
                    </Button>
                  </Box>
                )}
              </Paper>
            )}

            <Grid container spacing={3}>
              {/* Preview */}
              <Grid item xs={12} md={6}>
                <Typography className={classes.sectionLabel}>Preview</Typography>
                {phase === 'complete' && widget ? (
                  <Box className={classes.previewContainer}>
                    <SandboxedPreview
                      key={widget._id || widget.key || 'preview'}
                      code={widget.code || streamingCode}
                      dependencies={widget.dependencies}
                      style={{minHeight: 400}}
                      onError={setPreviewError}
                    />
                  </Box>
                ) : (
                  <Box className={classes.previewPlaceholder}>
                    <Icon className={classes.placeholderIcon}>widgets</Icon>
                    <Typography variant='body2' color='textSecondary'>
                      Preview will appear when code is ready
                    </Typography>
                  </Box>
                )}
                {previewError && (
                  <Typography variant='body2' color='error' style={{marginTop: 8}}>
                    Preview error: {previewError}
                  </Typography>
                )}
              </Grid>

              {/* Code */}
              <Grid item xs={12} md={6}>
                <Typography className={classes.sectionLabel}>
                  {phase === 'coding' ? 'Writing Code...' : 'Generated Code'}
                </Typography>
                <Box className={classes.codePane} ref={codeRef}>
                  {phase === 'thinking' && !streamingCode ? (
                    <Typography variant='body2' style={{color: '#7f849c', fontStyle: 'italic'}}>
                      Waiting for AI response...
                    </Typography>
                  ) : (
                    <>
                      {streamingCode}
                      {phase === 'coding' && <span className={classes.cursor} />}
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AiGenerateWidget;
