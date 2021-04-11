import React from 'react';
import {array, boolean, object, text, withKnobs} from '@storybook/addon-knobs';
import {withA11y} from '@storybook/addon-a11y';
import {actions} from '@storybook/addon-actions';
import AppList from '../@crema/core/AppList';
import ListEmptyResult from '../@crema/core/AppList/ListEmptyResult';
import {MailItem} from '../@crema/core/Skeleton/EmailListSkeleton';

const appList = {
  title: 'AppList',
  component: AppList,
  decorators: [withKnobs, withA11y],
};
export default appList;
const renderRow = (item) => {
  return <MailItem key={'key-' + item} item={item} />;
};

const events = actions('onEndReached', 'onClick');
export const Default = () => (
  <AppList
    border={boolean('border', false)}
    data={array('data', [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
    ])}
    renderRow={renderRow}
    {...events}
  />
);
export const EmptyList = () => (
  <AppList
    data={array('data', [])}
    renderRow={renderRow}
    border={boolean('border', true)}
    {...events}
    ListEmptyComponent={
      <ListEmptyResult
        loader={boolean('loader', false)}
        title={text('title', 'Container Title')}
        content={text('content', 'Container content')}
        actionTitle={text('actionTitle', 'Action Title')}
      />
    }
  />
);

export const ListWithFooter = () => (
  <AppList
    data={array('data', [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
    ])}
    renderRow={renderRow}
    border={boolean('border', true)}
    {...events}
    ListEmptyComponent={
      <ListEmptyResult
        loader={boolean('loader', false)}
        title={text('title', 'Container Title')}
        content={text('content', 'Container content')}
        actionTitle={text('actionTitle', 'Action Title')}
      />
    }
    footerProps={object('footerProps', {
      loading: false,
      footerText: 'No more content',
    })}
  />
);
