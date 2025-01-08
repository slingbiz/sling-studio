import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import EditLayout from './EditLayout';
import LayoutView from './LayoutView';
import orange from '@material-ui/core/colors/orange';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Divider from '@material-ui/core/Divider';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Preview from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import {useSelector} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {getRoutesList} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import {generateSlug} from 'random-word-slugs';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import LinkIcon from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';
import { getCompanyInfo } from '../../../../redux/actions/AccountAction';

const Layout = (props) => {
  const dispatch = useDispatch();

  const {titleKey, pageKey} = props;
  const {routesList} = useSelector(({routeList}) => routeList);
  const {account} = useSelector(({account}) => account);
  const {user} = useSelector(({auth}) => auth);

  useEffect(() => {
    if (account == null || account == '') {
      dispatch(getCompanyInfo(user.email));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!routesList.length) {
      dispatch(getRoutesList({size: 100}));
    }
  }, [dispatch, routesList.length]);

  const [open, setOpen] = useState(false);
  const [previewAnchorEl, setPreviewAnchorEl] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (routesList?.length) {
      const {clientUrl} = account || {};
      const filteredUrls = routesList
        .filter(route => route.page_template === pageKey)
        .map(({sample_string: sampleString, url_string: urlString}) => {
          let url = sampleString || urlString;

          // Get random slug.
          const slug = generateSlug();
          url = url.replace(/\<.*?\>/g, slug);

          // Check if slash already exists
          const slash =
            url.startsWith('/') || clientUrl.endsWith('/') ? '' : '/';

          return `${clientUrl}` + slash + url;
        });
      setPreviewUrls(filteredUrls);
    }
  }, [routesList, pageKey, account]);

  const handlePreviewClick = (event) => {
    setPreviewAnchorEl(event.currentTarget);
  };

  const handlePreviewClose = () => {
    setPreviewAnchorEl(null);
  };

  const openPreviewUrl = (url) => {
    window.open(url, '_blank');
    handlePreviewClose();
  };

  const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.down('md')]: {
      wrapper: {
        flexDirection: 'column',
      },
      layoutBox: {
        width: '100%',
      },
    },
    menuPaper: {
      marginTop: 8,
      maxWidth: '500px',
      boxShadow: theme.shadows[3],
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        width: 'calc(100% - 32px)',
        margin: '8px 16px',
        position: 'fixed',
        left: 0,
        right: 0,
      },
    },
    menuList: {
      padding: theme.spacing(1, 0),
      [theme.breakpoints.down('sm')]: {
        maxHeight: '60vh',
        overflowY: 'auto',
      },
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 14,
      padding: theme.spacing(1.5, 2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        '& $openIcon': {
          opacity: 1,
          fontSize: 20,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        '& $openIcon': {
          opacity: 1,
        },
      },
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    linkIcon: {
      marginRight: theme.spacing(1.5),
      color: theme.palette.text.secondary,
      minWidth: 20,
    },
    openIcon: {
      marginLeft: 'auto',
      opacity: 0,
      transition: 'opacity 200ms',
      color: theme.palette.primary.main,
      fontSize: 18,
    },
    urlText: {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    [theme.breakpoints.up('md')]: {
      layoutBox: {
        width: '100%',
      },
    },
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    selectBox: {
      cursor: 'pointer',
      '& .MuiOutlinedInput-input': {
        paddingBottom: 10,
        paddingTop: 10,
      },
      '& .MuiSelect-select': {
        paddingLeft: 10,
      },
    },
    taskBtn: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
    },
    pointer: {
      cursor: 'pointer',
    },
    mr12: {
      marginRight: 12,
    },
    minWidth100: {
      minWidth: 100,
      width: '100%',
    },
    avtr50: {
      height: 50,
      width: 50,
    },
    datePicker: {
      marginTop: 0,
    },
    divider: {
      marginTop: 5,
      marginBottom: 5,
    },
    textArea: {
      width: '100%',
      marginBottom: 16,
    },
    option: {
      padding: 8,
      cursor: 'pointer',
    },
    button: {
      backgroundColor: orange[500],
      marginBottom: 20,
      color: theme.palette.primary.contrastText,
      fontWeight: Fonts.BOLD,
      paddingRight: 20,
      paddingLeft: 20,
      '&:hover, &:focus': {
        backgroundColor: orange[700],
        color: theme.palette.secondary.contrastText,
      },
    },
  }));

  const classes = useStyles(props);
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const {layoutConfig} = layoutData || {};

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Page Layout
        </Box>
        <Box>
          <Tooltip title="Preview URLs" placement="bottom">
            <IconButton onClick={handlePreviewClick}>
              <Preview />
            </IconButton>
          </Tooltip>
          <Tooltip title="Back" placement="bottom">
            <IconButton onClick={() => Router.back()}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={previewAnchorEl}
            keepMounted
            open={Boolean(previewAnchorEl)}
            onClose={handlePreviewClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                minWidth: '280px',
              },
            }}
            classes={{
              paper: classes.menuPaper,
              list: classes.menuList,
            }}>
            {previewUrls.length === 0 && (
              <MenuItem disabled className={classes.menuItem}>
                <LinkIcon className={classes.linkIcon} />
                <span className={classes.urlText}>No preview URLs available</span>
              </MenuItem>
            )}
            {previewUrls.map((url, index) => (
              <MenuItem 
                key={index} 
                onClick={() => openPreviewUrl(url)}
                className={classes.menuItem}
                title={url}
              >
                <LinkIcon className={classes.linkIcon} />
                <span className={classes.urlText}>{url}</span>
                <OpenInNewIcon className={classes.openIcon} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </AppsHeader>
      <Box
        px={6}
        py={6}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          'overflow-y': 'auto',
          height: '100%',
        }}
        className={classes.wrapper}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            'overflow-y': 'auto',
            height: '100%',
          }}
          className={classes.layoutBox}>
          <Fab
            onClick={() => setOpen(true)}
            color='secondary'
            style={{position: 'absolute', right: '0px'}}>
            <EditIcon style={{color: 'white'}} />
          </Fab>
          <LayoutView pageKey={pageKey} isEditable={false} />
          <Divider className={classes.divider} />
          <Box
            pt={4}
            pb={4}
            mb={6}
            style={{display: 'flex', justifyContent: 'flex-start'}}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setOpen(true)}
              className={classes.button}>
              Edit
            </Button>
            <EditLayout
              setOpen={setOpen}
              open={open}
              titleKey={titleKey}
              pageKey={pageKey}
            />
          </Box>
        </Box>
        {/*<Box*/}
        {/*  xs*/}
        {/*  style={{*/}
        {/*    width: '30%',*/}
        {/*    display: 'flex',*/}
        {/*    flexDirection: 'column',*/}
        {/*  }}*/}
        {/*  m={5}>*/}
        {/*  <ListItemText style={{flex: 0}}>Preview</ListItemText>*/}
        {/*  <Box*/}
        {/*    style={{*/}
        {/*      width: '100%',*/}
        {/*      height: '500px',*/}
        {/*      backgroundColor: 'lightgrey',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Box>*/}
      </Box>
    </>
  );
};

export default Layout;
