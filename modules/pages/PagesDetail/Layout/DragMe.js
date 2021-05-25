import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import ListItemText from '@material-ui/core/ListItemText';

const grid = 8;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  width: '100%',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  color: 'white',
  fontWeight: 'bold',
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#1c55a0',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : '#b0c4df',
  display: 'flex',
  padding: grid * 3,
  overflow: 'auto',
  justifyContent: 'space-between',
});

const DragMe = (props) => {
  const {parentItems: initItems, setParentItems, typeLabel} = props;
  const [items, setItems] = useState(initItems);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const itemsN = reorder(
      [...items],
      result.source.index,
      result.destination.index,
    );
    setItems(itemsN);
    setParentItems(itemsN);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}>
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default DragMe;
