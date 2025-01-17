import React, {useState} from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  IconButton,
} from '@material-ui/core';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import {makeStyles} from '@material-ui/core/styles';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  canvas: {
    display: 'flex',
    gap: theme.spacing(3),
    marginTop: theme.spacing(3),
    height: 'calc(100vh - 250px)',
    minHeight: '600px',
  },
  progress: {
    flex: '0 0 30%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  progressContent: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
  },
  inputContainer: {
    marginTop: 'auto',
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  preview: {
    flex: '0 0 70%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  previewHeader: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  progressItem: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
  },
  tabRoot: {
    minWidth: 'auto',
    padding: '6px 12px',
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '0.875rem',
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
  tabsRoot: {
    minHeight: 'auto',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
  },
  livePreview: {
    flex: 1,
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    minHeight: '500px',
  },
  liveEditor: {
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  liveError: {
    padding: theme.spacing(2),
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.light,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
  },
  inputWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
  },
  input: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius * 2,
      backgroundColor: theme.palette.background.default,
      '& textarea': {
        padding: theme.spacing(1.5, 2),
        paddingRight: theme.spacing(10),
      },
    },
  },
  actionButtons: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: theme.spacing(1),
    padding: theme.spacing(0.5),
    '& .MuiIconButton-root': {
      padding: theme.spacing(1),
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'scale(1.1)',
      },
    },
  },
}));

const CanvasLayout = ({
  activeTab,
  handleTabChange,
  generatedCode,
  codeScope,
  inputValue,
  isProcessing,
}) => {
  const classes = useStyles();
  const [promptInput, setPromptInput] = useState('');

  const handlePromptSubmit = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // Handle prompt submission
      console.log('Prompt submitted:', promptInput);
      setPromptInput('');
    }
  };

  return (
    <Box className={classes.canvas}>
      <Box className={classes.progress}>
        <Box className={classes.progressContent}>
          <Typography variant='h6' gutterBottom>
            Progress & Activity
          </Typography>
          <Box className={classes.progressItem}>
            <Typography variant='subtitle2' color='textSecondary'>
              Prompt Analysis
            </Typography>
            <Typography variant='body2'>"{inputValue}"</Typography>
          </Box>
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            className={classes.input}
            variant="outlined"
            multiline
            rows={1}
            placeholder="Ask a follow up..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyPress={handlePromptSubmit}
            InputProps={{
              endAdornment: (
                <Box className={classes.actionButtons}>
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                  <IconButton onClick={() => handlePromptSubmit({ key: 'Enter' })}>
                    <Send />
                  </IconButton>
                </Box>
              ),
            }}
          />
        </Box>
      </Box>
      <Box className={classes.preview}>
        <Box className={classes.previewHeader}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator,
            }}>
            <Tab
              label='Preview'
              value='preview'
              classes={{
                root: classes.tabRoot,
              }}
            />
            <Tab
              label='Code'
              value='code'
              classes={{
                root: classes.tabRoot,
              }}
            />
          </Tabs>
        </Box>
        <Box flex={1} style={{overflowY: 'auto'}}>
          {isProcessing ? (
            <Typography variant='body2' color='textSecondary'>
              Generating code...
            </Typography>
          ) : (
            <Box
              style={{
                backgroundColor: '#fff',
                padding: '16px',
                borderRadius: '4px',
                minHeight: '500px',
              }}>
              {activeTab === 'preview' ? (
                generatedCode ? (
                  <LiveProvider
                    code={generatedCode}
                    noInline={true}
                    scope={{
                      React,
                      ...codeScope,
                    }}>
                    <Box className={classes.livePreview}>
                      <LivePreview />
                    </Box>
                    <LiveError className={classes.liveError} />
                  </LiveProvider>
                ) : (
                  <Typography variant='body2' color='textSecondary'>
                    No preview available
                  </Typography>
                )
              ) : (
                <LiveProvider
                  code={generatedCode}
                  noInline={true}
                  scope={{
                    React,
                    ...codeScope,
                  }}>
                  <LiveEditor
                    className={classes.liveEditor}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 14,
                      backgroundColor: '#f5f5f5',
                      borderRadius: 4,
                      padding: 16,
                    }}
                  />
                  <LiveError
                    style={{
                      color: 'red',
                      marginTop: 8,
                      padding: 8,
                      backgroundColor: '#ffebee',
                      borderRadius: 4,
                    }}
                  />
                </LiveProvider>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CanvasLayout;
