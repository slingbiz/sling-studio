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
import {fetchLayoutConfig, setLayoutConfig} from '../../../../redux/actions';
import Add from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
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
import LayoutSettings from './LayoutSettings';
import {FETCH_SUCCESS, FETCH_WARNING} from '../../../../shared/constants/ActionTypes';
import WidgetLibraryPreview, {
  LivePreviewGate,
  LAYOUT_WELL,
  SLING_CREAM,
  SLING_ORANGE,
} from './WidgetLibraryPreview';
import {normalizeLayoutRoot} from '../../../createPage/sectionContract';

const _ = require('lodash');

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
  divDragWrap: {
    position: 'relative',
  },
  floatingButtons: {
    position: 'absolute',
    right: 4,
    top: 4,
    opacity: 1,
    visibility: 'visible',
    zIndex: 2,
  },
  tinyBtn: {
    backgroundColor: SLING_CREAM,
    color: '#163a5f',
    fontSize: '14px',
    width: '36px',
    border: '1px solid #d5dde6',
    height: '36px',
    margin: '0 2px',
    boxShadow: 'none',
  },
  floatingRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 1,
  },
  boxSection: {
    backgroundColor: LAYOUT_WELL,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 600,
    color: '#163a5f',
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
    backgroundColor: SLING_CREAM,
    boxShadow: 'none',
    border: '1px solid #e6e6e6',
    borderRadius: 8,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
  },
  iconButton: {
    padding: 10,
    color: SLING_ORANGE,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
  },
  textTruncate: {
    padding: '10px 0',
  },
  widgetLabel: {
    padding: '8px 4px 0',
    fontSize: 16,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 600,
    color: '#163a5f',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  componentBox: {
    minHeight: '8em',
    width: '100%',
    padding: 10,
    boxShadow: '0 1px 3px rgba(22,58,95,0.12), 0 1px 2px rgba(22,58,95,0.08)',
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'flex-start',
    margin: '0.5em',
    flex: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'grab',
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

// eslint-disable-next-line react/display-name
const LayoutEditView = forwardRef((props, ref) => {
  const {pageKey, widgets} = props;
  const [headerBlocks, setHeaderBlocks] = useState([]);
  const [bodyBlocks, setBodyBlocks] = useState([]);
  const [footerBlocks, setFooterBlocks] = useState([]);
  const [openNewCell, setNewCellModal] = useState(false);
  const [newCellSection, setNewCellSection] = useState('');
  const [newCellRowIndex, setNewCellRowIndex] = useState('');
  const [newWidgetCell, setNewWidgetCell] = useState(undefined);
  const [isActiveTab, setIsActiveTab] = useState(false);
  const [settingsObj, setSettingsObj] = useState({});
  const [searchWidgets, setSearchWidgets] = useState(widgets);

  const sectionBlocksMap = {
    headerBlocks,
    setHeaderBlocks,
    bodyBlocks,
    setBodyBlocks,
    footerBlocks,
    setFooterBlocks,
  };

  const [root, setRoot] = useState([]);
  const [query, setQuery] = useState('');
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const {layoutConfig} = layoutData || {};
  const dispatch = useDispatch();
  const setOpenSnack = () => {
    dispatch({
      type: FETCH_WARNING,
      payload: 'Sling CMS is running in Demo mode. Changes will not be saved.',
    });
  };

  useEffect(() => {
    if (!layoutData) {
      dispatch(fetchLayoutConfig());
    }
  }, [dispatch]);

  //To call onSave from parent EditLayout
  useImperativeHandle(ref, () => ({
    saveLayoutConfig() {
      // alert('Saving Root');
      // console.log(root, 'root');
      dispatch(setLayoutConfig({pageKey, root}));
      dispatch({
        type: FETCH_SUCCESS,
        payload: `${pageKey} updated successfully.`,
      });
    },
  }));

  //Update ActiveWidget

  //Update root on any change in head,body or footer.
  useEffect(() => {
    setSearchWidgets(widgets);
  }, [widgets]);

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
    const nextRoot = layoutConfig?.[pageKey]?.root;
    if (!nextRoot) return;
    const root = normalizeLayoutRoot(nextRoot);
    setHeaderBlocks(root.header);
    setBodyBlocks(root.body);
    setFooterBlocks(root.footer);
    setRoot(root);
  }, [layoutConfig, pageKey]);

  //Save child wrapper with new re ordered layout.
  const setItemToParent = (rowKey, parentKey, items, section) => {
    const sectionBlocks = sectionBlocksMap[`${section}Blocks`];
    const sectionFn = section.charAt(0).toUpperCase() + section.slice(1);
    const setSectionBlocks = sectionBlocksMap[`set${sectionFn}Blocks`];

    if (!parentKey) {
      const nextCells = items.map((subObj) => subObj.contents);
      if (!nextCells.length) {
        sectionBlocks?.rows?.splice(rowKey, 1);
      } else if (sectionBlocks?.rows?.[rowKey]) {
        sectionBlocks.rows[rowKey].cells = nextCells;
      }
    } else {
      sectionBlocks?.rows.map((v, k) => {
        sectionBlocks.rows[k].cells.map((c, j) => {
          if (c.key === parentKey) {
            const cellInfo = sectionBlocks.rows[k].cells[j];
            cellInfo.rows[rowKey].cells = items.map((subObj) => {
              return subObj.contents;
            });
            sectionBlocks.rows[k].cells[j] = cellInfo;
          }
        });
      });
    }
    setSectionBlocks({...sectionBlocks});
  };

  const classes = useStyles(props);

  //Handle onClose of New Row popup
  const handleCloseNewCell = () => {
    setNewCellModal(false);
    setNewWidgetCell(undefined);
  };

  const getWidgetPropsObj = (props) => {
    const ret = {};
    (Array.isArray(props) ? props : []).forEach(({name, propType, dataType, default: defaultVal}) => {
      ret[name] = {type: propType, value: defaultVal, default: defaultVal};
    });
    return ret;
  };

  //Handle onSave of new Rule
  const handleSaveNewCell = (rowIndex, section, config) => {
    console.log(rowIndex, section, config, 'section-config');
    const sectionFn = section.charAt(0).toUpperCase() + section.slice(1);
    const setSectionBlocks = sectionBlocksMap[`set${sectionFn}Blocks`];
    const sectionBlocks = sectionBlocksMap[`${section}Blocks`];

    const cells = sectionBlocks.rows?.[rowIndex]?.cells || [];
    let cell = {
      key: config?.key || `${sectionFn}` + ((cells.length || 0) + 1),
      payload: {muiWidths: config},
    };
    if (newWidgetCell) {
      const matchingWidget = (widgets || []).find((v) => v['_id'] === newWidgetCell);
      if (!matchingWidget) {
        setNewCellModal(false);
        setNewWidgetCell(undefined);
        return;
      }
      const {type, props} = matchingWidget;
      const propsObj = getWidgetPropsObj(props);
      let matchingWidgetKey = matchingWidget.key;
      if (!matchingWidgetKey) {
        matchingWidgetKey = matchingWidget.name || '';
        matchingWidgetKey = matchingWidgetKey
          .replace(/\s+/g, '_')
          .toLowerCase();
        matchingWidgetKey = _.upperFirst(_.camelCase(matchingWidgetKey));
      }
      cell = {
        key: matchingWidgetKey,
        payload: {muiWidths: config, props: propsObj},
        type,
      };
    }
    cells.push(cell);
    sectionBlocks.rows[rowIndex].cells = cells;
    setSectionBlocks({...sectionBlocks});

    //Close Cell Modal
    setNewCellModal(false);
    setNewWidgetCell(undefined);
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
    const sectionBlocks = sectionBlocksMap[`${section}Blocks`] || {};
    if (!sectionBlocks?.rows?.length) {
      sectionBlocks.rows = [];
    }
    sectionBlocks.rows.push({cells: []});
    setSectionBlocks({...sectionBlocks});
  };

  const deleteRow = (section, rowIndex) => {
    const sectionFn = section.charAt(0).toUpperCase() + section.slice(1);
    const setSectionBlocks = sectionBlocksMap[`set${sectionFn}Blocks`];
    const sectionBlocks = sectionBlocksMap[`${section}Blocks`];
    sectionBlocks.rows.splice(rowIndex, 1);
    setSectionBlocks({...sectionBlocks});
  };

  const getNodeType = (dragId) => {
    let nodeType = 'footer';
    if (dragId.includes('header')) {
      nodeType = 'header';
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

    //Handle droppable widgets
    if (source.droppableId === 'droppable-widgets') {
      const {nodeType, pos} = getNodeType(dInd);

      // Create drop object and show mui widths form. On save add the widget
      setNewWidgetCell(source.index);
      handleAddCell(nodeType, pos);
      return;
    }

    console.log(sInd, dInd, 'sInd-dInd', source.index, destination.index);
    if (sInd === dInd) {
      const {nodeType, pos} = getNodeType(sInd);
      console.log({nodeType, pos});
      const sectionBlocks = sectionBlocksMap[`${nodeType}Blocks`];
      const sectionFn = nodeType.charAt(0).toUpperCase() + nodeType.slice(1);
      const setSectionBlocks = sectionBlocksMap[`set${sectionFn}Blocks`];
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
      alert('Moving a widget to a different block not allowed at the moment.');
      // return;
      const {nodeType: nodeTypeSource, pos: posSource} = getNodeType(sInd);
      const {nodeType: nodeTypeDest, pos: posDest} = getNodeType(dInd);

      const sectionBlocksSource = sectionBlocksMap[`${nodeTypeSource}Blocks`];
      const sectionFnSource =
        nodeTypeSource.charAt(0).toUpperCase() + nodeTypeSource.slice(1);
      const setSectionBlocksSource =
        sectionBlocksMap[`set${sectionFnSource}Blocks`];

      const toBeMoved = sectionBlocksSource.rows[posSource].cells[source.index];
      sectionBlocksSource.rows[posSource].cells = sectionBlocksSource.rows[
        posSource
      ].cells.filter((v, k) => k != source.index);

      setSectionBlocksSource({...sectionBlocksSource});
      console.log(
        sectionBlocksSource,
        'after - sectionBlocksSource',
        toBeMoved,
      );

      const sectionBlocksDest = sectionBlocksMap[`${nodeTypeDest}Blocks`];
      const sectionFnDest =
        nodeTypeDest.charAt(0).toUpperCase() + nodeTypeDest.slice(1);
      const setSectionBlocksDest =
        sectionBlocksMap[`set${sectionFnDest}Blocks`];

      let tmpDestCells = [];
      if (sectionBlocksDest.rows[posDest].cells.length) {
        sectionBlocksDest.rows[posDest].cells.map((v, k) => {
          if (k == destination.index) {
            tmpDestCells.push(toBeMoved);
          }
          tmpDestCells.push(v);
        });
      } else {
        tmpDestCells.push(toBeMoved);
      }
      sectionBlocksDest.rows[posDest].cells = tmpDestCells;
      setSectionBlocksDest({...sectionBlocksDest});
      //Attach movedNode to destination

      // const sectionFnSource()
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

  const applySearch = () => {
    const q = (query || '').trim().toLowerCase();
    const list = widgets || [];
    if (!q) {
      setSearchWidgets(list);
      return;
    }
    setSearchWidgets(
      list.filter(
        (widget) =>
          (widget.name || '').toLowerCase().indexOf(q) > -1 ||
          (widget.key || '').toLowerCase().indexOf(q) > -1,
      ),
    );
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      applySearch();
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
                {/*{'Widgets'}*/}
              </Box>
              <Paper className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder='Search Widgets'
                  inputProps={{'aria-label': 'search widgets'}}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleEnter}
                />
                <IconButton
                  className={classes.iconButton}
                  aria-label='search'
                  onClick={applySearch}
                  disableRipple>
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Divider style={{marginTop: 15, marginBottom: 15}} />
              <Box>
                <LivePreviewGate>
                  <Droppable
                    droppableId='droppable-widgets'
                    isDropDisabled={true}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        data-widget-library='true'
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          height: '100%',
                          maxHeight: '550px',
                          overflowY: 'scroll',
                        }}>
                        {(searchWidgets || []).map((item) => {
                          return (
                            <Draggable
                              key={item['_id']}
                              draggableId={item['_id']}
                              index={item['_id']}>
                              {(provided) => (
                                <div
                                  componentBox={'componentBox'}
                                  className={classes.componentBox}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  <WidgetLibraryPreview item={item} />
                                  <Box className={classes.widgetLabel}>
                                    {item.name}
                                  </Box>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </LivePreviewGate>
              </Box>
            </Card>
          </Hidden>
        </Grid>
        <Grid item sm={9} lg={6}>
          <Box className={classes.boxLayoutView}>
            <ListItemText
              style={{marginTop: '0px'}}
              primaryTypographyProps={{className: classes.sectionLabel}}>
              {'Head Blocks'}
            </ListItemText>
            <Box p={6} mb={6} className={classes.boxSection}>
              {headerBlocks?.rows?.map((row, k) => {
                return (
                  <div key={'header-div' + k} className={classes.divDragWrap}>
                    <DragMe
                      keyV={'header_' + k}
                      section={'header'}
                      isActiveTab={isActiveTab}
                      setIsActiveTab={setIsActiveTab}
                      settingsObj={settingsObj}
                      setSettingsObj={setSettingsObj}
                      rowNo={k}
                      setOpenSnack={setOpenSnack}
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
                    {!(row?.cells?.length) && (
                      <div className={classes.floatingButtons}>
                        <Fab
                          onClick={() => deleteRow('header', k)}
                          className={clsx(classes.tinyBtn)}
                          aria-label='Delete row'
                          disableRipple>
                          <DeleteIcon />
                        </Fab>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className={classes.divDragWrap}>
                <Fab
                  onClick={() => handleAddNewRow('header')}
                  className={clsx(classes.tinyBtn)}
                  disableRipple>
                  <Add />
                </Fab>
              </div>
            </Box>
            <ListItemText
              style={{marginTop: '0px'}}
              primaryTypographyProps={{className: classes.sectionLabel}}>
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
                      isActiveTab={isActiveTab}
                      setIsActiveTab={setIsActiveTab}
                      settingsObj={settingsObj}
                      setSettingsObj={setSettingsObj}
                      setOpenSnack={setOpenSnack}
                      parentItems={
                        [...row?.cells]?.map((v, k) => {
                          const label = v.key ? `Item ${v.key}` : `Row ${k}`;
                          const id = v.key ? v.key : `Row-${k}`;
                          return {id, label, contents: v};
                        }) || []
                      }
                      setItemToParent={setItemToParent}
                      typeLabel={'Body Blocks'}
                    />
                    <Box m={6} />
                    {!(row?.cells?.length) && (
                      <div className={classes.floatingButtons}>
                        <Fab
                          onClick={() => deleteRow('body', k)}
                          className={clsx(classes.tinyBtn)}
                          aria-label='Delete row'
                          disableRipple>
                          <DeleteIcon />
                        </Fab>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className={classes.divDragWrap}>
                <Fab
                  onClick={() => handleAddNewRow('body')}
                  className={clsx(classes.tinyBtn)}
                  disableRipple>
                  <Add />
                </Fab>
              </div>
            </Box>
            <ListItemText
              style={{marginTop: '0px'}}
              primaryTypographyProps={{className: classes.sectionLabel}}>
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
                      isActiveTab={isActiveTab}
                      setIsActiveTab={setIsActiveTab}
                      setOpenSnack={setOpenSnack}
                      settingsObj={settingsObj}
                      setSettingsObj={setSettingsObj}
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
                    {!(row?.cells?.length) && (
                      <div className={classes.floatingButtons}>
                        <Fab
                          onClick={() => deleteRow('footer', k)}
                          className={clsx(classes.tinyBtn)}
                          aria-label='Delete row'
                          disableRipple>
                          <DeleteIcon />
                        </Fab>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className={classes.divDragWrap}>
                <Fab
                  onClick={() => handleAddNewRow('footer')}
                  className={clsx(classes.tinyBtn)}
                  disableRipple>
                  <Add />
                </Fab>
              </div>
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
        <Grid item sm={3}>
          <Card
            style={{
              padding: '1.5em',
              marginTop: '1.5em',
              backgroundColor: SLING_CREAM,
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 14,
            }}>
            <LayoutSettings settingsObj={settingsObj} key={settingsObj.boxId} />
          </Card>
        </Grid>
      </DragDropContext>
    </Grid>
  );
});
export default LayoutEditView;
