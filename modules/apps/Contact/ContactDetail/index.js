import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onUpdateSelectedContact} from '../../../../redux/actions/ContactApp';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import {Scrollbar} from '../../../../@crema';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ContactActions from './ContactActions';
import PersonalDetails from './PersonalDetails';
import OtherDetails from './OtherDetails';
import SocialMedia from './SocialMedia';
import Notes from './Notes';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ContactDetail = (props) => {
  const {
    isShowDetail,
    selectedContact,
    onShowDetail,
    onSelectContactsForDelete,
    onOpenEditContact,
  } = props;
  const dispatch = useDispatch();

  const [contact, setContact] = useState(selectedContact);

  useEffect(() => {
    setContact(selectedContact);
  }, [selectedContact]);

  const onChangeStarred = (checked) => {
    const updatedContact = contact;
    contact.isStarred = checked;
    setContact(updatedContact);
    dispatch(onUpdateSelectedContact(contact));
  };

  const onDeleteContact = () => {
    onSelectContactsForDelete([contact.id]);
    onShowDetail(false);
  };

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 600,
        width: '100%',
      },
      '& .MuiTypography-h6': {
        fontWeight: Fonts.LIGHT,
      },
    },
    pointer: {
      cursor: 'pointer',
    },
    avatar: {
      width: 55,
      height: 55,
      marginBottom: 8,
    },
    borderBottomClass: {
      borderBottom: `1px solid ${grey[300]}`,
    },
  }));

  const classes = useStyles(props);
  return (
    <>
      <Dialog
        open={isShowDetail}
        onClose={() => onShowDetail(false)}
        TransitionComponent={Transition}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}>
        <Scrollbar>
          <Box p={5} className={classes.borderBottomClass}>
            <ContactActions
              onChangeStarred={onChangeStarred}
              onDeleteContact={onDeleteContact}
              onOpenEditContact={onOpenEditContact}
              contact={contact}
            />
            <Box
              mt={{sm: -3}}
              display='flex'
              flexDirection='column'
              alignItems='center'>
              {contact.image ? (
                <Avatar className={classes.avatar} src={contact.image} />
              ) : (
                <Avatar className={classes.avatar}>
                  {contact.name[0].toUpperCase()}
                </Avatar>
              )}
              <Box component='h4' fontWeight={Fonts.MEDIUM}>
                {contact.name}
              </Box>
            </Box>
          </Box>

          <Box py={5} pl={{xs: 8, lg: 8, lx: 10}}>
            <Scrollbar style={{maxHeight: 400}}>
              <PersonalDetails contact={contact} />

              <OtherDetails contact={contact} />

              <SocialMedia contact={contact} />

              <Notes contact={contact} />
            </Scrollbar>
          </Box>
        </Scrollbar>
      </Dialog>
    </>
  );
};

export default ContactDetail;

ContactDetail.prototype = {
  isShowDetail: PropTypes.bool.isRequired,
  onShowDetail: PropTypes.func.isRequired,
  selectedContact: PropTypes.node.isRequired,
  onSelectContactsForDelete: PropTypes.func,
  onOpenEditContact: PropTypes.func,
};
