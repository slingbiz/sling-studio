import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  Icon,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {Fonts} from '../../../../shared/constants/AppEnums';
import ApiAuth from '../../../../@sling/services/ApiAuthConfig';
import {SERVICE_URL} from '../../../../shared/constants/Services';
import {SLING_CREAM, SLING_ORANGE} from '../../../aiBuilder/slingTheme';
import {useSelector} from 'react-redux';

const ROLE_LABELS = {
  owner: 'Owner',
  admin: 'Admin',
  publisher: 'Publisher',
  user: 'Member',
};

const ASSIGNABLE = [
  {value: 'user', label: 'Member'},
  {value: 'publisher', label: 'Publisher'},
  {value: 'admin', label: 'Admin'},
];

const useStyles = makeStyles(() => ({
  page: {
    padding: 24,
  },
  inviteRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  field: {
    minWidth: 220,
    backgroundColor: SLING_CREAM,
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
  },
  primaryBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    '&:hover': {backgroundColor: '#f57c00'},
  },
  ghostBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    borderColor: SLING_ORANGE,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '12px 0',
    borderBottom: '1px solid #f0e6d8',
  },
  muted: {
    color: '#7a4a00',
  },
}));

const Members = () => {
  const classes = useStyles();
  const {user} = useSelector(({auth}) => auth);
  const canManage = user?.role === 'owner' || user?.role === 'admin';
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [lastLink, setLastLink] = useState('');
  const [loading, setLoading] = useState(true);

  const forbiddenCopy =
    'Only Owners and Admins can view and manage members. Ask your Owner if you need access.';

  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const Api = await ApiAuth();
      const res = await Api.get(`${SERVICE_URL}v1/members`);
      setMembers(res.data.members || []);
      setInvites(res.data.invites || []);
    } catch (err) {
      if (err?.response?.status === 403) {
        setError(forbiddenCopy);
      } else {
        setError(err?.response?.data?.message || 'Could not load members');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!canManage) {
      setLoading(false);
      setError(forbiddenCopy);
      return;
    }
    load();
  }, [canManage]);

  const invite = async () => {
    if (!email) return;
    setError('');
    setNotice('');
    try {
      const Api = await ApiAuth();
      const res = await Api.post(`${SERVICE_URL}v1/members/invite`, {email, role});
      setLastLink(res.data.inviteUrl || '');
      setNotice('Invite created. Copy the link and send it.');
      setEmail('');
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Invite failed');
    }
  };

  const changeRole = async (userId, nextRole) => {
    setError('');
    try {
      const Api = await ApiAuth();
      await Api.patch(`${SERVICE_URL}v1/members/${userId}/role`, {role: nextRole});
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not change role');
    }
  };

  const removeMember = async (userId) => {
    setError('');
    try {
      const Api = await ApiAuth();
      await Api.delete(`${SERVICE_URL}v1/members/${userId}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not remove member');
    }
  };

  const revoke = async (inviteId) => {
    try {
      const Api = await ApiAuth();
      await Api.delete(`${SERVICE_URL}v1/members/invites/${inviteId}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not revoke invite');
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice('Link copied');
    } catch (err) {
      setError('Copy failed');
    }
  };

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Members
        </Box>
      </AppsHeader>
      <Box className={classes.page}>
        <Typography variant='body2' className={classes.muted} style={{marginBottom: 16}}>
          People in this workspace share widgets, theme, and review. Owner is the first account.
        </Typography>
        {loading && (
          <Typography variant='body2' className={classes.muted} style={{marginBottom: 12}}>
            Loading members…
          </Typography>
        )}
        {error && (
          <Typography color='error' variant='body2' style={{marginBottom: 12}}>
            {error}
          </Typography>
        )}
        {notice && (
          <Typography variant='body2' style={{marginBottom: 12, color: SLING_ORANGE}}>
            {notice}
          </Typography>
        )}
        {canManage && (
          <Box className={classes.inviteRow}>
            <TextField
              className={classes.field}
              size='small'
              variant='outlined'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={classes.field}
              size='small'
              select
              variant='outlined'
              label='Role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{minWidth: 140}}>
              {ASSIGNABLE.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button className={classes.primaryBtn} onClick={invite}>
              Invite
            </Button>
          </Box>
        )}
        {lastLink && (
          <Box className={classes.row}>
            <Typography variant='body2' style={{wordBreak: 'break-all'}}>
              {lastLink}
            </Typography>
            <Button className={classes.ghostBtn} variant='outlined' onClick={() => copy(lastLink)}>
              Copy link
            </Button>
          </Box>
        )}
        {members.map((member) => (
          <Box className={classes.row} key={member.id || member._id}>
            <Box>
              <Typography style={{fontWeight: 600}}>{member.name || member.email}</Typography>
              <Typography variant='body2' color='textSecondary'>
                {member.email}
              </Typography>
            </Box>
            <Box style={{display: 'flex', alignItems: 'center', gap: 8}}>
              {canManage && member.role !== 'owner' ? (
                <TextField
                  size='small'
                  select
                  variant='outlined'
                  value={member.role}
                  onChange={(e) => changeRole(member.id || member._id, e.target.value)}>
                  {ASSIGNABLE.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <Typography variant='body2'>{ROLE_LABELS[member.role] || member.role}</Typography>
              )}
              {canManage && member.role !== 'owner' && (
                <IconButton aria-label='Remove member' onClick={() => removeMember(member.id || member._id)}>
                  <Icon>person_remove</Icon>
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
        {invites.length > 0 && (
          <Typography style={{fontWeight: 600, margin: '24px 0 8px'}}>Pending invites</Typography>
        )}
        {invites.map((invite) => (
          <Box className={classes.row} key={invite.id || invite._id}>
            <Box>
              <Typography>{invite.email}</Typography>
              <Typography variant='body2' color='textSecondary'>
                {ROLE_LABELS[invite.role] || invite.role} · expires {new Date(invite.expiresAt).toLocaleDateString()}
              </Typography>
            </Box>
            {canManage && (
              <Box style={{display: 'flex', gap: 8}}>
                <Button className={classes.ghostBtn} variant='outlined' onClick={() => copy(invite.inviteUrl)}>
                  Copy link
                </Button>
                <Button onClick={() => revoke(invite.id || invite._id)} style={{textTransform: 'none'}}>
                  Revoke
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Members;
