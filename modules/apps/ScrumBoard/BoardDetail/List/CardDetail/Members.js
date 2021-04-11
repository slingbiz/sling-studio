import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const Members = (props) => {
  const {members} = props;

  const useStyles = makeStyles((theme) => ({
    avatarRroot: {
      width: 35,
      height: 35,
      marginRight: 8,
    },
  }));

  const classes = useStyles(props);
  return (
    <Box display='flex' alignItems='center'>
      {members.map((member) => {
        return (
          <Tooltip title={member.name} key={member.id}>
            {member.image ? (
              <Avatar
                className={classes.avatarRroot}
                src={member.image}
                alt='created'
              />
            ) : (
              <Avatar className={classes.avatarRroot}>
                {member.name[0].toUpperCase()}
              </Avatar>
            )}
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default Members;

Members.prototype = {
  members: PropTypes.array.isRequired,
};
