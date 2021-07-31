import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import MessageItem from '../../../../@sling/core/HeaderMessages/MessageItem';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {isBreakPointDown} from '../../../../@sling/utility/Utils';
import AppList from '../../../../@sling/core/AppList';
import AppCard from '../../../../@sling/core/AppCard';
import {useIntl} from 'react-intl';
import Scrollbar from '../../../../@sling/core/Scrollbar';

const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: 'pointer',
  },
  ScrollbarRoot: {
    height: 263,
  },
}));
const getData = (data) => {
  if (isBreakPointDown('xl')) {
    return data.slice(0, 4);
  } else {
    return data;
  }
};

const Messages = (props) => {
  const data = getData(props.data);

  const classes = useStyles(props);
  const {messages} = useIntl();
  return (
    <AppCard
      height='1'
      title={messages['dashboard.messages']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      action={<CloseIcon className={classes.pointer} />}>
      <Scrollbar className={classes.ScrollbarRoot}>
        <AppList
          data={data}
          renderRow={(item) => {
            return <MessageItem key={item.id} item={item} />;
          }}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default Messages;

Messages.defaultProps = {
  data: [],
};

Messages.propTypes = {
  data: PropTypes.array,
};
