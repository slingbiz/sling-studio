import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {makeStyles, withStyles} from '@material-ui/core/styles';

const OrangeSwitch = withStyles({
  switchBase: {
    color: '#c5c6cb',
    '&$checked': {
      color: '#ff9800',
    },
    '&$checked + $track': {
      backgroundColor: '#ff9800',
    },
  },
  checked: {},
  track: {
    backgroundColor: '#d5dde6',
  },
})(Switch);

const useStyles = makeStyles({
  group: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 8,
  },
  control: {
    marginLeft: 0,
    marginRight: 0,
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
      fontFamily: 'Open Sans, sans-serif',
      fontWeight: 600,
      color: '#163a5f',
    },
    '&.Mui-disabled .MuiFormControlLabel-label': {
      color: '#163a5f',
      opacity: 0.72,
    },
  },
});

const DeviceWidthMapper = {
  mobile: 'sm',
  tablet: 'md',
  desktop: 'lg',
};
export default function SwitchLabels({
  switchProps,
  hiddenStatus,
  setHiddenStatus,
  disabled,
}) {
  const classes = useStyles();
  const [state, setState] = React.useState(switchProps);

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked});
    const deviceWidth = DeviceWidthMapper[name];
    if (!event.target.checked && !hiddenStatus?.only?.includes(deviceWidth)) {
      hiddenStatus.only = [...hiddenStatus?.only, deviceWidth];
    }
    if (event.target.checked) {
      hiddenStatus.only = hiddenStatus?.only.filter((e) => e !== deviceWidth);
    }
    setHiddenStatus({...hiddenStatus});
  };

  return (
    <FormGroup className={classes.group}>
      <FormControlLabel
        disabled={disabled}
        className={classes.control}
        control={
          <OrangeSwitch
            checked={state.mobile}
            onChange={handleChange('mobile')}
            value='mobile'
          />
        }
        label='Show on Mobile'
      />
      <FormControlLabel
        disabled={disabled}
        className={classes.control}
        control={
          <OrangeSwitch
            checked={state.tablet}
            onChange={handleChange('tablet')}
            value='tablet'
          />
        }
        label='Show on Tablet'
      />
      <FormControlLabel
        disabled={disabled}
        className={classes.control}
        control={
          <OrangeSwitch
            checked={state.desktop}
            onChange={handleChange('desktop')}
            value='desktop'
          />
        }
        label='Show on Desktop'
      />
    </FormGroup>
  );
}
