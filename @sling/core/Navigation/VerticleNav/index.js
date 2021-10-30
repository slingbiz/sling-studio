import React, {useEffect} from 'react';
import List from '@material-ui/core/List';

import routesConfig from '../../../../modules/routesConfig';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLayoutConfig} from '../../../../redux/actions';

const Navigation = () => {
  const dispatch = useDispatch();
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const {layoutConfig} = layoutData || {};
  const pages = Object.keys(layoutConfig || {});

  useEffect(() => {
    dispatch(fetchLayoutConfig());
  }, [dispatch]);

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

            {item.type === 'item' && <VerticalItem item={item} level={0} />}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Navigation;
