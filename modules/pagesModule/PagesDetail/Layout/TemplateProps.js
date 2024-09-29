import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import blue from '@material-ui/core/colors/blue';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Input,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Editor from '@monaco-editor/react';

const staticHelperMap = {
  'response-derived':
    'Value picked from the API response. Please specify the Object key location to be picked from the API response.',
  'static-derived':
    'Values inside curly braces will be replaced from props before rendering',
  static: 'Static values to be used by the component',
  media: 'Array of Image Constants',
  json: 'Enter a valid JSON object.',
};

const useStyles = makeStyles((theme) => ({
  inputAdornmentRoot: {
    marginRight: '0px', // Adjust as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
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
    margin: '10px',
  },
  accordianDetails: {
    padding: 0,
  },
  editor: {
    height: '300px', // Adjust as needed
    padding: 10,

    // border: '1px solid #ccc',
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
          automatically reflect here.
        </Box>
      </Box>
    </FormGroup>
  );
};

export default function TemplateProps({cellProps, disabled}) {
  const [widgetProps, setWidgetProps] = useState(cellProps);
  const classes = useStyles();
  const [propsExpanded, setPropsExpanded] = useState(false);
  const [tempValues, setTempValues] = useState({}); // Temporary input values
  const [isEditing, setIsEditing] = useState({}); // Track editing state for each input
  const [jsonError, setJsonError] = useState({}); // To track JSON validation errors

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setPropsExpanded(isExpanded ? panel : false);
  };

  const handleChange = ({propKey, event}) => {
    widgetProps[propKey].value = event.target.value;
    setWidgetProps({...widgetProps});
  };

  const handleInputChange = ({propKey, event}) => {
    const newTempValues = {...tempValues, [propKey]: event.target.value};
    setTempValues(newTempValues);
    setIsEditing({...isEditing, [propKey]: true});
  };

  const handleSave = (propKey) => {
    const value = tempValues[propKey];

    // If type is JSON, validate it
    if (widgetProps[propKey].type === 'json') {
      try {
        JSON.parse(value);

        setJsonError({...jsonError, [propKey]: false});
        handleChange({propKey, event: {target: {value: JSON.parse(value)}}});
        setIsEditing({...isEditing, [propKey]: false});
        return;
      } catch (e) {
        setJsonError({...jsonError, [propKey]: true});
        return; // Exit if the JSON is invalid
      }
    }

    handleChange({propKey, event: {target: {value}}});
    setIsEditing({...isEditing, [propKey]: false});
  };

  const handleCancel = (propKey) => {
    setTempValues({...tempValues, [propKey]: widgetProps[propKey].value});
    setIsEditing({...isEditing, [propKey]: false});
    setJsonError({...jsonError, [propKey]: false});
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
        const tempValue =
          tempValues[propKey] !== undefined
            ? tempValues[propKey]
            : propObj.value; // Use temp value or fallback to original

        return (
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
              <FormControl key={propKey} className={clsx(classes.formControl)}>
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
                  <MenuItem value={'json'}>JSON</MenuItem>
                </Select>

                {/* Show Monaco Editor for JSON type */}
                {propObj.type === 'json' ? (
                  <>
                    <Editor
                      height='300px'
                      defaultLanguage='json'
                      theme='vs-dark'
                      value={
                        typeof tempValue === 'string'
                          ? tempValue
                          : JSON.stringify(tempValue, null, 2)
                      } // Ensure formatted JSON
                      options={{
                        minimap: {enabled: false},
                        automaticLayout: true,
                        wordWrap: 'on',
                      }}
                      onChange={(value) =>
                        handleInputChange({propKey, event: {target: {value}}})
                      }
                      className={classes.editor}
                    />
                    {jsonError[propKey] && (
                      <FormHelperText error>Invalid JSON format</FormHelperText>
                    )}
                  </>
                ) : (
                  <Input
                    className={classes.fontSet}
                    id={`input-${propKey}`}
                    value={tempValue}
                    onChange={(event) => handleInputChange({propKey, event})}
                    aria-describedby='component-helper-text'
                  />
                )}

                {isEditing[propKey] && (
                  <InputAdornment
                    position='end'
                    classes={{
                      root: classes.inputAdornmentRoot, // Create a class in `makeStyles` to handle the style overrides
                    }}>
                    <IconButton onClick={() => handleSave(propKey)} edge='end'>
                      <CheckCircleIcon style={{color: 'green'}} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleCancel(propKey)}
                      edge='end'>
                      <CancelIcon style={{color: 'red'}} />
                    </IconButton>
                  </InputAdornment>
                )}
                <FormHelperText style={{padding: '0 10px', marginBottom: 10}}>
                  {staticHelperMap[propObj.type]}
                </FormHelperText>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <NewProp classes={classes} />
    </FormGroup>
  );
}
