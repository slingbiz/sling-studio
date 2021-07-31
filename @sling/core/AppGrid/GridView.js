import React, { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import PropTypes from "prop-types";
import { Box, makeStyles, useTheme, withWidth } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import AppAnimateGroup from "../AppAnimateGroup";
import { isObjectEmpty } from "../../utility/Utils";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "100%"
  },
  columnRow: (props) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -props.itemPadding,
    marginRight: -props.itemPadding
  }),
  columnCount: (props) => ({
    flexGrow: 0,
    maxWidth: `${100 / props.displayColumn}%`,
    flexBasis: `${100 / props.displayColumn}%`,
    padding: props.itemPadding,
    boxSizing: "border-box"
  })
}));

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

const GridView = ({
                    width,
                    column,
                    responsive,
                    itemPadding,
                    animation,
                    renderRow,
                    onEndReached,
                    data,
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
    overflow: "hidden"
  };

  const [displayColumn, setColumn] = useState(column);
  if (!onEndReached) {
    onEndReached = () => {
    };
  }

  useEffect(() => {
    setColumn(column);
  }, [column]);

  useEffect(() => {
    const getColumnCount = () => {
      if (!isObjectEmpty(responsive)) {
        if (width === "xs") {
          return responsive.xs || column;
        } else if (width === "sm") {
          return responsive.sm || responsive.xs || column;
        } else if (width === "md") {
          return responsive.md || responsive.sm || responsive.xs || column;
        } else if (width === "lg") {
          return (
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        } else if (width === "xl") {
          return (
            responsive.xl ||
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        }
      } else {
        return column;
      }
    };
    setColumn(getColumnCount());
  }, [width, column, responsive]);

  const classes = useStyles({ displayColumn, itemPadding });

  let style = containerStyle;
  if (border) {
    style = { ...style, ...borderStyle };
  }
  useBottomScrollListener(onEndReached, 200);
  return (
    <Box className={classes.gridContainer}>
      <AppAnimateGroup
        enter={{
          animation
        }}
        className={classes.columnRow}
        style={{ ...style }}
        {...rest}>
        {data.length > 0
          ? data.map((item, index) => (
            <Box key={"grid-" + index} className={classes.columnCount}>
              {renderRow(item, index)}
            </Box>
          ))
          : null}
      </AppAnimateGroup>
      {data.length === 0 ? getEmptyContainer(ListEmptyComponent) : null}
      {getFooterContainer(ListFooterComponent)}
    </Box>
  );
};

export default withWidth()(GridView);
GridView.propTypes = {
  border: PropTypes.bool,
  column: PropTypes.number,
  animation: PropTypes.string,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func
};
GridView.defaultProps = {
  border: false,
  data: [],
  column: 3,
  animation: "transition.expandIn",
  itemPadding: 12
  // responsive: {
  //   xs: 1,
  //   sm: 2,
  //   md: 2,
  //   lg: 4,
  //   xl: 4,
  // },
};
