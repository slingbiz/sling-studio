import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ApiAuth from '../../../@sling/services/ApiAuthConfig';
import {SERVICE_URL} from '../../../shared/constants/Services';
import AppsPagination from '../../../@sling/core/AppsPagination';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../../aiBuilder/slingTheme';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

const PAGE_SIZE = 20;

const ACTION_LABELS = {
  save: 'Save',
  submit: 'Submit',
  publish: 'Publish',
  approve: 'Approve',
  reject: 'Reject',
  revert: 'Restore',
  generate: 'Generate',
};

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Open Sans, sans-serif',
  },
  tableHead: {
    display: 'grid',
    gridTemplateColumns: 'minmax(160px, 1.4fr) 160px 110px 90px auto',
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
    gridTemplateColumns: 'minmax(160px, 1.4fr) 160px 110px 90px auto',
    gap: 12,
    alignItems: 'center',
    padding: '12px 8px',
    minHeight: 60,
    cursor: 'pointer',
    borderRadius: 8,
  },
  rowSelected: {
    background: SLING_CREAM,
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
    background: '#f4f5f8',
    color: '#5c6066',
  },
  pillRestore: {
    background: SLING_CREAM,
    color: '#c2410c',
  },
  pillPublish: {
    background: '#fff3e0',
    color: '#e65100',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    visibility: 'visible',
    opacity: 1,
  },
  restoreBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    fontSize: 14,
    fontWeight: 600,
    minWidth: 0,
    padding: '6px 10px',
    fontFamily: 'Open Sans, sans-serif',
    visibility: 'visible',
    opacity: 1,
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
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: 48,
  },
  codeWrap: {
    border: '1px solid #e6e6e6',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#fff',
    marginTop: 16,
  },
  codeChrome: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    background: SLING_CREAM,
    borderBottom: '1px solid #f0e6d8',
  },
  codeChromeLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: SLING_ORANGE,
    fontFamily: 'Open Sans, sans-serif',
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
  dialogBody: {
    fontSize: 14,
    color: '#6b6f76',
    marginTop: 8,
    lineHeight: 1.5,
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 24,
    marginBottom: 8,
  },
  ghostBtn: {
    textTransform: 'none',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Open Sans, sans-serif',
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
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
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

const slingEditorOptions = {
  readOnly: true,
  minimap: {enabled: false},
  fontSize: 14,
  lineNumbers: 'on',
  wordWrap: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: {top: 12, bottom: 12},
};

const handleEditorBeforeMount = (monaco) => {
  monaco.editor.defineTheme('sling-cream', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#ffffff',
      'editor.lineHighlightBackground': '#fff8f0',
      'editorLineNumber.foreground': '#c4a574',
      'editorCursor.foreground': '#ff9800',
      'editor.selectionBackground': '#ff980033',
    },
  });
};

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

const actorName = (version) =>
  version.actorName || version.actorEmail || 'Someone in this workspace';

const loadErrorCopy = (err) => {
  if (err?.response?.status === 404) {
    return 'That widget is gone. Close this and open it again.';
  }
  return err?.response?.data?.message || 'Could not load history. Try again.';
};

const restoreErrorCopy = (err) => {
  if (err?.response?.status === 403) {
    return 'Only Owners, Admins, and Publishers can restore a widget.';
  }
  if (err?.response?.status === 404) {
    return 'That version is gone. Refresh History.';
  }
  return err?.response?.data?.message || 'Could not restore this version. Try again.';
};

