import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  contentArea: {
    fontSize: 14,
  },
  avatarSize: {
    width: 48,
    height: 48,
  },
  listItemRoot: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px 20px',
  },
}));

const NotificationCell = ({notification}) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.listItemRoot, 'item-hover')}>
      <Box
        mr={4}
        mt={1.5}
        style={{
          height: 10,
          minWidth: 10,
          borderRadius: '50%',
          backgroundColor: notification.color,
        }}
      />
      <Box className={classes.contentArea}>
        <Box component='h5' fontWeight={Fonts.MEDIUM} mb={0.5}>
          {notification.title}
        </Box>
        <Box component='span' color='text.secondary'>
          {notification.time}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationCell;

NotificationCell.propTypes = {
  notification: PropTypes.object.isRequired,
};
