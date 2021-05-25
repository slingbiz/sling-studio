import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import DragMe from './DragMe';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import EditLayout from './EditLayout';
import LayoutView from './LayoutView';

// fake data generator
const getItems = (count) =>
  Array.from({length: count}, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const Layout = (props) => {
  const {titleKey} = props;
  const [headerBlocks, setHeaderBlocks] = useState(getItems(3));
  const [bodyBlocks, setBodyBlocks] = useState(getItems(2));
  const [footerBlocks, setFooterBlocks] = useState(getItems(4));
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
        width: '60%',
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
      marginTop: 20,
      marginBottom: 20,
    },
    textArea: {
      width: '100%',
      marginBottom: 16,
    },
    option: {
      padding: 8,
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);
  const {messages} = useIntl();

  return (
    <Box
      px={6}
      py={6}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        'overflow-y': 'auto',
      }}
      className={classes.wrapper}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          'overflow-y': 'auto',
        }}
        className={classes.layoutBox}>
        <Fab style={{position: 'absolute', right: '0px'}}>
          <EditIcon />
        </Fab>
        <LayoutView
          headerBlocks={headerBlocks}
          bodyBlocks={bodyBlocks}
          footerBlocks={footerBlocks}
          setHeaderBlocks={setHeaderBlocks}
          setFooterBlocks={setFooterBlocks}
          setBodyBlocks={setBodyBlocks}
        />
        <Box p={6} mb={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpen(true)}
            className={classes.button}>
            Edit
          </Button>
          <EditLayout setOpen={setOpen} open={open} titleKey={titleKey} />
        </Box>
      </Box>
      <Box
        xs
        style={{
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
        }}
        m={5}>
        <ListItemText style={{flex: 0}}>Preview</ListItemText>
        <Box
          style={{
            width: '100%',
            height: '500px',
            backgroundColor: 'lightgrey',
          }}
        />
      </Box>
    </Box>
  );
};

export default Layout;
