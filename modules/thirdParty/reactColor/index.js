import React from 'react';
import {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SwatchesPicker,
  TwitterPicker,
} from 'react-color';

import Basic from './Basic';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSource from '!raw-loader!./Basic';
import BasicToggle from './BasicToggle';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicToggleSource from '!raw-loader!./BasicToggle';
import BasicPositioning from './BasicPositioning';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicPositioningSource from '!raw-loader!./BasicPositioning';
import CustomPicker from './CustomPicker';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomPickerSource from '!raw-loader!./CustomPicker';
import CustomPointer from './CustomPointer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomPointerSource from '!raw-loader!./CustomPointer';
import WithRedux from './WithRedux';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithReduxSource from '!raw-loader!./WithRedux';
import ComponentCard from '../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';
import Grid from '@material-ui/core/Grid';

const ColorPicker = () => {
  return (
    <>
      <ComponentHeader
        title='React Color'
        description='13 Different Pickers - Sketch, Photoshop, Chrome and many more, Use the building block components to make your own '
        refUrl='http://casesandberg.github.io/react-color/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Alpha Picker' component={AlphaPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Hue Picker' component={HuePicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Circle Picker' component={CirclePicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Compact Picker' component={CompactPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Block Picker' component={BlockPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Chrome Picker' component={ChromePicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Github Picker' component={GithubPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Twitter Picker' component={TwitterPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='WithRedux Picker'
            component={WithRedux}
            source={WithReduxSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Sketch Picker' component={SketchPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Material Picker' component={MaterialPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Basic Picker'
            component={Basic}
            source={BasicSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='BasicToggle Picker'
            component={BasicToggle}
            source={BasicToggleSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Custom Picker'
            component={CustomPicker}
            source={CustomPickerSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='CustomPointer Picker'
            component={CustomPointer}
            source={CustomPointerSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='BasicPositioning'
            component={BasicPositioning}
            source={BasicPositioningSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Photoshop Picker' component={PhotoshopPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Swatches Picker' component={SwatchesPicker} />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ColorPicker;
