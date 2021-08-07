import React from 'react';
import {Box} from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import AppSearch from '../../core/SearchBar';
import {setFilters, setViewType} from '../../../redux/actions/Ecommerce';
import {VIEW_TYPE} from '../../../redux/reducers/Ecommerce';
import Hidden from '@material-ui/core/Hidden';

const ListingSearchBar = ({parentProps}) => {
  const dispatch = useDispatch();
  const {viewType} = parentProps;
  const {filterData} = useSelector(({ecommerce}) => ecommerce);

  const searchProduct = (title) => {
    dispatch(setFilters({...filterData, title}));
  };

  return (
    <Box display='flex' alignItems='center' justifyContent={'flex-end'}>
      <AppSearch
        placeholder='Search'
        onChange={(e) => searchProduct(e.target.value)}
      />
      <Hidden mdDown>
        <IconButton onClick={() => dispatch(setViewType(VIEW_TYPE.LIST))}>
          <ListIcon
            color={viewType === VIEW_TYPE.LIST ? 'primary' : 'inherit'}
          />
        </IconButton>
        <IconButton onClick={() => dispatch(setViewType(VIEW_TYPE.GRID))}>
          <AppsIcon
            color={viewType === VIEW_TYPE.GRID ? 'primary' : 'inherit'}
          />
        </IconButton>
      </Hidden>
    </Box>
  );
};

export default ListingSearchBar;
