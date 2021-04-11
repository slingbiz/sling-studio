import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import CardCheckedList from './CardCheckedList';
import {makeStyles} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../../../shared/constants/AppEnums';
import {TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    width: 50,
    height: 50,
    backgroundColor: orange[500],
  },
  textareaAutosizeRoot: {
    width: '100%',
  },
}));

const CardComments = (props) => {
  const {comments, onAddNewComment} = props;
  const [comment, setComment] = useState('');

  const onAddComment = (e) => {
    if (e.keyCode === 13) {
      onAddNewComment(comment);
      setComment('');
    }
  };

  const {messages} = useIntl();

  const classes = useStyles(props);

  return (
    <Box mb={{xs: 5, xl: 10}}>
      <Box mb={5}>
        {comments.map((item, index) => {
          return (
            <Box mb={5} key={index}>
              <Box mb={4} display='flex' alignItems='center'>
                {item.image ? (
                  <Avatar src={item.image} className={classes.avatarRoot} />
                ) : (
                  <Avatar className={classes.avatarRoot}>
                    {item.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <Box ml={4}>
                  <Box
                    component='span'
                    mb={1}
                    display='block'
                    color='primary.main'
                    fontWeight={Fonts.LIGHT}>
                    {item.name}
                  </Box>
                  <Box
                    component='span'
                    color='text.secondary'
                    fontSize={14}
                    display='block'>
                    {item.date}
                  </Box>
                </Box>
              </Box>
              <Box component='p' ml={2} mb={0}>
                {item.comment}
              </Box>
            </Box>
          );
        })}
      </Box>

      <TextField
        multiline
        onKeyDown={onAddComment}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={classes.textareaAutosizeRoot}
        rows='4'
        variant='outlined'
        placeholder={messages['common.pressEnter']}
      />
    </Box>
  );
};

export default CardComments;

CardCheckedList.defaultProps = {
  comments: [],
};

CardCheckedList.prototype = {
  comments: PropTypes.array,
  onAddNewComment: PropTypes.func,
};
