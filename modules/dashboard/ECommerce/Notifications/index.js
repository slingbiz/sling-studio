import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import NotificationCell from './NotificationCell';
import AppList from '../../../../@crema/core/AppList';

const useStyles = makeStyles({
  iconButton: {
    height: 30,
    width: 30,
  },
  pointer: {
    cursor: 'pointer',
  },
  scrollBarRoot: {
    maxHeight: 358,
  },
});

const Notifications = (props) => {
  const {messages} = useIntl();

  const classes = useStyles(props);
  return (
    <AppCard
      contentStyle={{paddingRight: 0, paddingLeft: 0}}
      title={messages['eCommerce.notifications']}
      action={
        <IconButton
          className={classes.iconButton}
          aria-label='more'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={null}>
          <MoreVertIcon />
        </IconButton>
      }>
      <Scrollbar className={classes.scrollBarRoot}>
        <AppList
          data={props.notifications}
          renderRow={(item) => <NotificationCell key={item.id} item={item} />}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default Notifications;
