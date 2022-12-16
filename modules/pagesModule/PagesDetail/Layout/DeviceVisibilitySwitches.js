import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

  return (
    <FormGroup row >
      <FormControlLabel
        disabled={disabled}
        control={
          <Switch
            checked={state.mobile}
            onChange={handleChange('mobile')}
            value='mobile'
          />
        }
        label='Show on Mobile'
      />
      <FormControlLabel
        disabled={disabled}
        control={
          <Switch
            checked={state.tablet}
            onChange={handleChange('tablet')}
            value='tablet'
            color='primary'
          />
        }
        label='Show on Tablet'
      />
      <FormControlLabel
        disabled={disabled}
        control={
          <Switch
            checked={state.desktop}
            onChange={handleChange('desktop')}
            value='desktop'
            color='primary'
          />
        }
        label='Show on Desktop'
      />
    </FormGroup>
  );
}
