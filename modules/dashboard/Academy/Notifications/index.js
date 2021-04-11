import React, {useContext} from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import AppList from '../../../../@crema/core/AppList';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {timeFromNow} from '../../../../@crema/utility/Utils';
import {useIntl} from 'react-intl';
import AppContext from '../../../../@crema/utility/AppContext';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  notifRoot: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
}));

const NotificationItem = ({notification}) => {
  const {theme} = useContext(AppContext);
  const classes = useStyles();
  return (
    <Box
      display='flex'
      alignItems='center'
      className={clsx(classes.notifRoot, 'item-hover')}>
      <Box
        mr={4}
        display='flex'
        alignItems='center'
        justifyContent='center'
        fontSize={20}
        width={50}
        textAlign='center'
        height={50}
        bgcolor={notification.bgcolor}
        color={notification.color}
        style={{borderRadius: theme.overrides.MuiCard.root.borderRadius}}>
        {notification.letter}
      </Box>
      <Box flex={1}>
        <Box
          component='h3'
          display='inline-block'
          fontWeight={Fonts.MEDIUM}
          mb={0.5}
          fontSize={14}>
          {notification.content}
        </Box>
        <Box component='p' fontSize={14} color='text.secondary' mb={1}>
          {timeFromNow(notification.date)}
        </Box>
      </Box>
    </Box>
  );
};

const Notifications = ({notifications}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      height={1}
      title={messages['academy.notifications']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}>
      <AppList
        animation='transition.slideRightBigIn'
        data={notifications}
        renderRow={(data, index) => (
          <NotificationItem key={index} notification={data} />
        )}
      />
    </AppCard>
  );
};

export default Notifications;
