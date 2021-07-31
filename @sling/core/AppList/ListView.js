import React from 'react';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import PropTypes from 'prop-types';
import {useTheme} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import AppAnimateGroup from '../AppAnimateGroup';

const getEmptyContainer = (ListEmptyComponent) => {
  if (ListEmptyComponent)
    return React.isValidElement(ListEmptyComponent) ? (
      ListEmptyComponent
    ) : (
      <ListEmptyComponent />
    );
  return null;
};

const getFooterContainer = (ListFooterComponent) => {
  if (ListFooterComponent)
    return React.isValidElement(ListFooterComponent) ? (
      ListFooterComponent
    ) : (
      <ListFooterComponent />
    );
  return null;
};
const ListView = ({
  renderRow,
  onEndReached,
  data,
  animation,
  delay = 0,
  duration = 200,
  containerStyle,
  border,
  ListFooterComponent,
  ListEmptyComponent,
  ItemSeparatorComponent,
  ...rest
}) => {
  const theme = useTheme();
  const borderStyle = {
    border: `1px solid ${grey[300]}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    overflow: 'hidden',
  };

  if (!onEndReached) {
    onEndReached = () => {};
  }

  let style = containerStyle;
  if (border) {
    style = {...style, ...borderStyle};
  }
  useBottomScrollListener(onEndReached, 200);
  return (
    <AppAnimateGroup
      style={{...style}}
      {...rest}
      flex={1}
      enter={{delay, duration, animation}}>
      {data.length > 0
        ? data.map((item, index) => renderRow(item, index))
        : getEmptyContainer(ListEmptyComponent)}
      {getFooterContainer(ListFooterComponent)}
    </AppAnimateGroup>
  );
};

export default ListView;
ListView.propTypes = {
  border: PropTypes.bool,
  animation: PropTypes.string,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
};
ListView.defaultProps = {
  border: false,
  animation: 'transition.slideUpIn',
  data: [],
  onEndReached: () => {},
};
