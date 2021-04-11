import React, {useState} from 'react';
import AppList from '../../../../@crema/core/AppList';
import {addresses} from '../../../../@crema/services/db/ecommerce/ecommerceData';
import AddressCell from './AddressCell';

const DeliveryAddress = () => {
  const [selectedAddress, setSelectAddress] = useState(addresses[1]);
  return (
    <AppList
      delay={200}
      data={addresses}
      renderRow={(address) => (
        <AddressCell
          key={address.id}
          address={address}
          selectedAddress={selectedAddress}
          setSelectAddress={setSelectAddress}
        />
      )}
    />
  );
};

export default DeliveryAddress;
