import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//Not in use.
const PickDataSource = ({classes}) => (
  <Box className={classes.layoutBox}>
    {mtBreakPoints.map((bp) => {
      return (
        <FormControl key={`select-${bp.id}`} className={classes.formControl}>
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
export default PickDataSource;
