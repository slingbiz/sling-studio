import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {lighten, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    border: `2px solid ${theme.palette.primary.contrastText}`,
    marginRight: -10,
    [theme.breakpoints.up('lg')]: {
      width: 50,
      height: 50,
    },
  },
  btnRoot: {
    textTransform: 'capitalize',
    backgroundColor: lighten(theme.palette.primary.main, 0.8),
    color: theme.palette.primary.main,
    '&:hover, &:focus': {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
      color: theme.palette.primary.main,
    },
  },
}));

const VideoCall = ({data}) => {
  const {users, title} = data;

  const classes = useStyles();
  return (
    <AppCard mb={8}>
      <Box
        display='flex'
        alignItems='center'
        textAlign='center'
        flexDirection='column'>
        <Box
          display='flex'
          alignItems='center'
          flexDirection='row-reverse'
          mb={{xs: 3, xl: 4}}>
          {users.map((user) => (
            <Avatar
              key={user.id}
              className={classes.avatarRoot}
              src={user.profilePic}
            />
          ))}
        </Box>
        <Box mb={1} component='h5'>
          {title}
        </Box>
        <Box mb={5} component='p' color='text.secondary'>
          Active Now
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexWrap='wrap'>
          <Box mx={2} mb={2}>
            <Button variant='contained' className={classes.btnRoot}>
              Group Call
            </Button>
          </Box>
          <Box mx={2} mb={2}>
            <Button variant='contained' className={classes.btnRoot}>
              Video Call
            </Button>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default VideoCall;
