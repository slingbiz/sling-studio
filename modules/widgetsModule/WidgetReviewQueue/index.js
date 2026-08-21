import React, {useEffect, useState, useCallback} from 'react';
import {
  makeStyles,
  Box,
  Grid,
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
    borderBottom: '1px solid rgba(0,0,0,0.12)',
    marginBottom: 20,
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
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 12,
  },
  expandBtn: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: 4,
    color: theme.palette.primary.main,
    marginTop: 8,
  },
  btn: {
    fontWeight: Fonts.MEDIUM,
    textTransform: 'capitalize',
    fontSize: 12,
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

const statusColorMap = {
  draft: 'default',
  pending_review: 'primary',
  approved: 'primary',
  rejected: 'secondary',
  published: 'primary',
};

const WidgetReviewQueue = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {widgets} = useSelector(({widgets}) => widgets);
  const loading = useSelector(({common}) => common.loading);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedWidgets, setExpandedWidgets] = useState({});
  const [rejectDialog, setRejectDialog] = useState({open: false, widgetId: null});
  const [rejectNotes, setRejectNotes] = useState('');

  const currentStatus = STATUS_TABS[activeTab].status;

  const fetchWidgets = useCallback(() => {
    dispatch(getWidgets({status: currentStatus, size: 1000}));
  }, [dispatch, currentStatus]);

  useEffect(() => {
    fetchWidgets();
  }, [fetchWidgets]);

  const toggleExpand = (widgetId) => {
    setExpandedWidgets((prev) => ({
      ...prev,
      [widgetId]: !prev[widgetId],
    }));
  };

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
        {status === 'pending_review' && (
          <>
            <Button
              className={classes.btn}
              variant='contained'
              color='primary'
              size='small'
              onClick={() => handleApprove(item._id)}
              startIcon={<Icon style={{fontSize: 16}}>check_circle</Icon>}>
              Approve
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='secondary'
              size='small'
              onClick={() => handleRejectOpen(item._id)}
              startIcon={<Icon style={{fontSize: 16}}>cancel</Icon>}>
              Reject
            </Button>
          </>
        )}
        {status === 'approved' && (
          <Button
            className={classes.btn}
            variant='contained'
            color='primary'
            size='small'
            onClick={() => handlePublish(item._id)}
            startIcon={<Icon style={{fontSize: 16}}>publish</Icon>}>
            Publish
          </Button>
        )}
        {status === 'draft' && (
          <Button
            className={classes.btn}
            variant='outlined'
            color='primary'
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
        <Box
          fontWeight={Fonts.BOLD}
          component='h3'
          style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <Icon>rate_review</Icon>
          Review Queue
        </Box>
        <IconButton onClick={fetchWidgets}>
          <Icon>refresh</Icon>
        </IconButton>
      </AppsHeader>
      <Box className={classes.content}>
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          indicatorColor='primary'
          textColor='primary'
          className={classes.tabBar}>
          {STATUS_TABS.map((tab, idx) => (
            <Tab key={idx} label={tab.label} />
          ))}
        </Tabs>

        {loading && (
          <Box style={{display: 'flex', justifyContent: 'center', padding: 40}}>
            <CircularProgress />
          </Box>
        )}

        {!loading && widgets?.length === 0 && (
          <ListEmptyResult
            content={`No widgets with status "${currentStatus.replace(
              '_',
              ' ',
            )}".`}
            loading={false}
          />
        )}

        {!loading &&
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
                      <Chip
                        size='small'
                        label='AI'
                        color='primary'
                        style={{height: 20, fontSize: 10}}
                      />
                    )}
                    {item.source && item.source !== 'ai_generated' && (
                      <Chip
                        size='small'
                        label='Manual'
                        variant='outlined'
                        style={{height: 20, fontSize: 10}}
                      />
                    )}
                    <Chip
                      size='small'
                      label={(item.status || 'draft').replace('_', ' ')}
                      variant='outlined'
                      color={statusColorMap[item.status] || 'default'}
                      style={{height: 22, fontSize: 11}}
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

              {item.source === 'ai_generated' && item.code && (
                <>
                  <Box
                    className={classes.expandBtn}
                    onClick={() => toggleExpand(item._id)}>
                    <Icon style={{fontSize: 18}}>
                      {expandedWidgets[item._id]
                        ? 'expand_less'
                        : 'expand_more'}
                    </Icon>
                    <Typography variant='body2'>
                      {expandedWidgets[item._id]
                        ? 'Hide Preview'
                        : 'Show Preview'}
                    </Typography>
                  </Box>
                  {expandedWidgets[item._id] && (
                    <Box className={classes.previewContainer}>
                      <SandboxedPreview
                        code={item.code}
                        dependencies={item.dependencies}
                        style={{minHeight: 300}}
                      />
                    </Box>
                  )}
                </>
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
