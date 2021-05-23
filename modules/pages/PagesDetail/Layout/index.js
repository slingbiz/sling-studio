import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import {red} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import DragMe from './DragMe';

// fake data generator
const getItems = (count) =>
  Array.from({length: count}, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const Layout = (props) => {
  const [headerBlocks, setHeaderBlocks] = useState(getItems(3));
  const [bodyBlocks, setBodyBlocks] = useState(getItems(2));
  const [footerBlocks, setFooterBlocks] = useState(getItems(4));
  const useStyles = makeStyles((theme) => ({
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
    button: {
      backgroundColor: red[500],
      color: theme.palette.primary.contrastText,
      fontWeight: Fonts.LIGHT,
      paddingRight: 20,
      paddingLeft: 20,
      '&:hover, &:focus': {
        backgroundColor: red[700],
        color: theme.palette.secondary.contrastText,
      },
    },
  }));

  const classes = useStyles(props);

  const {messages} = useIntl();

  return (
    <Box
      px={6}
      py={8}
      style={{display: 'flex', justifyContent: 'space-evenly'}}>
      <Box
        m={5}
        style={{display: 'flex', flexDirection: 'column', width: '75%'}}>
        <Box style={{margin: '10px 0'}}>
          <DragMe
            parentItems={headerBlocks}
            setParentItems={setHeaderBlocks}
            typeLabel={'Header Blocks'}
          />
        </Box>
        <Box style={{margin: '10px 0'}}>
          <DragMe
            parentItems={bodyBlocks}
            setParentItems={setBodyBlocks}
            typeLabel={'Body Blocks'}
          />
        </Box>
        <Box style={{margin: '10px 0'}}>
          <DragMe
            parentItems={footerBlocks}
            setParentItems={setFooterBlocks}
            typeLabel={'Body Blocks'}
          />
        </Box>
      </Box>
      <Box
        style={{width: '30%', display: 'flex', justifyContent: 'center'}}
        m={5}>
        Preview
      </Box>
    </Box>
  );
};

export default Layout;
