import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  contentArea: {
    fontSize: 14,
  },
  avatarSize: {
    width: 48,
    height: 48,
  },
  listItemRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 20px',
  },
}));

const AppointmentCell = ({appointment}) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.listItemRoot, 'item-hover')}>
      <Box mr={4} clone>
        <Avatar className={classes.avatarSize} src={appointment.profile_pic} />
      </Box>
      <Box className={classes.contentArea}>
        <Box component='h5' fontWeight={Fonts.MEDIUM} mb={0.5}>
          {appointment.name}
        </Box>
        <Box component='p' color='primary.main'>
          {appointment.speciality}
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' ml='auto'>
        <Box
          color='primary.main'
          component='p'
          my={1}
          fontSize={13}
          fontWeight={Fonts.BOLD}>
          {appointment.appointmentTime}
        </Box>
        <Box component='p'>{appointment.appointmentDate}</Box>
      </Box>
    </Box>
  );
};

export default AppointmentCell;

AppointmentCell.propTypes = {
  appointment: PropTypes.object.isRequired,
};
