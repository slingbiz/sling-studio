import React from 'react';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  courseItems: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.grey[100]}`,
    },
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    overflow: 'hidden',
    display: 'block',
  },
  btnRoot: {
    whiteSpace: 'nowrap',
    width: 105,
  },
}));

const CourseCell = ({course}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      key={course.id}
      display='flex'
      flexDirection={{xs: 'column', sm: 'row'}}
      alignItems={{sm: 'center'}}
      className={clsx(classes.courseItems, 'item-hover')}>
      <Box display='flex' alignItems='center'>
        <Box mr={{xs: 3, md: 4}}>
          <img className={classes.logo} alt='' src={course.thumb} />
        </Box>
        <Box flex={1}>
          <Box
            component='h3'
            display='inline-block'
            fontWeight={Fonts.MEDIUM}
            mb={0.5}
            fontSize={14}>
            {course.title}
          </Box>
          <Box component='p' fontSize={14} color='text.secondary'>
            {course.duration}
          </Box>
        </Box>
      </Box>

      <Box ml={{sm: 'auto'}} display='flex' alignItems='center'>
        {course.isCompleted ? (
          <Box display='flex' alignItems='center'>
            <Box mr={2}>Rate</Box>
            <Button
              className={classes.btnRoot}
              size='small'
              variant='contained'
              color='primary'>
              Certificate
            </Button>
          </Box>
        ) : (
          <Box display='flex' alignItems='center'>
            <img
              src={'/images/dashboard/academy/rating.png'}
              alt='rating'
            />
            <Box mx={2} fontSize={{xs: 14, xl: 16}} component='span'>
              {course.rating}
            </Box>
            <Button
              className={classes.btnRoot}
              size='small'
              variant='outlined'
              color='primary'>
              View Course
            </Button>
          </Box>
        )}
        <Box ml={1} mr={-2}>
          <IconButton
            aria-controls='fade-menu'
            aria-haspopup='true'
            onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='fade-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}>
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseCell;
