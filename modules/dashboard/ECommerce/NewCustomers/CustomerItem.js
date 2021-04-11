import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
    alignItems: 'center',
    padding: '8px 20px',
    '&:not(:last-child)': {
      borderBottom: '1px solid #ECEDF1',
    },
  },
  badgeRoot: {
    padding: '3px 10px',
    borderRadius: 15,
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
}));

const CustomerItem = ({item}) => {
  const classes = useStyles();

  const getStatusColor = () => {
    if (item.orders === 0) {
      return '#F84E4E';
    } else if (item.orders > 0) {
      return '#43C888';
    }
  };

  return (
    <Box className={clsx(classes.listItemRoot, 'item-hover')}>
      <Box mr={4} clone>
        <Avatar className={classes.avatarSize} src={item.image} />
      </Box>
      <Box className={classes.contentArea}>
        <Box mb={0.5} fontWeight={Fonts.MEDIUM}>
          {item.name}
        </Box>
        <Box fontSize={14} color='text.secondary'>
          {item.message}
        </Box>
      </Box>
      <Box display='flex' alignItems='center' ml='auto'>
        <Box
          className={classes.badgeRoot}
          style={{
            color: getStatusColor(),
            backgroundColor: getStatusColor() + '44',
          }}>
          {item.orders} orders
        </Box>
        <IconButton
          aria-label='more'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={null}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomerItem;

CustomerItem.propTypes = {
  item: PropTypes.object.isRequired,
};
