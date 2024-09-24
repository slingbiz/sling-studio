import React, {useState} from 'react';
import {Button, Grid} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  btnSubmit: {
    fontSize: 14,
    fontWeight: Fonts.BOLD,
    backgroundColor: orange[500],
    margin: 'auto',
    width: '60%',
    transition: 'transform 0.3s ease',
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: '#fff',
    },
  },
  copied: {
    backgroundColor: orange[300],
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease',
  },
}));

const CopyButton = ({content}) => {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
      <Button
        onClick={() => copyToClipBoard(content)}
        variant='contained'
        className={`${classes.btnSubmit} ${copied ? classes.copied : ''}`}
        type='submit'
        color='primary'>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
   );
};

export default CopyButton;
