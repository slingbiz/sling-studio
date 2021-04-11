import React, {useEffect} from 'react';
import MailsList from './MailsList';
import MailDetail from './MailDetail';
import {
  onGetConnectionList,
  onGetFolderList,
  onGetLabelList,
} from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import AppsContainer from '../../../@crema/core/AppsContainer';
import MailSidebar from './MailSideBar';
import {useIntl} from 'react-intl';
import {withRouter} from 'next/router';

const Mail = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetConnectionList());
  }, [dispatch]);

  const onGetMainComponent = () => {
    if (+props.router.query.all[1] > 0) {
      return <MailDetail />;
    } else {
      return <MailsList />;
    }
  };

  const {messages} = useIntl();
  return (
    <AppsContainer
      title={messages['mailApp.mail']}
      sidebarContent={<MailSidebar />}>
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default withRouter(Mail);

Mail.defaultProps = {
  match: null,
};

Mail.prototype = {
  match: PropTypes.node,
};
