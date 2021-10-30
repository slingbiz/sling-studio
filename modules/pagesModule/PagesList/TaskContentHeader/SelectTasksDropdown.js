import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const SelectTasksDropdown = ({onSelectTasks, classes}) => {
  const [selectedItems, setSelectedItems] = useState(0);

  const onChangeSelectValue = (event) => {
    setSelectedItems(event.target.value);
    onSelectTasks(event.target.value);
  };

  const {messages} = useIntl();

  return (
    <Box mr={{xs: 2, xl: 4}} component='span'>
      <Select
        value={selectedItems}
        disableUnderline={true}
        className={clsx(classes.pointer, classes.selectBox)}
        onChange={onChangeSelectValue}>
        <option value={0} className={classes.option}>
          {messages['common.all']}
        </option>
        <option value={1} className={classes.option}>
          {messages['common.none']}
        </option>
        <option value={2} className={classes.option}>
          {messages['common.starred']}
        </option>
        <option value={3} className={classes.option}>
          {messages['common.attachments']}
        </option>
      </Select>
    </Box>
  );
};

export default SelectTasksDropdown;

SelectTasksDropdown.prototype = {
  onSelectTasks: PropTypes.func,
};
