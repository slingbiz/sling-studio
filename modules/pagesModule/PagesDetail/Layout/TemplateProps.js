import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import blue from '@material-ui/core/colors/blue';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const staticHelperMap = {
  'response-derived':
    'Value picked from the API response. Please specify the Object key location to be picked from the API response.',
  'static-derived':
    'Values inside curly braces will be replaced from props before rendering',
  static: 'Static values to be used by the component',
  media: 'Array of Image Constants',
};

const useStyles = makeStyles((theme) => ({
  active: {
    background: blue['800'],
    padding: 15,
  },
  formControl: {
    marginTop: -10,
    width: '100%',
    fontSize: '14px',
    fontWeight: '400',
    padding: '0 10',
  },
  fontSet: {
    fontSize: '14px',
    fontWeight: '400',
    margin: '5px 10px',
  },
  accordianDetails: {
    padding: 0,
  },
}));

const NewProp = ({classes}) => {
  return (
    <FormGroup row>
      <Box style={{width: '100%'}}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <IconButton onClick={() => true} disabled={true}>
            <Icon
              color='secondary'
              className={classes.Icon}
              style={{marginRight: '-5px'}}>
              add_circle
            </Icon>
          </IconButton>
          <Box style={{fontWeight: 'bold'}}>Add New Prop? </Box>
        </Box>
        <Box style={{padding: '0 20px', marginBottom: 10}}>
          Add new props for this Widget in the Widgets section. New props will
          automatically reflect here.{' '}
        </Box>
      </Box>
    </FormGroup>
  );
};

export default function TemplateProps({cellProps, disabled}) {
  const [widgetProps, setWidgetProps] = useState(cellProps);
  const classes = useStyles();
  const [propsExpanded, setPropsExpanded] = useState(false);

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setPropsExpanded(isExpanded ? panel : false);
  };

  const handleChange = ({propKey, event}) => {
    widgetProps[propKey].value = event.target.value;
    setWidgetProps({...widgetProps});
  };

  const handleSelectChange = ({propKey, event}) => {
    const currObj = widgetProps[propKey];
    currObj.type = event.target.value;
    setWidgetProps({...widgetProps, [propKey]: currObj});
  };

  if (!Object.keys(widgetProps).length) {
    return <NewProp classes={classes} />;
  }

  return (
    <FormGroup row disabled={disabled}>
      {Object.keys(widgetProps).map((propKey, key, {length}) => {
        const propObj = widgetProps[propKey];
        return (
          <>
            <Accordion
              style={{width: '100%'}}
              expanded={propsExpanded === propKey}
              onChange={handlePanelChange(propKey)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'>
                <span style={{fontWeight: 500}}>{propKey}</span>
              </AccordionSummary>
              <AccordionDetails classes={{root: classes.accordianDetails}}>
                <FormControl
                  key={propKey}
                  className={clsx(classes.formControl)}>
                  {/*<Box htmlFor={propKey}>{propKey}</Box>*/}
                  <Select
                    value={propObj.type}
                    onChange={(event) => handleSelectChange({propKey, event})}
                    className={classes.fontSet}
                    inputProps={{
                      name: {propKey},
                      id: {propKey},
                    }}>
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'response-derived'}>
                      Response Derived
                    </MenuItem>
                    <MenuItem value={'static'}>Static</MenuItem>
                    <MenuItem value={'static-derived'}>Static Derived</MenuItem>
                    <MenuItem value={'media'}>Media</MenuItem>
                  </Select>
                  <Input
                    className={classes.fontSet}
                    id={`input-${propKey}`}
                    value={propObj.value}
                    onChange={(event)=>handleChange({propKey, event})}
                    aria-describedby='component-helper-text'
                  />
                  <FormHelperText style={{padding: '0 10px', marginBottom: 10}}>
                    {staticHelperMap[propObj.type]}
                  </FormHelperText>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            {/*<Box*/}
            {/*  style={{*/}
            {/*    marginTop: 15,*/}
            {/*    width: '100%',*/}
            {/*    marginBottom: 25,*/}
            {/*  }}>*/}
            {/*</Box>*/}
          </>
        );
      })}
      <NewProp classes={classes} />
    </FormGroup>
  );
}
