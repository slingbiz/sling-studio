import React, {useState} from 'react';
import {
  makeStyles,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Icon,
} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppsHeader from '../../../@sling/core/AppsContainer/AppsHeader';
import {useSelector, useDispatch} from 'react-redux';
import {
  generateWidget,
  submitForReview,
} from '../../../redux/actions/Widgets';
import SandboxedPreview from '../../aiBuilder/components/SandboxedPreview';
import Chip from '@material-ui/core/Chip';
import {useRouter} from 'next/router';

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
  codeContainer: {
    maxHeight: 400,
    overflow: 'auto',
  },
  codeField: {
    width: '100%',
    fontFamily: 'monospace',
    fontSize: 13,
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
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  btn: {
    fontWeight: Fonts.MEDIUM,
    textTransform: 'capitalize',
  },
}));

const AiGenerateWidget = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const {generating, generatedWidget} = useSelector(({widgets}) => widgets);
  const [prompt, setPrompt] = useState('');
  const [previewError, setPreviewError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setSubmitted(false);
    setPreviewError(null);
    await dispatch(generateWidget(prompt));
  };

  const handleSubmitForReview = async () => {
    if (!generatedWidget?._id) return;
    const result = await dispatch(submitForReview(generatedWidget._id));
    if (result) {
      setSubmitted(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleGenerate();
    }
  };

  return (
    <Box className={classes.root}>
      <AppsHeader>
        <Box
          fontWeight={Fonts.BOLD}
          component='h3'
          style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <Icon>auto_awesome</Icon>
          AI Widget Generator
        </Box>
        <Button
          className={classes.btn}
          variant='text'
          color='primary'
          onClick={() => router.push('/widgets/widgets-integration')}>
          Back to Widgets
        </Button>
      </AppsHeader>
      <Box className={classes.content}>
        <Box className={classes.promptSection}>
          <Typography variant='body1' gutterBottom>
            Describe the widget you want to generate:
          </Typography>
          <TextField
            className={classes.promptField}
            multiline
            rows={4}
            variant='outlined'
            placeholder='e.g. A pricing table with three tiers (Basic, Pro, Enterprise) with feature comparison and call-to-action buttons'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={generating}
          />
          <Box className={classes.actionBar}>
            <Button
              className={classes.btn}
              variant='contained'
              color='primary'
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              startIcon={<Icon>auto_awesome</Icon>}>
              {generating ? 'Generating...' : 'Generate Widget'}
            </Button>
            {generatedWidget && (
              <Button
                className={classes.btn}
                variant='outlined'
                color='primary'
                onClick={handleGenerate}
                disabled={generating}
                startIcon={<Icon>refresh</Icon>}>
                Regenerate
              </Button>
            )}
          </Box>
        </Box>

        {generating && (
          <Box className={classes.loadingContainer}>
            <CircularProgress size={48} />
            <Typography
              variant='body1'
              color='textSecondary'
              style={{marginTop: 16}}>
              Generating your widget with AI...
            </Typography>
          </Box>
        )}

        {generatedWidget && !generating && (
          <Box className={classes.resultSection}>
            <Paper className={classes.metaCard} variant='outlined'>
              <Box className={classes.metaRow}>
                <Typography variant='subtitle2'>Name:</Typography>
                <Typography variant='body2'>
                  {generatedWidget.name}
                </Typography>
              </Box>
              <Box className={classes.metaRow}>
                <Typography variant='subtitle2'>Key:</Typography>
                <Chip
                  size='small'
                  label={generatedWidget.key}
                  variant='outlined'
                />
              </Box>
              {generatedWidget.description && (
                <Box className={classes.metaRow}>
                  <Typography variant='subtitle2'>Description:</Typography>
                  <Typography variant='body2'>
                    {generatedWidget.description}
                  </Typography>
                </Box>
              )}
              <Box className={classes.metaRow}>
                <Typography variant='subtitle2'>Status:</Typography>
                <Chip
                  size='small'
                  label={
                    submitted
                      ? 'pending review'
                      : (generatedWidget.status || 'draft').replace('_', ' ')
                  }
                  color={submitted ? 'primary' : 'default'}
                  variant='outlined'
                />
                <Chip
                  size='small'
                  label='AI'
                  color='primary'
                  style={{height: 20, fontSize: 10}}
                />
              </Box>
              <Box style={{marginTop: 12}}>
                <Button
                  className={classes.btn}
                  variant='contained'
                  color='primary'
                  onClick={handleSubmitForReview}
                  disabled={submitted}
                  startIcon={<Icon>rate_review</Icon>}>
                  {submitted ? 'Submitted for Review' : 'Submit for Review'}
                </Button>
              </Box>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Typography variant='subtitle2' gutterBottom>
                  Preview
                </Typography>
                <Box className={classes.previewContainer}>
                  <SandboxedPreview
                    code={generatedWidget.code}
                    dependencies={generatedWidget.dependencies}
                    style={{minHeight: 400}}
                    onError={setPreviewError}
                  />
                </Box>
                {previewError && (
                  <Typography
                    variant='body2'
                    color='error'
                    style={{marginTop: 8}}>
                    Preview error: {previewError}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant='subtitle2' gutterBottom>
                  Generated Code
                </Typography>
                <Box className={classes.codeContainer}>
                  <TextField
                    className={classes.codeField}
                    multiline
                    variant='outlined'
                    value={generatedWidget.code || ''}
                    InputProps={{
                      readOnly: true,
                      style: {fontFamily: 'monospace', fontSize: 13},
                    }}
                  />
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
