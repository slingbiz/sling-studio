import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import clsx from 'clsx';
import ListIcon from '@material-ui/icons/List';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

const ViewSelectButtons = ({pageView, onChangePageView}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      cursor: 'pointer',
      '&.active': {
        color: theme.palette.primary.main,
      },
    },
  }));
  const classes = useStyles();
  return (
    <Box display='flex' alignItems='center' ml='auto'>
      <IconButton onClick={() => onChangePageView('grid')}>
        <AppsIcon
          className={clsx(classes.root, {
            active: pageView === 'grid',
          })}
        />
      </IconButton>

      <IconButton onClick={() => onChangePageView('list')}>
        <ListIcon
          className={clsx(classes.root, {
            active: pageView === 'list',
          })}
        />
      </IconButton>
    </Box>
  );
};

export default ViewSelectButtons;

ViewSelectButtons.prototype = {
  pageView: PropTypes.string.isRequired,
  onChangePageView: PropTypes.func,
};
