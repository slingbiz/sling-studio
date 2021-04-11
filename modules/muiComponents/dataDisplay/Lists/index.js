import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleList from './SimpleList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleListSource from '!raw-loader!./SimpleList';
import NestedList from './NestedList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NestedListSource from '!raw-loader!./NestedList';
import FolderList from './FolderList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FolderListSource from '!raw-loader!./FolderList';
import AlignListItems from './AlignListItems';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AlignListItemsSource from '!raw-loader!./AlignListItems';
import SelectedListItem from './SelectedListItem';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SelectedListItemSource from '!raw-loader!./SelectedListItem';
import ListControls from './ListControls';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ListControlsSource from '!raw-loader!./ListControls';
import SwitchList from './SwitchList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwitchListSource from '!raw-loader!./SwitchList';
import PinnedSubheaderList from './PinnedSubheaderList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PinnedSubheaderListSource from '!raw-loader!./PinnedSubheaderList';
import InsetList from './InsetList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InsetListSource from '!raw-loader!./InsetList';
import VirtualizedList from './VirtualizedList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VirtualizedListSource from '!raw-loader!./VirtualizedList';
import InteractiveList from './InteractiveList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InteractiveListSource from '!raw-loader!./InteractiveList';

const Lists = () => {
  return (
    <>
      <ComponentHeader
        title='Lists'
        description='Lists are continuous, vertical indexes of text or images.'
        refUrl='https://material-ui.com/components/lists//'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple List'
            component={SimpleList}
            source={SimpleListSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Folder List'
            component={FolderList}
            source={FolderListSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Interactive List'
            component={InteractiveList}
            source={InteractiveListSource}
            description='Below is an interactive demo that lets you explore the visual results of the different settings:'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Nested List'
            component={NestedList}
            source={NestedListSource}
            description='The Link component is built on top of the Typography component. You can leverage its properties.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Selected ListItem'
            component={SelectedListItem}
            source={SelectedListItemSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Folder List'
            component={FolderList}
            source={FolderListSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='List Controls'
            component={ListControls}
            source={ListControlsSource}
            description='A checkbox can either be a primary action or a secondary action.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Align list items'
            component={AlignListItems}
            source={AlignListItemsSource}
            description="You should change the list item alignment when displaying 3 lines or more, set the alignItems='flex-start' property."
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Pinned Subheader List'
            component={PinnedSubheaderList}
            source={PinnedSubheaderListSource}
            description='Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Switch List'
            component={SwitchList}
            source={SwitchListSource}
            description='The switch is the secondary action and a separate target.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Inset List'
            component={InsetList}
            source={InsetListSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Virtualized List'
            component={VirtualizedList}
            source={VirtualizedListSource}
            description='In the following example, we demonstrate how to use react-window with the List component. It renders 200 rows and can easily handle more. Virtualization helps with performance issues.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Lists;
