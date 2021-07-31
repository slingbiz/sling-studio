import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Collapse, Icon, IconButton, ListItem, ListItemText,} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import VerticalItem from './VerticalItem';
import AppContext from '../../../utility/AppContext';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../utility/IntlMessages';
import useStyles from './VerticalCollapase.style';
import {useSelector} from 'react-redux';
import {checkPermission} from '../../../utility/Utils';
import {withRouter} from "next/router";

const needsToBeOpened = (pathname, item) => {
  return pathname && isUrlInChildren(item, pathname);
};

const isUrlInChildren = (parent, url) => {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }

    if (
      parent.children[i].url === url ||
      url.includes(parent.children[i].url)
    ) {
      return true;
    }
  }

  return false;
};

const VerticalCollapse = ({item, level, router }) => {
  const {themeMode} = useContext(AppContext);
  const classes = useStyles({level, themeMode});
  const {theme} = useContext(AppContext);
  const {pathname} = router ;
  const [open, setOpen] = useState(() => needsToBeOpened(pathname, item));

  useEffect(() => {
    if (needsToBeOpened(pathname, item)) {
      setOpen(true);
    }
  }, [pathname, item]);

  const handleClick = () => {
    setOpen(!open);
  };

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
        button
        component='li'
        className={clsx(classes.navItem, 'nav-item', open && 'open')}
        onClick={handleClick}>
        {item.icon && (
          <Box component='span' mr={6}>
            <Icon
              color='action'
              className={clsx('nav-item-icon', classes.listIcon)}>
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          classes={{primary: clsx('nav-item-text', classes.listItemText)}}
          primary={<IntlMessages id={item.messageId}/>}
        />
        <Box p={0} clone>
          <IconButton disableRipple>
            <Icon className='nav-item-icon-arrow' color='inherit'>
              {open
                ? 'expand_more'
                : theme.direction === 'ltr'
                  ? 'chevron_right'
                  : 'chevron_left'}
            </Icon>
          </IconButton>
        </Box>
      </ListItem>

      {item.children && (
        <Collapse in={open} className='collapse-children'>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'collapse' && (
                <VerticalCollapse
                  item={item}
                  level={level + 1}
                  router ={router }
                />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level + 1}/>
              )}
            </React.Fragment>
          ))}
        </Collapse>
      )}
    </>
  );
};

VerticalCollapse.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.array,
  }),
};
VerticalCollapse.defaultProps = {};

export default withRouter(React.memo(VerticalCollapse));
