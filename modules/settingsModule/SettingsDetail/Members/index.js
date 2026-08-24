import React, {useEffect, useMemo, useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {Fonts} from '../../../../shared/constants/AppEnums';
import ApiAuth from '../../../../@sling/services/ApiAuthConfig';
import {SERVICE_URL} from '../../../../shared/constants/Services';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../../../aiBuilder/slingTheme';
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

const ROLE_FILTERS = [
  {value: 'all', label: 'All'},
  {value: 'owner', label: 'Owner'},
  {value: 'admin', label: 'Admin'},
  {value: 'publisher', label: 'Publisher'},
  {value: 'user', label: 'Member'},
];

const useStyles = makeStyles(() => ({
  page: {
    padding: '12px 28px 32px',
    background: '#fff',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
    flex: 1,
  },
  search: {
    maxWidth: 320,
    width: '100%',
    background: '#fff',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      height: 40,
      background: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px 10px 0',
    },
  },
  filterBtn: {
    textTransform: 'none',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    padding: '8px 12px',
    border: '1px solid #e6e6e6',
    borderRadius: 8,
    background: '#fff',
  },
  primaryBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
  },
  ghostBtn: {
    textTransform: 'none',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    padding: '6px 10px',
  },
  copyBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    padding: '6px 10px',
  },
  tableHead: {
    display: 'grid',
    gridTemplateColumns: 'minmax(180px, 1.6fr) minmax(160px, 1.4fr) 130px 110px auto',
    gap: 12,
    padding: '12px 8px 10px',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
  },
  sectionBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    margin: '0 -8px 0',
    background: '#f6f7f9',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 4,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'minmax(180px, 1.6fr) minmax(160px, 1.4fr) 130px 110px auto',
    gap: 12,
    alignItems: 'center',
    padding: '12px 8px',
    minHeight: 60,
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  avatar: {
    width: 36,
    height: 36,
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: SLING_ORANGE,
    color: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    lineHeight: 1.35,
  },
  handle: {
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.35,
  },
  cell: {
    fontSize: 14,
    color: SLING_INK,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  mutedCell: {
    fontSize: 14,
    color: '#6b6f76',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 26,
    padding: '0 10px',
    borderRadius: 13,
    fontSize: 14,
    fontWeight: 500,
    border: 'none',
    cursor: 'default',
    background: '#f4f5f8',
    color: '#5c6066',
  },
  pillOwner: {
    background: SLING_CREAM,
    color: '#c2410c',
  },
  pillAdmin: {
    background: '#fff3e0',
    color: '#e65100',
  },
  pillClick: {
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
  },
  status: {
    fontSize: 14,
    color: '#c62828',
    margin: '8px 0',
  },
  notice: {
    fontSize: 14,
    color: SLING_ORANGE,
    margin: '8px 0',
  },
  dialogPaper: {
    borderRadius: 12,
    padding: '8px 4px 4px',
    width: 480,
    maxWidth: '92vw',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: SLING_INK,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: SLING_INK,
    marginBottom: 6,
    marginTop: 16,
  },
  dialogField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      background: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
    marginBottom: 8,
  },
  inviteLink: {
    fontSize: 14,
    color: '#6b6f76',
    wordBreak: 'break-all',
    background: SLING_CREAM,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
}));

const initials = (name, email) => {
  const source = (name || email || '?').trim();
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
};

const handleFromEmail = (email) => {
  if (!email) return '';
  return `@${String(email).split('@')[0]}`;
};

const formatJoined = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
};

