import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import ProductCell from './ProductCell';
import {useIntl} from 'react-intl';
import AppList from '../../../../@crema/core/AppList';

const TopSelling = ({products}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      contentStyle={{paddingRight: 0, paddingLeft: 0}}
      height={1}
      title={messages['dashboard.analytics.topSellingProducts']}
      footer={'+12 ' + messages['common.more']}>
      <AppList
        animation='transition.slideRightBigIn'
        data={products}
        renderRow={(data, index) => <ProductCell key={index} data={data} />}
      />
    </AppCard>
  );
};

export default TopSelling;
