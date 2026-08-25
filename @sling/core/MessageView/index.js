import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import {useDispatch} from 'react-redux';
import {HIDE_MESSAGE} from '../../../shared/constants/ActionTypes';

const SLING_INK = '#163a5f';
const SLING_ORANGE = '#ff9800';
const SLING_ERROR = '#b71c1c';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(() => ({
  root: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.45,
    borderRadius: 8,
    boxShadow: '0 8px 24px rgba(22, 58, 95, 0.18)',
    minWidth: 280,
    padding: '6px 8px',
  },
  success: {
    backgroundColor: SLING_INK,
    color: '#fff',
  },
  error: {
    backgroundColor: SLING_ERROR,
    color: '#fff',
  },
  info: {
    backgroundColor: SLING_INK,
    color: '#fff',
  },
  warning: {
    backgroundColor: SLING_ORANGE,
    color: '#fff',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.95,
    marginRight: 8,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
  },
  close: {
    color: 'inherit',
    padding: 8,
  },
}));

const AppSnackbar = (props) => {
  const classes = useStyles1();
  const dispatch = useDispatch();

  const {className, message, open, setOpen, variant, warning, ...other} = props;
  const Icon = variantIcon[variant];

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch({
      type: HIDE_MESSAGE,
      payload: '',
    });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      style={{zIndex: 2000}}>
      <SnackbarContent
        className={clsx(classes.root, classes[variant], className)}
        aria-describedby='client-snackbar'
        message={
          <span id='client-snackbar' className={classes.message}>
            {Icon ? (
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
            ) : null}
            {message || warning}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='close'
            className={classes.close}
            color='inherit'
            onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    </Snackbar>
  );
};

AppSnackbar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  warning: PropTypes.string,
};

export default AppSnackbar;
