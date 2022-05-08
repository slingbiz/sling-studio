import React from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import MarketPlace from './MarketPlace';
import WidgetsIntegration from './WidgetsIntegration';
import WidgetsList from '../WidgetsList';

const PagesDetail = (props) => {
  const {query} = useRouter();
  const id = query.all[0];
  const sectionMapper = {
    'widgets-integration': WidgetsIntegration,
    'blocks-integration': WidgetsIntegration,
    'components-integration': WidgetsIntegration,
    'market-place': MarketPlace,
    // guide: Basic,
  };

  const RenderSection = sectionMapper[id];
  if (RenderSection) {
    return (
      <Box style={{height: '100%'}}>
        <RenderSection {...props}></RenderSection>
      </Box>
    );
  }

  return <WidgetsList {...props}></WidgetsList>;
};

export default PagesDetail;
