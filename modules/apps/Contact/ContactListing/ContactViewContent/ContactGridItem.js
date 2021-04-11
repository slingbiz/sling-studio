import React from 'react';
import {Card, makeStyles} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ItemMenu from './ItemMenu';
import {blue, grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  gridCard: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    padding: 16,
    [theme.breakpoints.up('xl')]: {
      padding: 20,
    },
  },
  checkboxRoot: {
    marginTop: -8,
    marginLeft: -8,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: blue[500],
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textBase: {
    fontSize: 16,
  },
}));

const ContactGridItem = (props) => {
  const {
    contact,
    onChangeCheckedContacts,
    checkedContacts,
    onChangeStarred,
    onSelectContactsForDelete,
    onOpenEditContact,
    onViewContactDetail,
  } = props;

  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.gridCard, 'card-hover')}
      onClick={() => onViewContactDetail(contact)}>
      <Box mb={2} display='flex' justifyContent='space-between'>
        <Box component='span' onClick={(event) => event.stopPropagation()}>
          <Checkbox
            checked={checkedContacts.includes(contact.id)}
            onChange={(event) => onChangeCheckedContacts(event, contact.id)}
            color='primary'
            className={classes.checkboxRoot}
          />
        </Box>

        {contact.image ? (
          <Avatar className={classes.avatar} src={contact.image} />
        ) : (
          <Avatar className={classes.avatar}>
            {contact.name[0].toUpperCase()}
          </Avatar>
        )}

        <Box component='span' onClick={(event) => event.stopPropagation()}>
          <ItemMenu
            onSelectContactsForDelete={onSelectContactsForDelete}
            contact={contact}
            onChangeStarred={onChangeStarred}
            onOpenEditContact={onOpenEditContact}
          />
        </Box>
      </Box>

      <Box mb={{xs: 3, lg: 4, xl: 5}} textAlign='center'>
        <Box fontWeight={Fonts.MEDIUM} fontSize={14}>
          {contact.name}
        </Box>
        <Box fontSize={14} className={classes.truncate}>
          {contact.email ? contact.email : null}
        </Box>
      </Box>

      <Box
        py={3}
        display='flex'
        flexDirection={{xs: 'column', xl: 'row'}}
        justifyContent={{xl: 'space-around'}}
        fontSize={14}
        borderTop={`2px solid ${grey[200]}`}>
        <Box
          px={3}
          py={2}
          width={{xl: 1 / 2}}
          display='flex'
          alignItems='center'
          justifyContent='center'>
          <BusinessIcon className={classes.textBase} />
          <Box ml={2} className={classes.truncate}>
            {contact.company ? (
              contact.company
            ) : (
              <IntlMessages id='common.na' />
            )}
          </Box>
        </Box>
        <Box
          px={3}
          py={2}
          width={{xl: 1 / 2}}
          display='flex'
          justifyContent='center'
          alignItems='center'
          borderTop={{xs: `1px solid ${grey[200]}`, xl: '0 none'}}
          borderLeft={{xl: `1px solid ${grey[200]}`}}>
          <PhoneIcon className={classes.textBase} />
          <Box ml={2} className={classes.truncate}>
            {contact.contact}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ContactGridItem;

ContactGridItem.defaultProps = {
  checkedContacts: [],
};

ContactGridItem.prototype = {
  contact: PropTypes.object.isRequired,
  onChangeCheckedContacts: PropTypes.func,
  checkedContacts: PropTypes.array,
  onChangeStarred: PropTypes.func,
  onSelectContactsForDelete: PropTypes.func,
  onOpenEditContact: PropTypes.func,
  onViewContactDetail: PropTypes.func,
};
