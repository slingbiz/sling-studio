import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {initialWidth} from './NewCellModal';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import blue from '@material-ui/core/colors/blue';
import clsx from 'clsx';
import green from '@material-ui/core/colors/green';

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
  active: {
    background: blue['300'],
    padding: 10,
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
  boxShadow: '8px 8px 6px #888888',

  // styles we need to apply on draggables
  ...draggableStyle,
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
    setIsActiveTab,
    isActiveTab,
    settingsObj,
    setSettingsObj
  } = props;
  console.log('droppable Id', keyV, section, rowNo, initItems);

  const [items, setItems] = useState(initItems);

  useEffect(() => {
    if (initItems) {
      setItems(initItems);
    }
  }, [initItems]);

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : '#f0f4f9',
    display: 'flex',
    padding: grid * 3,
    boxShadow: !recursion ? '8px 8px 6px #888888' : '2px 2px 1px #888888',
    overflow: 'auto',
    justifyContent: 'flex-start',
  });

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

  const deleteItem = (contents, index) => {
    const newState = [...items];
    newState.splice(index, 1);
    setItems(newState);
    console.log(
      initItems,
      '[initItems]',
      section,
      recursion,
      setOpenSnack,
      rowNo,
      setItemToParent,
      isDragDisabled,
      keyV,
      parentKey,
    );
    if (recursion) {
      setItemToParent(rowNo, parentKey, newState, section);
    } else {
      setItemToParent(rowNo, '', newState, section);
    }
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

  const getItemContents = (contents, parentKeyChild, index, item) => {
    if (contents?.rows?.length) {
      return contents?.rows?.map((row, k) => {
        return (
          <Box key={`itemContents-${k}`}>
            <DragMe
              recursion={true}
              section={section}
              setOpenSnack={setOpenSnack}
              keyV={parentKeyChild + '_body_' + k}
              rowNo={k}
              setIsActiveTab={setIsActiveTab}
              isActiveTab={isActiveTab}
              settingsObj={settingsObj}
              setSettingsObj={setSettingsObj}
              isDragDisabled={isDragDisabled}
              parentItems={
                row?.cells?.map((v, k) => {
                  const label = v.key ? `Item ${v.key}` : `Row ${k}`;
                  const id = v.key ? v.key : `Row-${k}`;
                  return {id, label, contents: v};
                }) || []
              }
              setItemToParent={setItemToParent}
              parentKey={parentKeyChild}
              typeLabel={'Body Blocks'}
            />
            <Box m={6} />
          </Box>
        );
      });
    } else {
      const boxId = `${section}-${rowNo}-${
        recursion ? parentKey : 'parent'
      }-${parentKeyChild}`;
      return (
        <Box
          className={clsx(
            classes.content,
            isActiveTab == boxId ? classes.active : '',
          )}
          id={boxId}
          onClick={() => {
            setIsActiveTab(boxId);
            setSettingsObj({
              ...item.contents,
              ...{section, rowNo,boxId, recursion, parentKey, parentKeyChild},
            });
          }}>
          <IconButton
            className={classes.replyBtn}
            aria-label='delete'
            onClick={() => {
              deleteItem(contents, index);
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
                            {getItemContents(
                              item.contents,
                              item.id,
                              index,
                              item,
                            )}
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
                        {getItemContents(item.contents, item.id, index, item)}
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
