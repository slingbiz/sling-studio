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
import {Fonts} from '../../shared/constants/AppEnums';

const GOOGLE_BTN_MAX_WIDTH = 400;

const useStyles = makeStyles((theme) => ({
  googlePanel: {
    padding: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[200]}`,
    marginBottom: theme.spacing(3),
  },
  googleTitle: {
    fontWeight: Fonts.MEDIUM,
    marginBottom: theme.spacing(0.5),
  },
  googleHint: {
    marginBottom: theme.spacing(2),
  },
  googleBtnRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 50,
    alignItems: 'center',
  },
  emailDivider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
}));

/**
 * Google-first auth block: panel + "Or continue with email" divider.
 * @param {{ anchorRef: React.RefObject<HTMLElement>, mode: 'login' | 'signup' }} props
 */
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
        setBtnWidth(Math.min(GOOGLE_BTN_MAX_WIDTH, Math.max(280, Math.floor(w))));
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

  const hintId =
    mode === 'signup' ? 'common.authGoogleSignupHint' : 'common.authGoogleLoginHint';

  return (
    <>
      <Box className={classes.googlePanel} width='100%'>
        <Typography variant='subtitle1' className={classes.googleTitle} component='h2'>
          <IntlMessages id='common.authGoogleTitle' />
        </Typography>
        <Typography variant='body2' color='textSecondary' className={classes.googleHint}>
          <IntlMessages id={hintId} />
        </Typography>
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
