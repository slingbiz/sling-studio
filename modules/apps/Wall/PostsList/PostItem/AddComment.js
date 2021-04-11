import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import PhotoIcon from '@material-ui/icons/Photo';
import GifIcon from '@material-ui/icons/Gif';
import {onAddNewComment} from '../../../../../redux/actions/Wall';
import {useDispatch} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    [theme.breakpoints.up('xl')]: {
      width: 48,
      height: 48,
    },
  },
  fabBtn: {
    width: 40,
    height: 40,
    padding: 0,
    minWidth: 10,
    boxShadow: 'none',
    [theme.breakpoints.up('xl')]: {
      width: 48,
      height: 48,
    },
  },
  textFieldRoot: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 30,
    },
    '& .MuiOutlinedInput-input': {
      height: 48,
      boxSizing: 'border-box',
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
}));

const AddComment = ({postId, wallData}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const classes = useStyles();

  const submitComment = (event) => {
    if (event.key === 'Enter') {
      const newComment = {
        author: {
          name: wallData.name,
          profilePic: wallData.profilePic,
          id: wallData.id,
        },
        comment,
      };
      dispatch(onAddNewComment(postId, newComment));
      setComment('');
    }
  };

  return (
    <Box
      mb={{xs: 5, xl: 6}}
      display='flex'
      flexDirection={{xs: 'column', md: 'row'}}
      alignItems={{md: 'center'}}
      justifyContent={{md: 'space-between'}}>
      <Box display='flex' alignItems='center' flex={1} mb={{xs: 3, md: 0}}>
        <Avatar className={classes.avatarRoot} src={wallData.profilePic} />
        <Box ml={4} width={1}>
          <TextField
            className={classes.textFieldRoot}
            placeholder='Write a comment'
            variant='outlined'
            size='small'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={submitComment}
          />
        </Box>
      </Box>

      <Box display='flex' alignItems='center' ml={{md: 3}}>
        <Box ml={2}>
          <Fab className={classes.fabBtn} variant='extended'>
            <EmojiEmotionsIcon />
          </Fab>
        </Box>
        <Box ml={2}>
          <Fab className={classes.fabBtn} variant='extended'>
            <PhotoIcon />
          </Fab>
        </Box>
        <Box ml={2}>
          <Fab className={classes.fabBtn} variant='extended'>
            <GifIcon />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
};

export default AddComment;
