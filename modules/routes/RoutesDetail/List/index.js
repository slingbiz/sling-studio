import React, {useEffect, useState} from 'react';
import {
  Divider,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import {makeStyles, IconButton} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {Edit, Close} from '@material-ui/icons';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppSearch from '../../../../@sling/core/SearchBar';
import DeleteModal from './DeleteModal';
import {useDispatch, useSelector} from 'react-redux';
import EditApiMappings from './EditApiMappings';
import NewRoute from './NewRoute';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getRoutesList} from '../../../../redux/actions';
import EditLayout from '../../../pagesModule/PagesDetail/Layout/EditLayout';

const ApiList = (props) => {
  const dispatch = useDispatch();
  const {routesList} = useSelector(({routeList}) => routeList);

  useEffect(() => {
    dispatch(getRoutesList());
  }, [dispatch]);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& .MuiPaper-elevation1': {
        boxShadow: 'none',
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    taskBtn: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
    },
    pointer: {
      cursor: 'pointer',
    },
    minWidth100: {
      minWidth: 100,
      width: '100%',
    },
    divider: {
      marginTop: 20,
      marginBottom: 20,
    },
    textArea: {
      width: '100%',
      marginBottom: 16,
    },

    accordion: {
      backgroundColor: '#f1f1f1',
      boxShadow: 'none',
    },
    button: {
      backgroundColor: orange[500],
      color: theme.palette.primary.contrastText,
      fontWeight: Fonts.BOLD,
      paddingRight: 20,
      marginRight: 20,
      paddingLeft: 20,
      '&:hover, &:focus': {
        backgroundColor: orange[700],
        color: theme.palette.primary.contrastText,
      },
    },
    basicFormTxt: {
      margin: 10,
    },
    apiCard: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      border: '1px solid #eae8e8',
      padding: 15,
      background: '#f1f1f1',
      borderRadius: 5,
    },
    apiCardImage: {
      height: '100%',
      padding: theme.spacing(2),
      // border: '1px solid',
      borderColor: orange[100],
      backgroundImage: `url(/images/widgets/api-img2.png)`,
      color: 'white',
      position: 'relative',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top',
    },
    actionsBox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    iconRoot: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles(props);
  const [openEditAPI, setOpenEditAPI] = useState(false);
  const [open, setOpen] = useState(false);
  const [mapperDialog, setMapperDialog] = useState(false);
  const [editRoute, setEditRoute] = useState();
  const [mapperDialogRoute, setMapperDialogRoute] = useState(false);

  const handleClose = () => {
    setOpenEditAPI(false);
  };

  const doAction = () => {
    setOpenEditAPI(true);
  };

  console.log('ROutes LIst ==> ', routesList);
  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Routes List
        </Box>
        <Box display='flex' alignItems='center'>
          <Button
            className={classes.button}
            aria-label='add'
            onClick={() => setMapperDialogRoute(true)}>
            Add New Route
          </Button>
          <AppSearch
            placeholder='Search here'
            onChange={(e) => e.target.value}
          />
        </Box>
      </AppsHeader>
      <NewRoute
        open={mapperDialogRoute}
        setOpen={setMapperDialogRoute}
        titleKey={'New Route'}
        pageKey={'new-route'}
      />
      <EditLayout
        setOpen={setOpen}
        open={open}
        titleKey={'Edit Layout'}
        pageKey={'listing'}
      />

      <Box px={6} pb={8}>
        <DeleteModal open={openEditAPI} handleClose={handleClose} />
        <EditApiMappings
          open={mapperDialog}
          setOpen={setMapperDialog}
          titleKey={'Edit Route'}
          pageKey={'routes-list'}
          apiObj={editRoute}
        />
        {routesList?.routes_list?.map((apiObj, index) => {
          return (
            <Box key={index} pt={6} className={classes.boxSection}>
              <Card className={classes.apiCard}>
                <Grid container>
                  <Grid item xs={2}>
                    <Box className={classes.apiCardImage}></Box>
                  </Grid>
                  <Grid item xs={7}>
                    <CardContent>
                      <Box fontWeight={Fonts.BOLD} component='h3' mb={2}>
                        {apiObj.id}
                      </Box>
                      <Box fontWeight={Fonts.MEDIUM} component='h5' mb={2}>
                        {apiObj.url_string}
                      </Box>
                      <Box fontWeight={Fonts.MEDIUM} component='h6' mb={2}>
                        {apiObj.version}
                      </Box>
                    </CardContent>
                  </Grid>
                  <Grid item xs={3}>
                    <Box
                      className={classes.actionsBox}
                      display='flex'
                      alignItems='center'>
                      <Box>
                        <label htmlFor='icon-button-file'>
                          <Tooltip title='Remove'>
                            <IconButton
                              className={classes.iconRoot}
                              aria-label='upload picture'
                              component='span'
                              onClick={doAction}>
                              <Close />
                            </IconButton>
                          </Tooltip>
                        </label>
                      </Box>
                      <Box>
                        <label htmlFor='icon-edit'>
                          <Tooltip title='Edit'>
                            <IconButton
                              className={classes.iconRoot}
                              aria-label='edit'
                              component='span'
                              onClick={() => {
                                setEditRoute(apiObj);
                                setMapperDialog(true);
                              }}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
                        </label>
                      </Box>
                      <Box>
                        <label htmlFor='icon-button-file'>
                          <Tooltip title='Map Sling Keys'>
                            <IconButton
                              className={classes.iconRoot}
                              aria-label=' picture'
                              component='span'
                              onClick={doAction}>
                              <AccountTreeIcon />
                            </IconButton>
                          </Tooltip>
                        </label>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion className={classes.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'>
                        <Typography className={classes.heading}>
                          More Info
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Typography>Keys : {apiObj?.keys}</Typography>
                        <Button
                          onClick={() => setOpen(true)}
                          variant='contained'
                          color='primary'>
                          Edit Layout
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          );
        })}

        <Divider className={classes.divider} />

        {/*<Button className={classes.button} onClick={() => {}}>*/}
        {/*  Save*/}
        {/*</Button>*/}
      </Box>
    </>
  );
};

export default ApiList;
