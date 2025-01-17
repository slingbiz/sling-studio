import * as MaterialUI from '@material-ui/core';
import * as MaterialIcons from '@material-ui/icons';
import * as MaterialLab from '@material-ui/lab';
import * as MaterialStyles from '@material-ui/core/styles';
import * as MaterialPickers from '@material-ui/pickers';
import * as EmotionReact from '@emotion/react';
import * as EmotionStyled from '@emotion/styled';

// Function to create library map with imported modules
export const createLibraryMap = ({
  React,
  PropTypes,
  useDispatch,
  useSelector,
  useIntl,
  useRouter,
  clsx,
  moment,
  makeStyles
}) => ({
  // React Ecosystem
  'react': React,
  'prop-types': PropTypes,
  'react-redux': { useDispatch, useSelector },
  'react-intl': { useIntl },
  'next/router': { useRouter },
  
  // Material-UI ecosystem
  '@material-ui/core': {
    ...MaterialUI,
    IconButton: MaterialUI.IconButton,
    Button: MaterialUI.Button,
    Box: MaterialUI.Box,
    Typography: MaterialUI.Typography,
    Paper: MaterialUI.Paper,
    Grid: MaterialUI.Grid
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
  '@material-ui/core/styles': { makeStyles },
  
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
  useDispatch,
  useSelector,
  useIntl,
  useRouter,
  clsx,
  moment,
  dependencies = {}
}) => {
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

  // Create library map
  const libraryMap = createLibraryMap({
    React,
    PropTypes,
    useDispatch,
    useSelector,
    useIntl,
    useRouter,
    clsx,
    moment,
    makeStyles,
  });

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

  return scope;
};

// List of libraries that Claude can use in generated components
export const ALLOWED_LIBRARIES = [
  // React Ecosystem
  'react',
  'react-dom',
  'prop-types',
  'react-redux',
  'react-intl',
  
  // Next.js
  'next/router',
  'next/link',
  
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
  
  // Data Management
  'axios',
  'swr',
  
  // Utilities
  'lodash',
  'uuid',
  'dot-object'
];
