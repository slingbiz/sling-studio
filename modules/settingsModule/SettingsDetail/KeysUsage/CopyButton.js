import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {SLING_ORANGE} from '../../../aiBuilder/slingTheme';

const useStyles = makeStyles(() => ({
  copyBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    minWidth: 0,
    '&:hover, &:focus': {
      backgroundColor: '#f57c00',
      boxShadow: 'none',
      color: '#fff',
    },
  },
  copied: {
    backgroundColor: '#f57c00',
  },
}));

const CopyButton = ({content, label}) => {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = (value) => {
    navigator.clipboard.writeText(value || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Button
      onClick={() => copyToClipBoard(content)}
      className={`${classes.copyBtn} ${copied ? classes.copied : ''}`}
      type='button'
      aria-label={label || 'Copy'}>
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
};

export default CopyButton;
