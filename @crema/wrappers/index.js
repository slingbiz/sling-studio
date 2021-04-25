import AppSidebar from './AppSidebar';
import AppsHeader from './AppsHeader';
import AppsFooter from './AppsFooter';
import AppsContent from './AppsContent';
import DefaultContent from './DefaultContent';

const Wrappers = {
  ['AppsHeader']: AppsHeader,
  ['AppsFooter']: AppsFooter,
  ['AppsContent']: AppsContent,
  ['AppSidebar']: AppSidebar,
  ['DefaultContent']: DefaultContent,
};

export default Wrappers;
