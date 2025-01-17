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

import {ALLOWED_LIBRARIES} from './config';
import {useStyles} from './styles';
import CodeUtils from './utils';
import CanvasLayout from './components/CanvasLayout';

const AIBuilder = () => {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeScope, setCodeScope] = useState({});
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
                allowedLibraries: ALLOWED_LIBRARIES,
              },
            }),
          },
        );

        const data = await response.json();
        const cleaned = CodeUtils.cleanCode(data);
        const transformed = CodeUtils.transformCode(cleaned.code);
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
            <CanvasLayout
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              generatedCode={generatedCode}
              codeScope={codeScope}
              inputValue={inputValue}
              isProcessing={isProcessing}
            />
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
