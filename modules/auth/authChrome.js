export const SLING_ORANGE = '#ff9800';
export const SLING_ORANGE_HOVER = '#f57c00';
export const SLING_CREAM = '#fff8f0';
export const SLING_INK = '#163a5f';
export const SLING_MUTED = '#4a5d73';
export const SLING_LINE = '#f0e4d4';

export const authFieldStyles = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    fontSize: 14,
    fontFamily: 'Open Sans, Helvetica Neue, Arial, sans-serif',
    background: SLING_CREAM,
    borderRadius: 8,
    '& fieldset': {
      borderColor: SLING_LINE,
    },
    '&:hover fieldset': {
      borderColor: SLING_ORANGE,
    },
    '&.Mui-focused fieldset': {
      borderColor: SLING_ORANGE,
    },
  },
  '& .MuiInputLabel-outlined': {
    fontSize: 14,
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: SLING_ORANGE,
  },
};

export const authButtonStyles = {
  width: '100%',
  height: 44,
  fontSize: 14,
  fontWeight: 600,
  fontFamily: 'Open Sans, Helvetica Neue, Arial, sans-serif',
  textTransform: 'none',
  borderRadius: 8,
  boxShadow: 'none',
  backgroundColor: SLING_ORANGE,
  color: '#fff',
  '&:hover': {
    backgroundColor: SLING_ORANGE_HOVER,
    boxShadow: 'none',
  },
};

export const authLinkStyles = {
  color: SLING_ORANGE,
  fontSize: 14,
  fontWeight: 500,
  textDecoration: 'none',
  cursor: 'pointer',
};
