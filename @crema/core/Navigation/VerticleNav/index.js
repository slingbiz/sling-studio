import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';

import routesConfig from '../../../../modules/routesConfig';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';
import {INIT_CONFIG} from '../../../../shared/constants/Services';

const Navigation = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function fetchConfig() {
      let response = await fetch(`${INIT_CONFIG}`);
      response = await response.json();
      setPages(Object.keys(response?.layoutConfig || []));
    }

    fetchConfig();
  }, []);

  console.log(pages, '@pages@pages@@@2indexjs');
  // const children = [];
  // children.push(
  //   pages.map((v) => {
  //     return {
  //       id: v,
  //       title: v.replaceAll(v, '-'),
  //       messageId: `sidebar.pages.${v}`,
  //       type: 'item',
  //       icon: 'timeline',
  //       url: `/${v}`,
  //     };
  //   }),
  // );
  return (
    <List>
      {routesConfig.map((item) => {
        if (item.id === 'pages') {
          console.log(item, '@items');
        } else {
          console.log(item.id, 'item.id');
        }
        return (
          <React.Fragment key={item.id}>
            {item.type === 'group' && (
              <VerticalNavGroup item={item} level={0} pages={pages} />
            )}

            {item.type === 'collapse' && (
              <VerticalCollapse item={item} level={0} pages={pages} />
            )}

            {item.type === 'item' && <VerticalItem item={item} level={0} />}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Navigation;
