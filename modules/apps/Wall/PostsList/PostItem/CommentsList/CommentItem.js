import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  commentItemsRoot: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  avatarRoot: {
    [theme.breakpoints.up('xl')]: {
      width: 48,
      height: 48,
    },
  },
}));

const CommentItem = ({item}) => {
  const {author, comment, liked} = item;
  const [isLiked, setIsLiked] = useState(liked);
  const classes = useStyles();

  const toggleLikeStatus = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Box className={classes.commentItemsRoot}>
      <Box display='flex'>
        <Avatar className={classes.avatarRoot} src={author.profilePic} />
        <Box ml={4}>
          <Box
            py={3}
            px={5}
            display='flex'
            alignItems='center'
            flexWrap='wrap'
            style={{border: '1px solid #E5E4EA', borderRadius: 30}}>
            <Box component='p'>{comment}</Box>
          </Box>
          <Box display='flex' alignItems='center' mt={2}>
            <Box
              className='pointer'
              color={isLiked && 'primary.main'}
              onClick={toggleLikeStatus}>
              Like
            </Box>
            <Box ml={4} className='pointer'>
              Reply
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentItem;
