import React, {useEffect, useState, useCallback, useContext} from 'react';
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Icon,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppsHeader from '../../../@sling/core/AppsContainer/AppsHeader';
import {useSelector, useDispatch} from 'react-redux';
import {
  getWidgets,
  submitForReview,
  reviewWidgetAction,
  publishWidgetAction,
} from '../../../redux/actions/Widgets';
import SandboxedPreview from '../../aiBuilder/components/SandboxedPreview';
import ListEmptyResult from '../../../@sling/core/AppList/ListEmptyResult';
import {useAuthUser} from '../../../@sling/utility/AppHooks';
import AppContext from '../../../@sling/utility/AppContext';
import {resolveWidgetTheme} from '../../aiBuilder/widgetTheme';
import {SLING_CREAM, SLING_ORANGE} from '../../aiBuilder/slingTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: 20,
    overflow: 'auto',
  },
  tabBar: {
    borderBottom: '1px solid #f0e6d8',
    marginBottom: 20,
    '& .MuiTabs-indicator': {
      backgroundColor: SLING_ORANGE,
    },
    '& .MuiTab-root': {
      textTransform: 'none',
      fontSize: 14,
      fontWeight: 500,
      minHeight: 44,
      color: '#6b6f76',
    },
    '& .MuiTab-root.Mui-selected': {
      color: SLING_ORANGE,
    },
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  cardActions: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  previewContainer: {
    border: '1px solid #f0e6d8',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 12,
    minHeight: 360,
    background: '#fff',
  },
  previewError: {
    color: '#b71c1c',
    marginTop: 8,
  },
  emptyPreview: {
    minHeight: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7a4a00',
    background: '#fff8f0',
    border: '1px dashed #f0e6d8',
    borderRadius: 8,
    marginTop: 12,
  },
  btn: {
    fontWeight: Fonts.MEDIUM,
    textTransform: 'none',
    fontSize: 14,
  },
  primaryBtn: {
    fontWeight: 600,
    textTransform: 'none',
    fontSize: 14,
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    boxShadow: 'none',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
  },
  ghostBtn: {
    fontWeight: 500,
    textTransform: 'none',
    fontSize: 14,
    color: SLING_ORANGE,
    borderColor: SLING_ORANGE,
  },
  chipAi: {
    height: 22,
    fontSize: 12,
    backgroundColor: SLING_ORANGE,
    color: '#fff',
  },
  chipStatus: {
    height: 22,
    fontSize: 12,
    backgroundColor: SLING_CREAM,
    color: '#c2410c',
    border: 'none',
  },
  metaRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginBottom: 4,
  },
}));

const STATUS_TABS = [
  {label: 'Pending Review', status: 'pending_review'},
  {label: 'Approved', status: 'approved'},
  {label: 'Rejected', status: 'rejected'},
  {label: 'All Drafts', status: 'draft'},
];

