import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import MailContentHeader from './MailContentHeader';
import MailListItem from './MailListItem';
import {
  onGetMailList,
  onUpdateReadStatus,
  onUpdateStarredStatus,
} from '../../../../redux/actions';
import {Hidden} from '@material-ui/core';
import AppsPagination from '../../../../@crema/core/AppsPagination';
import {makeStyles} from '@material-ui/core/styles';
import AppsContent from '../../../../@crema/core/AppsContainer/AppsContent';
import AppsHeader from '../../../../@crema/core/AppsContainer/AppsHeader';
import AppsFooter from '../../../../@crema/core/AppsContainer/AppsFooter';
import AppList from '../../../../@crema/core/AppList';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import EmailListSkeleton from '../../../../@crema/core/Skeleton/EmailListSkeleton';

const useStyles = makeStyles(theme => ({
  paddingY: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const MailsList = props => {
  const dispatch = useDispatch();
  const router = useRouter();

  const mailList = useSelector(({mailApp}) => mailApp.mailList);

  const labelList = useSelector(({mailApp}) => mailApp.labelList);

  const [page, setPage] = useState(0);

  const {query} = router;

  const path = query.all;

  const loading = useSelector(({common}) => common.loading);

  useEffect(() => {
    setPage(0);
  }, [query]);

  useEffect(() => {
    setPage(0);
    dispatch(onGetMailList(path[path.length - 2], path[path.length - 1], page));
  }, [dispatch, page, path]);

  const [checkedMails, setCheckedMails] = useState([]);

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const onChangeCheckedMails = (event, id) => {
    if (event.target.checked) {
      setCheckedMails(checkedMails.concat(id));
    } else {
      setCheckedMails(checkedMails.filter(mailId => mailId !== id));
    }
  };

  const onViewMailDetail = mail => {
    const changedMailList = [mail.id];
    dispatch(onUpdateReadStatus(changedMailList, true));
    router.push(`/apps/mail/${query.all[1]}/${mail.id}`);
  };

  const onChangeStarred = (checked, mail) => {
    const selectedIdList = [mail.id];
    dispatch(
      onUpdateStarredStatus(selectedIdList, checked, path[path.length - 1]),
    );
  };

  const totalMails = useSelector(({mailApp}) => mailApp.totalMails);

  const classes = useStyles(props);

  return (
    <>
      <AppsHeader>
        <MailContentHeader
          checkedMails={checkedMails}
          setCheckedMails={setCheckedMails}
          onPageChange={onPageChange}
          page={page}
          path={path}
        />
      </AppsHeader>
      <AppsContent>
        <AppList
          className={classes.paddingY}
          data={mailList}
          ListEmptyComponent={
            <ListEmptyResult
              loading={loading}
              placeholder={<EmailListSkeleton />}
            />
          }
          renderRow={mail => (
            <MailListItem
              key={mail.id}
              mail={mail}
              labelList={labelList}
              onChangeCheckedMails={onChangeCheckedMails}
              checkedMails={checkedMails}
              onViewMailDetail={onViewMailDetail}
              onChangeStarred={onChangeStarred}
            />
          )}
        />
      </AppsContent>
      <Hidden smUp>
        {mailList.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={totalMails}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  );
};

export default MailsList;
