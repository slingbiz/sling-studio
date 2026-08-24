import React from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import WidgetsIntegration from './WidgetsIntegration';
import WidgetsList from '../WidgetsList';
import AiGenerateWidget from '../AiGenerateWidget';
import WidgetReviewQueue from '../WidgetReviewQueue';

const LEGACY_WIDGET_ALIASES = {
  'market-place': 'widgets-integration',
  guide: 'widgets-integration',
};

const PagesDetail = (props) => {
  const {query} = useRouter();
  const rawId = query?.all?.[0] || 'widgets-integration';
  const id = LEGACY_WIDGET_ALIASES[rawId] || rawId;
  const sectionMapper = {
    'widgets-integration': WidgetsIntegration,
    'blocks-integration': WidgetsIntegration,
    'components-integration': WidgetsIntegration,
    'ai-generate': AiGenerateWidget,
    'review-queue': WidgetReviewQueue,
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
