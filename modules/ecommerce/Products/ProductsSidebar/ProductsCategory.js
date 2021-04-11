import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    fontWeight: Fonts.REGULAR,
  },
});

const ProductsCategory = () => {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}>
      <TreeItem nodeId='1' label='Watches'>
        <TreeItem nodeId='2' label="Men's Watches" />
        <TreeItem nodeId='3' label="Women's Watches" />
        <TreeItem nodeId='4' label="Kid's Watches" />
      </TreeItem>
    </TreeView>
  );
};

export default ProductsCategory;
