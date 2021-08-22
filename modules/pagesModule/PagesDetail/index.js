import React from 'react';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Basic from './Basic';
import Layout from './Layout';
import DataSource from './DataSource';
import TasksList from '../TasksList';
import Preview from './Preview';

const PagesDetail = (props) => {
  const dispatch = useDispatch();
  const {query} = useRouter();
  const id = query.all[1];

  const sectionMapper = {
    basic: Basic,
    layout: Layout,
    preview: Preview,
    data: DataSource,
  };

  const RenderSection = sectionMapper[id];
  console.log('Render Section ==> ', RenderSection);
  if (RenderSection) {
    return (
      <Box style={{height: '100%'}}>
        <RenderSection {...props}></RenderSection>
      </Box>
    );
  }
  return <TasksList {...props}></TasksList>;
};

export default PagesDetail;
