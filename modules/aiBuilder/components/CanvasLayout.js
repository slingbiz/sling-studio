import React, {useState, useEffect} from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
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
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.divider,
      borderRadius: '3px',
      '&:hover': {
        background: theme.palette.action.hover,
      },
    },
  },
  chatHistory: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  chatMessage: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius * 2,
    maxWidth: '80%',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    position: 'relative',
    '&.user': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      alignSelf: 'flex-end',
      borderTopRightRadius: 4,
      '& .MuiTypography-root': {
        textAlign: 'right',
      },
      '& $messageTime': {
        color: 'rgba(255,255,255,0.7)',
      },
    },
    '&.ai': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      alignSelf: 'flex-start',
      borderTopLeftRadius: 4,
      borderColor: theme.palette.divider,
      border: '1px solid',
    },
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
  },
  messageContent: {
    wordBreak: 'break-word',
    '& .MuiTypography-body1': {
      fontSize: '0.95rem',
      lineHeight: 1.5,
    },
  },
  messageTime: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
    opacity: 0.8,
  },
  inputContainer: {
    marginTop: 'auto',
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius * 3,
      backgroundColor: theme.palette.background.default,
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      },
      '& textarea': {
        padding: theme.spacing(1.5, 2),
        paddingRight: theme.spacing(12),
        fontSize: '0.95rem',
      },
    },
  },
  actionButtons: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    backgroundColor: 'transparent',
    '& .MuiIconButton-root': {
      padding: theme.spacing(1),
      transition: 'all 0.2s',
      color: theme.palette.text.secondary,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'scale(1.1)',
        color: theme.palette.primary.main,
      },
    },
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
  const [chatHistory, setChatHistory] = useState([]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handlePromptSubmit = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!promptInput.trim()) return;

      const newMessage = {
        type: 'user',
        content: promptInput,
        timestamp: new Date().toISOString(),
      };

      // Add user message
      setChatHistory((prev) => [...prev, newMessage]);

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiResponse = {
          type: 'ai',
          content: 'This is a simulated AI response. Replace with actual API integration.',
          timestamp: new Date().toISOString(),
        };
        setChatHistory((prev) => [...prev, aiResponse]);
      }, 1000);

      setPromptInput('');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
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

          <List className={classes.chatHistory}>
            {chatHistory.map((message, index) => (
              <Box key={index} className={classes.messageWrapper}>
                <ListItem
                  className={`${classes.chatMessage} ${message.type}`}
                  disableGutters>
                  <ListItemText
                    className={classes.messageContent}
                    primary={message.content}
                    secondary={
                      <Typography className={classes.messageTime}>
                        {formatTimestamp(message.timestamp)}
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            ))}
          </List>
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
