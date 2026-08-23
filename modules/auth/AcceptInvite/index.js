import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import axios from 'axios';
import {setCookie} from 'nookies';
import {SERVICE_URL} from '../../../shared/constants/Services';
import {SLING_CREAM, SLING_ORANGE} from '../../aiBuilder/slingTheme';

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
  btn: {
    width: '100%',
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    '&:hover': {backgroundColor: '#f57c00'},
  },
}));

const AcceptInvite = () => {
  const classes = useStyles();
  const router = useRouter();
  const token = router.query.token;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${SERVICE_URL}v1/members/invites/${token}`)
      .then((res) => setEmail(res.data.email || ''))
      .catch(() => setError('This invite is invalid or expired'));
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${SERVICE_URL}v1/members/invites/${token}/accept`, {
        name,
        password,
      });
      const {user, tokens} = res.data;
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
      router.push('/widgets/widgets-integration');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not accept invite');
    }
  };

  return (
    <Box className={classes.wrap}>
      <Box className={classes.card}>
        <Typography variant='h5' style={{fontWeight: 700, marginBottom: 8}}>
          Join this workspace
        </Typography>
        <Typography variant='body2' color='textSecondary' style={{marginBottom: 20}}>
          {email ? `Invited as ${email}` : 'Open a valid invite link'}
        </Typography>
        {error && (
          <Typography color='error' variant='body2' style={{marginBottom: 12}}>
            {error}
          </Typography>
        )}
        <form onSubmit={submit}>
          <TextField className={classes.field} label='Your name' variant='outlined' value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField
            className={classes.field}
            label='Password'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button className={classes.btn} type='submit' disabled={!token || !email}>
            Accept invite
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AcceptInvite;
