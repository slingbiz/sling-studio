import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import LabelSharpIcon from '@material-ui/icons/LabelSharp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import {
  onDeleteSelectedTasks,
  onUpdateTaskLabels,
} from '../../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import AppsDeleteIcon from '../../../../../@crema/core/AppsDeleteIcon';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'

const CheckedTasksActions = ({
  checkedTasks,
  setCheckedTasks,
  page,
  classes,
}) => {
  const {pathname} = useRouter();
  const path = pathname.split('/');
  const dispatch = useDispatch();
  const [isLabelOpen, onOpenLabel] = React.useState(null);

  const labelList = useSelector(({todoApp}) => todoApp.labelList);

  const onLabelOpen = (event) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onDeleteTasks = () => {
    dispatch(
      onDeleteSelectedTasks(
        checkedTasks,
        path[path.length - 2],
        path[path.length - 1],
        page,
      ),
    );
    setCheckedTasks([]);
  };

  const onSelectLabel = (event) => {
    const labelType = event.target.value;
    dispatch(onUpdateTaskLabels(checkedTasks, labelType));
    setCheckedTasks([]);
    onLabelClose();
  };

  return (
    <>
      <Box
        mr={{xs: 1, xl: 2}}
        pl={{xs: 2, xl: 4}}
        component='span'
        display='flex'
        alignItems='center'
        className={classes.checkedTask}>
        <AppsDeleteIcon
          deleteAction={onDeleteTasks}
          deleteTitle={<IntlMessages id='todo.deleteMessage' />}
          className={classes.deleteIcon}
        />

        <Tooltip title={<IntlMessages id='common.label' />}>
          <LabelSharpIcon
            className={classes.labelIcon}
            value={1}
            onClick={onLabelOpen}
          />
        </Tooltip>

        <Menu
          anchorEl={isLabelOpen}
          open={Boolean(isLabelOpen)}
          onClose={onLabelClose}>
          {labelList.map((label) => {
            return (
              <MenuItem key={label.id} value={label.id} onClick={onSelectLabel}>
                {label.name}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </>
  );
};

export default CheckedTasksActions;

CheckedTasksActions.prototype = {
  checkedTasks: PropTypes.array.isRequired,
  setCheckedTasks: PropTypes.func,
  page: PropTypes.number.isRequired,
};
