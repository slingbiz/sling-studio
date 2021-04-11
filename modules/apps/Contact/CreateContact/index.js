import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onCreateContact,
  onUpdateSelectedContact,
} from '../../../../redux/actions/ContactApp';
import Slide from '@material-ui/core/Slide';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import AddContactForm from './AddContactForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.nameRequired' />),
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  contact: yup
    .string()
    .required(<IntlMessages id='validation.phoneNumberRequired' />),
});

const CreateContact = (props) => {
  const {
    isAddContact,
    handleAddContactClose,
    selectContact,
    onUpdateContact,
  } = props;
  const dispatch = useDispatch();

  const [userImage, setUserImage] = useState(
    selectContact && selectContact.image
      ? selectContact.image
      : '/assets/images/placeholder.jpg',
  );

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
  }));

  const classes = useStyles(props);

  return (
    <Dialog
      open={isAddContact}
      onClose={() => handleAddContactClose()}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}>
      <Scrollbar>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: selectContact ? selectContact.name : '',
            email: selectContact ? selectContact.email : '',
            contact: selectContact ? selectContact.contact : '',
            birthday:
              selectContact && selectContact.birthday
                ? selectContact.birthday
                : null,
            website:
              selectContact && selectContact.website
                ? selectContact.website
                : '',
            company:
              selectContact && selectContact.company
                ? selectContact.company
                : '',
            address:
              selectContact && selectContact.address
                ? selectContact.address
                : '',
            facebookId:
              selectContact && selectContact.facebookId
                ? selectContact.facebookId
                : '',
            twitterId:
              selectContact && selectContact.twitterId
                ? selectContact.twitterId
                : '',
            notes:
              selectContact && selectContact.notes ? selectContact.notes : '',
            label:
              selectContact && selectContact.label ? selectContact.label : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            if (selectContact) {
              const newContact = {
                id: selectContact.id,
                isStarred: selectContact.isStarred,
                isFrequent: selectContact.isFrequent,
                image: userImage,
                ...data,
              };
              dispatch(onUpdateSelectedContact(newContact));
              onUpdateContact(newContact);
            } else {
              const newContact = {
                id: Math.floor(Math.random() * 1000),
                isStarred: false,
                isFrequent: Math.random() > 0.5,
                image: userImage,
                ...data,
              };
              dispatch(onCreateContact(newContact));
            }
            handleAddContactClose();
            resetForm();
            setSubmitting(false);
          }}>
          {({values, setFieldValue}) => (
            <AddContactForm
              setUserImage={setUserImage}
              userImage={userImage}
              values={values}
              setFieldValue={setFieldValue}
              handleAddContactClose={handleAddContactClose}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default CreateContact;

CreateContact.defaultProps = {
  selectContact: null,
};

CreateContact.prototype = {
  isAddContact: PropTypes.bool.isRequired,
  handleAddContactClose: PropTypes.func.isRequired,
  selectContact: PropTypes.object,
  onUpdateContact: PropTypes.func,
};
