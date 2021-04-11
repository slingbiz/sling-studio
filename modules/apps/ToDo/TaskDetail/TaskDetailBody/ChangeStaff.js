import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const ChangeStaff = ({
  classes,
  inputLabel,
  labelWidth,
  selectedStaff,
  handleStaffChange,
}) => {
  const staffList = useSelector(({todoApp}) => todoApp.staffList);

  return (
    <FormControl variant='outlined' className={classes.minWidth100}>
      <InputLabel ref={inputLabel} id='demo-simple-select-outlined-label'>
        <IntlMessages id='common.staff' />
      </InputLabel>
      <Select
        className={clsx(classes.selectBox, classes.pointer)}
        labelWidth={labelWidth}
        value={selectedStaff.id}
        onChange={handleStaffChange}>
        {staffList.map((staff) => {
          return (
            <MenuItem
              value={staff.id}
              key={staff.id}
              className={classes.pointer}>
              <Box display='flex' alignItems='center'>
                {staff.image ? (
                  <Avatar className={classes.mr12} src={staff.image} />
                ) : (
                  <Avatar className={classes.mr12}>
                    {staff.name.toUpperCase()}
                  </Avatar>
                )}
                <Box>{staff.name}</Box>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ChangeStaff;

ChangeStaff.defaultProps = {
  inputLabel: null,
  labelWidth: 0,
};

ChangeStaff.prototype = {
  selectedStaff: PropTypes.object.isRequired,
  handleStaffChange: PropTypes.func,
  inputLabel: PropTypes.object,
  labelWidth: PropTypes.number,
};
