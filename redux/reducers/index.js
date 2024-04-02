import {combineReducers} from 'redux';
import Settings from './Setting';
import Common from './Common';
import Dashboard from './Dashboard';
import Gallery from './Gallery';
import Auth from './Auth';
import ApiList from './ApiList';
import UrlList from './UrlList';
import RouteList from './Route';
import PageTemplate from './PageTemplate';
import Media from './Media';
import Widgets from './Widgets';
import AccountReducer from './AccountReducer';

const reducers = combineReducers({
  settings: Settings,
  auth: Auth,
  dashboard: Dashboard,
  common: Common,
  gallery: Gallery,
  apiList: ApiList,
  UrlList: UrlList,
  routeList: RouteList,
  pageTemplate: PageTemplate,
  media: Media,
  widgets: Widgets,
  account: AccountReducer,
});
export default reducers;
