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
import TemplateProps from './TemplateProps';
import {Icon, IconButton} from '@material-ui/core';
import AddProps from './AddProps';

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
    // backgroundColor: 'rgba(0, 0, 0, .03)',
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

const muiWidgthArray = ['xs', 'sm', 'md', 'lg', 'xl'];
const widthMapper = {
  sm: 'mobile',
  md: 'tablet',
  lg: 'desktop',
};
let first = (v) => (v && Object.keys(v).length ? v[Object.keys(v)[0]] : '');

const getSwitchProps = ({muiHidden}) => {
  const res = {mobile: true, tablet: true, desktop: true};
  const {only} = muiHidden || {};
  if (only?.length) {
    only.forEach((v) => {
      res[widthMapper[v]] = false;
    });
  }
  // const hiddenProp = first(muiHidden);
  // const match = muiWidgthArray.find((el) => {
  //   if (hiddenProp.includes(el)) {
  //     return true;
  //   }
  // });
  // const valueProp = match?.replace(match, '');
  // if (valueProp.trim().toLocaleLowerCase() === 'up') {
  // }
  return res;
};

const LayoutSettings = ({settingsObj, handleClose}) => {
  const classes = useStyles();
  const {key, payload} = settingsObj;
  console.log(settingsObj, '[settingsObj - settingsObj]');
  const {props: cellProps = {}, muiWidths = {}, muiHidden = {}} = payload || {};
  console.log(cellProps, '[settingsObj ');
  const [expanded, setExpanded] = useState('panel1');
  const [layoutWidth, setLayoutWidth] = useState(
    Object.keys(muiWidths).length ? muiWidths : initialWidth,
  );

  const swithProps = getSwitchProps({muiHidden});
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
        {'Settings'}{' '}
        <span style={{fontWeight: Fonts.LIGHT}}>
          {key ? key : '(Click on a Widget to view Settings)'}
        </span>
      </Box>
      <Accordion
        square
        disabled={!key ? true : false}
        expanded={expanded === 'panel1'}
        style={{borderBottom: '1px solid #c3c3c3'}}
        onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>General Settings</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordianDetails}>
          {/*<Typography>Layout</Typography>*/}
          <SelectBreakpoints
            classes={classes}
            handleWidth={handleWidth}
            layoutWidth={layoutWidth}
          />
          <DeviceVisibilitySwitches
            key={`switch-${key}`}
            swithProps={swithProps}
          />
        </AccordionDetails>
      </Accordion>
      <Box m={4} />
      <Accordion
        square
        disabled={!key ? true : false}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <Typography>Widget Props</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TemplateProps
            cellProps={cellProps}
            handleClose={(toggle) => handleClose(toggle)}
          />
        </AccordionDetails>
      </Accordion>
      {/*<Accordion*/}
      {/*  square*/}
      {/*  expanded={expanded === 'panel3'}*/}
      {/*  onChange={handleChange('panel3')}>*/}
      {/*  <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>*/}
      {/*    <Typography>Collapsible Group Item #3</Typography>*/}
      {/*  </AccordionSummary>*/}
      {/*  <AccordionDetails>*/}
      {/*    <Typography>*/}
      {/*      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse*/}
      {/*      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum*/}
      {/*      dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada*/}
      {/*      lacus ex, sit amet blandit leo lobortis eget.*/}
      {/*    </Typography>*/}
      {/*  </AccordionDetails>*/}
      {/*</Accordion>*/}
    </>
  );
};
export default LayoutSettings;