const WidgetHistory = ({widgetId, canRestore = false, onRestored}) => {
  const classes = useStyles();
  const [versions, setVersions] = useState([]);
  const [tc, setTc] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [restoring, setRestoring] = useState(false);

  const load = async (nextPage = page) => {
    if (!widgetId) return;
    setError('');
    setLoading(true);
    try {
      const Api = await ApiAuth();
      const res = await Api.get(
        `${SERVICE_URL}v1/widgets/${widgetId}/versions?page=${nextPage}&size=${PAGE_SIZE}`,
      );
      setVersions(res.data.versions || []);
      setTc(res.data.tc || 0);
    } catch (err) {
      setError(loadErrorCopy(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0);
    setPage(0);
    setSelected(null);
  }, [widgetId]);

  const restore = async () => {
    if (!confirm || !widgetId) return;
    setRestoring(true);
    setError('');
    try {
      const Api = await ApiAuth();
      const versionId = confirm.id || confirm._id;
      const res = await Api.post(
        `${SERVICE_URL}v1/widgets/${widgetId}/versions/${versionId}/revert`,
      );
      setNotice('Restored as a draft. Publish to put it on the live site.');
      setConfirm(null);
      setSelected(null);
      onRestored?.(res.data.widget);
      await load(page);
    } catch (err) {
      setError(restoreErrorCopy(err));
    } finally {
      setRestoring(false);
    }
  };

  const pillClass = (action) => {
    if (action === 'revert') return `${classes.pill} ${classes.pillRestore}`;
    if (action === 'publish' || action === 'generate') {
      return `${classes.pill} ${classes.pillPublish}`;
    }
    return classes.pill;
  };

  return (
    <Box className={classes.root}>
      {error && <Typography className={classes.status}>{error}</Typography>}
      {notice && <Typography className={classes.notice}>{notice}</Typography>}

      {loading ? (
        <Box className={classes.loader}>
          <CircularProgress style={{color: SLING_ORANGE}} />
        </Box>
      ) : (
        <>
          <Box className={classes.tableHead}>
            <span>Who</span>
            <span>When</span>
            <span>Action</span>
            <span>Version</span>
            <span />
          </Box>
          <Box className={classes.sectionBar}>Versions {tc}</Box>
          {versions.length === 0 && (
            <Box className={classes.row}>
              <Typography className={classes.mutedCell}>
                No versions yet. Save this widget to start history.
              </Typography>
            </Box>
          )}
          {versions.map((version) => {
            const id = version.id || version._id;
            const isSelected = selected && (selected.id || selected._id) === id;
            return (
              <Box
                className={`${classes.row}${isSelected ? ` ${classes.rowSelected}` : ''}`}
                key={id}
                onClick={() => setSelected(version)}>
                <Box className={classes.nameCell}>
                  <Avatar className={classes.avatar}>
                    {initials(version.actorName, version.actorEmail)}
                  </Avatar>
                  <Box minWidth={0}>
                    <Typography className={classes.name} noWrap>
                      {actorName(version)}
                    </Typography>
                    <Typography className={classes.handle} noWrap>
                      {version.actorEmail || ''}
                    </Typography>
                  </Box>
                </Box>
                <Typography className={classes.mutedCell}>
                  {formatWhen(version.createdAt)}
                </Typography>
                <span className={pillClass(version.action)}>
                  {ACTION_LABELS[version.action] || version.action}
                </span>
                <Typography className={classes.cell}>v{version.version}</Typography>
                <Box className={classes.actions}>
                  {canRestore && (
                    <Button
                      className={classes.restoreBtn}
                      aria-label='Restore version'
                      onClick={(event) => {
                        event.stopPropagation();
                        setConfirm(version);
                      }}>
                      Restore
                    </Button>
                  )}
                </Box>
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
                  load(nextPage);
                }}
              />
            </Box>
          )}
        </>
      )}

      {selected && (
        <Box className={classes.codeWrap}>
          <Box className={classes.codeChrome}>
            <Typography className={classes.codeChromeLabel}>
              Version {selected.version} · read only
            </Typography>
          </Box>
          <MonacoEditor
            height='320px'
            language='javascript'
            theme='sling-cream'
            value={selected.code || ''}
            beforeMount={handleEditorBeforeMount}
            options={slingEditorOptions}
          />
        </Box>
      )}

      <Dialog
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        classes={{paper: classes.dialogPaper}}>
        <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
          <Typography className={classes.dialogTitle}>Restore this version?</Typography>
          <IconButton aria-label='Close restore' size='small' onClick={() => setConfirm(null)}>
            <Icon>close</Icon>
          </IconButton>
        </Box>
        <DialogContent>
          <Typography className={classes.dialogBody}>
            This copies the old code into the widget as a draft. The live site does not
            change until you publish.
          </Typography>
          <Box className={classes.dialogFooter}>
            <Button className={classes.ghostBtn} onClick={() => setConfirm(null)}>
              Cancel
            </Button>
            <Button
              className={classes.primaryBtn}
              onClick={restore}
              disabled={restoring}>
              Restore
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WidgetHistory;
