import * as MaterialUI from '@material-ui/core';
import * as MaterialIcons from '@material-ui/icons';
import * as MaterialLab from '@material-ui/lab';
import * as MaterialStyles from '@material-ui/core/styles';
import * as MaterialPickers from '@material-ui/pickers';
import * as EmotionReact from '@emotion/react';
import * as EmotionStyled from '@emotion/styled';
import {Formik, Form, Field, useField} from 'formik';
import * as Yup from 'yup';
import {SLING_ORANGE, SLING_WIDGET_THEME} from './slingTheme';

const DEFAULT_CORE_COMPONENTS = [
  'AppBar',
  'Avatar',
  'Box',
  'Button',
  'Card',
  'CardActions',
  'CardContent',
  'CardMedia',
  'Checkbox',
  'Chip',
  'CircularProgress',
  'Container',
  'Divider',
  'FormControl',
  'FormControlLabel',
  'FormHelperText',
  'Grid',
  'Icon',
  'IconButton',
  'InputAdornment',
  'InputLabel',
  'LinearProgress',
  'Link',
  'List',
  'ListItem',
  'ListItemIcon',
  'ListItemText',
  'MenuItem',
  'Paper',
  'Select',
  'Switch',
  'Tab',
  'Table',
  'TableBody',
  'TableCell',
  'TableContainer',
  'TableHead',
  'TableRow',
  'Tabs',
  'TextField',
  'Toolbar',
  'Tooltip',
  'Typography',
];

const DEFAULT_ICONS = [
  'Add',
  'ArrowForward',
  'AttachMoney',
  'Check',
  'CheckCircle',
  'Close',
  'Delete',
  'Edit',
  'Email',
  'ExpandLess',
  'ExpandMore',
  'Favorite',
  'Home',
  'Info',
  'Lock',
  'Person',
  'Phone',
  'Search',
  'Settings',
  'ShoppingCart',
  'Star',
  'Visibility',
  'VisibilityOff',
  'Warning',
];

const slingPreviewTheme = {
  ...SLING_WIDGET_THEME,
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 6,
        padding: '8px 16px',
        fontWeight: 500,
        textTransform: 'none',
      },
      containedPrimary: {
        backgroundColor: SLING_ORANGE,
        '&:hover': {
          backgroundColor: '#f57c00',
        },
      },
      textPrimary: {
        color: SLING_ORANGE,
      },
    },
    MuiTextField: {
      root: {
        backgroundColor: '#fff',
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: '#fff',
        '&$focused $notchedOutline': {
          borderColor: SLING_ORANGE,
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: SLING_ORANGE,
      },
    },
    MuiCheckbox: {
      colorPrimary: {
        color: SLING_ORANGE,
        '&$checked': {
          color: SLING_ORANGE,
        },
      },
    },
  },
};

// Function to create library map with imported modules
export const createLibraryMap = ({
  React,
  PropTypes,
  clsx,
  moment,
  makeStyles
}) => ({
  // React Ecosystem
  'react': React,
  'prop-types': PropTypes,

  // Material-UI ecosystem
  '@material-ui/core': {
    ...MaterialUI,
    IconButton: MaterialUI.IconButton,
    Button: MaterialUI.Button,
    Box: MaterialUI.Box,
    Typography: MaterialUI.Typography,
    Paper: MaterialUI.Paper,
    Grid: MaterialUI.Grid,
    ThemeProvider: MaterialUI.ThemeProvider,
    StyledEngineProvider: MaterialUI.StyledEngineProvider,
    FormControlLabel: MaterialUI.FormControlLabel,
    Checkbox: MaterialUI.Checkbox,
    Pagination: MaterialUI.Pagination,
    Card: MaterialUI.Card,
    CardContent: MaterialUI.CardContent,
    CardMedia: MaterialUI.CardMedia,
  },
  '@material-ui/icons': {
    ...MaterialIcons,
    // Automatically add Icon-suffixed versions for all icons
    ...Object.entries(MaterialIcons).reduce((acc, [name, component]) => ({
      ...acc,
      [`${name}Icon`]: component
    }), {})
  },
  '@material-ui/lab': MaterialLab,
  '@material-ui/styles': MaterialStyles,
  '@material-ui/pickers': MaterialPickers,
  '@material-ui/core/styles': { 
    makeStyles,
    createTheme: MaterialStyles.createTheme,
  },
  
  // Other common libraries
  '@emotion/react': EmotionReact,
  '@emotion/styled': EmotionStyled,
  'clsx': clsx,
  'moment': moment,
});

