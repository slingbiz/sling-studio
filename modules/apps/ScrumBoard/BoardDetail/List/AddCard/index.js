import React, {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../../../../@crema';
import {
  onAddNewCard,
  onDeleteSelectedCard,
  onEditCardDetails,
} from '../../../../../../redux/actions/ScrumboardApp';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ConfirmationDialog from '../../../../../../@crema/core/ConfirmationDialog';
import {useAuthUser} from '../../../../../../@crema/utility/AppHooks';
import IntlMessages from '../../../../../../@crema/utility/IntlMessages';
import CardHeader from './CardHeader';
import PropTypes from 'prop-types';
import AddCardForm from './AddCardForm';
import {makeStyles} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  title: yup.string().required(<IntlMessages id='validation.titleRequired' />),
});

const AddCard = (props) => {
  const {isAddCardOpen, onCloseAddCard, board, list, selectedCard} = props;
  const dispatch = useDispatch();

  const user = useAuthUser();

  const [checkedList, setCheckedList] = useState(() =>
    selectedCard ? selectedCard.checkedList : [],
  );

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedMembers, setMembersList] = useState(() =>
    selectedCard ? selectedCard.members : [],
  );

  const [selectedLabels, setSelectedLabels] = useState(() =>
    selectedCard ? selectedCard.label : [],
  );

  const [comments, setComments] = useState(() =>
    selectedCard ? selectedCard.comments : [],
  );

  const [attachments, setAttachments] = useState(() =>
    selectedCard ? selectedCard.attachments : [],
  );

  const onAddAttachments = (files) => {
    setAttachments([...attachments, ...files]);
  };

  const onDeleteCard = () => {
    const boardId = board.id;
    const listId = list.id;
    const cardId = selectedCard.id;
    dispatch(onDeleteSelectedCard(boardId, listId, cardId));
    setDeleteDialogOpen(false);
    onCloseAddCard();
  };

  const onClickDeleteIcon = () => {
    if (selectedCard) {
      setDeleteDialogOpen(true);
    } else {
      onCloseAddCard();
    }
  };

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 900,
        width: '100%',
      },
    },
    scrollRoot: {
      height: 595,
    },
  }));

  const classes = useStyles(props);

  return (
    <Dialog
      open={isAddCardOpen}
      onClose={() => onCloseAddCard(false)}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}>
      <Scrollbar className={classes.scrollRoot}>
        <Formik
          validateOnChange={true}
          initialValues={{
            title: selectedCard ? selectedCard.title : '',
            desc: selectedCard && selectedCard.desc ? selectedCard.desc : '',
            label: selectedCard && selectedCard.label ? selectedCard.label : [],
            members:
              selectedCard && selectedCard.members ? selectedCard.members : [],
            date: selectedCard && selectedCard.date ? selectedCard.date : null,
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            if (selectedCard) {
              const editedCard = {
                ...selectedCard,
                comments: comments,
                ...data,
                attachments: attachments,
                members: selectedMembers,
                label: selectedLabels,
                checkedList: checkedList.filter((item) => item.title !== ''),
              };
              dispatch(onEditCardDetails(board, list, editedCard));
            } else {
              const newCard = {
                id: Math.floor(Math.random() * 1000),
                attachments: attachments,
                checkedList: [],
                comments: comments,
                ...data,
                label: selectedLabels,
                members: selectedMembers,
              };
              dispatch(onAddNewCard(board, list, newCard));
            }
            onCloseAddCard();
            resetForm();
            setSubmitting(false);
          }}>
          {({values, isSubmitting, setFieldValue}) => (
            <>
              <CardHeader
                onAddAttachments={onAddAttachments}
                onClickDeleteIcon={onClickDeleteIcon}
                onCloseAddCard={onCloseAddCard}
              />

              <AddCardForm
                values={values}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                board={board}
                list={list}
                checkedList={checkedList}
                onCloseAddCard={onCloseAddCard}
                setCheckedList={setCheckedList}
                comments={comments}
                setComments={setComments}
                authUser={user}
                attachments={attachments}
                setAttachments={setAttachments}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
                selectedMembers={selectedMembers}
                setMembersList={setMembersList}
                selectedCard={selectedCard}
              />
            </>
          )}
        </Formik>
      </Scrollbar>

      {isDeleteDialogOpen ? (
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={onDeleteCard}
          title={<IntlMessages id='scrumboard.deleteCard' />}
          dialogTitle={<IntlMessages id='common.deleteItem' />}
        />
      ) : null}
    </Dialog>
  );
};

export default AddCard;

AddCard.defaultProps = {
  board: null,
  list: null,
  selectedCard: null,
};

AddCard.prototype = {
  isAddCardOpen: PropTypes.bool.isRequired,
  onCloseAddCard: PropTypes.func.isRequired,
  board: PropTypes.object,
  list: PropTypes.object,
  selectedCard: PropTypes.object,
};
