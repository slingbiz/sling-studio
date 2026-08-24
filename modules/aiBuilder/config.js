import * as MaterialUI from '@material-ui/core';
import * as MaterialIcons from '@material-ui/icons';
import * as MaterialLab from '@material-ui/lab';
import * as MaterialStyles from '@material-ui/core/styles';
import * as MaterialPickers from '@material-ui/pickers';
import * as EmotionReact from '@emotion/react';
import * as EmotionStyled from '@emotion/styled';

const claudeTheme = {
  palette: {
    primary: {
      main: '#0A8FDC',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#F4F7FE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#495057',
      secondary: '#74788d',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    h1: { fontSize: 18, fontWeight: 600 },
    h2: { fontSize: 16, fontWeight: 600 },
    h3: { fontSize: 14, fontWeight: 500 },
    body1: { fontSize: 14 },
    body2: { fontSize: 14 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        text: {
          color: '#0A8FDC',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0A8FDC',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0,0,0,0.08)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#74788d',
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
        ...claudeTheme,
        ...themeOverrides,
        palette: {
          ...claudeTheme.palette,
          ...(themeOverrides.palette || {}),
        },
      }
    : claudeTheme;

  // Create theme instance
  const theme = MaterialStyles.createTheme(mergedTheme);

  // Create a wrapper component that applies the theme
  const ThemedComponent = ({ children }) => {
    return React.createElement(
      MaterialUI.StyledEngineProvider,
      { injectFirst: true },
      React.createElement(
        libraryMap['@material-ui/core'].ThemeProvider,
        { theme },
        children
      )
    );
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

  // Process dependencies and add components to scope
  Object.entries(dependencies).forEach(([library, components]) => {
    try {
      components.forEach((comp) => {
        // Try to find the component
        const component = findComponent(libraryMap, library, comp);
        
        if (component) {
          scope[comp] = component;
        } else {
          // Try to get a fallback
          const fallback = getFallbackComponent(libraryMap, library, comp);
          
          if (fallback) {
            console.warn(
              `Component ${comp} not found in ${library}, using fallback:`,
              fallback.displayName || fallback.name || 'Unknown'
            );
            scope[comp] = fallback;
          } else {
            console.error(
              `Component ${comp} not found in ${library} and no fallback available`
            );
            scope[comp] = createPlaceholder(React, comp);
          }
        }
      });
    } catch (error) {
      console.error(`Error processing library ${library}:`, error);
    }
  });

  return {
    ...scope,
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
