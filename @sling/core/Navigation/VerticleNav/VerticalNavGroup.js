import React, {useContext, useMemo} from 'react';
import {ListItem} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import IntlMessages from '../../../utility/IntlMessages';
import useStyles from './VerticalNavGroup.style';
import AppContext from '../../../utility/AppContext';
import {useSelector} from 'react-redux';
import {checkPermission} from '../../../utility/Utils';

const VerticalNavGroup = ({item, level}) => {
  const {themeMode} = useContext(AppContext);
  const classes = useStyles({level, themeMode});
  const {user} = useSelector(({auth}) => auth);
  const hasPermission = useMemo(() => checkPermission(item.auth, user.role), [
    item.auth,
    user.role,
  ]);
  if (!hasPermission) {
    return null;
  }
  return (
    <>
      <ListItem
        component='li'
        className={clsx(classes.navItem, 'nav-item nav-item-header')}>
        {<IntlMessages id={item.messageId} />}
      </ListItem>

      {item.children && (
        <>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'group' && (
                <NavVerticalGroup item={item} level={level} />
              )}

              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={level} />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level} />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

VerticalNavGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.array,
  }),
};

VerticalNavGroup.defaultProps = {};

const NavVerticalGroup = VerticalNavGroup;

export default NavVerticalGroup;
