import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleDialogs from './SimpleDialogs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleDialogsSource from '!raw-loader!./SimpleDialogs';
import AlertsDialogs from './AlertsDialogs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AlertsDialogsSource from '!raw-loader!./AlertsDialogs';
import TransitionsDialog from './TransitionsDialog';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionsDialogSource from '!raw-loader!./TransitionsDialog';
import FormDialogs from './FormDialogs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FormDialogsSource from '!raw-loader!./FormDialogs';
import CustomizedDialogs from './CustomizedDialogs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedDialogsSource from '!raw-loader!./CustomizedDialogs';
import FullScreenDialogs from './FullScreenDialogs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FullScreenDialogsSource from '!raw-loader!./FullScreenDialogs';
import OptionalSizes from './OptionalSizes';
// eslint-disable-next-line import/no-webpack-loader-syntax
import OptionalSizesSource from '!raw-loader!./OptionalSizes';
import ResponsiveFullScreen from './ResponsiveFullScreen';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ResponsiveFullScreenSource from '!raw-loader!./ResponsiveFullScreen';

import DraggableDialog from './DraggableDialog';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DraggableDialogSource from '!raw-loader!./DraggableDialog';

const Dialogs = () => {
  return (
    <>
      <ComponentHeader
        title='Dialogs'
        description='Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.'
        refUrl='https://material-ui.com/components/dialogs/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Dialogs'
            component={SimpleDialogs}
            source={SimpleDialogsSource}
            description='Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Alerts Dialogs'
            component={AlertsDialogs}
            source={AlertsDialogsSource}
            description='Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Transitions'
            component={TransitionsDialog}
            source={TransitionsDialogSource}
            description='You can also swap out the transition, the next example uses Slide.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Form dialogs'
            component={FormDialogs}
            source={FormDialogsSource}
            description="Form dialogs allow users to fill out form fields within a dialog. For example, if your site prompts for potential subscribers to fill in their email address, they can fill out the email field and touch 'Submit'. "
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized dialogs'
            component={CustomizedDialogs}
            source={CustomizedDialogsSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized dialogs'
            component={CustomizedDialogs}
            source={CustomizedDialogsSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Full Screen Dialogs'
            component={FullScreenDialogs}
            source={FullScreenDialogsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Optional sizes'
            component={OptionalSizes}
            source={OptionalSizesSource}
            description='You can set a dialog maximum width by using the maxWidth enumerable in combination with the fullWidth boolean. When the fullWidth property is true, the dialog will adapt based on the maxWidth value.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Responsive full-screen'
            component={ResponsiveFullScreen}
            source={ResponsiveFullScreenSource}
            description='You may make a dialog responsively full screen using useMediaQuery.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Confirmation dialogs'
            component={ResponsiveFullScreen}
            source={ResponsiveFullScreenSource}
            description='Confirmation dialogs require users to explicitly confirm their choice before an option is committed.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Scrolling long content'
            component={ResponsiveFullScreen}
            source={ResponsiveFullScreenSource}
            description='When dialogs become too long for the user’s viewport or device, they scroll..'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Draggable dialog'
            component={DraggableDialog}
            source={DraggableDialogSource}
            description='You can create a draggable dialog by using react-draggable. To do so, you can pass the the imported Draggable component as the PaperComponent of the Dialog component. This will make the entire dialog draggable..'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Dialogs;
