import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels() {
  const [state, setState] = React.useState({
    mobile: true,
    tablet: true,
    desktop: true,
  });

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked});
  };

  return (
    <FormGroup row>
      <FormControlLabel
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
