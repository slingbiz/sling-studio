import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const SLING_ORANGE = '#ff9800';
const SLING_CREAM = '#fff8f0';
const SLING_INK = '#163a5f';

const mtBreakPoints = [
  {title: 'Mobile (sm)', id: 'sm'},
  {title: 'Tablet (md)', id: 'md'},
  {title: 'Desktop (lg)', id: 'lg'},
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

const useStyles = makeStyles(() => ({
  fieldWrap: {
    marginBottom: 14,
    width: '100%',
    minWidth: 0,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: SLING_INK,
    marginBottom: 6,
    display: 'block',
    fontFamily: 'Open Sans, sans-serif',
  },
  field: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      background: SLING_CREAM,
      fontFamily: 'Open Sans, sans-serif',
      color: SLING_INK,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px',
      fontSize: 14,
      color: SLING_INK,
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      background: SLING_CREAM,
      color: SLING_INK,
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input': {
      color: SLING_INK,
      opacity: 0.72,
    },
    '& .MuiSelect-icon': {
      color: SLING_INK,
    },
  },
}));

const SelectBreakpoints = ({classes, layoutWidth, handleWidth, disabled}) => {
  const fieldClasses = useStyles();
  return (
    <Box className={classes.layoutBox}>
      {mtBreakPoints.map((bp) => {
        return (
          <Box key={`select-${bp.id}`} className={fieldClasses.fieldWrap}>
            <Typography
              className={fieldClasses.fieldLabel}
              component='label'
              htmlFor={bp.id}>
              {bp.title}
            </Typography>
            <FormControl
              variant='outlined'
              className={fieldClasses.field}
              disabled={disabled}
              fullWidth>
              <Select
                id={bp.id}
                name={bp.id}
                value={layoutWidth[bp.id]}
                onChange={handleWidth}
                displayEmpty
                variant='outlined'>
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
            </FormControl>
          </Box>
        );
      })}
    </Box>
  );
};
export default SelectBreakpoints;
