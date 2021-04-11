import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  onGetFolderList,
  onGetLabelList,
} from '../../../redux/actions/ContactApp';
import ContactListing from './ContactListing';
import {useIntl} from 'react-intl';
import AppsContainer from '../../../@crema/core/AppsContainer';
import SideBarContent from './ContactSideBar';

const Contact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetLabelList());
  }, [dispatch]);

  const {messages} = useIntl();
  return (
    <AppsContainer
      title={messages['contactApp.contact']}
      sidebarContent={<SideBarContent />}>
      <ContactListing />
    </AppsContainer>
  );
};

export default Contact;
