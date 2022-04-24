import React from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import CompanyDetails from './CompanyDetails';
import Guide from './Guide';
import KeyUsage from './KeysUsage';
import Theme from './Theme';

const SettingsDetail = (props) => {
  const {query} = useRouter();
  const {all} = query;

  const id = all?.[0] || 'company-details';
  console.log('pages', id);
  const sectionMapper = {
    'company-details': CompanyDetails,
    'keys-usage': KeyUsage,
    guide: Guide,
    theme: Theme,
  };

  const RenderSection = sectionMapper[id];
  return (
    <Box style={{minHeight: '100%'}}>
      <RenderSection {...props}></RenderSection>
    </Box>
  );
};

export default SettingsDetail;
