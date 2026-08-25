import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Basic from './Basic';
import Layout from './Layout';
import Preview from './Preview';
import PagesList from '../PagesList';
import Guide from './Guide';

const PagesDetail = (props) => {
  const router = useRouter();
  const {query} = router;
  const pageKey = query.all?.[0];
  const section = query.all?.[1] || query.all?.[0];

  useEffect(() => {
    if (section === 'data' && pageKey) {
      router.replace(`/pages/${pageKey}/layout`);
    }
  }, [pageKey, section, router]);

  const sectionMapper =
    pageKey === 'templates' || pageKey === 'guide'
      ? {
          templates: PagesList,
        }
      : {
          templates: PagesList,
          basic: Basic,
          layout: Layout,
          preview: Preview,
          guide: Guide,
        };

  const RenderSection =
    section === 'data' ? Layout : sectionMapper[section];
  if (RenderSection) {
    return (
      <Box style={{height: '100%'}}>
        <RenderSection {...props} />
      </Box>
    );
  }
  return <Guide {...props} />;
};

export default PagesDetail;
