import React from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-notifications-component/dist/theme.css';

import ComponentCard from '../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';
import AnimationEntrance from './AnimationEntrance';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AnimationEntranceSource from '!raw-loader!./AnimationEntrance';
import AnimationExit from './AnimationExit';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AnimationExitSource from '!raw-loader!./AnimationExit';
import Insert from './Insert';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InsertSource from '!raw-loader!./Insert';
import Container from './Container';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ContainerSource from '!raw-loader!./Container';
import CustomContent from './CustomContent';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomContentSource from '!raw-loader!./CustomContent';
import Type from './Type';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TypeSource from '!raw-loader!./Type';
import ReactNotification from 'react-notifications-component';

const ReactNotificationEx = () => {
  return (
    <>
      <ComponentHeader
        title='React Notifications'
        description='Delightful and highly customisable React Component to notify your users.'
        refUrl='https://teodosii.github.io/react-notifications-component//'
      />

      <ReactNotification
        types={[
          {
            htmlClasses: ['notification-awesome'],
            name: 'awesome',
          },
        ]}
        isMobile={true}
      />
      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Animation Entrance'
            description='Entrance animation can be customised by specifying CSS classes'
            component={AnimationEntrance}
            source={AnimationEntranceSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Animation Exit'
            description='Exit animation can be customised by specifying CSS classes'
            component={AnimationExit}
            source={AnimationExitSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Container'
            description='Container can be set from predefined values top-left, top-right, top-center, bottom-left, bottom-right, bottom-center'
            component={Container}
            source={ContainerSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Custom Content'
            description="With react-notifications-component notification's content can be customised to suit your needs."
            component={CustomContent}
            source={CustomContentSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Insert'
            description='Insertion in react-notifications can be done either at the top or at the bottom of the container'
            component={Insert}
            source={InsertSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Type'
            description='Type can be set from predefined values success, default, warning, info, danger or custom to suit your needs'
            component={Type}
            source={TypeSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactNotificationEx;
