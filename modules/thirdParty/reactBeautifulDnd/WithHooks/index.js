import React, {useState} from 'react';
import styled from '@emotion/styled';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import simpleListData from '../../../../@crema/services/db/extraPages/dndData/simpleListData';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core';

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        '& .css-1gwkzgr': {
          width: '100%',
        },
      },
    },
    rootList: {
      backgroundColor: theme.palette.background.paper,
    },
  };
});

const QuoteItem = styled.div`
  width: 170px;
  margin-bottom: 20px;
  background-color: #e0e0e0;
  padding: ${grid}px;
  @media (min-width: 600px) {
    width: 300px;
  }
`;

function Quote({quote, index}) {
  const classes = useStyles();
  return (
    <Draggable draggableId={quote.handle} index={index}>
      {(provided) => (
        <QuoteItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Box p={0} clone>
            <ListItem className={classes.rootList}>
              <Box
                mr={3}
                mt={0}
                ml={1.5}
                display='flex'
                justifyContent='center'
                clone>
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src={quote.image} />
                </ListItemAvatar>
              </Box>

              <Box my={0} clone>
                <ListItemText
                  primary={
                    <Box component='span' fontWeight={Fonts.MEDIUM}>
                      {quote.name}
                    </Box>
                  }
                  secondary={
                    <Box
                      component='span'
                      display='block'
                      color='text.secondary'
                      overflow='hidden'
                      textOverflow='ellipsis'
                      whiteSpace='nowrap'>
                      @{quote.handle}
                    </Box>
                  }
                />
              </Box>
            </ListItem>
          </Box>
        </QuoteItem>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({quotes}) {
  return quotes.map((quote, index) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
});

const WithHooks = () => {
  const [state, setState] = useState({quotes: simpleListData});
  const classes = useStyles();

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.compose === result.source.compose) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index,
    );

    setState({quotes});
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box width={1} display='flex' flexDirection='column' alignItems='center'>
        <Box
          className={classes.root}
          border={`solid 4px ${grey[300]}`}
          p={2}
          mb={3}>
          <Droppable droppableId='list'>
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                <QuoteList quotes={state.quotes} />
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </Box>
    </DragDropContext>
  );
};
export default WithHooks;
