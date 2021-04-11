import React from 'react';
import {Box, Hidden} from '@material-ui/core';
import AppSearch from '../../../../@crema/core/SearchBar';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import {useDispatch} from 'react-redux';
import {setViewType} from '../../../../redux/actions/Ecommerce';
import {VIEW_TYPE} from '../../../../redux/reducers/Ecommerce';
import IconButton from '@material-ui/core/IconButton';
import {Fonts} from '../../../../shared/constants/AppEnums';

const ProductHeader = ({onChange, viewType}) => {
  const dispatch = useDispatch();

  return (
    <Box display='flex' flex={1} alignItems='center'>
      <Box display='flex' flex={1}>
        <Box fontWeight={Fonts.BOLD} mr={3}>
          Watches
        </Box>
        <Hidden only='xs'>
          <Box component='span'>
            (Showing 1 – 40 products of 93,723 products)
          </Box>
        </Hidden>
      </Box>
      <Box display='flex' alignItems='center'>
        <AppSearch
          placeholder='Search here'
          onChange={(e) => onChange(e.target.value)}
        />
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
      </Box>
    </Box>
  );
};

export default ProductHeader;
