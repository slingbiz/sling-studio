import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import blue from '@material-ui/core/colors/blue';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const staticHelperMap = {
  'response-derived':
    'Value picked from the API response. Please specify the Object key location to be picked from the API response.',
  'static-derived':
    'Values inside curly braces will be replaced from props before rendering',
  static: 'Static values to be used by the component',
  media: 'Array of Image Constants',
};

const useStyles = makeStyles((theme) => ({
  active: {
    background: blue['800'],
    padding: 15,
  },
  formControl: {
    margin: 10,
    padding: 10,
  },
  fontSet: {
    fontSize: '14px',
    fontWeight: '400',
    margin: 5,
  },
}));

export default function TemplateProps({cellProps}) {
  const [widgetProps, setWidgetProps] = React.useState(cellProps);
  const classes = useStyles();

  const handleChange = (name) => (event) => {
    setWidgetProps({...widgetProps, [name]: event.target.checked});
  };
  const handleSelectChange = ({propKey, event}) => {
    const currObj = widgetProps[propKey];
    currObj.type = event.target.value;
    setWidgetProps({...widgetProps, [propKey]: currObj});
  };

  console.log(widgetProps, '[Widget Props]');

  if (!Object.keys(widgetProps).length) {
    return (
      <FormGroup row>
        <Box>
          <IconButton onClick={() => true} disabled={true}>
            <Icon color='secondary' className={classes.Icon} style={{marginRight:'-10px'}}>
              add_circle
            </Icon>
          </IconButton>
          Add Prop
        </Box>
      </FormGroup>
    );
  }
  return (
    <FormGroup row>
      {Object.keys(widgetProps).map((propKey, key, {length}) => {
        const propObj = widgetProps[propKey];
        const isLast = key < length - 1;
        return (
          <>
            <FormControl
              key={propKey}
              className={clsx(classes.formControl, classes.fontSet)}>
              <InputLabel htmlFor={propKey}>{propKey}</InputLabel>
              <Select
                value={propObj.type}
                onChange={(event) => handleSelectChange({propKey, event})}
                className={classes.fontSet}
                inputProps={{
                  name: {propKey},
                  id: {propKey},
                }}>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'response-derived'}>Response Derived</MenuItem>
                <MenuItem value={'static'}>Static</MenuItem>
                <MenuItem value={'static-derived'}>Static Derived</MenuItem>
                <MenuItem value={'media'}>Media</MenuItem>
              </Select>
              <Input
                className={classes.fontSet}
                id={`input-${propKey}`}
                value={propObj.value}
                onChange={handleChange}
                aria-describedby='component-helper-text'
              />
              <FormHelperText>{staticHelperMap[propObj.type]}</FormHelperText>
            </FormControl>
            <Box
              style={{
                marginTop: 15,
                width: '100%',
                marginBottom: 25,
              }}>
              {isLast && (
                <Divider
                  style={{
                    width: '100%',
                    marginLeft: 0,
                  }}
                  variant='inset'
                />
              )}
            </Box>
          </>
        );
      })}
    </FormGroup>
  );
}
