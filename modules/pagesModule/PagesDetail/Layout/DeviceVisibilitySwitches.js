import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {withStyles} from '@material-ui/core/styles';

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

const DeviceWidthMapper = {
    'mobile' : 'sm',
    'tablet': 'md',
    'desktop': 'lg',
};
export default function SwitchLabels({switchProps, hiddenStatus, setHiddenStatus, disabled}) {
  const [state, setState] = React.useState(switchProps); 

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked});
    const deviceWidth = DeviceWidthMapper[name];
    if(!event.target.checked && !hiddenStatus?.only?.includes(deviceWidth)){
        hiddenStatus.only = [...hiddenStatus?.only, deviceWidth];
    }
    if(event.target.checked){
        hiddenStatus.only = hiddenStatus?.only.filter(e => e !== deviceWidth);
    }
    setHiddenStatus({...hiddenStatus});
  };

  const labelStyle = {
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
  };

  return (
    <FormGroup row >
      <FormControlLabel
        disabled={disabled}
        style={labelStyle}
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
        style={labelStyle}
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
        style={labelStyle}
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
