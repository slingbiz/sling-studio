import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getCompanyInfo} from '../../../redux/actions/AccountAction';

const useStyles = makeStyles(() => ({
  siteBtn: {
    textTransform: 'none',
    backgroundColor: '#ff9800',
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    marginRight: 16,
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover, &:focus': {
      backgroundColor: '#f57c00',
      color: '#fff',
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: '#ffcc80',
      color: '#fff',
    },
  },
}));

const LanguageSwitcher = (props) => {
  const {account} = useSelector(({account}) => account);
  const {user} = useSelector(({auth}) => auth);
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const siteUrl = account?.clientUrl;

  useEffect(() => {
    if (account == null || account == '') {
      dispatch(getCompanyInfo(user.email));
    }
  }, [dispatch]);

  const buttonProps = siteUrl
    ? {
        component: 'a',
        href: siteUrl,
        target: '_blank',
        rel: 'noreferrer',
        title: 'Open the live site in a new tab',
      }
    : {
        disabled: true,
        title: 'Add your site URL in Settings → Company first.',
      };

  return (
    <Box style={{display: 'flex', alignItems: 'center'}}>
      <Button
        className={classes.siteBtn}
        aria-label='View site'
        {...buttonProps}>
        View site
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;

LanguageSwitcher.defaultProps = {
  iconOnly: false,
};

LanguageSwitcher.propTypes = {
  iconOnly: PropTypes.bool,
};
