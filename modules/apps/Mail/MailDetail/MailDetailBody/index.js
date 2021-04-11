import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar/index';
import ReplyIcon from '@material-ui/icons/Reply';
import StarIcon from '@material-ui/icons/Star';
import ForwardIcon from '@material-ui/icons/Forward';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Checkbox} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip/index';
import {useDispatch} from 'react-redux';
import {
  onComposeMail,
  onUpdateSelectedMail,
} from '../../../../../redux/actions';
import ReplyMail from './ReplyMail';
import ForwardMail from './ForwardMail';
import moment from 'moment';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 50,
    height: 50,
  },
  breakAll: {
    wordBreak: 'break-all',
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const MailDetailBody = (props) => {
  const {selectedMail} = props;
  const dispatch = useDispatch();

  const router = useRouter();

  const {pathname} = router;

  const [isReply, onReplyMail] = useState(false);

  const [isForward, onForward] = useState(false);

  const onReplyToMail = () => {
    onForward(false);
    onReplyMail(true);
  };

  const onForwardMail = () => {
    onReplyMail(false);
    onForward(true);
  };

  const onChangeStarred = () => {
    const mail = selectedMail;
    mail.isStarred = !mail.isStarred;
    dispatch(onUpdateSelectedMail(mail));
  };

  const onSubmitMail = () => {
    const mail = selectedMail;
    mail.folderValue = 122;
    mail.isReplied = true;
    dispatch(onUpdateSelectedMail(mail));
    onReplyMail(false);
    router.back();
  };

  const onSubmitForwardedMail = (mail) => {
    dispatch(onComposeMail(mail, pathname));
    router.back();
  };

  const onGetMailDate = (date) => {
    return moment(date).format('ddd, MMM DD, YYYY');
  };

  const onGetMailTime = (date) => {
    return moment(date).format('LT');
  };

  const classes = useStyles(props);

  return (
    <Box px={6} py={8}>
      {selectedMail ? (
        <Box color='text.secondary'>
          <Box
            mb={{xs: 4, sm: 6}}
            display='flex'
            flexDirection={{xs: 'column', sm: 'row'}}
            alignItems={{sm: 'center'}}>
            <Box display='flex' alignItems='center'>
              <Avatar className={classes.avatar} />
              <Box ml={4}>
                <Box
                  mb={0.5}
                  color='primary.main'
                  fontWeight={Fonts.MEDIUM}
                  fontSize={16}>
                  {selectedMail.sentBy}
                </Box>
                <Box component='span' className={classes.breakAll}>
                  {selectedMail.senderMailId}
                </Box>
              </Box>
            </Box>

            <Box
              ml={{sm: 'auto'}}
              mt={{xs: 3, sm: 0}}
              display='flex'
              flexDirection={{xs: 'row', sm: 'column'}}
              alignItems={{xs: 'center', sm: 'flex-end'}}>
              <Box mb={0.5}>{onGetMailDate(selectedMail.sentOn)}</Box>
              <Box ml={{xs: 3, sm: 0}}>
                {onGetMailTime(selectedMail.sentOn)}
              </Box>
            </Box>
          </Box>

          <Box
            mb={{xs: 3, sm: 5}}
            display='flex'
            flexDirection={{xs: 'column', sm: 'row'}}
            alignItems={{sm: 'center'}}>
            <Box color='text.primary' component='h5' fontWeight={Fonts.LIGHT}>
              {selectedMail.subject ? selectedMail.subject : null}
            </Box>

            <Box
              ml={{sm: 'auto'}}
              mt={{xs: 3, sm: 0}}
              display='flex'
              alignItems='center'>
              <Tooltip title={<IntlMessages id='common.reply' />}>
                <Box component='span' color='text.secondary'>
                  <ReplyIcon
                    className={classes.pointer}
                    onClick={onReplyToMail}
                  />
                </Box>
              </Tooltip>

              <Tooltip title={<IntlMessages id='common.starred' />}>
                <Box component='span' color='text.secondary' ml={3}>
                  <Checkbox
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon />}
                    checked={selectedMail.isStarred}
                    onChange={(event) => onChangeStarred(event)}
                  />
                </Box>
              </Tooltip>

              <Tooltip title={<IntlMessages id='common.forward' />}>
                <Box component='span' color='text.secondary' ml={3}>
                  <ForwardIcon
                    className={classes.pointer}
                    onClick={onForwardMail}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Box>

          <Box mb={5}>
            <Box
              component='p'
              color='text.secondary'
              fontSize={{xs: 14, xl: 16}}
              mb={{xs: 3, xl: 5}}>
              Respected Customer
            </Box>
            <Box
              component='p'
              color='text.secondary'
              fontSize={{xs: 14, xl: 16}}
              mb={{xs: 3, xl: 5}}>
              Greetings of the day
            </Box>
            <Box
              component='p'
              color='text.secondary'
              fontSize={{xs: 14, xl: 16}}
              mb={{xs: 3, xl: 5}}>
              This mail is to inform you that an amount of Rs 28743 has been
              credited to your account in lieu of the Fixed Deposit that got
              matured last week. We would be thankful to you if you acknowledge
              this mail.
            </Box>

            <Box
              component='p'
              color='text.secondary'
              fontSize={{xs: 14, xl: 16}}
              mb={{xs: 3, xl: 5}}>
              Looking forward to help you in any way.
            </Box>
            <Box
              component='p'
              color='text.secondary'
              fontSize={{xs: 14, xl: 16}}
              mb={{xs: 3, xl: 5}}>
              Sincerely
            </Box>
            <Box
              component='p'
              color='text.secondary'
              fontSize={{xs: 14, xl: 16}}
              mb={{xs: 3, xl: 5}}>
              {selectedMail.sentBy}
            </Box>
          </Box>

          {isReply ? (
            <ReplyMail
              selectedMail={selectedMail}
              onSubmitMail={onSubmitMail}
            />
          ) : null}

          {isForward ? (
            <ForwardMail
              selectedMail={selectedMail}
              onSubmitForwardedMail={onSubmitForwardedMail}
            />
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};

export default MailDetailBody;

MailDetailBody.prototype = {
  selectedMail: PropTypes.object.isRequired,
};
