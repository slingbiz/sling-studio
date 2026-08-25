import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import AppsContainer from '../../@sling/core/AppsContainer';
import AppContext from '../../@sling/utility/AppContext';
import {createCopy} from './sectionContract';
import SectionPreview from './SectionPreview';
import {
  generatePageFromPrompt,
  processGeneratedPage,
} from '../../redux/actions/CreatePage';
import {resolveWidgetTheme} from '../aiBuilder/widgetTheme';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../aiBuilder/slingTheme';

const STARTERS = [
  'A clinic landing page with a hero, hours, and a contact form',
  'A simple blog home with featured posts and a newsletter',
  'An about page with a story, team photos, and a CTA',
  'A product listing with a hero and three feature cards',
];

const useStyles = makeStyles(() => ({
  page: {
    padding: '28px 32px 40px',
    background: '#fff',
    fontFamily: 'Open Sans, sans-serif',
    minHeight: '100%',
  },
  promptWrap: {
    maxWidth: 760,
    margin: '24px auto 0',
  },
  field: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 12,
      background: SLING_CREAM,
      fontSize: 16,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
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
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
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
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
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
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [done, setDone] = useState(null);

  const generate = async () => {
    if (!prompt.trim() || prompt.trim().length < 5) return;
    setLoading(true);
    setDone(null);
    const data = await dispatch(
      generatePageFromPrompt(prompt.trim(), tenantTheme),
    );
    setLoading(false);
    if (data) setResult(data);
  };

  const processPage = async () => {
    if (!result) return;
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

  const count = result?.sections?.length || 0;

  return (
    <AppsContainer title={createCopy.title} description={createCopy.description} fullView>
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
        ) : !result ? (
          <Box className={classes.promptWrap}>
            {loading ? (
              <Box className={classes.loader}>
                <CircularProgress style={{color: SLING_ORANGE}} />
              </Box>
            ) : (
              <>
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
                <Box className={classes.chips}>
                  {STARTERS.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      className={classes.chip}
                      variant='outlined'
                      onClick={() => setPrompt(item)}
                    />
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
              </>
            )}
          </Box>
        ) : (
          <>
            <Box className={classes.summary}>
              <Typography className={classes.summaryText}>
                This page will be {count} widget{count === 1 ? '' : 's'}. Hover a
                section to see its name. Process saves the same code — we do not
                generate again.
              </Typography>
              <Box style={{display: 'flex', gap: 8}}>
                <Button
                  className={classes.ghostBtn}
                  onClick={() => setResult(null)}
                  disabled={processing}>
                  Start over
                </Button>
                <Button
                  className={classes.primaryBtn}
                  onClick={processPage}
                  disabled={processing}>
                  {processing ? 'Processing…' : 'Process'}
                </Button>
              </Box>
            </Box>
            {processing ? (
              <Box className={classes.loader}>
                <CircularProgress style={{color: SLING_ORANGE}} />
              </Box>
            ) : (
              <Box className={classes.stack}>
                {result.sections.map((section) => (
                  <SectionPreview
                    key={section.id}
                    section={section}
                    themeOverrides={tenantTheme}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </AppsContainer>
  );
};

export default CreatePage;
