import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, Button, TextField} from '@material-ui/core';
import Select from 'react-select';
import {useDispatch, useSelector} from 'react-redux';
import {getPageTemplates} from '../../../../redux/actions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    marginTop: 10,
    marginBottom: 10,
  },
  paper: {
    width: '50%',
    minHeight: 200,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ddd',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    width: 120,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const RouteModal = ({setOpenModal, openModal, value, setValue, handleSave}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {pageTemplates} = useSelector(({pageTemplate}) => pageTemplate);
  const {page_templates} = pageTemplates;
  let options = [];
  useEffect(() => {
    dispatch(getPageTemplates());
  }, [dispatch]);

  function handleClose() {
    setOpenModal(false);
  }

  page_templates?.map((item, index) => {
    const object = {
      label: item.name,
      value: item.id,
    };
    options.push(object);
  });

  console.log(value);

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={openModal}>
          <div className={classes.paper}>
            <TextField
              id='search'
              className={classes.textField}
              label='Search url'
              variant='outlined'
            />
            <Select
              options={options}
              value={value}
              onChange={(selectedOption) => setValue(selectedOption)}
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.btn}
              onClick={handleSave}>
              Use This
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default RouteModal;