const rolePillClass = (classes, role) => {
  if (role === 'owner') return `${classes.pill} ${classes.pillOwner}`;
  if (role === 'admin') return `${classes.pill} ${classes.pillAdmin}`;
  return classes.pill;
};

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
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [roleAnchor, setRoleAnchor] = useState(null);
  const [roleTarget, setRoleTarget] = useState(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviting, setInviting] = useState(false);

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
    setInviting(true);
    try {
      const Api = await ApiAuth();
      const res = await Api.post(`${SERVICE_URL}v1/members/invite`, {email, role});
      setLastLink(res.data.inviteUrl || '');
      setNotice(
        res.data.emailSent
          ? 'Invite emailed. Copy the link if they do not see it.'
          : 'Invite created. Email did not send — copy the link and send it.',
      );
      setEmail('');
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Invite failed');
    } finally {
      setInviting(false);
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

  const needle = query.trim().toLowerCase();
  const visibleMembers = useMemo(
    () =>
      members.filter((member) => {
        if (roleFilter !== 'all' && member.role !== roleFilter) return false;
        if (!needle) return true;
        return `${member.name || ''} ${member.email || ''}`.toLowerCase().includes(needle);
      }),
    [members, roleFilter, needle],
  );
  const visibleInvites = useMemo(
    () =>
      invites.filter((inviteRow) => {
        if (roleFilter !== 'all' && inviteRow.role !== roleFilter) return false;
        if (!needle) return true;
        return String(inviteRow.email || '').toLowerCase().includes(needle);
      }),
    [invites, roleFilter, needle],
  );

  const openRoleMenu = (event, member) => {
    if (!canManage || member.role === 'owner') return;
    setRoleTarget(member);
    setRoleAnchor(event.currentTarget);
  };

  const closeInvite = () => {
    setInviteOpen(false);
    setEmail('');
    setRole('user');
    setLastLink('');
  };

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Members
        </Box>
      </AppsHeader>
      <Box className={classes.page}>
        <Box className={classes.toolbar}>
          <Box className={classes.toolbarLeft}>
            <TextField
              className={classes.search}
              size='small'
              variant='outlined'
              placeholder='Search by name or email'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon style={{fontSize: 20, color: '#9ea3a8'}}>search</Icon>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className={classes.filterBtn}
              onClick={(e) => setFilterAnchor(e.currentTarget)}
              endIcon={<Icon style={{fontSize: 18}}>expand_more</Icon>}>
              {ROLE_FILTERS.find((item) => item.value === roleFilter)?.label || 'All'}
            </Button>
            <Menu
              anchorEl={filterAnchor}
              open={Boolean(filterAnchor)}
              onClose={() => setFilterAnchor(null)}>
              {ROLE_FILTERS.map((item) => (
                <MenuItem
                  key={item.value}
                  onClick={() => {
                    setRoleFilter(item.value);
                    setFilterAnchor(null);
                  }}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {canManage && (
            <Button className={classes.primaryBtn} onClick={() => setInviteOpen(true)}>
              Invite
            </Button>
          )}
        </Box>

        {loading && <Typography className={classes.mutedCell}>Loading members…</Typography>}
        {error && <Typography className={classes.status}>{error}</Typography>}
        {notice && !inviteOpen && (
          <Typography className={classes.notice}>{notice}</Typography>
        )}

        <Box className={classes.tableHead}>
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Joined</span>
          <span />
        </Box>

        <Box className={classes.sectionBar}>Active {visibleMembers.length}</Box>
        {!loading && visibleMembers.length === 0 && (
          <Box className={classes.row}>
            <Typography className={classes.mutedCell}>No people match this search.</Typography>
          </Box>
        )}
        {visibleMembers.map((member) => {
          const id = member.id || member._id;
          const canEdit = canManage && member.role !== 'owner';
          return (
            <Box className={classes.row} key={id}>
              <Box className={classes.nameCell}>
                <Avatar className={classes.avatar}>{initials(member.name, member.email)}</Avatar>
                <Box minWidth={0}>
                  <Typography className={classes.name} noWrap>
                    {member.name || member.email}
                  </Typography>
                  <Typography className={classes.handle} noWrap>
                    {handleFromEmail(member.email)}
                  </Typography>
                </Box>
              </Box>
              <Typography className={classes.cell}>{member.email}</Typography>
              <button
                type='button'
                className={`${rolePillClass(classes, member.role)}${canEdit ? ` ${classes.pillClick}` : ''}`}
                onClick={(e) => openRoleMenu(e, member)}>
                {ROLE_LABELS[member.role] || member.role}
              </button>
              <Typography className={classes.mutedCell}>
                {formatJoined(member.createdAt || member.joinedAt)}
              </Typography>
              <Box className={classes.actions}>
                {canEdit && (
                  <Button
                    className={classes.ghostBtn}
                    aria-label='Remove member'
                    onClick={() => removeMember(id)}>
                    Remove
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}

        {visibleInvites.length > 0 && (
          <>
            <Box className={classes.sectionBar} style={{marginTop: 16}}>
              Pending {visibleInvites.length}
            </Box>
            {visibleInvites.map((inviteRow) => (
              <Box className={classes.row} key={inviteRow.id || inviteRow._id}>
                <Box className={classes.nameCell}>
                  <Avatar className={classes.avatar}>
                    {initials('', inviteRow.email)}
                  </Avatar>
                  <Box minWidth={0}>
                    <Typography className={classes.name} noWrap>
                      {inviteRow.email}
                    </Typography>
                    <Typography className={classes.handle} noWrap>
                      Invite pending
                    </Typography>
                  </Box>
                </Box>
                <Typography className={classes.cell}>{inviteRow.email}</Typography>
                <span className={rolePillClass(classes, inviteRow.role)}>
                  {ROLE_LABELS[inviteRow.role] || inviteRow.role}
                </span>
                <Typography className={classes.mutedCell}>
                  Exp {formatJoined(inviteRow.expiresAt)}
                </Typography>
                {canManage && (
                  <Box className={classes.actions}>
                    <Button
                      className={classes.copyBtn}
                      onClick={() => copy(inviteRow.inviteUrl)}>
                      Copy link
                    </Button>
                    <Button
                      className={classes.ghostBtn}
                      onClick={() => revoke(inviteRow.id || inviteRow._id)}>
                      Revoke
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          </>
        )}

        <Menu
          anchorEl={roleAnchor}
          open={Boolean(roleAnchor)}
          onClose={() => {
            setRoleAnchor(null);
            setRoleTarget(null);
          }}>
          {ASSIGNABLE.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => {
                if (roleTarget) {
                  changeRole(roleTarget.id || roleTarget._id, option.value);
                }
                setRoleAnchor(null);
                setRoleTarget(null);
              }}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Dialog
        open={inviteOpen}
        onClose={closeInvite}
        classes={{paper: classes.dialogPaper}}>
        <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
          <Typography className={classes.dialogTitle}>Invite to your workspace</Typography>
          <IconButton aria-label='Close invite' size='small' onClick={closeInvite}>
            <Icon>close</Icon>
          </IconButton>
        </Box>
        <DialogContent>
          <Typography className={classes.fieldLabel}>Email</Typography>
          <TextField
            className={classes.dialogField}
            variant='outlined'
            placeholder='email@sling.biz'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <Typography className={classes.fieldLabel}>Role</Typography>
          <TextField
            className={classes.dialogField}
            select
            variant='outlined'
            value={role}
            onChange={(e) => setRole(e.target.value)}>
            {ASSIGNABLE.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {error && inviteOpen && (
            <Typography className={classes.status}>{error}</Typography>
          )}
          {lastLink && (
            <Box className={classes.inviteLink}>
              {lastLink}
              <Box className={classes.dialogFooter} style={{marginTop: 10, marginBottom: 0}}>
                <Button className={classes.copyBtn} onClick={() => copy(lastLink)}>
                  Copy link
                </Button>
              </Box>
            </Box>
          )}
          <Box className={classes.dialogFooter}>
            <Button
              className={classes.primaryBtn}
              onClick={invite}
              disabled={!email || inviting}>
              Send invite
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Members;
