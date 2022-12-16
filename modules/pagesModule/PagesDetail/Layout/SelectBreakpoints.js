import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const mtBreakPoints = [
  // {title: 'xs', id: 'xs'},
  {title: 'sm', id: 'sm'},
  {title: 'md', id: 'md'},
  {title: 'lg', id: 'lg'},
  // {title: 'xl', id: 'xl'},
];
const mtColumns = [
  {title: 1, id: 1},
  {title: 2, id: 2},
  {title: 3, id: 3},
  {title: 4, id: 4},
  {title: 5, id: 5},
  {title: 6, id: 6},
  {title: 7, id: 7},
  {title: 8, id: 8},
  {title: 9, id: 9},
  {title: 10, id: 10},
  {title: 11, id: 11},
  {title: 12, id: 12},
];

const SelectBreakpoints = ({classes, layoutWidth, handleWidth, disabled}) => (
  <Box className={classes.layoutBox}>
    {mtBreakPoints.map((bp) => {
      return (
        <FormControl key={`select-${bp.id}`} className={classes.formControl} disabled={disabled}>
          <InputLabel shrink id={`${bp.id}-label`}>
            {bp.title}
          </InputLabel>
          <Select
            labelId={`${bp.id}-label`}
            id={`${bp.id}`}
            name={`${bp.id}`}
            value={layoutWidth[bp.id]}
            onChange={handleWidth}
            displayEmpty
            className={classes.selectEmpty}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {mtColumns.map((v) => {
              return (
                <MenuItem key={v.id} value={v.id}>
                  {v.id}
                </MenuItem>
              );
            })}
          </Select>
          {/*<FormHelperText>sm info. </FormHelperText>*/}
        </FormControl>
      );
    })}
  </Box>
);
export default SelectBreakpoints;
