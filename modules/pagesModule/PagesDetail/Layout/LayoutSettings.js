import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SelectBreakpoints from './SelectBreakpoints';
import {initialWidth} from './NewCellModal';
import DeviceVisibilitySwitches from './DeviceVisibilitySwitches';
import TemplateProps from './TemplateProps';
import {useSelector} from 'react-redux';

const SLING_INK = '#163a5f';

const Accordion = withStyles({
  root: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: 8,
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    marginBottom: 16,
    overflow: 'hidden',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '0 0 16px',
    },
    '&$disabled': {
      backgroundColor: '#fff',
    },
  },
  expanded: {},
  disabled: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#fff',
    marginBottom: -1,
    minHeight: 56,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Open Sans, sans-serif',
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: 0,
    },
    '& .MuiTypography-root': {
      fontSize: 16,
      fontWeight: 600,
      color: SLING_INK,
      fontFamily: 'Open Sans, sans-serif',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: 16,
    backgroundColor: '#fff',
  },
})(MuiAccordionDetails);

const useStyles = makeStyles(() => ({
  panelTitle: {
    padding: '0 0 12px',
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
    lineHeight: 1.35,
  },
  emptyHint: {
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
    color: SLING_INK,
    lineHeight: 1.5,
    marginBottom: 16,
  },
  accordianDetails: {
    width: '100%',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  layoutBox: {
    display: 'flex',
    marginBottom: 8,
    flexDirection: 'column',
  },
  propsCard: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: 8,
    boxShadow: 'none',
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
}));

const widthMapper = {
  sm: 'mobile',
  md: 'tablet',
  lg: 'desktop',
};

const getSwitchProps = ({muiHidden}) => {
  const res = {mobile: true, tablet: true, desktop: true};
  const {only} = muiHidden || {};
  if (only?.length) {
    only.forEach((v) => {
      res[widthMapper[v]] = false;
    });
  }
  return res;
};

const LayoutSettings = ({settingsObj}) => {
  const classes = useStyles();
  const {key, payload} = settingsObj;
  const {widgets} = useSelector(({widgets}) => widgets);

  if (payload && !payload.props) {
    payload.props = {};
  }
  const cellProps = (payload && payload.props) || {};
  const muiWidths = (payload && payload.muiWidths) || {};
  const muiHidden = (payload && payload.muiHidden) || {only: []};

  const selectedWidget = widgets.find((w) => w.key === key);
  if (selectedWidget) {
    (selectedWidget.props || []).forEach(
      ({name, propType, dataType, default: defaultVal}) => {
        if (!name || cellProps[name]) return;
        cellProps[name] = {
          type: propType,
          dataType,
          default: defaultVal,
          value: defaultVal,
        };
      },
    );
  }
  const [expanded, setExpanded] = useState('panel1');
  const [layoutWidth, setLayoutWidth] = useState(
    Object.keys(muiWidths).length ? muiWidths : initialWidth,
  );
  const [hiddenStatus, setHiddenStatus] = useState(muiHidden);

  const switchProps = getSwitchProps({muiHidden: hiddenStatus});
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleWidth = (e) => {
    const {value, name} = e.target;
    console.log(name, value, 'id - value', e.target);
    setLayoutWidth({...layoutWidth, [name]: value});
  };

  useEffect(() => {
    if (settingsObj?.payload?.muiWidths) {
      settingsObj.payload.muiWidths = layoutWidth;
    }
    if (settingsObj?.payload?.muiHidden) {
      settingsObj.payload.muiHidden = hiddenStatus;
    }
    if (settingsObj?.payload && !settingsObj.payload.muiHidden) {
      settingsObj.payload.muiHidden = {only: []};
    }
  }, [layoutWidth, hiddenStatus]);

  const controlsDisabled = !key;

  return (
    <>
      <Box component='h4' className={classes.panelTitle}>
        Settings
      </Box>
      {controlsDisabled ? (
        <Box className={classes.emptyHint}>
          Click a widget on the canvas to edit settings.
        </Box>
      ) : null}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls='panel1d-content'
          id='panel1d-header'
          disableRipple>
          <Typography>General Settings</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordianDetails}>
          <SelectBreakpoints
            disabled={controlsDisabled}
            classes={classes}
            muiWidths={muiWidths}
            handleWidth={handleWidth}
            layoutWidth={layoutWidth}
          />
          <DeviceVisibilitySwitches
            disabled={controlsDisabled}
            key={`switch-${key}`}
            switchProps={switchProps}
            setHiddenStatus={setHiddenStatus}
            hiddenStatus={hiddenStatus}
          />
        </AccordionDetails>
      </Accordion>
      <Box className={classes.propsCard}>
        <TemplateProps
          cellProps={cellProps}
          disabled={controlsDisabled}
          selectedWidget={selectedWidget}
        />
      </Box>
    </>
  );
};
export default LayoutSettings;
