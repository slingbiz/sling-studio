import React, {useState} from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';

const Layout = (props) => {
  const {titleKey, pageKey} = props;
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.down('md')]: {
      wrapper: {
        flexDirection: 'column',
      },
      layoutBox: {
        width: '100%',
      },
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
  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Page Layout
        </Box>
        <Box>
          <IconButton
            onClick={() => {
              Router.push('/pages');
            }}>
            <ArrowBackIcon />
          </IconButton>
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
            style={{position: 'absolute', right: '0px'}}>
            <EditIcon />
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
