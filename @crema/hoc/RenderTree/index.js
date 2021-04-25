import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Blocks from '../../blocks/index';
import Wrappers from '../../wrappers/index';

const RenderTree = (props) => {
  const {layout} = props;
  const tree = layout.root;
  const elements = [];
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      {() => {
        Object.keys(tree).map((section) => {
          if (section == 'body') {
            const rows = tree[section].rows;
            rows?.map(({cells, config}, i) => {
              if (config?.wrapper) {
                console.log(cells, 'cells');
                const Wrapper = Wrappers[config.wrapper];
                if (Wrapper) {
                  elements.push(
                    <Wrapper>
                      {cells?.map((cell, key) => {
                        if (Blocks[cell.key]) {
                          const CellComponent = Blocks[cell.key];
                          return (
                            <CellComponent parentProps={props} key={key} />
                          );
                        }
                      })}
                    </Wrapper>,
                  );
                }
              }
            });
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
