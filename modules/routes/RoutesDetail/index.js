import React from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Basic from './Basic';
import List from './List';
import RoutesList from '../RoutesList';

const PagesDetail = (props) => {
  const {query} = useRouter();
  const id = query.all[0];
  const sectionMapper = {
    basic: Basic,
    'routes-list': List,
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
