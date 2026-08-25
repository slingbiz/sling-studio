import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Icon,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AppsPagination from '../../../../@sling/core/AppsPagination';
import ApiAuth from '../../../../@sling/services/ApiAuthConfig';
import {SERVICE_URL} from '../../../../shared/constants/Services';
import {SLING_INK, SLING_ORANGE} from '../../../aiBuilder/slingTheme';
import {useSelector} from 'react-redux';
import {whoEmail, whoLabel, whoName} from './whoLabel';

const PAGE_SIZE = 25;

const ACTION_FILTERS = [
  {value: 'all', label: 'All'},
  {value: 'widget.generate', label: 'Generate'},
  {value: 'widget.save', label: 'Save'},
  {value: 'widget.update', label: 'Update'},
  {value: 'widget.submit_review', label: 'Submit'},
  {value: 'widget.approve', label: 'Approve'},
  {value: 'widget.reject', label: 'Reject'},
  {value: 'widget.publish', label: 'Publish'},
  {value: 'widget.revert', label: 'Restore'},
  {value: 'theme.update', label: 'Theme'},
];

const ACTION_LABELS = {
  'widget.generate': 'Generate',
  'widget.save': 'Save',
  'widget.update': 'Update',
  'widget.submit_review': 'Submit',
  'widget.approve': 'Approve',
  'widget.reject': 'Reject',
  'widget.publish': 'Publish',
  'widget.revert': 'Restore',
  'theme.update': 'Theme',
};

const useStyles = makeStyles(() => ({
  page: {
    padding: '12px 28px 32px',
    background: '#fff',
    fontFamily: 'Open Sans, sans-serif',
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
    fontFamily: 'Open Sans, sans-serif',
  },
  tableHead: {
    display: 'grid',
    gridTemplateColumns: 'minmax(160px, 1.3fr) minmax(160px, 1.3fr) 130px minmax(140px, 1.2fr)',
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
    gridTemplateColumns: 'minmax(160px, 1.3fr) minmax(160px, 1.3fr) 130px minmax(140px, 1.2fr)',
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
    pointerEvents: 'none',
    background: '#f4f5f8',
    color: SLING_INK,
  },
  status: {
    fontSize: 14,
    color: '#c62828',
    margin: '8px 0',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: 48,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 12,
    '& .MuiTablePagination-caption, & .MuiTablePagination-toolbar': {
      fontSize: 14,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiIconButton-root': {color: SLING_ORANGE},
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

const formatWhen = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const objectLabel = (event) => {
  if (event.metadata && event.metadata.key) return event.metadata.key;
  if (event.resourceType === 'theme') return 'Theme';
  if (event.resourceType === 'widget') return event.resourceId || 'Widget';
  return event.resourceType || '—';
};

const Audit = () => {
  const classes = useStyles();
  const {user} = useSelector(({auth}) => auth);
  const canManage = user?.role === 'owner' || user?.role === 'admin';
  const [events, setEvents] = useState([]);
  const [tc, setTc] = useState(0);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [booted, setBooted] = useState(false);

  const forbiddenCopy =
    'Only Owners and Admins can view audit. Ask your Owner if you need access.';

  const load = async ({nextPage = page, nextQuery = query, nextAction = actionFilter, initial = false} = {}) => {
    setError('');
    if (initial || !booted) setLoading(true);
    try {
      const Api = await ApiAuth();
      const params = new URLSearchParams({
        page: String(nextPage),
        size: String(PAGE_SIZE),
      });
      if (nextQuery.trim()) params.set('q', nextQuery.trim());
      if (nextAction !== 'all') params.set('action', nextAction);
      const res = await Api.get(`${SERVICE_URL}v1/audit?${params.toString()}`);
      setEvents(res.data.events || []);
      setTc(res.data.tc || 0);
    } catch (err) {
      if (err?.response?.status === 403) {
        setError(forbiddenCopy);
      } else {
        setError(err?.response?.data?.message || 'Could not load audit');
      }
    } finally {
      setLoading(false);
      setBooted(true);
    }
  };

  useEffect(() => {
    if (!canManage) {
      setLoading(false);
      setError(forbiddenCopy);
      return;
    }
    load({nextPage: 0, initial: true});
    setPage(0);
  }, [canManage]);

  const search = (nextQuery) => {
    setQuery(nextQuery);
    setPage(0);
    load({nextPage: 0, nextQuery, nextAction: actionFilter});
  };

  const changeAction = (value) => {
    setActionFilter(value);
    setFilterAnchor(null);
    setPage(0);
    load({nextPage: 0, nextQuery: query, nextAction: value});
  };

  return (
    <>
      <Box className={classes.page}>
        <Box className={classes.toolbar}>
          <Box className={classes.toolbarLeft}>
            <TextField
              className={classes.search}
              size='small'
              variant='outlined'
              placeholder='Search by action or widget'
              value={query}
              onChange={(e) => search(e.target.value)}
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
              {ACTION_FILTERS.find((item) => item.value === actionFilter)?.label || 'All'}
            </Button>
            <Menu
              anchorEl={filterAnchor}
              open={Boolean(filterAnchor)}
              onClose={() => setFilterAnchor(null)}>
              {ACTION_FILTERS.map((item) => (
                <MenuItem key={item.value} onClick={() => changeAction(item.value)}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        {error && <Typography className={classes.status}>{error}</Typography>}

        {loading ? (
          <Box className={classes.loader}>
            <CircularProgress style={{color: SLING_ORANGE}} />
          </Box>
        ) : (
          <>
            <Box className={classes.tableHead}>
              <span>When</span>
              <span>Who</span>
              <span>Action</span>
              <span>Widget / object</span>
            </Box>
            <Box className={classes.sectionBar}>Events {tc}</Box>
            {!loading && events.length === 0 && (
              <Box className={classes.row}>
                <Typography className={classes.mutedCell}>
                  {query || actionFilter !== 'all'
                    ? 'No activity matches this search.'
                    : 'Nothing has been governed yet. Generate or save a widget to see activity here.'}
                </Typography>
              </Box>
            )}
            {events.map((event) => {
              const id = event.id || event._id;
              const name = whoLabel(event);
              const email = whoEmail(event);
              return (
                <Box className={classes.row} key={id}>
                  <Typography className={classes.mutedCell}>
                    {formatWhen(event.createdAt)}
                  </Typography>
                  <Box className={classes.nameCell}>
                    <Avatar className={classes.avatar}>
                      {initials(whoName(event), email)}
                    </Avatar>
                    <Box minWidth={0}>
                      <Typography className={classes.name} noWrap>
                        {name}
                      </Typography>
                      <Typography className={classes.handle} noWrap>
                        {email && email !== name ? email : ''}
                      </Typography>
                    </Box>
                  </Box>
                  <span className={classes.pill}>
                    {ACTION_LABELS[event.action] || event.action}
                  </span>
                  <Typography className={classes.cell}>{objectLabel(event)}</Typography>
                </Box>
              );
            })}
            {tc > PAGE_SIZE && (
              <Box className={classes.pagination}>
                <AppsPagination
                  count={tc}
                  page={page}
                  rowsPerPage={PAGE_SIZE}
                  onPageChange={(event, nextPage) => {
                    setPage(nextPage);
                    load({nextPage});
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Audit;
