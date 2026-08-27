import React, {useEffect, useRef} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {SLING_CREAM, SLING_ORANGE} from '../aiBuilder/slingTheme';

const STUDIO_INK = '#163a5f';

const useStyles = makeStyles(() => ({
  dialogPaper: {
    borderRadius: 12,
    padding: '8px 4px 4px',
    width: 480,
    maxWidth: '92vw',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: STUDIO_INK,
    fontFamily: 'Open Sans, sans-serif',
  },
  hint: {
    fontSize: 14,
    color: '#6b6f76',
    margin: '0 0 16px',
    lineHeight: 1.5,
    fontFamily: 'Open Sans, sans-serif',
  },
  log: {
    background: SLING_CREAM,
    border: '1px solid #eee',
    borderRadius: 8,
    padding: '12px 14px',
    minHeight: 160,
    maxHeight: 240,
    overflow: 'auto',
  },
  line: {
    fontSize: 14,
    color: STUDIO_INK,
    lineHeight: 1.55,
    fontFamily: 'Open Sans, sans-serif',
    marginBottom: 8,
    '&:last-child': {marginBottom: 0, fontWeight: 600},
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16,
    marginBottom: 8,
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
  spinner: {
    color: SLING_ORANGE,
    marginRight: 10,
  },
}));

const GenerateProgress = ({open, title, hint, lines, onStop, stopLabel}) => {
  const classes = useStyles();
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      classes={{paper: classes.dialogPaper}}
      aria-labelledby='create-progress-title'
      aria-busy={open}>
      <Box display='flex' alignItems='center' px={2} pt={1} pb={0.5}>
        <CircularProgress
          className={classes.spinner}
          size={22}
          thickness={5}
          aria-label='Loading'
        />
        <Typography className={classes.title} id='create-progress-title'>
          {title}
        </Typography>
      </Box>
      <DialogContent>
        {hint ? <Typography className={classes.hint}>{hint}</Typography> : null}
        <Box className={classes.log} ref={logRef}>
          {(lines || []).map((line, index) => (
            <Typography className={classes.line} key={`${line}-${index}`}>
              {line}
            </Typography>
          ))}
        </Box>
        <Box className={classes.footer}>
          <Button
            className={classes.ghostBtn}
            onClick={onStop}
            disabled={!onStop}>
            {stopLabel || 'Stop'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateProgress;
