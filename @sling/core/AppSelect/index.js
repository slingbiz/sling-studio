import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';

const AppSelect = ({menus, onChange, defaultValue, selectionKey}) => {
  const [selectionType, setSelectionType] = useState(defaultValue);

  const handleSelectionType = (event) => {
    setSelectionType(event.target.value);
    onChange(event.target.value);
  };
  const useStyles = makeStyles((theme) => ({
    selectBox: {
      marginLeft: 8,
      cursor: 'pointer',
      fontSize: 14,
      [theme.breakpoints.up('xl')]: {
        marginLeft: 24,
      },
      '& .MuiSelect-select': {
        paddingLeft: 10,
      },
    },
    selectOption: {
      cursor: 'pointer',
      padding: 8,
      fontSize: 14,
    },
  }));
  const classes = useStyles();
  return (
    <Select
      defaultValue={defaultValue}
      value={selectionType}
      onChange={handleSelectionType}
      disableUnderline={true}
      className={clsx(classes.selectBox, 'select-box')}>
      {menus.map((menu, index) => (
        <MenuItem
          key={index}
          value={selectionKey ? menu[selectionKey] : menu}
          className={classes.selectOption}>
          {selectionKey ? menu[selectionKey] : menu}
        </MenuItem>
      ))}
    </Select>
  );
};

export default AppSelect;
AppSelect.prototype = {
  menus: PropTypes.array,
  onChange: PropTypes.array,
  defaultValue: PropTypes.array,
  selectionKey: PropTypes.array,
};
AppSelect.defaultProps = {
  menus: [],
  defaultValue: '',
  selectionKey: '',
};
