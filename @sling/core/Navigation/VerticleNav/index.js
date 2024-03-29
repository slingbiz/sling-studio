import React from 'react';
import List from '@material-ui/core/List';

import routesConfig from '../../../../modules/routesConfig';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';

const Navigation = (props) => {

  return (
    <List>
      {routesConfig.map((item) => {
        if (item.id === 'pages') {
          // console.log(item, '@items');
        } else {
          // console.log(item.id, 'item.id');
        }
        return (
          <React.Fragment key={item.id}>
            {item.type === 'group' && (
              <VerticalNavGroup item={item} level={0} />
            )}

            {item.type === 'collapse' && (
              <VerticalCollapse item={item} level={0} />
            )}

            {item.type === 'item' && (
              <VerticalItem item={item} level={0} />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Navigation;
