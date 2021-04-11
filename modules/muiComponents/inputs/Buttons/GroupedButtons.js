import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';

export default function GroupedButtons() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction='column' alignItems='center'>
          <Grid item>
            <ButtonGroup size='small' aria-label='small outlined button group'>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup
              color='primary'
              aria-label='outlined primary button group'>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup
              color='secondary'
              size='large'
              aria-label='large outlined secondary button group'>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction='column' alignItems='center'>
          <Grid item>
            <Box boxShadow={0} clone>
              <ButtonGroup
                variant='contained'
                size='small'
                aria-label='small contained button group'>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item>
            <Box boxShadow={0} clone>
              <ButtonGroup
                variant='contained'
                color='primary'
                aria-label='full-width contained primary button group'>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item>
            <Box boxShadow={0} clone>
              <ButtonGroup
                variant='contained'
                color='secondary'
                size='large'
                aria-label='large contained secondary button group'>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup fullWidth aria-label='full width outlined button group'>
          <Button>Full</Button>
          <Button>width</Button>
          <Button>ButtonGroup</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
