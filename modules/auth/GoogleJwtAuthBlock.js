import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router';
import {onJwtGoogleAuth} from '../../redux/actions/Auth';
import {FETCH_ERROR} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@sling/utility/IntlMessages';

/**
 * Sign in with Google (JWT backend). Hidden unless NEXT_PUBLIC_GOOGLE_CLIENT_ID is set.
 */
const GoogleJwtAuthBlock = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return null;
  }

  return (
    <>
      <Box mb={3} display='flex' alignItems='center' width='100%'>
        <Divider style={{flex: 1}} />
        <Box px={2}>
          <Typography variant='caption' color='textSecondary'>
            <IntlMessages id='common.orContinueWith' />
          </Typography>
        </Box>
        <Divider style={{flex: 1}} />
      </Box>
      <Box mb={4} display='flex' justifyContent='center' width='100%'>
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
          width='320'
          text='continue_with'
          shape='rectangular'
        />
      </Box>
    </>
  );
};

export default GoogleJwtAuthBlock;
