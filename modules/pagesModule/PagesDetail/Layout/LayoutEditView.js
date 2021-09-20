import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Box from '@material-ui/core/Box';
import DragMe from './DragMeEdit';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from 'react-redux';
import {setLayoutConfig} from '../../../../redux/actions';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import NewCellModal from './NewCellModal';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Hidden from '@material-ui/core/Hidden';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

//Styles
const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down('md')]: {
    wrapper: {
      flexDirection: 'column',
    },
    layoutBox: {
      width: '100%',
    },
  },
  tinyBtn: {
    backgroundColor: '#f2f3f5',
    fontSize: '12px',
    width: '36px',
    height: '36px',
  },
  divDragWrap: {
    position: 'relative',
  },
  floatingRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 1,
  },
  boxSection: {
    backgroundColor: '#b0c4df',
    display: 'flex',
    flexDirection: 'column',
  },
  boxLayoutView: {padding: '1.5em'},
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
  },
  textTruncate: {
    padding: '10px 0',
  },
  componentBox: {
    height: '8em',
    width: '100%',
    // backgroundColor: 'lightgrey',
    border: '1px solid #d6d3d3',
    borderRadius: '4px',
    justifyContent: 'center',
    margin: '0.5em',
    flex: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

const LayoutView = forwardRef((props, ref) => {
  const {pageKey, getItems} = props;
  const [headerBlocks, setHeaderBlocks] = useState([]);
  const [bodyBlocks, setBodyBlocks] = useState([]);
  const [footerBlocks, setFooterBlocks] = useState([]);
  const [openNewCell, setNewCellModal] = useState(false);
  const [newCellSection, setNewCellSection] = useState('');
  const [newCellRowIndex, setNewCellRowIndex] = useState('');

  const sectionBlocksMap = {
    headerBlocks,
    setHeaderBlocks,
    bodyBlocks,
    setBodyBlocks,
    footerBlocks,
    setFooterBlocks,
  };

  const [root, setRoot] = useState([]);
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const {layoutConfig} = layoutData || {};
  const dispatch = useDispatch();

  //To call onSave from parent EditLayout
  useImperativeHandle(ref, () => ({
    saveLayoutConfig() {
      alert('Saving Root');
      console.log(root, 'root');
      dispatch(setLayoutConfig(pageKey, root));
    },
  }));

  //Update root on any change in head,body or footer.
  useEffect(() => {
    console.log('Calling Root save on body change', root);
    setRoot({
      ...root,
      header: headerBlocks,
      body: bodyBlocks,
      footer: footerBlocks,
    });
  }, [headerBlocks, bodyBlocks, footerBlocks]);

  //Update root and child elements
  useEffect(() => {
    if (layoutConfig) {
      const root = layoutConfig[pageKey].root;
      console.log(layoutConfig, 'layoutConfig@Layout', pageKey, root);
      setHeaderBlocks(root.header);
      setBodyBlocks(root.body);
      setFooterBlocks(root.footer);
      setRoot(root);
    }
  }, [layoutConfig]);

  //Save child wrapper with new re ordered layout.
  const setItemToParent = (rowKey, parentKey, items, section) => {
    const sectionBlocks = sectionBlocksMap[`${section}Blocks`];
    const sectionFn = section.charAt(0).toUpperCase() + section.slice(1);
    const setSectionBlocks = sectionBlocksMap[`set${sectionFn}Blocks`];

    sectionBlocks.rows.map((v, k) => {
      //If parentKey is empty, find and update the root body object.
      if (!parentKey) {
        //If row matches
        if (rowKey === k) {
          console.log(items, '@items@itemsitemsitemsitems');
          sectionBlocks.rows[k].cells = items.map((subObj) => {
            return subObj.contents;
          });
        }
      } else {
        //Loop across all cells in each row and find the matching key with parentKey
        sectionBlocks.rows[k].cells.map((c, j) => {
          if (c.key === parentKey) {
            //if matching parent key found, update the child document
            const cellInfo = sectionBlocks.rows[k].cells[j];
            cellInfo.rows[rowKey].cells = items.map((subObj) => {
              return subObj.contents;
            });
            sectionBlocks.rows[k].cells[j] = cellInfo;
          }
        });
      }
    });
    setSectionBlocks({...sectionBlocks});
  };

  const classes = useStyles(props);

  //Handle onClose of New Row popup
  const handleCloseNewCell = () => {
    setNewCellModal(false);
  };

  //Handle onSave of new Rule
  const handleSaveNewCell = (rowIndex, section, config) => {
    console.log(rowIndex, section, config, 'section-config');
    const sectionFn = section.charAt(0).toUpperCase() + section.slice(1);
    const setSectionBlocks = sectionBlocksMap[`set${sectionFn}Blocks`];
    const sectionBlocks = sectionBlocksMap[`${section}Blocks`];

    const cells = sectionBlocks.rows?.[rowIndex]?.cells || [];
    const cell = {
      key: config?.key || `${sectionFn}` + ((cells.length || 0) + 1),
      payload: {muiWidths: config},
    };
    cells.push(cell);
    sectionBlocks.rows[rowIndex].cells = cells;
    setSectionBlocks({...sectionBlocks});

    //Close Cell Modal
    setNewCellModal(false);
  };

  //Handle open Add new Cell
  const handleAddCell = (section, rowIndex) => {
    setNewCellSection(section);
    setNewCellRowIndex(rowIndex);
    setNewCellModal(true);
  };

  //Handle open Add new Row
  const handleAddNewRow = (section) => {
    const sectionFn = section.charAt(0).toUpperCase() + section.slice(1);
    const setSectionBlocks = sectionBlocksMap[`set${sectionFn}Blocks`];
    const sectionBlocks = sectionBlocksMap[`${section}Blocks`];
    sectionBlocks.rows.push({cells: []});
    console.log(setSectionBlocks, '@@@setSectionBlocks@@@handleNewRow');
    setSectionBlocks({...sectionBlocks});
  };

  const getNodeType = (dragId) => {
    let nodeType = 'footer';
    if (dragId.includes('head')) {
      nodeType = 'head';
    } else if (dragId.includes('body')) {
      nodeType = 'body';
    }
    let pos = dragId.split('_')?.[1];
    if (pos) {
      pos = pos.split('-')?.[0];
      pos = parseInt(pos);
    }
    return {nodeType, pos};
  };

  const onDragEnd = (result) => {
    const {source, destination} = result;
    // dropped outside the list
    if (!destination || destination.droppableId === 'droppable-widgets') {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;
    console.log(sInd, dInd, 'sInd-dInd');
    if (sInd === dInd) {
      const {nodeType, pos} = getNodeType(sInd);
      console.log({nodeType, pos});
      const sectionBlocks = sectionBlocksMap[`${nodeType}Blocks`];
      const sectionFn = nodeType.charAt(0).toUpperCase() + nodeType.slice(1);
      const setSectionBlocks = sectionBlocksMap[`set${sectionFn}Blocks`];
      console.log(sectionBlocks, ' sectionBlockssectionBlockssectionBlocks');
      sectionBlocks.rows.map((v, k) => {
        //If row matches
        if (pos === k) {
          console.log(
            sectionBlocks.rows[k].cells,
            '[   sectionBlocks.rows[k].cells]',
          );
          sectionBlocks.rows[k].cells = reorder(
            [...sectionBlocks.rows[k].cells],
            source.index,
            destination.index,
          );
        }
      });
      setSectionBlocks({...sectionBlocks});
    } else {
      alert('different box. Move wisely.');
      // const result = move(
      //   this.getList(source.droppableId),
      //   this.getList(destination.droppableId),
      //   source,
      //   destination,
      // );
      //
      // this.setState({
      //   items: result.droppable,
      //   selected: result.droppable2,
      // });
    }
  };

  return (
    <Grid container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid item lg={3}>
          <Hidden mdDown>
            <Card
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5em',
                marginTop: '1.5em',
              }}>
              <Box
                component='h4'
                className={classes.textTruncate}
                color='text.primary'
                alignSelf='flex-start'
                fontWeight={Fonts.BOLD}>
                {'Components'}
              </Box>
              <Paper className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder='Search Components'
                  inputProps={{'aria-label': 'search components'}}
                />
                <IconButton className={classes.iconButton} aria-label='search'>
                  <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation='vertical' />
              </Paper>
              <Divider style={{marginTop: 15, marginBottom: 15}} />
              <Box>
                <Droppable
                  droppableId='droppable-widgets'
                  isDropDisabled={true}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      style={{display: 'flex', flexWrap: 'wrap'}}>
                      {getItems(10, 0, classes).map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                            <div
                              className={classes.componentBox}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>
            </Card>
          </Hidden>
        </Grid>
        <Grid item sm={9} lg={6}>
          <Box className={classes.boxLayoutView}>
            <ListItemText style={{marginTop: '0px'}}>
              {'Head Blocks'}
            </ListItemText>
            <Box p={6} mb={6} className={classes.boxSection}>
              {headerBlocks.rows?.map((row, k) => {
                return (
                  <div key={'header-div' + k} className={classes.divDragWrap}>
                    <DragMe
                      keyV={'header_' + k}
                      section={'header'}
                      rowNo={k}
                      isDragDisabled={false}
                      parentItems={
                        row?.cells?.map((v, k) => {
                          const label = v.key ? `Item ${v.key}` : `Row ${k}`;
                          const id = v.key ? v.key : `Row-${k}`;
                          return {id, label, contents: v};
                        }) || []
                      }
                      setItemToParent={setItemToParent}
                      typeLabel={'Header Blocks'}
                    />
                    <Box m={6} />
                    <Fab
                      onClick={() => handleAddCell('header', k)}
                      className={clsx(classes.tinyBtn, classes.floatingRight)}>
                      <Add />
                    </Fab>
                  </div>
                );
              })}
              <Fab
                onClick={() => handleAddNewRow('header')}
                className={clsx(classes.tinyBtn)}>
                <Add />
              </Fab>
            </Box>
            <ListItemText style={{marginTop: '0px'}}>
              {'Body Blocks'}
            </ListItemText>
            <Box p={6} mb={6} className={classes.boxSection}>
              {bodyBlocks?.rows?.map((row, k) => {
                return (
                  <div key={'body-div' + k} className={classes.divDragWrap}>
                    <DragMe
                      section={'body'}
                      keyV={'body_' + k}
                      rowNo={k}
                      isDragDisabled={false}
                      parentItems={
                        row?.cells?.map((v, k) => {
                          const label = v.key ? `Item ${v.key}` : `Row ${k}`;
                          const id = v.key ? v.key : `Row-${k}`;
                          return {id, label, contents: v};
                        }) || []
                      }
                      setItemToParent={setItemToParent}
                      typeLabel={'Body Blocks'}
                    />
                    <Box m={6} />
                    <Fab
                      onClick={() => handleAddCell('body', k)}
                      className={clsx(classes.tinyBtn, classes.floatingRight)}>
                      <Add />
                    </Fab>
                  </div>
                );
              })}
              <Fab
                onClick={() => handleAddNewRow('body')}
                className={clsx(classes.tinyBtn)}>
                <Add />
              </Fab>
            </Box>
            <ListItemText style={{marginTop: '0px'}}>
              {'Footer Blocks'}
            </ListItemText>
            <Box p={6} mb={6} className={classes.boxSection}>
              {footerBlocks?.rows?.map((row, k) => {
                return (
                  <div key={'footer-div' + k} className={classes.divDragWrap}>
                    <DragMe
                      section={'footer'}
                      keyV={'footer_' + k}
                      rowNo={k}
                      isDragDisabled={false}
                      parentItems={
                        row?.cells?.map((v, k) => {
                          const label = v.key ? `Item ${v.key}` : `Row ${k}`;
                          const id = v.key ? v.key : `Row-${k}`;
                          return {id, label, contents: v};
                        }) || []
                      }
                      setItemToParent={setItemToParent}
                      typeLabel={'Footer Blocks'}
                    />
                    <Box m={6} />
                    <Fab
                      onClick={() => handleAddCell('footer', k)}
                      className={clsx(classes.tinyBtn, classes.floatingRight)}>
                      <Add />
                    </Fab>
                  </div>
                );
              })}
              <Fab
                onClick={() => handleAddNewRow('footer')}
                className={clsx(classes.tinyBtn)}>
                <Add />
              </Fab>
            </Box>
            <NewCellModal
              openNewRow={openNewCell}
              section={newCellSection}
              newCellRowIndex={newCellRowIndex}
              handleSaveNewCell={handleSaveNewCell}
              handleCloseNewCell={handleCloseNewCell}
            />
          </Box>
        </Grid>
      </DragDropContext>
    </Grid>
  );
});
export default LayoutView;
