import React from 'react';
import Box from '@material-ui/core/Box';
import DragMe from './DragMe';
import ListItemText from '@material-ui/core/ListItemText';

const LayoutView = ({
  headerBlocks,
  setHeaderBlocks,
  bodyBlocks,
  setBodyBlocks,
  footerBlocks,
  setFooterBlocks,
}) => {
  return (
    <>
      <Box p={6} mb={6} style={{backgroundColor: '#f0f4f9'}}>
        <ListItemText style={{marginTop: '0px'}}>{'Head Blocks'}</ListItemText>
        <DragMe
          parentItems={headerBlocks}
          setParentItems={setHeaderBlocks}
          typeLabel={'Header Blocks'}
        />
      </Box>
      <Box p={6} mb={6} style={{backgroundColor: '#f0f4f9'}}>
        <Box style={{display: 'flex', justifyContent: 'space-between'}}>
          <ListItemText style={{marginTop: '0px'}}>
            {'Body Blocks'}
          </ListItemText>
        </Box>
        <DragMe
          parentItems={bodyBlocks}
          setParentItems={setBodyBlocks}
          typeLabel={'Body Blocks'}
        />
        <Box m={6} />
        <DragMe
          parentItems={bodyBlocks}
          setParentItems={setBodyBlocks}
          typeLabel={'Body Blocks'}
        />
      </Box>
      <Box p={6} mb={6} style={{backgroundColor: '#f0f4f9'}}>
        <ListItemText style={{marginTop: '0px'}}>
          {'Footer Blocks'}
        </ListItemText>
        <DragMe
          parentItems={footerBlocks}
          setParentItems={setFooterBlocks}
          typeLabel={'Footer Blocks'}
        />
      </Box>{' '}
    </>
  );
};
export default LayoutView;
