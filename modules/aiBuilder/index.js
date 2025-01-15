import React, {useState} from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Grid,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';
import * as Babel from '@babel/standalone';

import {makeStyles} from '@material-ui/core/styles';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  container: {
    margin: '0 auto',
    paddingTop: theme.spacing(8),
    maxWidth: 800,
  },
  searchWrapper: {
    position: 'relative',
    marginBottom: theme.spacing(6),
  },
  searchInput: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius * 2,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 2),
      '& textarea': {
        padding: 0,
        // lineHeight: '24px',
        // minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
      },
      '& .MuiOutlinedInput-inputMultiline': {
        padding: '12px 14px', // Standard Material-UI input padding
        marginTop: 15,
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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  cardMedia: {
    height: 160,
    backgroundColor: theme.palette.grey[800],
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),
  },
  canvas: {
    display: 'flex',
    gap: theme.spacing(3),
    marginTop: theme.spacing(3),
    height: 'calc(100vh - 250px)', // Adjust height to fill available space
    minHeight: '600px',
  },
  progress: {
    flex: '0 0 30%', // Fixed 30% width
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  preview: {
    flex: '0 0 70%', // Fixed 70% width
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
  processingView: {
    textAlign: 'center',
    padding: theme.spacing(4),
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
}));

const AIBuilder = () => {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeTab, setActiveTab] = useState('preview');

  const handleSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();
      if (!inputValue.trim()) return;

      setIsProcessing(true);
      setShowCanvas(true);

      try {
        const response = await fetch(
          'http://localhost:5001/api/ai/generate-page',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: inputValue, mock: true}),
          },
        );

        const data = await response.json();
        setGeneratedCode(data.pageCode || '');
        setIsProcessing(false);
      } catch (error) {
        console.error('Error generating page:', error);
        setIsProcessing(false);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const ProcessingView = () => (
    <Box className={classes.processingView}>
      <CircularProgress size={60} />
      <Typography variant='h6' style={{marginTop: 16}}>
        Processing your request...
      </Typography>
    </Box>
  );

  const CanvasLayout = () => (
    <Box className={classes.canvas}>
      <Box className={classes.progress}>
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
                  <div dangerouslySetInnerHTML={{__html: generatedCode}} />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No preview available
                  </Typography>
                )
              ) : (
                <pre
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '16px',
                    borderRadius: '4px',
                    overflow: 'auto',
                  }}>
                  <code>{generatedCode}</code>
                </pre>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Container className={classes.container}>
          {!showCanvas && (
            <Box className={classes.searchWrapper}>
              <Typography variant='h4' className={classes.title}>
                Ready to create something new?{' '}
              </Typography>
              <TextField
                className={classes.searchInput}
                variant='outlined'
                multiline
                rows={2}
                placeholder='Describe what you want to build...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleSubmit}
                InputProps={{
                  endAdornment: (
                    <Box className={classes.actionButtons}>
                      <IconButton>
                        <AttachFile />
                      </IconButton>
                      <IconButton onClick={handleSubmit}>
                        <Send />
                      </IconButton>
                    </Box>
                  ),
                }}
              />
            </Box>
          )}
        </Container>

        {isProcessing && !showCanvas && (
          <Box>
            <ProcessingView />
          </Box>
        )}

        {showCanvas && (
          <Box>
            <CanvasLayout />
          </Box>
        )}

        <Container className={classes.container}>
          {!isProcessing && !showCanvas && (
            <Box>
              <Typography variant='h6' className={classes.sectionTitle}>
                Starter Templates
              </Typography>
              <Grid container spacing={3}>
                {[
                  {
                    title: 'Landing Page like Booking.com',
                    description: 'Next.js + Tailwind CSS + shadcn/ui',
                    image: '/images/booking-landing.png',
                  },
                  {
                    title: 'Landing Page like Mailchimp',
                    description: 'Server actions and Zod validation',
                    image: '/images/mailchimp-landing.png',
                  },
                  {
                    title: 'Checkout Page like Stripe',
                    description: 'Build charts using shadcn/ui charts',
                    image: '/images/templates/nextjs-charts.png',
                  },
                ].map((template, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={template.image}
                        title={template.title}
                      />
                      <CardContent>
                        <Typography variant='h6' gutterBottom>
                          {template.title}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {template.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default AIBuilder;