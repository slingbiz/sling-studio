import React, {useLayoutEffect, useState} from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import {onJwtGoogleAuth} from '../../redux/actions/Auth';
import {FETCH_ERROR} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@sling/utility/IntlMessages';

const GOOGLE_BTN_MAX_WIDTH = 380;

const useStyles = makeStyles((theme) => ({
  googleBtnRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 50,
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    overflow: 'hidden',
  },
  emailDivider: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
}));

const GoogleJwtAuthBlock = ({anchorRef, mode}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const [btnWidth, setBtnWidth] = useState(GOOGLE_BTN_MAX_WIDTH);

  useLayoutEffect(() => {
    const el = anchorRef?.current;
    if (!el || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w) {
        setBtnWidth(Math.min(GOOGLE_BTN_MAX_WIDTH, Math.max(200, Math.floor(w - 4))));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [anchorRef]);

  if (!clientId) {
    return null;
  }

  return (
    <>
      <Box className={classes.googleBtnRow}>
        <GoogleLogin
          onSuccess={(cred) => {
            if (cred?.credential) {
              dispatch(onJwtGoogleAuth({idToken: cred.credential}, router));
            }
          }}
          onError={() => {
            dispatch({
              type: FETCH_ERROR,
              payload: 'Google sign-in was cancelled or failed.',
            });
          }}
          useOneTap={false}
          theme='outline'
          size='large'
          width={String(btnWidth)}
          text='continue_with'
          shape='rectangular'
        />
      </Box>

      <Box className={classes.emailDivider}>
        <Divider style={{flex: 1}} />
        <Box px={2}>
          <Typography variant='body2' color='textSecondary'>
            <IntlMessages id='common.authOrContinueWithEmail' />
          </Typography>
        </Box>
        <Divider style={{flex: 1}} />
      </Box>
    </>
  );
};

export default GoogleJwtAuthBlock;
