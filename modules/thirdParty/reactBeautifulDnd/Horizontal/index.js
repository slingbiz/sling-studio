import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import simpleListData from "../../../../@crema/services/db/extraPages/dndData/simpleListData";
import Box from "@material-ui/core/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
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
      backgroundColor: theme.palette.background.paper
    }
  };
};

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  border: "5px solid #E0E0E0",
  display: "flex",
  padding: grid,
  overflow: "auto"
});

class Horizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: simpleListData.slice(0, 6)
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
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate core.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { classes } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}>
              {this.state.items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.handle}
                  index={index}>
                  {(provided, snapshot) => (
                    <Box
                      mr={3}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <Box p={2} width='16rem' mr={2} clone>
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
                                <Box component='span' fontWeight={Fonts.MEDIUM}>
                                  {item.name}
                                </Box>
                              }
                              secondary={
                                <Box
                                  component='span'
                                  display='block'
                                  color='text.secondary'>
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
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default withStyles(styles)(Horizontal);
