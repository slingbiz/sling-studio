import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
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
  typography: {
    // marginBottom: 10,
  },
  paper: {
    width: '40%',
    minHeight: 220,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ddd',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingTop: 30,
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  btn: {
    width: 120,
    // marginTop: 25,
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
            <Typography
              variant='h6'
              component='h6'
              className={classes.typography}>
              Select a Page Template
            </Typography>
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