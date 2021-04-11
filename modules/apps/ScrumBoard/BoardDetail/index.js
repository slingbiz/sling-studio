import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import AppsContainer from '../../../../@crema/core/AppsContainer';
import BoardDetailView from './BoardDetailView';
import {useRouter} from 'next/router';
import {
  onGetBoardDetail,
  onNullifyBoardDetail,
} from '../../../../redux/actions/ScrumboardApp';

const useStyles = makeStyles(theme => ({
  pointer: {
    cursor: 'pointer',
  },
}));

const BoardDetail = props => {
  const router = useRouter();
  const boardDetail = useSelector(
    ({scrumboardApp}) => scrumboardApp.boardDetail,
  );
  const dispatch = useDispatch();
  const {query} = router;

  useEffect(() => {
    const {id} = query;
    dispatch(onGetBoardDetail(id));
    return () => {
      dispatch(onNullifyBoardDetail());
    };
  }, [dispatch, query]);

  const onGoToBoardList = () => {
    router.back();
  };

  const classes = useStyles(props);
  if (!boardDetail) {
    return null;
  }

  return (
    <AppsContainer
      cardStyle={{backgroundColor: 'transparent'}}
      fullView
      title={
        <>
          <Box
            mr={2}
            component='span'
            color='primary.main'
            className={classes.pointer}
            onClick={onGoToBoardList}>
            Scrum Board
          </Box>
          > {boardDetail.name}
        </>
      }>
      <BoardDetailView boardDetail={boardDetail} />
    </AppsContainer>
  );
};

export default BoardDetail;
