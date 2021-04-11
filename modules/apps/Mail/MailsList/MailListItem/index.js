import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import {Checkbox, makeStyles} from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import moment from 'moment';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import AppsStarredIcon from '../../../../../@crema/core/AppsStarredIcon';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: (props) => (!props.mail.isRead ? Fonts.MEDIUM : Fonts.REGULAR),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottom: '1px solid',
    borderColor: 'white !important',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    [theme.breakpoints.up('xl')]: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  crMailTitle: {
    fontWeight: Fonts.MEDIUM,
    [theme.breakpoints.up('sm')]: {
      width: '120px',
    },
  },
  crMailInfo: {
    width: '100%',
    padding: '5px 0 8px 15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 256px)',
      padding: 0,
      paddingLeft: 16,
    },
  },
  crMailTime: {
    width: '100px',
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  appsStarredRoot: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  fontBold: {
    fontWeight: Fonts.MEDIUM,
  },
  whitespacePre: {
    whiteSpace: 'pre',
  },
}));

const MailListItem = (props) => {
  const {
    mail,
    checkedMails,
    onChangeCheckedMails,
    onChangeStarred,
    onViewMailDetail,
  } = props;

  const onGetMailDate = (date) => {
    if (
      moment(date, 'ddd, MMM DD, YYYY').format() ===
      moment('ddd, MMM DD, YYYY').format()
    ) {
      return moment(date).format('LT');
    } else {
      return date.split(',')[1];
    }
  };

  const classes = useStyles({mail});

  return (
    <ListItem
      dense
      button
      key={mail.id}
      className={clsx(classes.root, 'item-hover')}
      onClick={() => onViewMailDetail(mail)}>
      <Box display='flex' alignItems='center' width={{xs: '100%', sm: 'auto'}}>
        <Box
          component='span'
          pr={2}
          display='inline-block'
          onClick={(event) => event.stopPropagation()}>
          <Checkbox
            checked={checkedMails.includes(mail.id)}
            onChange={(event) => onChangeCheckedMails(event, mail.id)}
            color='primary'
          />
        </Box>
        <Box
          pr={{xs: 2, sm: 4}}
          component='span'
          className={classes.appsStarredRoot}
          onClick={(event) => event.stopPropagation()}>
          <AppsStarredIcon item={mail} onChange={onChangeStarred} />
        </Box>
        <Typography
          className={clsx(
            classes.crMailTitle,
            classes.truncate,
            !mail.isRead ? classes.fontBold : '',
          )}>
          {mail.isReplied ? `${mail.sentBy}, me(2)` : mail.sentBy}
        </Typography>
        {mail.label ? (
          <Box ml='auto' pl={4} component='span'>
            <Tooltip title={mail.label.name} placement='top'>
              <Box
                height={12}
                width={12}
                component='span'
                borderRadius='50%'
                display='block'
                bgcolor={`${mail.label.color}`}
              />
            </Tooltip>
          </Box>
        ) : null}
      </Box>

      <Box className={classes.crMailInfo}>
        <Box
          mb={0}
          component='p'
          width={1}
          className={clsx(
            classes.truncate,
            !mail.isRead ? classes.fontBold : '',
          )}>
          {mail.subject}
        </Box>

        <Box component='span' pl={2} className={classes.crMailTime}>
          <Box component='span'>
            {mail.isAttachment ? <AttachFileIcon /> : null}
          </Box>
          <Box component='span' className={classes.whitespacePre} pl={2}>
            {onGetMailDate(mail.sentOn)}
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};

export default MailListItem;

MailListItem.defaultProps = {
  labelList: [],
  checkedMails: [],
};

MailListItem.prototype = {
  mail: PropTypes.object.isRequired,
  labelList: PropTypes.array,
  checkedMails: PropTypes.array,
  onChangeCheckedMails: PropTypes.func,
  onChangeStarred: PropTypes.func,
  onViewMailDetail: PropTypes.func,
};
