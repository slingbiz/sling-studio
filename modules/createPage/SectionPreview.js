import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SandboxedPreview from '../aiBuilder/components/SandboxedPreview';
import {SLING_INK, SLING_ORANGE} from '../aiBuilder/slingTheme';
import {ensureWidgetLabel} from './sectionContract';

const useStyles = makeStyles(() => ({
  section: {
    position: 'relative',
    zIndex: 0,
    border: '2px solid transparent',
    borderRadius: 10,
    background: '#fff',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    '&:hover, &:focus-within': {
      borderColor: SLING_ORANGE,
      boxShadow: '0 10px 28px rgba(22, 58, 95, 0.18)',
      zIndex: 2,
    },
    '&:hover $label, &:focus-within $label': {
      opacity: 1,
    },
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 3,
    opacity: 0,
    pointerEvents: 'none',
    background: SLING_INK,
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Open Sans, sans-serif',
    padding: '4px 10px',
    borderRadius: 6,
  },
}));

const SectionPreview = ({section, themeOverrides}) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.section}
      data-sling-section={section.id}
      tabIndex={0}>
      <Typography className={classes.label} component='span'>
        {ensureWidgetLabel(section.label)}
      </Typography>
      <SandboxedPreview
        code={section.code}
        dependencies={section.dependencies}
        themeOverrides={themeOverrides}
        fitContent
      />
    </Box>
  );
};

export default SectionPreview;
