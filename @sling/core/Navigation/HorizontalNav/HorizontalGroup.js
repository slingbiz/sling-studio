import React, {useState} from 'react';
import {
  Grow,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';
import { withRouter } from 'next/router'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Manager, Popper, Reference} from 'react-popper';
import * as ReactDOM from 'react-dom';
import HorizontalCollapse from './HorizontalCollapse';
import HorizontalItem from './HorizontalItem';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../utility/IntlMessages';
import useStyles from './HorizontalGroup.style';

function HorizontalGroup(props) {
  const classes = useStyles(props);
  const [opened, setOpened] = useState(false);
  const {item, nestedLevel} = props;

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
    <Manager>
      <Reference>
        {({ref}) => (
          <ListItem
            ref={ref}
            className={clsx(
              'navItem',
              isUrlInChildren(item, props.router.pathname) && 'active',
            )}
            onMouseEnter={() => handleToggle(true)}
            onMouseLeave={() => handleToggle(false)}
            aria-owns={opened ? 'menu-list-grow' : null}
            aria-haspopup='true'>
            {item.icon && (
              <Icon color='action' className='navLinkIcon'>
                {item.icon}
              </Icon>
            )}
            <ListItemText
              primary={<IntlMessages id={item.messageId} />}
              classes={{primary: clsx(classes.fontBold, 'uppercase')}}
            />
            {nestedLevel > 0 && (
              <IconButton disableRipple className={classes.ml2}>
                <Icon className={clsx(classes.textLg, 'arrow-icon')}>
                  keyboard_arrow_right
                </Icon>
              </IconButton>
            )}
          </ListItem>
        )}
      </Reference>
      {ReactDOM.createPortal(
        <Popper
          placement={nestedLevel === 0 ? 'bottom-start' : 'right'}
          eventsEnabled={opened}
          positionFixed>
          {({ref, style, placement}) =>
            opened && (
              <Box
                ref={ref}
                style={{
                  ...style,
                  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
                  zIndex: 1110 + nestedLevel,
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
                                nestedLevel={nestedLevel}
                              />
                            )}

                            {item.type === 'collapse' && (
                              <HorizontalCollapse
                                item={item}
                                nestedLevel={nestedLevel}
                              />
                            )}

                            {item.type === 'item' && (
                              <HorizontalItem
                                item={item}
                                nestedLevel={nestedLevel}
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
  );
}

HorizontalGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.array,
  }),
};

HorizontalGroup.defaultProps = {};

export default withRouter(React.memo(HorizontalGroup));
