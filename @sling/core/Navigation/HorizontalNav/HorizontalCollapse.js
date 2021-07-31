import React, {useContext, useState} from 'react';
import {
  Grow,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { withRouter } from 'next/router'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Manager, Popper, Reference} from 'react-popper';
import * as ReactDOM from 'react-dom';
import HorizontalItem from './HorizontalItem';
import HorizontalGroup from './HorizontalGroup';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../utility/IntlMessages';
import AppContext from '../../../utility/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .list-item-text': {
      padding: '0 0 0 16px',
    },
  },
  button: {
    color: theme.palette.text.primary,
    minHeight: 48,
    '&.active, &.active:hover, &.active:focus': {
      backgroundColor: theme.palette.primary.main + '!important',
      color: theme.palette.secondary.contrastText + '!important',
    },
    '&.open': {
      backgroundColor: 'rgba(0,0,0,.08)',
    },
    '&.dense': {
      padding: '8px 12px 8px 12px',
      minHeight: 40,
      '& .list-item-text': {
        padding: '0 0 0 8px',
      },
    },
  },
  popper: {
    zIndex: 999,
  },
  popperClose: {
    pointerEvents: 'none',
  },
  icon: {
    fontsSize: 18,
    marginRight: 14,
  },
  pl0: {
    paddingLeft: 0,
  },
}));

function HorizontalCollapse(props) {
  const classes = useStyles(props);
  {}
  const [opened, setOpened] = useState(false);
  const {theme} = useContext(AppContext);
  const {item, nestedLevel, dense} = props;
  const active = isUrlInChildren(item, props.router .pathname);

  const handleToggle = (open) => {
    setOpened(open);
  };

  function isUrlInChildren(parent, url) {
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
  }

  return (
    <ul className={clsx(classes.root, 'navbarNavSubmenu')}>
      <Manager>
        <Reference>
          {({ref}) => (
            <ListItem
              ref={ref}
              button
              className={clsx(
                'navItemSubmenu',
                classes.button,
                opened && 'open',
                dense && 'dense',
                active && 'active',
              )}
              onMouseEnter={() => handleToggle(true)}
              onMouseLeave={() => handleToggle(false)}
              aria-owns={opened ? 'menu-list-grow' : null}
              aria-haspopup='true'>
              {item.icon && (
                <Icon
                  style={{color: active ? 'white' : 'action'}}
                  className={classes.icon}>
                  {item.icon}
                </Icon>
              )}
              <ListItemText
                className='navLinkTextSubmenu'
                primary={<IntlMessages id={item.messageId} />}
              />
              <Box p={0} clone>
                <IconButton disableRipple>
                  <Icon style={{color: active ? 'white' : 'action'}}>
                    {theme.direction === 'ltr'
                      ? 'chevron_right'
                      : 'chevron_left'}
                  </Icon>
                </IconButton>
              </Box>
            </ListItem>
          )}
        </Reference>
        {ReactDOM.createPortal(
          <Popper placement='right' eventsEnabled={opened} positionFixed>
            {({ref, style, placement, arrowProps}) =>
              opened && (
                <Box
                  ref={ref}
                  style={{
                    ...style,
                    boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
                    zIndex: 1110 + nestedLevel + 1,
                  }}
                  data-placement={placement}
                  className={clsx(classes.popper, {
                    [classes.popperClose]: !opened,
                  })}>
                  <Grow
                    in={opened}
                    id='menu-list-grow'
                    style={{transformOrigin: '0 0 0'}}>
                    <Paper
                      onMouseEnter={() => handleToggle(true)}
                      onMouseLeave={() => handleToggle(false)}>
                      {item.children && (
                        <ul className={clsx(classes.children, classes.pl0)}>
                          {item.children.map((item) => (
                            <React.Fragment key={item.id}>
                              {item.type === 'group' && (
                                <HorizontalGroup
                                  item={item}
                                  nestedLevel={nestedLevel + 1}
                                />
                              )}

                              {item.type === 'collapse' && (
                                <HorizontalCollapse
                                  item={item}
                                  nestedLevel={nestedLevel + 1}
                                  router ={props.router }
                                />
                              )}

                              {item.type === 'item' && (
                                <HorizontalItem
                                  item={item}
                                  nestedLevel={nestedLevel + 1}
                                />
                              )}
                            </React.Fragment>
                          ))}
                        </ul>
                      )}
                    </Paper>
                  </Grow>
                </Box>
              )
            }
          </Popper>,
          document.querySelector('#root'),
        )}
      </Manager>
    </ul>
  );
}

HorizontalCollapse.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.array,
  }),
};

HorizontalCollapse.defaultProps = {};

export default withRouter(React.memo(HorizontalCollapse));
