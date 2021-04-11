import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  onGetMemberList,
  onGetScrumLabelList,
} from '../../../redux/actions/ScrumboardApp';
import BoardDetail from './BoardDetail';
import BoardList from './BoardList';
import {useRouter} from 'next/router';

const ScrumBoard = () => {
  const dispatch = useDispatch();
  const {query} = useRouter();
  useEffect(() => {
    dispatch(onGetScrumLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetMemberList());
  }, [dispatch]);

  const onGetMainComponent = () => {
    if (+query.id > 0) {
      return <BoardDetail />;
    } else {
      return <BoardList />;
    }
  };

  return <>{onGetMainComponent()}</>;
};

export default ScrumBoard;
