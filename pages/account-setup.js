import React from 'react';
import asyncComponent from '../@sling/utility/asyncComponent';

const CompanyRegistration = asyncComponent(() => import('../modules/company'));
// export default AppPage(() => <CompanyRegistration />);
export default CompanyRegistration;
