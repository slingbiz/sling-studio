import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Tooltip,
} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {Link, Settings} from '@material-ui/icons';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DeleteModal from './DeleteModal';
import {useDispatch, useSelector} from 'react-redux';
import NewRoute from './NewRoute';
import {getRoutesList} from '../../../../redux/actions';
import EditLayout from '../../../pagesModule/PagesDetail/Layout/EditLayout';
import KeysArray from './KeysArray';
import PaginationControlled from '../../../../@sling/core/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import {FETCH_WARNING} from '../../../../shared/constants/ActionTypes';

const useStyles = makeStyles((theme) => ({
  input: {
    '& .MuiOutlinedInput-adornedEnd ': {
      paddingRight: 0,
    },
    '& .MuiInputBase-input': {
      height: 0,
      paddingRight: 0,
    },
  },
  root: {
    width: '100%',
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
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
    paddingRight: 10,
    marginRight: 20,
    paddingLeft: 10,
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
    borderColor: orange[100],
    backgroundImage: `url(/images/pageRoute.png)`,
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

const RoutesList = (props) => {
  const dispatch = useDispatch();
  const {routesList, totalCount} = useSelector(({routeList}) => routeList);

  const classes = useStyles(props);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [mapperDialog, setMapperDialog] = useState(false);
  const [editRoute, setEditRoute] = useState();
  const [selectedLayout, setSelectedLayout] = useState('');
  const [mapperDialogRoute, setMapperDialogRoute] = useState(false);
  const [filter, setFilter] = useState({page: 0, size: 8, query: ''});
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(getRoutesList(filter));
  }, [dispatch, filter]);

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const doAction = () => {
    setOpenDeleteModal(true);
  };

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
          <TextField
            id='filter-routes'
            placeholder='Search'
            variant='outlined'
            className={classes.input}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setQuery(event.target.value);
                setFilter({...filter, query: event.target.value});
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment style={{marginRight: 0, paddingRight: 0}}>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
        pageKey={selectedLayout}
      />

      <Box px={6} pb={8}>
        <DeleteModal open={openDeleteModal} handleClose={handleClose} />
        <NewRoute
          open={mapperDialog}
          setOpen={setMapperDialog}
          titleKey={'Edit Route'}
          pageKey={'routes-list'}
          routeObj={editRoute}
        />
        {routesList?.map((routeObj, index) => {
          return (
            <Box key={index} pt={6} className={classes.boxSection}>
              <Card className={classes.apiCard}>
                <Grid container>
                  <Grid item xs={1} style={{display: 'flex'}}>
                    <IconButton color='inherit' style={{width: '100%'}}>
                      <Link style={{width: '3rem', height: '3rem'}} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6}>
                    <CardContent>
                      <Box
                        fontWeight={Fonts.BOLD}
                        component='h3'
                        style={{textTransform: 'capitalize'}}
                        mb={2}>
                        {routeObj.title}
                      </Box>
                      <Grid
                        fontWeight={Fonts.MEDIUM}
                        container
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 5,
                        }}>
                        <Grid style={{color: 'grey'}} item sm={4}>
                          Route
                        </Grid>
                        <Grid item sm={8}>
                          <code style={{fontWeight: 'bold'}}>
                            {routeObj.url_string}
                          </code>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        fontWeight={Fonts.MEDIUM}
                        mb={4}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 5,
                        }}>
                        <Grid style={{color: 'grey'}} item sm={4}>
                          Sample URL
                        </Grid>
                        <Grid item sm={8}>
                          <code style={{fontWeight: 'bold'}}>
                            {routeObj.sample_string}
                          </code>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        fontWeight={Fonts.MEDIUM}
                        mb={2}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 5,
                        }}>
                        <Grid style={{color: 'grey'}} item sm={4}>
                          Page Template
                        </Grid>
                        <Grid item sm={8}>
                          <span style={{fontWeight: 'bold'}}>
                            {routeObj.page_template}
                          </span>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        fontWeight={Fonts.MEDIUM}
                        mb={2}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 5,
                        }}>
                        <Grid style={{color: 'grey'}} item sm={4}>
                          Dynamic Props
                        </Grid>
                        <Grid item sm={8}>
                          <KeysArray urlKeys={routeObj?.keys} />
                        </Grid>
                      </Grid>
                      <Box fontWeight={Fonts.MEDIUM} component='h6' mb={2}>
                        {routeObj.version}
                      </Box>
                    </CardContent>
                  </Grid>
                  <Grid item xs={5}>
                    <Box
                      className={classes.actionsBox}
                      display='flex'
                      alignItems='center'>
                      <Box>
                        <label htmlFor='icon-edit'>
                          <Tooltip title='Edit Layout'>
                            <IconButton
                              className={classes.iconRoot}
                              aria-label='Edit Layout'
                              component='span'
                              onClick={() => {
                                if (!routeObj.page_template) {
                                  dispatch({
                                    type: FETCH_WARNING,
                                    payload:
                                      'Please assign a Page Template to this Route.',
                                  });
                                  return;
                                }
                                setSelectedLayout(routeObj.page_template);
                                setOpen(true);
                              }}>
                              <Settings />
                            </IconButton>
                          </Tooltip>
                        </label>
                      </Box>
                      <Box>
                        <label htmlFor='icon-button-file'>
                          <Tooltip title='Map Sling Keys'>
                            <IconButton
                              className={classes.iconRoot}
                              aria-label='Map Sling Keys'
                              disabled={true}
                              component='span'
                              onClick={doAction}>
                              <AccountTreeIcon />
                            </IconButton>
                          </Tooltip>
                        </label>
                      </Box>
                      <Box>
                        <Button
                          onClick={() => {
                            setEditRoute(routeObj);
                            setMapperDialog(true);
                          }}
                          variant='contained'
                          color='primary'
                          style={{marginLeft: 15}}>
                          Edit Route
                        </Button>{' '}
                        <Button
                          onClick={doAction}
                          variant='contained'
                          color='primary'
                          style={{marginLeft: 15}}>
                          Delete Route
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  {/*<Grid item xs={12}>*/}
                  {/*  <Accordion className={classes.accordion}>*/}
                  {/*    <AccordionSummary*/}
                  {/*      expandIcon={<ExpandMoreIcon />}*/}
                  {/*      aria-controls='panel1a-content'*/}
                  {/*      id='panel1a-header'>*/}
                  {/*      <Typography className={classes.heading}>*/}
                  {/*        More Info*/}
                  {/*      </Typography>*/}
                  {/*    </AccordionSummary>*/}
                  {/*    <AccordionDetails></AccordionDetails>*/}
                  {/*  </Accordion>*/}
                  {/*</Grid>*/}
                </Grid>
              </Card>
            </Box>
          );
        })}

        {/*<Button className={classes.button} onClick={() => {}}>*/}
        {/*  Save*/}
        {/*</Button>*/}
      </Box>
      <Box style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
        <PaginationControlled
          handleChange={(event, page) => {
            setFilter({...filter, page: page - 1});
          }}
          count={Math.ceil(totalCount / filter.size)}
          page={filter.page + 1}
        />
        <Divider className={classes.divider} />
      </Box>
    </>
  );
};

export default RoutesList;
