import React from 'react';
import AppsHeader from '../../core/AppsContainer/AppsHeader';
import ProductHeader from '../../../modules/ecommerce/Products/ProductHeader';
import Blocks from '../../blocks/index';

const ListingHeader = (props) => {
  const {parentProps, cells} = props;
  console.log(cells, '@cells@ListingHeader');
  //TODO: Make AppsHeader have configurable overriding styles
  return (
    <AppsHeader>
      {cells.map((cell, key) => {
        if (Blocks[cell.key]) {
          const CellComponent = Blocks[cell.key];
          return <CellComponent parentProps={parentProps} key={key} />;
        }
      })}
    </AppsHeader>
  );
};

export default ListingHeader;
