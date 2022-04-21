import React, {useEffect} from 'react';
import SettingsSideBar from './SettingsSideBar/index';
import SettingsDetail from './SettingsDetail';
import {capitalize} from '@material-ui/core/utils';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@sling/core/AppsContainer';
import {useRouter, withRouter} from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getCompanyInfo} from '../../redux/actions/AccountAction';

const useStyle = makeStyles((theme) => ({
  appsSidebar: {
    margin: '0',
    padding: '0',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '12rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '15rem',
    },
  },
}));

const Index = (props) => {
  const classes = useStyle();
  const router = useRouter();
  const query = props.router.query || {};
  const {account} = useSelector(({account}) => account);
  const {user} = useSelector(({auth}) => auth);

  const dispatch = useDispatch();

  const {all} = query;
  console.log(all);
  console.log('Page Key ==> ', all?.[0] || 'company-details');
  const onGetMainComponent = () => {
    let pageKey = all?.[0] || 'company-details';
    console.log(all?.length, '@@@@all?.length@@@@');
    return <SettingsDetail titleKey={getTitle()} pageKey={pageKey} />;
  };

  useEffect(() => {
    console.log('account', account);
    if (account == null || account == '') {
      dispatch(getCompanyInfo(user.email));
    }
  }, []);

  const getTitle = () => {
    const titleKey = all?.join('.') || 'company-details';
    return messages[titleKey] || all?.map((v) => capitalize(v)).join(' / ');
  };

  const {messages} = useIntl();
  const basePath = all ? `` : `settings/`;

  return (
    <AppsContainer
      pagesClasses={classes}
      title={getTitle()}
      sidebarContent={
        <SettingsSideBar basePath={basePath} noSubChild={true} />
      }>
      <SettingsDetail titleKey={getTitle()} />
    </AppsContainer>
  );
};

export default withRouter(Index);

Index.defaultProps = {
  match: null,
};

Index.prototype = {
  match: PropTypes.node,
};
