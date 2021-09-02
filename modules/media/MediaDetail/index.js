import React from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Basic from './Basic';
import Gallery from './Gallery';
import Constants from './Constants';
import RoutesList from '../MediaList';

const PagesDetail = (props) => {
  const {query} = useRouter();
  const id = query.all[0];
  const sectionMapper = {
    basic: Basic,
    gallery: Gallery,
    constants: Constants,
  };

  const RenderSection = sectionMapper[id];
  if (RenderSection) {
    return (
      <Box style={{height: '100%'}}>
        <RenderSection {...props}></RenderSection>
      </Box>
    );
  }

  return <RoutesList {...props}></RoutesList>;
};

export default PagesDetail;
