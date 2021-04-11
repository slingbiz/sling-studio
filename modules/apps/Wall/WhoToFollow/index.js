import React from 'react';
import AppList from '../../../../@crema/core/AppList';
import Box from '@material-ui/core/Box';
import AppCard from '../../../../@crema/core/AppCard';
import FollowItem from './FollowItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    width: 30,
    height: 30,
  },
}));
const WhoToFollow = ({whoToFollow}) => {
  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['wall.whoToFollow']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      footerStyle={{borderTop: '1px solid #E5E4EA'}}
      action={
        <Box>
          <IconButton
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            className={classes.iconButton}
            onClick={null}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      }
      footer={
        <Box color='primary.main' textAlign='center' className='pointer'>
          View More
        </Box>
      }>
      <AppList
        data={whoToFollow}
        renderRow={(item, index) => <FollowItem key={index} item={item} />}
      />
    </AppCard>
  );
};

export default WhoToFollow;
