import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 24,
    transition: 'all .2s',
    '&:not(:first-child)': {
      borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    },
    '& .fav-btn': {
      opacity: 0,
      visibility: 'hidden',
    },
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${fade(theme.palette.common.dark, 0.2)}`,
      '& .fav-btn': {
        opacity: 1,
        visibility: 'visible',
      },
    },
  },
}));

const ItemHover = ({children}) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default ItemHover;
