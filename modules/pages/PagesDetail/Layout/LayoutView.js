import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Box from '@material-ui/core/Box';
import DragMe from './DragMe';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from 'react-redux';
import {setLayoutConfig} from '../../../../redux/actions';

const LayoutView = forwardRef((props, ref) => {
  const {pageKey, isEditable} = props;
  const [headerBlocks, setHeaderBlocks] = useState([]);
  const [bodyBlocks, setBodyBlocks] = useState([]);
  const [footerBlocks, setFooterBlocks] = useState([]);
  const [root, setRoot] = useState([]);
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const {layoutConfig} = layoutData || {};
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    saveLayoutConfig() {
      alert('Saving Root');
      console.log(root, 'root');
      dispatch(setLayoutConfig(pageKey, root));
    },
  }));

  useEffect(() => {
    console.log('Calling Root save on body change', root);
    setRoot({
      ...root,
      header: headerBlocks,
      body: bodyBlocks,
      footer: footerBlocks,
    });
  }, [headerBlocks, bodyBlocks, footerBlocks]);

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

  const setItemToParent = (rowKey, parentKey, items) => {
    bodyBlocks.rows.map((v, k) => {
      //If parentKey is empty, find and update the root body object.
      if (!parentKey) {
        //If row matches
        if (rowKey === k) {
          console.log(items, '@items@itemsitemsitemsitems');
          bodyBlocks.rows[k].cells = items.map((subObj) => {
            return subObj.contents;
          });
        }
      } else {
        //Loop across all cells in each row and find the matching key with parentKey
        bodyBlocks.rows[k].cells.map((c, j) => {
          if (c.key === parentKey) {
            //if matching parent key found, update the child document
            const cellInfo = bodyBlocks.rows[k].cells[j];
            cellInfo.rows[rowKey].cells = items.map((subObj) => {
              return subObj.contents;
            });
            bodyBlocks.rows[k].cells[j] = cellInfo;
          }
        });
      }
    });
    setBodyBlocks({...bodyBlocks});
  };

  return (
    <>
      <Box p={6} mb={6} style={{backgroundColor: '#f0f4f9'}}>
        <ListItemText style={{marginTop: '0px'}}>{'Head Blocks'}</ListItemText>
        {headerBlocks?.rows?.map((row) => {
          return (
            <>
              <DragMe
                key={'header'}
                isDragDisabled={!isEditable}
                parentItems={
                  row?.cells?.map((v, k) => {
                    const label = v.rows?.length ? `Row ${k}` : `Item ${v.key}`;
                    const id = v.rows?.length ? `Row-${k}` : v.key;
                    return {id, label, contents: v};
                  }) || []
                }
                setParentItems={setHeaderBlocks}
                typeLabel={'Header Blocks'}
              />
            </>
          );
        })}
      </Box>
      <Box p={6} mb={6} style={{backgroundColor: '#f0f4f9'}}>
        <Box style={{display: 'flex', justifyContent: 'space-between'}}>
          <ListItemText style={{marginTop: '0px'}}>
            {'Body Blocks'}
          </ListItemText>
        </Box>
        {bodyBlocks?.rows?.map((row, k) => {
          return (
            <>
              <DragMe
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
            </>
          );
        })}
      </Box>
      <Box p={6} mb={6} style={{backgroundColor: '#f0f4f9'}}>
        <ListItemText style={{marginTop: '0px'}}>
          {'Footer Blocks'}
        </ListItemText>
        <DragMe
          key={'footer'}
          isDragDisabled={!isEditable}
          parentItems={footerBlocks}
          setParentItems={setFooterBlocks}
          typeLabel={'Footer Blocks'}
        />
      </Box>{' '}
    </>
  );
});
export default LayoutView;
