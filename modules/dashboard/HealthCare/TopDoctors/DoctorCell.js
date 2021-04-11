import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
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

const DoctorCell = ({doctor}) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.listItemRoot, 'item-hover')}>
      <Box mr={4} clone>
        <Avatar className={classes.avatarSize} src={doctor.profile_pic} />
      </Box>
      <Box className={classes.contentArea}>
        <Box fontWeight={Fonts.MEDIUM} component='h5' mb={0.5}>
          {doctor.name}
        </Box>
        <Box color='text.secondary' component='p'>
          {doctor.speciality}
        </Box>
      </Box>
      <Box display='flex' alignItems='center' ml='auto'>
        {doctor.scheduled ? (
          <Button color='secondary' variant='outlined'>
            Remove
          </Button>
        ) : (
          <Button color='primary' variant='outlined'>
            Schedule
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DoctorCell;

DoctorCell.propTypes = {
  doctor: PropTypes.object.isRequired,
};
