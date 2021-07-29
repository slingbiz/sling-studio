import React from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Basic from './Basic';
import List from './List';
import ApisList from '../ApisList';

const PagesDetail = (props) => {
  const {query} = useRouter();
  const id = query.all[0];
  console.log(query, '@id--PagesDetail');
  const sectionMapper = {
    basic: Basic,
    'api-list': List,
  };

  const RenderSection = sectionMapper[id];
  if (RenderSection) {
    return (
      <>
        <Box>
          <RenderSection {...props}></RenderSection>
        </Box>
      </>
    );
  }

  return <ApisList {...props}></ApisList>;
};

export default PagesDetail;
