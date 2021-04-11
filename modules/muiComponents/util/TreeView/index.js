import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleTreeView from './SimpleTreeView';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTreeViewSource from '!raw-loader!./SimpleTreeView';
import CustomizedTreeView from './CustomizedTreeView';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedTreeViewSource from '!raw-loader!./CustomizedTreeView';
import GmailClone from './GmailClone';
// eslint-disable-next-line import/no-webpack-loader-syntax
import GmailCloneSource from '!raw-loader!./GmailClone';

const TreeViews = () => {
  return (
    <>
      <ComponentHeader
        title='Tree View'
        description='A tree view widget presents a hierarchical list.'
        refUrl='https://material-ui.com/components/tree-view/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Paper'
            component={SimpleTreeView}
            source={SimpleTreeViewSource}
            description='Tree views can be used to represent a file system navigator displaying folders and files, an item representing a folder can be expanded to reveal the contents of the folder, which may be files, folders, or both.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized tree view'
            component={CustomizedTreeView}
            source={CustomizedTreeViewSource}
            description='Custom icons, border and animation'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Gmail clone'
            component={GmailClone}
            source={GmailCloneSource}
            description='Custom icons, border and animation'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default TreeViews;
