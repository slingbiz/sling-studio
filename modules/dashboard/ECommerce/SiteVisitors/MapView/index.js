import React, {useState} from 'react';
import MapChart from './MapChart';
import ReactTooltip from 'react-tooltip';
import {Box} from '@material-ui/core';

const MapView = () => {
  const [content, setContent] = useState('');
  return (
    <Box position='relative' height={200}>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </Box>
  );
};

export default MapView;
