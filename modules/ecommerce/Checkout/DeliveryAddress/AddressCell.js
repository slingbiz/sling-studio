import React from 'react';
import {Box, Button} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {Fonts} from '../../../../shared/constants/AppEnums';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const AddressCell = ({address, selectedAddress, setSelectAddress}) => {
  const isActive = selectedAddress.id === address.id;
  return (
    <Box
      onClick={() => setSelectAddress(address)}
      border={1}
      px={5}
      py={2}
      mb={4}
      className='item-hover'
      borderRadius={4}
      borderColor='#D9DBE3'>
      <Box
        display='flex'
        alignItems='center'
        fontSize={14}
        fontWeight={Fonts.MEDIUM}>
        <Checkbox
          checked={isActive}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          color='primary'
        />
        <Box mx={3.5}>{address.name}</Box>
        <Box>{address.mobile}</Box>
        {isActive ? (
          <Box ml='auto'>
            <IconButton size='small'>
              <EditIcon />
            </IconButton>
          </Box>
        ) : null}
      </Box>
      <Box fontSize={14} fontWeight={Fonts.REGULAR} ml={14} mt={-2} mb={4}>
        {address.addressLine}, {address.city}, {address.pin}
      </Box>
      {isActive ? (
        <Box fontSize={14} fontWeight={Fonts.REGULAR} ml={14} mt={1} mb={4}>
          <Button variant='contained' color='primary'>
            Deliver Here
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default AddressCell;
