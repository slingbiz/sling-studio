import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import ProductCell from './ProductCell';
import AppGrid from '../../../../@crema/core/AppGrid';
import Scrollbar from '../../../../@crema/core/Scrollbar';

const PopularProducts = ({popularProducts}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['eCommerce.popularProducts']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}>
      <Scrollbar style={{maxHeight: 280}}>
        <AppGrid
          data={popularProducts}
          responsive={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
          }}
          itemPadding={8}
          renderRow={(data, index) => (
            <ProductCell key={'product-' + index} data={data} />
          )}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default PopularProducts;
