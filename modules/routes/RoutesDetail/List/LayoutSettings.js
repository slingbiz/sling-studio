import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import SelectBreakpoints from './SelectBreakpoints';
import {initialWidth} from './NewCellModal';
import DeviceVisibilitySwitches from './DeviceVisibilitySwitches';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  textTruncate: {
    padding: '10px 0',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  accordianDetails: {
    width: '100%',
    padding: '1rem',
    display: 'flex',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    flexDirection: 'column',
  },
  layoutBox: {
    display: 'flex',
    marginBottom: '2rem',
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
  },
}));

const LayoutSettings = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState('panel1');
  const [layoutWidth, setLayoutWidth] = useState(initialWidth);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleWidth = (e) => {
    const {value, name} = e.target;
    console.log(name, value, 'id - value', e.target);
    setLayoutWidth({...layoutWidth, [name]: value});
  };

  return (
    <>
      <Box
        component='h4'
        className={classes.textTruncate}
        color='text.primary'
        alignSelf='flex-start'
        fontWeight={Fonts.BOLD}>
        {'Settings'}
      </Box>
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>General Settings</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordianDetails}>
          <SelectBreakpoints
            classes={classes}
            handleWidth={handleWidth}
            layoutWidth={layoutWidth}
          />
          <DeviceVisibilitySwitches />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default LayoutSettings;
