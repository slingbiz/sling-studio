import React, { useEffect, useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { Fonts } from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import { Delete, Devices, Edit, Link, RemoveRedEye, Settings } from '@material-ui/icons';
import DeleteModal from './DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import NewRoute from './NewRoute';
import { getRoutesList, deleteRoute } from '../../../../redux/actions';
import EditLayout from '../../../pagesModule/PagesDetail/Layout/EditLayout';
import KeysArray from './KeysArray';
import PaginationControlled from '../../../../@sling/core/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import { FETCH_WARNING } from '../../../../shared/constants/ActionTypes';
import PreviewModal from '../../../pagesModule/PagesDetail/Preview/Modal';
import { generateSlug } from 'random-word-slugs';
import { getCompanyInfo } from '../../../../redux/actions/AccountAction';

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
    background: '#ffffff',
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
  const { routesList, totalCount } = useSelector(({ routeList }) => routeList);

  const classes = useStyles(props);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [mapperDialog, setMapperDialog] = useState(false);
  const [editRoute, setEditRoute] = useState();
  const [selectedLayout, setSelectedLayout] = useState('');
  //For Preview URL
  const [previewMapperDialog, setPreviewMapperDialog] = useState(false);
  const [urlToPreview, setUrlToPreview] = useState('');

  const [mapperDialogRoute, setMapperDialogRoute] = useState(false);
  const [filter, setFilter] = useState({ page: 0, size: 8, query: '' });
  const [query, setQuery] = useState('');

  const { account } = useSelector(({ account }) => account);

  useEffect(() => {
    dispatch(getRoutesList(filter));
  }, [dispatch, filter]);

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const doAction = () => {
    setOpenDeleteModal(true);
  };

  const handleUpdate = () => {
    dispatch(deleteRoute(editRoute._id));
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    if (account == null || account == '') {
      dispatch(getCompanyInfo(user.email));
    }
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteRoute(editRoute._id));
    setOpenDeleteModal(false);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} sx={{ display: { xs: 'none', lg: 'block' } }} component='h3' >
          Routes List
        </Box>
        <Box display='flex' alignItems='center' >
          <Button
            className={classes.button}
            aria-label='add'
            onClick={() => setMapperDialogRoute(true)}>
            {matches ? 'Add New Route' : 'Add'}
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
                setFilter({ ...filter, query: event.target.value });
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment style={{ marginRight: 0, paddingRight: 0 }}>
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
      <PreviewModal
        open={previewMapperDialog}
        setOpen={setPreviewMapperDialog}
        urlToPreview={urlToPreview}
      />

      <Box px={6} pb={8} style={{ padding: 0 }}>
        <DeleteModal
          open={openDeleteModal}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
        <NewRoute
          open={mapperDialog}
          setOpen={setMapperDialog}
          titleKey={'Edit Route'}
          pageKey={'routes-list'}
          routeObj={editRoute}
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='routes table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Route</TableCell>
                <TableCell>Sample URL</TableCell>
                <TableCell>Page Template</TableCell>
                <TableCell>Dynamic Props</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routesList?.map((routeObj, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component='th' scope='row'>
                    {routeObj.title}
                  </TableCell>
                  <TableCell>
                    <code style={{ fontWeight: 'bold' }}>{routeObj.url_string}</code>
                  </TableCell>
                  <TableCell>
                    <code style={{ fontWeight: 'bold' }}>{routeObj.sample_string}</code>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontWeight: 'bold' }}>{routeObj.page_template}</span>
                  </TableCell>
                  <TableCell>
                    <KeysArray urlKeys={routeObj?.keys} />
                  </TableCell>
                  <TableCell>
                    <Box fontWeight={Fonts.MEDIUM} component='h6' mb={2}>
                      {routeObj.version}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className={classes.actionsBox} display='flex' alignItems='center'>
                      <Tooltip title='Edit Page Layout'>
                        <IconButton
                          className={classes.iconRoot}
                          aria-label='Edit Page Layout'
                          component='span'
                          onClick={() => {
                            if (!routeObj.page_template) {
                              dispatch({
                                type: FETCH_WARNING,
                                payload: 'Please assign a Page Template to this Route.',
                              });
                              return;
                            }
                            setSelectedLayout(routeObj.page_template);
                            setOpen(true);
                          }}>
                          <Settings />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Preview Page'>
                        <IconButton
                          className={classes.iconRoot}
                          aria-label='Preview Page'
                          component='span'
                          onClick={() => {
                            setPreviewMapperDialog(true);
                            const { clientUrl } = account || {};
                            const { sample_string: sampleString, url_string: urlString } = routeObj;
                            let url = sampleString || urlString;

                            // Get random slug.
                            const slug = generateSlug();
                            url = url.replace(/\<.*?\>/g, slug);

                            // Check if slash already exists
                            const slash =
                              url.startsWith('/') || clientUrl.endsWith('/') ? '' : '/';

                            setUrlToPreview(`${clientUrl}` + slash + url);
                          }}>
                          <RemoveRedEye />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Edit Page Route'>
                        <IconButton
                          className={classes.iconRoot}
                          aria-label='Edit Page Route'
                          component='span'
                          onClick={() => {
                            setEditRoute(routeObj);
                            setMapperDialog(true);
                          }}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Delete Page Route'>
                        <IconButton
                          className={classes.iconRoot}
                          aria-label='Delete Page Route'
                          component='span'
                          onClick={() => {
                            setEditRoute(routeObj);
                            doAction();
                          }}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <PaginationControlled
            handleChange={(event, page) => {
              setFilter({ ...filter, page: page - 1 });
            }}
            count={Math.ceil(totalCount / filter.size)}
            page={filter.page + 1}
          />
          <Divider className={classes.divider} />
        </Box>
      </Box>
    </>
  );
};

export default RoutesList;
