import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {initialWidth} from './NewCellModal';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import blue from '@material-ui/core/colors/blue';

const grid = 8;

const useStyles = makeStyles((theme) => ({
  content: {
    position: 'relative',
    '&:hover $replyBtn': {
      visibility: 'visible',
    },
  },
  replyBtn: {
    position: 'absolute',
    color: blue['50'],
    top: -7,
    right: -15,
    visibility: 'hidden',
  },
}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  console.log(list, startIndex, endIndex, '@reorder params');
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle, item) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  width: '100%',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  color: 'white',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontWeight: 'bold',
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#1c55a0',
  // background: isDragging ? 'lightgreen' : '#b0c4df',
  borderRadius: '3px',
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : '#f0f4f9',
  display: 'flex',
  padding: grid * 3,
  overflow: 'auto',
  justifyContent: 'flex-start',
});

const DragMe = (props) => {
  const classes = useStyles(props);

  const {
    section,
    recursion,
    setOpenSnack,
    parentItems: initItems,
    rowNo,
    setItemToParent,
    isDragDisabled,
    keyV,
    parentKey,
  } = props;
  console.log('droppable Id', keyV, section, rowNo, initItems);

  const [items, setItems] = useState(initItems);

  useEffect(() => {
    if (initItems) {
      setItems(initItems);
    }
  }, [initItems]);

  const onDragEnd = (result) => {
    console.log(result, 'onDragEnd @dragme, ', keyV);
    if (!result.destination) {
      return;
    }

    const itemsN = reorder(
      [...items],
      result.source.index,
      result.destination.index,
    );

    setItems(itemsN);
    console.log(itemsN, '@itemsN@DragMe.js');
    setItemToParent(rowNo, parentKey, itemsN, section);
  };

  const deleteItem = (contents, parentKey, index) => {
    const newState = [...items];
    newState.splice(index, 1);
    setItems(newState);
    setItemToParent(rowNo, parentKey, newState, section);
    // setOpenSnack(true);
    // console.log(
    //   contents,
    //   parentKey,
    //   index,
    //   rowNo,
    //   keyV,
    //   parentKey,
    //   '[contents, parentKey, index, rowNo, keyV, parentKey]',
    // );
  };

  const getItemContents = (contents, parentKey, index) => {
    if (contents?.rows?.length) {
      return contents?.rows?.map((row, k) => {
        return (
          <Box key={`itemContents-${k}`}>
            <DragMe
              recursion={true}
              section={section}
              setOpenSnack={setOpenSnack}
              keyV={parentKey + '_body_' + k}
              rowNo={k}
              isDragDisabled={isDragDisabled}
              parentItems={
                row?.cells?.map((v, k) => {
                  const label = v.key ? `Item ${v.key}` : `Row ${k}`;
                  const id = v.key ? v.key : `Row-${k}`;
                  return {id, label, contents: v};
                }) || []
              }
              setItemToParent={setItemToParent}
              parentKey={parentKey}
              typeLabel={'Body Blocks'}
            />
            <Box m={6} />
          </Box>
        );
      });
    } else {
      return (
        <Box className={classes.content}>
          <IconButton
            className={classes.replyBtn}
            aria-label='delete'
            onClick={() => {
              deleteItem(contents, parentKey, index);
            }}
            size='small'>
            <DeleteIcon />
          </IconButton>
          <span>{contents.key}</span>{' '}
        </Box>
      );
    }
  };

  if (recursion) {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`${keyV}-droppable`} direction='horizontal'>
            {(provided, snapshot) => (
              <Grid
                container
                spacing={3}
                alignItems='flex-start'
                direction='row'
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}>
                {items.map((item, index) => {
                  // console.log(item, '@@item?.payload?.muiWidths |@@@');
                  const {sm, md, lg} =
                    item?.contents?.payload?.muiWidths || initialWidth;
                  return (
                    <Grid
                      key={`${item.id}-grid-item`}
                      item
                      sm={sm}
                      md={md}
                      lg={lg}>
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        isDragDisabled={isDragDisabled}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item,
                            )}>
                            {getItemContents(item.contents, item.id, index)}
                          </div>
                        )}
                      </Draggable>
                    </Grid>
                  );
                })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
  return (
    <>
      <Droppable droppableId={`${keyV}-droppable`} direction='horizontal'>
        {(provided, snapshot) => (
          <Grid
            container
            spacing={3}
            alignItems='flex-start'
            direction='row'
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}>
            {items.map((item, index) => {
              // console.log(item, '@@item?.payload?.muiWidths |@@@');
              const {sm, md, lg} =
                item?.contents?.payload?.muiWidths || initialWidth;
              return (
                <Grid key={`${item.id}-grid-item`} item sm={sm} md={md} lg={lg}>
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={isDragDisabled}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          item,
                        )}>
                        {getItemContents(item.contents, item.id, index)}
                      </div>
                    )}
                  </Draggable>
                </Grid>
              );
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </>
  );
};

export default DragMe;
