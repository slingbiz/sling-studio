import React from 'react';
import {Box, Button, CircularProgress} from '@material-ui/core';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IntlMessages from '../../utility/IntlMessages';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  emptyListContainer: {
    flexDirection: 'column',
    minHeight: 450,
    height: '100%',
    flex: 1,
    display: 'flex',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    border: theme.palette.grey[500],
    borderRadius: 4,
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
}));

const ListEmptyResult = ({
  loader,
  placeholder,
  loading,
  title,
  actionTitle,
  content,
  onClick,
}) => {
  const classes = useStyles();
  if (loading || loader) {
    return (
      <React.Fragment>
        {placeholder ? (
          placeholder
        ) : (
          <Box className={clsx(classes.emptyListContainer, classes.flexRow)}>
            <CircularProgress size={16} />
            <Box component='span' ml={2}>
              Loading...
            </Box>
          </Box>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <Box className={classes.emptyListContainer}>
        {title ? (
          <Box component='h4' fontSize={18} color='text.secondary' mb={3}>
            {title}
          </Box>
        ) : null}
        <Box fontSize={16} component='p' color='text.hint'>
          {content}
        </Box>

        {actionTitle ? (
          <Button
            color='primary'
            variant='contained'
            style={{marginTop: 30, height: 45, minWidth: 150}}
            onClick={onClick}>
            {actionTitle}
          </Button>
        ) : null}
      </Box>
    );
  }
};

export default ListEmptyResult;

ListEmptyResult.defaultProps = {
  title: <IntlMessages id='common.noRecordFound' />,
  description: '',
};

ListEmptyResult.prototype = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionTitle: PropTypes.string,
  action: PropTypes.func,
};
