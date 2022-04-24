import React, {useEffect, useState} from 'react';
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
import {fetchLayoutConfig, getPageTemplates} from '../../../../redux/actions';
import {capital} from '../../../../@sling/utility/Utils';
import Box from '@material-ui/core/Box';

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
    fontSize: 18,
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

const getObj = (str) => {
  console.log('str@getObj', str, str?.length);
  if (!str?.length) {
    return {};
  }
  console.log('returning...');
  return {
    label: capital(str.split('_').join(' ')),
    value: str,
  };
};

const AssignPageTemplate = ({
  setOpenModal,
  openModal,
  value,
  setValue,
  error,
  setError,
  handleSave,
}) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const {pageTemplates} = useSelector(({pageTemplate}) => pageTemplate);
  const dispatch = useDispatch();
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);

  const [pageTemplate, setPageTemplate] = useState(getObj(value));
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!layoutData) {
      dispatch(fetchLayoutConfig());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('Changing value ', pageTemplate.value);
    setValue(pageTemplate.value);
  }, [JSON.stringify(pageTemplate)]);

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!layoutData) {
      return;
    }
    let optionsTmp = [];
    const {layoutConfig} = layoutData;
    const pageTemplates = Object.keys(layoutConfig || {});

    pageTemplates?.map((item, index) => {
      const object = getObj(item);
      optionsTmp.push(object);
    });
    setOptions(optionsTmp);
    if (!optionsTmp.length) {
      setError(
        'No Templates available. Please Go to Page Templates to create a new tempalte.',
      );
    }
  }, [layoutData]);

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
              Assign Page Template
            </Typography>
            <Select
              options={options}
              value={pageTemplate}
              onChange={(selectedOption) => setPageTemplate(selectedOption)}
            />
            <Box style={{color: '#d75f5f'}}>{error}</Box>
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

export default AssignPageTemplate;
