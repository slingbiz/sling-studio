import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import simpleListData from '../../../../@crema/services/db/extraPages/dndData/simpleListData';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import { withStyles } from '@material-ui/core';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.compose, 1);

  destClone.splice(droppableDestination.compose, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const styles = (theme) => {
  return {
    rootList: {
      backgroundColor: theme.palette.background.paper,
    },
  };
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid,
  margin: `0 0 20px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#E0E0E0',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  border: '5px solid #E0E0E0',
  padding: grid,
  marginRight: 10,
  marginBottom: 20,
  width: 300,
  '@media (min-width: 600px)': {
    width: 300,
  },
});

class MultipleDrop extends Component {
  state = {
    items: simpleListData.slice(0, 10),
    selected: simpleListData.slice(5, 10),
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'items',
    droppable2: 'selected',
  };

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index,
      );

      let state = {items};

      if (source.droppableId === 'droppable2') {
        state = {selected: items};
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  // Normally you would want to split things out into separate core.
  // But in this example everything is just done in one place for simplicity
  render() {
    const {classes} = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Box
          display='flex'
          flexDirection={{xs: 'column', sm: 'row'}}
          justifyContent={{sm: 'center'}}
          alignItems='center'>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {this.state.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.handle}
                    index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <Box px={2} bgcolor={grey[300]} mb={5} clone>
                          <ListItem className={classes.rootList}>
                            <Box
                              mr={3}
                              mt={0}
                              ml={1.5}
                              display='flex'
                              justifyContent='center'
                              clone>
                              <ListItemAvatar>
                                <Avatar alt='Remy Sharp' src={item.image} />
                              </ListItemAvatar>
                            </Box>
                            <Box my={0} clone>
                              <ListItemText
                                primary={
                                  <Box
                                    component='span'
                                    fontWeight={Fonts.MEDIUM}>
                                    {item.name}
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
                                    @{item.handle}
                                  </Box>
                                }
                              />
                            </Box>
                          </ListItem>
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <Droppable droppableId='droppable2'>
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {this.state.selected.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}>
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
                                <Avatar alt='Remy Sharp' src={item.image} />
                              </ListItemAvatar>
                            </Box>
                            <Box my={0} clone>
                              <ListItemText
                                primary={
                                  <Box
                                    component='span'
                                    fontWeight={Fonts.LIGHT}>
                                    {item.name}
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
                                    @{item.handle}
                                  </Box>
                                }
                              />
                            </Box>
                          </ListItem>
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    );
  }
}

export default withStyles(styles)(MultipleDrop);
