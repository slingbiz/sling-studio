import React from 'react';
import AppPage from '../@sling/hoc/DefaultPage/index';
import asyncComponent from '../@sling/utility/asyncComponent';

const CompanyRegistration = asyncComponent(() => import('../modules/company'));
// export default AppPage(() => <CompanyRegistration />);
export default CompanyRegistration;
