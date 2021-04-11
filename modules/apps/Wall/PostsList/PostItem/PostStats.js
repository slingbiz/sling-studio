import React from 'react';
import Box from '@material-ui/core/Box';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import {useDispatch} from 'react-redux';
import {onUpdatePostStatus} from '../../../../../redux/actions/Wall';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  iconRoot: {
    fontSize: 18,
  },
}));

const PostStats = ({post}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const toggleLikeStatus = () => {
    dispatch(onUpdatePostStatus(post.id, !post.liked));
  };

  return (
    <Box
      mb={{xs: 4, xl: 6}}
      display='flex'
      alignItems='center'
      justifyContent='space-around'>
      <Box
        display='flex'
        alignItems='center'
        className='pointer'
        color={post.liked ? 'primary.main' : 'text.primary'}
        onClick={toggleLikeStatus}>
        <ThumbUpAltIcon className={classes.iconRoot} />
        <Box fontSize={{xs: 12, md: 14}} component='span' ml={1.5}>
          {post.likes} likes
        </Box>
      </Box>
      {post.comments.length > 0 && (
        <Box display='flex' className='pointer' alignItems='center' ml={3}>
          <CommentIcon className={classes.iconRoot} />
          <Box fontSize={{xs: 12, md: 14}} component='span' ml={1.5}>
            {post.comments.length} Comments
          </Box>
        </Box>
      )}
      <Box display='flex' alignItems='center' className='pointer' ml={3}>
        <ShareIcon className={classes.iconRoot} />
        <Box fontSize={{xs: 12, md: 14}} component='span' ml={1.5}>
          {post.shares} Shares
        </Box>
      </Box>
    </Box>
  );
};

export default PostStats;
