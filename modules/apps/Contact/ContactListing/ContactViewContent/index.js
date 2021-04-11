import ContactListItem from './ContactListItem';
import Box from '@material-ui/core/Box';
import ContactGridItem from './ContactGridItem';
import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppList from '../../../../../@crema/core/AppList';
import AppGrid from '../../../../../@crema/core/AppGrid';
import ListEmptyResult from '../../../../../@crema/core/AppList/ListEmptyResult';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import ContactListSkeleton from '../../../../../@crema/core/Skeleton/ContactListSkeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));
const ContactViewContent = (props) => {
  const {
    list,
    pageView,
    loading,
    handleAddContactOpen,
    onChangeStarred,
    onChangeCheckedContacts,
    checkedContacts,
    onSelectContactsForDelete,
    onOpenEditContact,
    onViewContactDetail,
  } = props;
  const labelList = useSelector(({contactApp}) => contactApp.labelList);

  const classes = useStyles();

  return (
    <>
      {pageView === 'list' ? (
        <AppList
          data={list}
          animation='transition.slideUpIn'
          className={classes.root}
          ListEmptyComponent={
            <ListEmptyResult
              loading={loading}
              actionTitle={<IntlMessages id='contactApp.createContact' />}
              onClick={handleAddContactOpen}
              placeholder={<ContactListSkeleton />}
            />
          }
          renderRow={(contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              labelList={labelList}
              onChangeCheckedContacts={onChangeCheckedContacts}
              checkedContacts={checkedContacts}
              onSelectContactsForDelete={onSelectContactsForDelete}
              onChangeStarred={onChangeStarred}
              onViewContactDetail={onViewContactDetail}
              onOpenEditContact={onOpenEditContact}
            />
          )}
        />
      ) : (
        <Box p={6}>
          <AppGrid
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
            }}
            data={list}
            renderRow={(contact) => (
              <ContactGridItem
                key={contact.id}
                contact={contact}
                labelList={labelList}
                onChangeCheckedContacts={onChangeCheckedContacts}
                checkedContacts={checkedContacts}
                onChangeStarred={onChangeStarred}
                onSelectContactsForDelete={onSelectContactsForDelete}
                onViewContactDetail={onViewContactDetail}
                onOpenEditContact={onOpenEditContact}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};
// xs={12} sm={6} md={4}
export default ContactViewContent;

ContactViewContent.defaultProps = {
  list: [],
  checkedContacts: [],
};

ContactViewContent.prototype = {
  list: PropTypes.array,
  pageView: PropTypes.string.isRequired,
  checkedContacts: PropTypes.array,
  onChangeCheckedContacts: PropTypes.func,
  onChangeStarred: PropTypes.func,
  onSelectContactsForDelete: PropTypes.func,
  onOpenEditContact: PropTypes.func,
  onViewContactDetail: PropTypes.func,
};
