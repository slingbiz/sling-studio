import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import {makeStyles} from '@material-ui/core/styles';
import {isBreakPointDown} from '../../../../@crema/utility/Utils';
import AppList from '../../../../@crema/core/AppList';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import Scrollbar from '../../../../@crema/core/Scrollbar';

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
    return data.slice(0, 3);
  } else {
    return data;
  }
};

const TaskList = (props) => {
  const data = getData(props.data);
  const classes = useStyles(props);
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['dashboard.taskList']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      action={<CloseIcon className={classes.pointer} />}>
      <Scrollbar className={classes.ScrollbarRoot}>
        <AppList
          data={data}
          renderRow={(item) => {
            return <TaskItem key={item.id} item={item} />;
          }}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default TaskList;

TaskList.defaultProps = {
  data: [],
};

TaskList.propTypes = {
  data: PropTypes.array,
};
