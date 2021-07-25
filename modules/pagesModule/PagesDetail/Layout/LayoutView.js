import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Box from '@material-ui/core/Box';
import DragMe from './DragMe';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from 'react-redux';
import {setLayoutConfig} from '../../../../redux/actions';
import {makeStyles} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import NewCellModal from './NewCellModal';
import clsx from 'clsx';

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
}));
const LayoutView = forwardRef((props, ref) => {
  const {pageKey, isEditable} = props;
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
    setBodyBlocks({...bodyBlocks});
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

  return (
    <>
      <ListItemText style={{marginTop: '0px'}}>{'Head Blocks'}</ListItemText>
      <Box p={6} mb={6} className={classes.boxSection}>
        {headerBlocks.rows?.map((row, k) => {
          return (
            <div key={'header-div' + k} className={classes.divDragWrap}>
              <DragMe
                key={'header' + k}
                section={'header'}
                rowNo={k}
                isDragDisabled={!isEditable}
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
              {isEditable && (
                <Fab
                  onClick={() => handleAddCell('header', k)}
                  className={clsx(classes.tinyBtn, classes.floatingRight)}>
                  <Add />
                </Fab>
              )}
            </div>
          );
        })}
        {isEditable && (
          <Fab
            onClick={() => handleAddNewRow('header')}
            className={clsx(classes.tinyBtn)}>
            <Add />
          </Fab>
        )}
      </Box>
      <ListItemText style={{marginTop: '0px'}}>{'Body Blocks'}</ListItemText>
      <Box p={6} mb={6} className={classes.boxSection}>
        {bodyBlocks?.rows?.map((row, k) => {
          return (
            <div key={'body-div' + k} className={classes.divDragWrap}>
              <DragMe
                section={'body'}
                key={'body' + k}
                rowNo={k}
                isDragDisabled={!isEditable}
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
              {isEditable && (
                <Fab
                  onClick={() => handleAddCell('body', k)}
                  className={clsx(classes.tinyBtn, classes.floatingRight)}>
                  <Add />
                </Fab>
              )}
            </div>
          );
        })}
        {isEditable && (
          <Fab
            onClick={() => handleAddNewRow('body')}
            className={clsx(classes.tinyBtn)}>
            <Add />
          </Fab>
        )}
      </Box>
      <ListItemText style={{marginTop: '0px'}}>{'Footer Blocks'}</ListItemText>
      <Box p={6} mb={6} className={classes.boxSection}>
        {footerBlocks?.rows?.map((row, k) => {
          return (
            <div key={'footer-div' + k} className={classes.divDragWrap}>
              <DragMe
                section={'footer'}
                key={'footer' + k}
                rowNo={k}
                isDragDisabled={!isEditable}
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
              {isEditable && (
                <Fab
                  onClick={() => handleAddCell('footer', k)}
                  className={clsx(classes.tinyBtn, classes.floatingRight)}>
                  <Add />
                </Fab>
              )}
            </div>
          );
        })}
        {isEditable && (
          <Fab
            onClick={() => handleAddNewRow('footer')}
            className={clsx(classes.tinyBtn)}>
            <Add />
          </Fab>
        )}
      </Box>
      <NewCellModal
        openNewRow={openNewCell}
        section={newCellSection}
        newCellRowIndex={newCellRowIndex}
        handleSaveNewCell={handleSaveNewCell}
        handleCloseNewCell={handleCloseNewCell}
      />
    </>
  );
});
export default LayoutView;
