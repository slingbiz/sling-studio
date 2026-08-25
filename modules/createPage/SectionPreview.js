import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SandboxedPreview from '../aiBuilder/components/SandboxedPreview';
import {SLING_INK, SLING_ORANGE} from '../aiBuilder/slingTheme';

const useStyles = makeStyles(() => ({
  section: {
    position: 'relative',
    border: '2px solid transparent',
    borderRadius: 10,
    overflow: 'hidden',
    background: '#fff',
    '&:hover, &:focus-within': {
      borderColor: SLING_ORANGE,
    },
    '&:hover $label, &:focus-within $label': {
      opacity: 1,
    },
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
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
        {section.label}
      </Typography>
      <SandboxedPreview
        code={section.code}
        dependencies={section.dependencies}
        themeOverrides={themeOverrides}
        style={{height: 280}}
      />
    </Box>
  );
};

export default SectionPreview;
