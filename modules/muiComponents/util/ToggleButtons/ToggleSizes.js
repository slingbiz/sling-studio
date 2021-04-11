import React from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bgTransparent: {
    backgroundColor: 'transparent',
  },
}));
export default function ToggleButtonSizes(props) {
  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const classes = useStyles(props);

  const children = [
    <ToggleButton key={1} value='left'>
      <FormatAlignLeftIcon />
    </ToggleButton>,
    <ToggleButton key={2} value='center'>
      <FormatAlignCenterIcon />
    </ToggleButton>,
    <ToggleButton key={3} value='right'>
      <FormatAlignRightIcon />
    </ToggleButton>,
    <ToggleButton key={4} value='justify' disabled>
      <FormatAlignJustifyIcon />
    </ToggleButton>,
  ];

  return (
    <Grid container spacing={2} direction='column' alignItems='center'>
      <Grid item>
        <ToggleButtonGroup
          className={classes.bgTransparent}
          size='small'
          value={alignment}
          exclusive
          onChange={handleChange}>
          {children}
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          className={classes.bgTransparent}
          size='medium'
          value={alignment}
          exclusive
          onChange={handleChange}>
          {children}
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          className={classes.bgTransparent}
          size='large'
          value={alignment}
          exclusive
          onChange={handleChange}>
          {children}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
