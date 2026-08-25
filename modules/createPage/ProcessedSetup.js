import React, {useState} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Icon from '@material-ui/core/Icon';
import SandboxedPreview from '../aiBuilder/components/SandboxedPreview';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../aiBuilder/slingTheme';
import {ensureWidgetLabel} from './sectionContract';

const Accordion = withStyles({
  root: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: 8,
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    marginBottom: 12,
    overflow: 'hidden',
    '&:before': {display: 'none'},
    '&$expanded': {margin: '0 0 12px'},
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#fff',
    minHeight: 56,
    padding: '12px 16px',
    '&$expanded': {minHeight: 56},
  },
  content: {
    margin: 0,
    '&$expanded': {margin: 0},
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: '0 16px 16px',
    backgroundColor: '#fff',
    display: 'block',
  },
})(MuiAccordionDetails);

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
  },
  hint: {
    margin: '6px 0 0',
    fontSize: 14,
    color: '#6b6f76',
    maxWidth: 560,
    fontFamily: 'Open Sans, sans-serif',
  },
  actions: {
    display: 'flex',
    gap: 8,
    flexShrink: 0,
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
  panelTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
  },
  explain: {
    fontSize: 14,
    color: '#6b6f76',
    marginBottom: 12,
    fontFamily: 'Open Sans, sans-serif',
  },
  path: {
    display: 'inline-block',
    background: SLING_CREAM,
    borderRadius: 6,
    padding: '4px 10px',
    fontSize: 13,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    color: SLING_INK,
    marginBottom: 12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 12,
  },
  tile: {
    border: '1px solid #eee',
    borderRadius: 10,
    overflow: 'hidden',
    background: '#fff',
  },
  preview: {
    height: 140,
    background: '#fff',
    overflow: 'hidden',
  },
  tileMeta: {
    padding: '10px 12px 12px',
  },
  tileName: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: '#6b6f76',
    marginBottom: 8,
  },
  summaryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
  },
  summaryPath: {
    fontSize: 13,
    color: '#6b6f76',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
}));

const draftWidgetsPath = (query) => {
  const params = new URLSearchParams({status: 'draft'});
  if (query) params.set('q', query);
  return `/widgets/widgets-integration?${params.toString()}`;
};

const ProcessedSetup = ({
  setup,
  themeOverrides,
  canPublish,
  publishing,
  onPublish,
  onClose,
  onOpen,
  onViewPage,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState('route');
  const widgets = setup?.widgets || [];
  const published = Boolean(setup?.published);
  const routePath = setup?.path || '/';
  const routesHref = `/routes?q=${encodeURIComponent(routePath)}`;

  const toggle = (key) => (_, expanded) => setOpen(expanded ? key : false);

  return (
    <>
      <Box className={classes.header}>
        <Box>
          <Typography className={classes.title} component='h1'>
            {published ? 'This page is live' : 'This page is set up as drafts'}
          </Typography>
          <Typography className={classes.hint}>
            Route is the URL. The template is the layout. Each widget can take
            props and is governed on its own. This screen stays under Create, so
            come back here after you inspect a draft.
          </Typography>
        </Box>
        <Box className={classes.actions}>
          {onViewPage ? (
            <Button className={classes.ghostBtn} onClick={onViewPage}>
              View generated page
            </Button>
          ) : null}
          <Button className={classes.ghostBtn} onClick={onClose}>
            Close
          </Button>
          <Button
            className={classes.primaryBtn}
            onClick={onPublish}
            disabled={!canPublish || publishing || published || !widgets.length}>
            {published ? 'Published' : publishing ? 'Publishing…' : 'Publish'}
          </Button>
        </Box>
      </Box>
      {!canPublish && !published ? (
        <Typography className={classes.hint} style={{marginBottom: 16}}>
          Ask an owner or publisher to publish.
        </Typography>
      ) : null}

      <Accordion expanded={open === 'route'} onChange={toggle('route')}>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          <Box className={classes.summaryRow}>
            <Typography className={classes.panelTitle}>Page route</Typography>
            <Typography className={classes.summaryPath}>{routePath}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.explain}>
            The route is the entry point. People hit this URL, and Sling loads
            the template behind it.
          </Typography>
          <Box className={classes.path}>{routePath}</Box>
          <Button className={classes.ghostBtn} onClick={() => onOpen(routesHref)}>
            Go to Routes
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={open === 'widgets'} onChange={toggle('widgets')}>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography className={classes.panelTitle}>
            Page widgets ({widgets.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.explain}>
            Each widget is independently controlled. Open one to change props.
            Publish makes them appear anywhere this template is used.
          </Typography>
          <Box className={classes.grid}>
            {widgets.map((widget) => (
              <Box className={classes.tile} key={widget._id || widget.key}>
                <Box className={classes.preview}>
                  {widget.code ? (
                    <SandboxedPreview
                      code={widget.code}
                      dependencies={widget.dependencies}
                      themeOverrides={themeOverrides}
                      style={{height: 140}}
                    />
                  ) : null}
                </Box>
                <Box className={classes.tileMeta}>
                  <Typography className={classes.tileName}>
                    {ensureWidgetLabel(widget.name || widget.key)}
                  </Typography>
                  <Typography className={classes.status}>
                    {published || widget.status === 'published'
                      ? 'Published'
                      : 'Draft'}
                  </Typography>
                  <Button
                    className={classes.ghostBtn}
                    onClick={() =>
                      onOpen(draftWidgetsPath(widget.name || widget.key))
                    }>
                    Open widget
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
          <Box style={{marginTop: 12}}>
            <Button
              className={classes.ghostBtn}
              onClick={() => onOpen(draftWidgetsPath())}>
              Go to Widgets
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={open === 'template'} onChange={toggle('template')}>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography className={classes.panelTitle}>Page template</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.explain}>
            The template is how the page is assembled. Configure it to move
            widgets and change this layout.
          </Typography>
          <Typography className={classes.panelTitle} style={{fontWeight: 500, marginBottom: 12}}>
            {setup?.title || setup?.pageKey}
          </Typography>
          <Button
            className={classes.ghostBtn}
            onClick={() => onOpen(`/pages/${setup?.pageKey}/layout?edit=1`)}>
            Go to template
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProcessedSetup;
