import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Blocks from '../../blocks/index';
import Wrappers from '../../wrappers/index';

const RenderTree = (props) => {
  const {layout} = props;
  const tree = layout.root;
  const elements = [];
  const processRows = (rows) => {
    const tmpElements = [];
    rows?.map(({cells, config}) => {
      if (config?.wrapper) {
        console.log(cells, 'cells');
        const Wrapper = Wrappers[config.wrapper];
        if (Wrapper) {
          tmpElements.push(
            <Wrapper>
              {cells?.map((cell) => {
                const {rows, key, payload} = cell;
                if (key && Blocks[key]) {
                  const CellComponent = Blocks[cell.key];
                  return (
                    <CellComponent
                      parentProps={props}
                      key={key}
                      payload={payload}
                    />
                  );
                }
                if (rows) {
                  console.log(rows, '@rows inside cells');
                  return (
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      alignItems={'center'}>
                      {processRows(rows)}
                    </Box>
                  );
                }
              })}
            </Wrapper>,
          );
        }
      }
    });
    return tmpElements;
  };
  const processCells = (cells) => {};
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      {() => {
        Object.keys(tree).map((section) => {
          if (section == 'body') {
            const rows = tree[section].rows;
            elements.push(processRows(rows));
          }
        });

        return elements;
      }}
    </Box>
  );
};
RenderTree.propTypes = {
  layout: PropTypes.object,
};
export default RenderTree;
