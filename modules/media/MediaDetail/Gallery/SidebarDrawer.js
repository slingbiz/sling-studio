import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Box,
  IconButton,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from '@material-ui/core';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {Fonts} from '../../../../shared/constants/AppEnums';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import {useDispatch} from 'react-redux';
import {addImage} from '../../../../redux/actions';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 'auto',
    '& .MuiAccordion-rounded:last-child': {
      maxWidth: 450,
      width: '100%',
    },
  },
  input: {
    '& .MuiInputBase-input': {
      height: 10,
      fontSize: 14,
    },
    paddingTop: 10,
    paddingBottom: 10,
  },
  drawerContent: {
    padding: 10,
  },
  imgSize: {
    width: 320,
    height: 320,
    padding: 20,

    [theme.breakpoints.down('sm')]: {
      width: 220,
      height: 220,
      padding: 5,
    },
  },
  bottomContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    marginRight: 15,
    marginLeft: 'auto',
  },
}));
export const SidebarDrawer = ({toggleDrawer, details}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openAccordion, setOpenAccordion] = useState(true);
  const [imageDetail, setImageDetail] = useState(details);

  function handleChange() {
    setOpenAccordion(!openAccordion);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedData = {
      id: imageDetail?.id,
      update: {
        name: imageDetail?.name,
        key: imageDetail?.key,
        alt_text: imageDetail?.alt_text,
      },
    };

    dispatch(addImage(updatedData));
    toggleDrawer(false);
  }

  function handleDelete(event) {
    event.preventDefault();
    toggleDrawer(false);
  }

  return (
    <div className={classes.list} role='presentation'>
      <AppsHeader>
        <Box fontWeight={Fonts.EXTRA_BOLD}>{details?.title}</Box>
        <IconButton onClick={() => toggleDrawer(false)}>
          <ClearIcon />
        </IconButton>
      </AppsHeader>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          alignItems='center'
          direction='column'
          className={classes.drawerContent}>
          <Grid item xs={12}>
            <img src={details?.url} className={classes.imgSize} />
          </Grid>
          <Grid item xs={12} style={{padding: 10}}>
            <Accordion
              expanded={openAccordion}
              onChange={handleChange}
              style={{padding: 10}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'>
                <Box fontWeight={Fonts.BOLD}>Edit Details</Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3} alignItems='center'>
                  <Grid item xs={3}>
                    <Box fontWeight={Fonts.MEDIUM}>Name</Box>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      placeholder='Name'
                      value={imageDetail?.name}
                      onChange={(e) =>
                        setImageDetail({...imageDetail, name: e.target.value})
                      }
                      className={classes.input}
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box fontWeight={Fonts.MEDIUM}>Image Key</Box>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      placeholder='Image Key'
                      value={imageDetail?.key}
                      onChange={(e) =>
                        setImageDetail({...imageDetail, key: e.target.value})
                      }
                      className={classes.input}
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box fontWeight={Fonts.MEDIUM}>Alt Text</Box>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      placeholder='Alt Text'
                      value={imageDetail?.alt_text}
                      onChange={(e) =>
                        setImageDetail({
                          ...imageDetail,
                          alt_text: e.target.value,
                        })
                      }
                      className={classes.input}
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box fontWeight={Fonts.MEDIUM}>Updated</Box>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      placeholder='Uploaded'
                      value={imageDetail?.upload_date}
                      className={classes.input}
                      variant='outlined'
                      readOnly
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box fontWeight={Fonts.MEDIUM}>Size</Box>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      placeholder='Size'
                      value={imageDetail?.size}
                      readOnly
                      className={classes.input}
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12} style={{width: '100%'}}>
            <Box container className={classes.bottomContainer}>
              <Button
                type='button'
                variant='contained'
                color='primary'
                style={{margin: '0 10px'}}
                onClick={handleDelete}>
                Delete
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                style={{margin: '0 10px'}}>
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
