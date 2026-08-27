import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import axios from 'axios';
import {setCookie} from 'nookies';
import {SERVICE_URL} from '../../../shared/constants/Services';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../../aiBuilder/slingTheme';

const useStyles = makeStyles(() => ({
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: SLING_CREAM,
  },
  card: {
    width: 420,
    maxWidth: '92vw',
    background: '#fff',
    padding: 28,
    borderRadius: 12,
  },
  field: {
    width: '100%',
    marginBottom: 16,
  },
  copy: {
    fontSize: 14,
    color: SLING_INK,
    marginBottom: 16,
  },
  btn: {
    width: '100%',
    textTransform: 'none',
    fontSize: 14,
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    '&:hover': {backgroundColor: '#f57c00'},
  },
  loginBtn: {
    width: '100%',
    marginTop: 8,
    textTransform: 'none',
    fontSize: 14,
    color: SLING_INK,
  },
}));

const sessionEmail = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('user') || 'null');
    return stored?.email ? String(stored.email).toLowerCase() : '';
  } catch (err) {
    return '';
  }
};

const persistSession = (user, tokens) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', tokens.access.token);
  localStorage.setItem('accessToken', tokens.access.token);
  localStorage.setItem('refreshToken', tokens.refresh.token);
  setCookie(null, 'loginToken', tokens.access.token, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    domain: '.sling.biz',
    sameSite: 'None',
    secure: true,
  });
};

const AcceptInvite = () => {
  const classes = useStyles();
  const router = useRouter();
  const token = router.query.token;
  const [email, setEmail] = useState('');
  const [existingAccount, setExistingAccount] = useState(false);
  const [signedInEmail, setSignedInEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSignedInEmail(sessionEmail());
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (!token) {
      setError('This invite is invalid or expired');
      setLoaded(true);
      return;
    }
    axios
      .get(`${SERVICE_URL}v1/members/invites/${token}`)
      .then((res) => {
        setEmail(res.data.email || '');
        setExistingAccount(!!res.data.existingAccount);
      })
      .catch(() => setError('This invite is invalid or expired'))
      .finally(() => setLoaded(true));
  }, [token, router.isReady]);

  const accept = async (body) => {
    setError('');
    setSubmitting(true);
    try {
      const res = await axios.post(`${SERVICE_URL}v1/members/invites/${token}/accept`, body);
      const {user, tokens} = res.data;
      persistSession(user, tokens);
      router.push('/widgets/widgets-integration');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not accept invite');
    } finally {
      setSubmitting(false);
    }
  };

  const submitNew = (e) => {
    e.preventDefault();
    accept({name, password});
  };

  const joinExisting = () => accept({});

  const loggedInAsInvitee = Boolean(
    existingAccount && signedInEmail && signedInEmail === String(email).toLowerCase(),
  );

  return (
    <Box className={classes.wrap}>
      <Box className={classes.card}>
        <Typography variant='h5' style={{fontWeight: 700, marginBottom: 8, fontSize: 20}}>
          Join this workspace
        </Typography>
        <Typography variant='body2' color='textSecondary' style={{marginBottom: 20, fontSize: 14}}>
          {email ? `Invited as ${email}` : 'Open a valid invite link'}
        </Typography>
        {error && (
          <Typography color='error' variant='body2' style={{marginBottom: 12, fontSize: 14}}>
            {error}
          </Typography>
        )}
        {!loaded ? (
          <Box display='flex' justifyContent='center' py={2}>
            <CircularProgress size={28} style={{color: SLING_ORANGE}} />
          </Box>
        ) : !email ? null : existingAccount ? (
          <>
            <Typography className={classes.copy}>
              You already have a Sling CMS account. Join this workspace — you will leave your current one.
            </Typography>
            <Button
              className={classes.btn}
              onClick={joinExisting}
              disabled={!token || !email || submitting}>
              Join
            </Button>
            {!loggedInAsInvitee && (
              <Button className={classes.loginBtn} href='/signin'>
                Log in
              </Button>
            )}
          </>
        ) : (
          <form onSubmit={submitNew}>
            <TextField
              className={classes.field}
              label='Your name'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              className={classes.field}
              label='Password'
              type='password'
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button className={classes.btn} type='submit' disabled={!token || !email || submitting}>
              Accept invite
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default AcceptInvite;
