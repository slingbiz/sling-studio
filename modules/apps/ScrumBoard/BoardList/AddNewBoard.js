import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AddNewBoard = ({
  isAddBoardOpen,
  onCloseAddBoardModal,
  onAddBoard,
  selectedBoard,
  classes,
}) => {
  const [boardName, setBoardName] = useState(() =>
    selectedBoard ? selectedBoard.name : '',
  );

  const onClickAddButton = () => {
    if (boardName !== '') {
      onAddBoard(boardName);
      setBoardName('');
      onCloseAddBoardModal();
    }
  };

  return (
    <Dialog
      open={isAddBoardOpen}
      onClose={() => onCloseAddBoardModal(false)}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}>
      <Card className={classes.addBoardCard}>
        <TextField
          fullWidth
          margin='normal'
          label={<IntlMessages id='scrumboard.boardTitle' />}
          value={boardName}
          onChange={(event) => setBoardName(event.target.value)}
        />
        <Button className={classes.addButton} onClick={onClickAddButton}>
          <IntlMessages id='common.add' />
        </Button>
      </Card>
    </Dialog>
  );
};

export default AddNewBoard;

AddNewBoard.defaultProps = {
  selectedBoard: null,
};

AddNewBoard.prototype = {
  isAddBoardOpen: PropTypes.bool.isRequired,
  onCloseAddBoardModal: PropTypes.func.isRequired,
  onAddBoard: PropTypes.func,
  selectedBoard: PropTypes.node,
};
