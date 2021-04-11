import { createMuiTheme } from "@material-ui/core/styles";
import moment from "moment";
import { useIntl } from "react-intl";
import { useMediaQuery, useTheme } from "@material-ui/core";

export const isBreakPointDown = (key) => {
  const defaultTheme = createMuiTheme();
  return defaultTheme.breakpoints.width(key) > window.innerWidth;
};
export const useDownBreakPointChecker = (key) => {
  return useMediaQuery((theme) => theme.breakpoints.down(key));
};

export const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
};
export const createRoutes = (routeConfigs) => {
  let allRoutes = [];
  routeConfigs.forEach((config) => {
    allRoutes = [...allRoutes, ...setRoutes(config)];
  });
  return allRoutes;
};

export const setRoutes = (config) => {
  let routes = [...config.routes];
  if (config.auth) {
    routes = routes.map((route) => {
      let auth = route.auth
        ? [...config.auth, ...route.auth]
        : [...config.auth];
      return { ...route, auth };
    });
  }

  return [...routes];
};

export const getBreakPointsValue = (valueSet, breakpoint) => {
  if (typeof valueSet === "number") return valueSet;
  switch (breakpoint) {
    case "xs":
      return valueSet.xs;
    case "sm":
      return valueSet.sm || valueSet.xs;
    case "md":
      return valueSet.md || valueSet.sm || valueSet.xs;
    case "lg":
      return valueSet.lg || valueSet.md || valueSet.sm || valueSet.xs;
    default:
      return (
        valueSet.xl || valueSet.lg || valueSet.md || valueSet.sm || valueSet.xs
      );
  }
};

export const getFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  let k = 1024,
    dm = 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const multiPropsFilter = (products, filters, stringKey = "title") => {
  const filterKeys = Object.keys(filters);
  return products.filter((product) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) return true;
      // Loops again if product[key] is an array (for material attribute).
      if (Array.isArray(product[key])) {
        return product[key].some((keyEle) => filters[key].includes(keyEle));
      }
      console.log("key", key, filters[key], product[key]);
      if (key === stringKey) {
        return product[key].toLowerCase().includes(filters[key].toLowerCase());
      }
      return filters[key].includes(product[key]);
    });
  });
};

export const getCustomDateTime = (
  value = 0,
  unit = "days",
  format = "YYYY-MM-DD"
) => {
  if (value === 0) {
    return moment().format(format);
  } else {
    return moment().add(value, unit).format(format);
  }
};

export const timeFromNow = (date) => {
  const timestamp = moment(date).format("X");
  const newDate = moment.unix(timestamp);
  return moment(newDate).fromNow();
};

// 'intl' service singleton reference
let intl;

export function IntlGlobalProvider({ children }) {
  intl = useIntl();
  // Keep the 'intl' service reference
  return children;
}

export const appIntl = () => {
  return intl;
};

export const checkPermission = (routeAuth, userRole) => {
  if (routeAuth === null || routeAuth === undefined) {
    return true;
  }

  if (userRole && Array.isArray(userRole)) {
    return routeAuth.some((r) => userRole.indexOf(r) >= 0);
  }

  if (routeAuth.length === 0) {
    return !userRole || userRole.length === 0;
  }
  if (userRole && Array.isArray(userRole) && Array.isArray(routeAuth)) {
    return routeAuth.some((r) => userRole.indexOf(r) >= 0);
  }
  return routeAuth.indexOf(userRole) >= 0;
};

export const isObjectEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};