// Helper to find component in different ways
const findComponent = (libraryMap, library, componentName) => {
  const lib = libraryMap[library];
  if (!lib) return null;

  // Direct match
  if (lib[componentName]) {
    return lib[componentName];
  }

  // Try without 'Icon' suffix for Material Icons
  if (library === '@material-ui/icons' && componentName.endsWith('Icon')) {
    const baseName = componentName.replace(/Icon$/, '');
    if (lib[baseName]) {
      return lib[baseName];
    }
  }

  // For Material-UI core components, try common variations
  if (library === '@material-ui/core') {
    // Try with/without 'Component' suffix
    const withoutComponent = componentName.replace(/Component$/, '');
    const withComponent = componentName + 'Component';
    
    if (lib[withoutComponent]) return lib[withoutComponent];
    if (lib[withComponent]) return lib[withComponent];
    
    // Check if it's in Lab instead
    if (libraryMap['@material-ui/lab']?.[componentName]) {
      console.warn(`Component ${componentName} found in @material-ui/lab instead of core`);
      return libraryMap['@material-ui/lab'][componentName];
    }
  }

  return null;
};

// Get fallback component
const getFallbackComponent = (libraryMap, library, componentName) => {
  if (library === '@material-ui/core') {
    const fallbacks = {
      Container: libraryMap['@material-ui/core'].Box,
      Card: libraryMap['@material-ui/core'].Paper,
      Link: 'a',
      Image: 'img',
    };
    return fallbacks[componentName];
  }
  if (library === '@material-ui/icons') {
    // Return a generic icon as fallback
    return libraryMap['@material-ui/icons'].Help;
  }
  return null;
};

// Create a placeholder component for missing components
const createPlaceholder = (React, componentName) => props => 
  React.createElement('div', {
    ...props,
    style: { 
      border: '1px dashed #ff0000',
      padding: '8px',
      margin: '4px',
      color: '#ff0000',
      fontSize: '12px'
    }
  }, `${componentName} not found`);

// Main function to create scope with all components
export const createScope = ({
  React,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useContext,
  makeStyles,
  PropTypes,
  clsx,
  moment,
  dependencies = {},
  themeOverrides = null,
}) => {
  const libraryMap = createLibraryMap({
    React,
    PropTypes,
    clsx,
    moment,
    makeStyles
  });

  const mergedTheme = themeOverrides
    ? {
        ...slingPreviewTheme,
        ...themeOverrides,
        palette: {
          ...slingPreviewTheme.palette,
          ...(themeOverrides.palette || {}),
        },
      }
    : slingPreviewTheme;

  // Create theme instance
  const theme = MaterialStyles.createTheme(mergedTheme);

  const ThemeProvider =
    libraryMap['@material-ui/core'].ThemeProvider || MaterialStyles.ThemeProvider;

  const ThemedComponent = ({children}) => {
    return React.createElement(ThemeProvider, {theme}, children);
  };

  // Create base scope
  const scope = {
    React,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    useContext,
    makeStyles,
  };

  const addToScope = (library, comp) => {
    if (scope[comp]) return;
    const component = findComponent(libraryMap, library, comp);
    if (component) {
      scope[comp] = component;
      return;
    }
    const fallback = getFallbackComponent(libraryMap, library, comp);
    scope[comp] = fallback || createPlaceholder(React, comp);
  };

  DEFAULT_CORE_COMPONENTS.forEach((comp) => addToScope('@material-ui/core', comp));
  DEFAULT_ICONS.forEach((comp) => addToScope('@material-ui/icons', comp));

  Object.entries(dependencies || {}).forEach(([library, components]) => {
    try {
      (components || []).forEach((comp) => addToScope(library, comp));
    } catch (error) {
      console.error(`Error processing library ${library}:`, error);
    }
  });

  return {
    ...scope,
    Formik,
    Form,
    Field,
    useField,
    Yup,
    ThemedComponent,
    findComponent: (library, componentName) => findComponent(libraryMap, library, componentName),
    getFallbackComponent: (library, componentName) => getFallbackComponent(libraryMap, library, componentName),
  };
};

// List of libraries that Claude can use in generated components.
// Widgets must be self-contained (props in, JSX out): no app routing, global
// store, or network access, since generated code renders inside an isolated
// preview sandbox that has none of those and blocks outbound requests.
export const ALLOWED_LIBRARIES = [
  // React Ecosystem
  'react',
  'react-dom',
  'prop-types',

  // Material-UI v4
  '@material-ui/core',
  '@material-ui/icons',
  '@material-ui/lab',
  '@material-ui/styles',
  '@material-ui/pickers',
  '@material-ui/core/colors',
  '@material-ui/core/styles',
  
  // Styling & UI
  '@emotion/react',
  '@emotion/styled',
  'clsx',
  'animate.css',
  
  // Date & Time
  'moment',
  'date-fns',
  '@date-io/moment',
  
  // Forms & Validation
  'formik',
  'yup',

  // Utilities
  'lodash',
  'uuid',
  'dot-object'
];