const WidgetReviewQueue = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {widgets} = useSelector(({widgets}) => widgets);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [previewErrors, setPreviewErrors] = useState({});
  const [rejectDialog, setRejectDialog] = useState({open: false, widgetId: null});
  const [rejectNotes, setRejectNotes] = useState('');
  const user = useAuthUser();
  const {theme} = useContext(AppContext);
  const tenantTheme = resolveWidgetTheme(theme);
  const canDecide = user?.role === 'owner' || user?.role === 'admin' || user?.role === 'publisher';

  const currentStatus = STATUS_TABS[activeTab].status;

  const fetchWidgets = useCallback(async () => {
    setFetching(true);
    await dispatch(getWidgets({status: currentStatus, size: 1000, quiet: true}));
    setFetching(false);
  }, [dispatch, currentStatus]);

  useEffect(() => {
    fetchWidgets();
  }, [fetchWidgets]);

  const handleApprove = async (widgetId) => {
    const result = await dispatch(reviewWidgetAction(widgetId, 'approve'));
    if (result) fetchWidgets();
  };

  const handleRejectOpen = (widgetId) => {
    setRejectDialog({open: true, widgetId});
    setRejectNotes('');
  };

  const handleRejectConfirm = async () => {
    const {widgetId} = rejectDialog;
    const result = await dispatch(
      reviewWidgetAction(widgetId, 'reject', rejectNotes),
    );
    setRejectDialog({open: false, widgetId: null});
    setRejectNotes('');
    if (result) fetchWidgets();
  };

  const handlePublish = async (widgetId) => {
    const result = await dispatch(publishWidgetAction(widgetId));
    if (result) fetchWidgets();
  };

  const handleSubmitForReview = async (widgetId) => {
    const result = await dispatch(submitForReview(widgetId));
    if (result) fetchWidgets();
  };

  const renderActions = (item) => {
    const status = item.status;
    return (
      <Box className={classes.cardActions}>
        {status === 'pending_review' && !canDecide && (
          <Typography variant='body2' color='textSecondary'>
            Waiting for a publisher to review
          </Typography>
        )}
        {status === 'pending_review' && canDecide && (
          <>
            <Button
              className={classes.primaryBtn}
              size='small'
              onClick={() => handleApprove(item._id)}
              startIcon={<Icon style={{fontSize: 16}}>check_circle</Icon>}>
              Approve
            </Button>
            <Button
              className={classes.ghostBtn}
              variant='outlined'
              size='small'
              onClick={() => handleRejectOpen(item._id)}
              startIcon={<Icon style={{fontSize: 16}}>cancel</Icon>}>
              Reject
            </Button>
          </>
        )}
        {status === 'approved' && canDecide && (
          <Button
            className={classes.primaryBtn}
            size='small'
            onClick={() => handlePublish(item._id)}
            startIcon={<Icon style={{fontSize: 16}}>publish</Icon>}>
            Publish
          </Button>
        )}
        {status === 'draft' && (
          <Button
            className={classes.ghostBtn}
            variant='outlined'
            size='small'
            onClick={() => handleSubmitForReview(item._id)}
            startIcon={<Icon style={{fontSize: 16}}>rate_review</Icon>}>
            Submit for Review
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      <AppsHeader>
        <IconButton onClick={fetchWidgets} aria-label='Refresh'>
          <Icon>refresh</Icon>
        </IconButton>
      </AppsHeader>
      <Box className={classes.content}>
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          className={classes.tabBar}>
          {STATUS_TABS.map((tab, idx) => (
            <Tab key={idx} label={tab.label} />
          ))}
        </Tabs>

        {fetching && (
          <Box style={{display: 'flex', justifyContent: 'center', padding: 40}}>
            <CircularProgress style={{color: SLING_ORANGE}} />
          </Box>
        )}

        {!fetching && widgets?.length === 0 && (
          <ListEmptyResult
            content={`No widgets with status "${currentStatus.replace(
              '_',
              ' ',
            )}".`}
            loading={false}
          />
        )}

        {!fetching &&
          widgets?.map((item) => (
            <Paper
              key={item._id}
              className={classes.card}
              variant='outlined'>
              <Box className={classes.cardHeader}>
                <Box>
                  <Box className={classes.cardTitle}>
                    <Typography variant='subtitle1' style={{fontWeight: 600}}>
                      {item.name}
                    </Typography>
                    {item.source === 'ai_generated' && (
                      <Chip size='small' label='AI' className={classes.chipAi} />
                    )}
                    {item.source && item.source !== 'ai_generated' && (
                      <Chip
                        size='small'
                        label='Manual'
                        variant='outlined'
                        style={{height: 22, fontSize: 12}}
                      />
                    )}
                    <Chip
                      size='small'
                      label={(item.status || 'draft').replace('_', ' ')}
                      className={classes.chipStatus}
                    />
                  </Box>
                  <Box className={classes.metaRow} style={{marginTop: 4}}>
                    <Typography variant='body2' color='textSecondary'>
                      Key: {item.key}
                    </Typography>
                  </Box>
                  {item.description && (
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      style={{marginTop: 4}}>
                      {item.description}
                    </Typography>
                  )}
                </Box>
                {renderActions(item)}
              </Box>

              {item.code ? (
                <Box className={classes.previewContainer}>
                  <SandboxedPreview
                    code={item.code}
                    dependencies={item.dependencies}
                    themeOverrides={tenantTheme}
                    style={{height: 360}}
                    onError={(message) =>
                      setPreviewErrors((prev) => ({
                        ...prev,
                        [item._id]: message,
                      }))
                    }
                  />
                  {previewErrors[item._id] && (
                    <Typography variant='body2' className={classes.previewError} style={{padding: 12}}>
                      Preview failed: {previewErrors[item._id]}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box className={classes.emptyPreview}>No live preview</Box>
              )}
            </Paper>
          ))}
      </Box>

      <Dialog
        open={rejectDialog.open}
        onClose={() => setRejectDialog({open: false, widgetId: null})}
        maxWidth='sm'
        fullWidth>
        <DialogTitle>Reject Widget</DialogTitle>
        <DialogContent>
          <Typography variant='body2' gutterBottom>
            Provide notes for the rejection (optional):
          </Typography>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={3}
            variant='outlined'
            placeholder='Reason for rejection...'
            value={rejectNotes}
            onChange={(e) => setRejectNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setRejectDialog({open: false, widgetId: null})}>
            Cancel
          </Button>
          <Button
            onClick={handleRejectConfirm}
            color='secondary'
            variant='contained'>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WidgetReviewQueue;
