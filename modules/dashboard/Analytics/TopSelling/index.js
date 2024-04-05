import React from 'react';
import SlingCard from '../../../../@sling/core/SlingCard';
import ProductCell from './ProductCell';
import {useIntl} from 'react-intl';
import AppList from '../../../../@sling/core/AppList';

const TopSelling = ({products}) => {
  const {messages} = useIntl();
  return (
    <SlingCard
      contentStyle={{paddingRight: 0, paddingLeft: 0}}
      height={1}
      title={'Top Pages'}
      footer={'+12 ' + messages['common.more']}>
      <AppList
        animation='transition.slideRightBigIn'
        data={products}
        renderRow={(data, index) => <ProductCell key={index} data={data} />}
      />
    </SlingCard>
  );
};

export default TopSelling;
