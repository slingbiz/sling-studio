import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo, 
  useRef,
  useContext
} from 'react';
import * as MaterialUI from '@material-ui/core';
import * as MaterialIcons from '@material-ui/icons';
import * as MaterialLab from '@material-ui/lab';
import * as MaterialStyles from '@material-ui/core/styles';
import * as Emotion from '@emotion/react';
import * as EmotionStyled from '@emotion/styled';

// Map of common libraries and their imports
export const libraryMap = {
  '@material-ui/core': MaterialUI,
  '@material-ui/icons': MaterialIcons,
  '@material-ui/lab': MaterialLab,
  '@material-ui/core/styles': MaterialStyles,
  '@emotion/react': Emotion,
  '@emotion/styled': EmotionStyled,
};

// Helper function to clean and process imports
export const processImports = (unescapedCode) => {
  const scope = { 
    React,
    // Add React hooks
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    useContext,
    // Add commonly used Material-UI components directly
    Container: MaterialUI.Container,
    Box: MaterialUI.Box,
    Grid: MaterialUI.Grid,
    Typography: MaterialUI.Typography,
    Button: MaterialUI.Button,
    TextField: MaterialUI.TextField,
    Card: MaterialUI.Card,
    CardContent: MaterialUI.CardContent,
    CardMedia: MaterialUI.CardMedia,
    Paper: MaterialUI.Paper,
    AppBar: MaterialUI.AppBar,
    Toolbar: MaterialUI.Toolbar,
    IconButton: MaterialUI.IconButton,
    // Add commonly used style utilities
    makeStyles: MaterialStyles.makeStyles,
    useTheme: MaterialStyles.useTheme,
    styled: MaterialStyles.styled,
  };
  
  const importRegex = /import\s+(?:{([^}]+)}|\*\s+as\s+(\w+)|\s*(\w+))\s+from\s+['"]([^'"]+)['"]/g;
  
  let match;
  while ((match = importRegex.exec(unescapedCode)) !== null) {
    const [fullMatch, namedImports, namespaceImport, defaultImport, path] = match;
    
    if (libraryMap[path]) {
      if (namedImports) {
        const imports = namedImports.split(',').map(name => name.trim());
        imports.forEach(name => {
          const actualName = name.split(' as ')[0];
          scope[actualName] = libraryMap[path][actualName];
        });
      } else if (namespaceImport) {
        scope[namespaceImport] = libraryMap[path];
      } else if (defaultImport) {
        const pathParts = path.split('/');
        const componentName = pathParts[pathParts.length - 1];
        scope[defaultImport] = libraryMap[pathParts[0]][componentName];
      }
    } else {
      console.warn(`Library not available in scope: ${path}`);
    }
  }

  return scope;
};
