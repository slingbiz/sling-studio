import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import simpleListData from '../../../../@crema/services/db/extraPages/dndData/simpleListData';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import { withStyles } from "@material-ui/core";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
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

const getListStyle = (isDraggingOver, overflow) => ({
  // background: isDraggingOver ? 'lightblue' : 'grey',
  border: '5px solid pink',
  padding: grid,
  maxHeight: '50vh',
  overflow,
  width: 300,
  '@media (min-width: 600px)': {
    width: 300,
  },
});

class Simple extends Component {
  static propTypes = {
    overflow: PropTypes.string,
  };
  static defaultProps = {
    overflow: 'auto',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: simpleListData,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate core.
  // But in this example everything is just done in one place for simplicity
  render() {
    const {classes} = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='droppable'>
          {(droppableProvided, droppableSnapshot) => (
            <Box display='flex' flexDirection='column' alignItems='center'>
              <Box
                ref={droppableProvided.innerRef}
                style={getListStyle(
                  droppableSnapshot.isDraggingOver,
                  this.props.overflow,
                )}
                onScroll={
                  (e) => {}
                  // eslint-disable-next-line no-console
                }>
                {this.state.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.handle}
                    index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <Box
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}>
                        <Box px={2} mb={5} clone>
                          <ListItem className={classes.rootList}>
                            <Box
                              mr={3}
                              mt={0}
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
                {droppableProvided.placeholder}
              </Box>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default withStyles(styles)(Simple);
