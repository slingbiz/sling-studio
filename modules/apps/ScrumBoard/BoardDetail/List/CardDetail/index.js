import React from 'react';
import Card from '@material-ui/core/Card';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import moment from 'moment';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import Members from './Members';
import Labels from './Labels';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../../shared/constants/AppEnums';

const CardDetail = (props) => {
  const {card, onEditCardDetail, list} = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      marginBottom: 8,
      cursor: 'pointer',
    },
    pointer: {
      cursor: 'pointer',
    },
    attachFileIconRoot: {
      marginLeft: 8,
    },
  }));

  const classes = useStyles(props);
  return (
    <Card className={classes.root} onClick={() => onEditCardDetail(card, list)}>
      <Box mb={3} display='flex' alignItems='center'>
        <Box mr={2} fontWeight={Fonts.MEDIUM}>
          {card.title}
        </Box>
        {card.attachments && card.attachments.length > 0 ? (
          <Box ml='auto' display='flex' alignItems='center'>
            <Box component='span' fontWeight={Fonts.LIGHT}>
              {card.attachments.length}
            </Box>
            <AttachFileIcon className={classes.attachFileIconRoot} />
          </Box>
        ) : null}
      </Box>
      {card.label.length > 0 ? <Labels labels={card.label} /> : null}

      <Box display='flex' alignItems='center'>
        {card.members.length > 0 ? <Members members={card.members} /> : null}

        <Box ml={3} mr='auto' color='text.secondary'>
          {card.date ? moment(card.date).format('ll').split(',')[0] : null}
        </Box>
        {card.comments.length > 0 ? (
          <Box ml={2} display='flex' alignItems='center' color='text.secondary'>
            <Box component='span' mr={2} fontWeight={Fonts.LIGHT}>
              {card.comments.length}
            </Box>
            <ChatBubbleIcon />
          </Box>
        ) : null}
      </Box>
    </Card>
  );
};

export default CardDetail;

CardDetail.defaultProps = {
  list: null,
};

CardDetail.prototype = {
  card: PropTypes.object.isRequired,
  onEditCardDetail: PropTypes.func,
  list: PropTypes.object,
};
