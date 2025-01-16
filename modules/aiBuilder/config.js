// Function to create library map with imported modules
export const createLibraryMap = ({
  React,
  PropTypes,
  useDispatch,
  useSelector,
  useIntl,
  useRouter,
  MaterialUI,
  MaterialIcons,
  MaterialLab,
  MaterialStyles,
  MaterialPickers,
  EmotionReact,
  EmotionStyled,
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
  '@material-ui/core': MaterialUI,
  '@material-ui/icons': MaterialIcons,
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
