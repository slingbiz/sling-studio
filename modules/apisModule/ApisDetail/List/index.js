import React, {useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {makeStyles, IconButton} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Card from '@material-ui/core/Card';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import CardContent from '@material-ui/core/CardContent';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Close from '@material-ui/icons/Close';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppSearch from '../../../../@sling/core/SearchBar';
import Tooltip from '@material-ui/core/Tooltip';
import AlertModal from '../../../../shared/components/Sling/AlertModal';
import {useDispatch, useSelector} from 'react-redux';
import EditApiMappings from './EditApiMappings';
import NewAPI from './NewAPI';
import {getApiList} from '../../../../redux/actions';

const ApiList = (props) => {
  const dispatch = useDispatch();
  const {apiList} = useSelector(({apiList}) => apiList);

  useEffect(() => {
    dispatch(getApiList());
  }, [dispatch]);

  const useStyles = makeStyles((theme) => ({
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
      padding: '15px',
      background: '#f1f1f1',
      borderRadius: '5px',
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
  const [openNewAPI, setOpenNewAPI] = useState(false);
  const [mapperDialog, setMapperDialog] = useState(false);
  const [mapperDialogNewAPI, setMapperDialogNewAPI] = useState(false);

  const handleClose = () => {
    setOpenEditAPI(false);
  };

  const doAction = () => {
    setOpenEditAPI(true);
  };

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Headless Api List
        </Box>
        <Box display='flex' alignItems='center'>
          {/*<IconButton*/}
          {/*  className={classes.iconRoot}*/}
          {/*  aria-label='add'*/}
          {/*  component='span'*/}
          {/*  onClick={() => {*/}
          {/*    setMapperDialogNewAPI(true);*/}
          {/*  }}>*/}
          {/*  <AddCircleOutlineIcon />*/}
          {/*</IconButton>*/}
          <Button
            className={classes.button}
            aria-label='add'
            onClick={() => setMapperDialogNewAPI(true)}>
            Add Api
          </Button>
          <AppSearch
            placeholder='Search here'
            onChange={(e) => e.target.value}
          />
        </Box>
      </AppsHeader>
      <NewAPI
        open={mapperDialogNewAPI}
        setOpen={setMapperDialogNewAPI}
        titleKey={'New API'}
        pageKey={'sling-mappings'}
      />

      <Box px={6} pb={8}>
        <AlertModal open={openEditAPI} handleClose={handleClose} />
        <EditApiMappings
          open={mapperDialog}
          setOpen={setMapperDialog}
          titleKey={'Map Sling Keys'}
          pageKey={'sling-mappings'}
        />
        {apiList?.map((apiObj) => {
          return (
            <Box key={apiObj.key} pt={6} className={classes.boxSection}>
              <Card className={classes.apiCard}>
                <Grid container>
                  <Grid item xs={2}>
                    <Box className={classes.apiCardImage}></Box>
                  </Grid>
                  <Grid item xs={7}>
                    <CardContent>
                      <Box fontWeight={Fonts.BOLD} component='h3' mb={2}>
                        {apiObj.title}
                      </Box>
                      <Box fontWeight={Fonts.MEDIUM} component='h5' mb={2}>
                        {apiObj.description}
                      </Box>
                    </CardContent>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    alignItems={'center'}
                    justifyContent={'center'}>
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
                                // setMapperDialog(true);
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
