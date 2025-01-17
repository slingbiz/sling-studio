import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useContext,
} from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';

import {
  Grid,
  Container,
  Card,
  Box,
  Typography,
  TextField,
  IconButton,
  Tabs,
  Tab,
} from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';

import {ALLOWED_LIBRARIES, createLibraryMap, createScope} from './config';
import {useStyles} from './styles';

const AIBuilder = () => {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeScope, setCodeScope] = useState({});

  const cleanCode = (response) => {
    try {
      const {code: rawCode, dependencies} = response;
      const unescapedCode = rawCode.replace(/\\n/g, '\n').replace(/\\"/g, '"');

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
        useDispatch,
        useSelector,
        useIntl,
        useRouter,
        clsx,
        moment,
        dependencies
      });

      return {
        code: `
        // Component Definition
        ${unescapedCode.trim()}

        // Render the component
        render(<PreviewComponent />);`,
        scope,
      };
    } catch (error) {
      console.error('Error cleaning code:', error);
      return {code: response, scope: {React}};
    }
  };

  const transformCode = (code) => {
    // First check if the code already has a render statement
    if (code.includes('render(')) {
      return code;
    }

    // If it's a component definition, wrap it with ThemedComponent
    if (code.includes('const') || code.includes('function')) {
      return `
${code}

render(
  <ThemedComponent>
    <PreviewComponent />
  </ThemedComponent>
);`;
    }

    // If it's just JSX, wrap it directly
    return `
render(
  <ThemedComponent>
    ${code}
  </ThemedComponent>
);`;
  };

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
            body: JSON.stringify({
              prompt: inputValue,
              mock: false,
              constraints: {
                componentName: true,
                useArrowFunction: true,
                useMaterialUI: true,
                noStyleImports: true,
                singleComponent: true,
                separateDependencies: true,
                allowedLibraries: ALLOWED_LIBRARIES, // Just pass allowed libraries
              },
            }),
          },
        );

        const data = await response.json();
        const cleaned = cleanCode(data);
        const transformed = transformCode(cleaned.code);
        setGeneratedCode(transformed);
        setCodeScope(cleaned.scope);
        setIsProcessing(false);
        console.log('Dependencies loaded:', Object.keys(cleaned.scope));
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
