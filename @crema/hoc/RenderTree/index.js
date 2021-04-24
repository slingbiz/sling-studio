import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Blocks from '../../blocks/index';

const RenderTree = (props) => {
  const {layout} = props;
  const tree = layout.root;
  const elements = [];
  return (
    <Box>
      {() => {
        Object.keys(tree).map((section) => {
          if (section == 'body') {
            const rows = tree[section].rows;
            rows?.map(({cells, config}, i) => {
              if (config?.wrapper) {
                console.log(cells, 'cells');
                const Wrapper = Blocks[config.wrapper];
                if (Wrapper) {
                  elements.push(
                    <Wrapper parentProps={props} cells={cells} key={i} />,
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
