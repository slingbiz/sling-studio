import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import {amber, green} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import {useDispatch} from 'react-redux';
import {HIDE_MESSAGE} from '../../../shared/constants/ActionTypes';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
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
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}>
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby='client-snackbar'
        message={
          <span id='client-snackbar' className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message || warning}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='close'
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
