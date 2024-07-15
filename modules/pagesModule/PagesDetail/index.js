import React from 'react';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Basic from './Basic';
import Layout from './Layout';
import DataSource from './DataSource';
import TasksList from '../TasksList';
import Preview from './Preview';
import PagesList from '../PagesList';
import Guide from './Guide';

const PagesDetail = (props) => {
  const {query} = useRouter();
  const id = query.all[1] || query.all[0];
  const sectionMapper =
    id === 'templates' || id === 'guide'
      ? {
          templates: PagesList,
        }
      : {
          templates: PagesList,
          basic: Basic,
          layout: Layout,
          preview: Preview,
          data: DataSource,
          guide: Guide,
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
  return <Guide {...props}></Guide>;
};

export default PagesDetail;
