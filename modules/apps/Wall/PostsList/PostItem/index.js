import React from 'react';
import AppCard from '../../../../../@crema/core/AppCard';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import {timeFromNow} from '../../../../../@crema/utility/Utils';
import Attachments from './Attachments';
import PostStats from './PostStats';
import AddComment from './AddComment';
import CommentsList from './CommentsList';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  appCardRoot: {
    '&:not(:last-child)': {
      marginBottom: 32,
    },
  },
  avatarRoot: {
    [theme.breakpoints.up('xl')]: {
      width: 50,
      height: 50,
    },
  },
  iconBtnRoot: {
    border: 'solid 1px #E5E4EA',
  },
}));

const PostItem = ({post, wallData}) => {
  const classes = useStyles();
  const {owner, message, date, attachments, comments} = post;
  const getTitle = () => (
    <Box display='flex' alignItems='center'>
      <Avatar className={classes.avatarRoot} src={owner.profilePic} />
      <Box ml={4}>
        <Box component='h6' mb={0.5} fontWeight={Fonts.MEDIUM}>
          {owner.name}
        </Box>
        <Box component='p' color='text.secondary' fontSize={14}>
          {timeFromNow(date)}
        </Box>
      </Box>
    </Box>
  );

  return (
    <AppCard
      className={classes.appCardRoot}
      title={getTitle()}
      action={
        <Box>
          <IconButton
            className={classes.iconBtnRoot}
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            onClick={null}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      }>
      <Box component='p' mb={2} fontSize={14}>
        {message}
      </Box>
      <Box mb={2}>
        <Attachments attachments={attachments} />
      </Box>
      <PostStats post={post} />
      <AddComment postId={post.id} wallData={wallData} />
      {comments.length > 0 && <CommentsList comments={comments} />}
    </AppCard>
  );
};

export default PostItem;
