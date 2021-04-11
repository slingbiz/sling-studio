import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const CommentsList = ({comments, classes}) => {
  return (
    <>
      {comments.length > 0 ? (
        <Box mb={5}>
          <Box mb={4} fontWeight={Fonts.MEDIUM}>
            <IntlMessages id='common.comments' />
          </Box>
          {comments.map((item, index) => {
            return (
              <Box mb={5} key={index}>
                <Box mb={4} display='flex' alignItems='center'>
                  {item.image ? (
                    <Avatar src={item.image} className={classes.avtr50} />
                  ) : (
                    <Avatar className={classes.avtr50}>{item.name[0]}</Avatar>
                  )}
                  <Box ml={4}>
                    <Box
                      component='span'
                      color='primary.main'
                      mb={0.5}
                      display='block'
                      fontWeight={Fonts.MEDIUM}>
                      {item.name}
                    </Box>
                    <Box
                      component='span'
                      color='text.secondary'
                      display='block'
                      fontSize={14}>
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
      ) : null}
    </>
  );
};

export default CommentsList;

CommentsList.defaultProps = {
  comments: [],
};

CommentsList.prototype = {
  comments: PropTypes.array,
};
