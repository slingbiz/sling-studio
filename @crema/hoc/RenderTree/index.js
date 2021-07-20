import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Blocks from '../../blocks/index';
import Wrappers from '../../wrappers/index';
import Grid from '@material-ui/core/Grid';

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
                const {style, muiWidths} = payload;
                if (key && Blocks[key]) {
                  const CellComponent = Blocks[cell.key];
                  return (
                    <Grid item display={'flex'} flex={1} {...muiWidths}>
                      <CellComponent
                        parentProps={props}
                        key={key}
                        payload={payload}
                      />
                    </Grid>
                  );
                }
                if (rows) {
                  console.log(rows, '@rows inside cells');
                  return (
                    <Grid
                      item
                      {...muiWidths}
                      display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Box
                        // container
                        spacing={2}
                        justifyContent={'center'}
                        width={'auto'}>
                        {processRows(rows)}
                      </Box>
                    </Grid>
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
