import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import Avatar from '@material-ui/core/Avatar';
import {Box, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  topBorder: {
    borderTop: `solid 1px ${theme.palette.grey[200]}`,
  },
  rightBorder: {
    borderRight: `solid 1px ${theme.palette.grey[200]}`,
  },
}));

const ProfileCard = () => {
  const classes = useStyles();
  return (
    <AppCard>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'>
        <Avatar
          style={{height: 80, width: 80}}
          src={'/images/avatar/A10.jpg'}
        />
        <Box p={3} mb={4} mt={2} component='h5'>
          Talan Phips
        </Box>

        <Box display='flex' flexDirection='column' width={1}>
          <Box display='flex' alignItems='center' textAlign='center'>
            <Box py={5} px={2} className={classes.rightBorder} width={1 / 2}>
              <Box component='h5'>24</Box>
              <Box color='text.secondary'>Years</Box>
            </Box>
            <Box py={5} px={2} width={1 / 2}>
              <Box component='h5'>A+</Box>
              <Box color='text.secondary'>Blood</Box>
            </Box>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            textAlign='center'
            className={classes.topBorder}>
            <Box py={5} px={2} className={classes.rightBorder} width={1 / 2}>
              <Box component='h5'>185 cm</Box>
              <Box color='text.secondary'>Height</Box>
            </Box>
            <Box py={5} px={2} width={1 / 2}>
              <Box component='h5'>84 kg</Box>
              <Box color='text.secondary'>Weight</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default ProfileCard;
