import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  onAddNewBoard,
  onEditBoardDetail,
  onGetBoardList,
} from '../../../../redux/actions/ScrumboardApp';
import { useRouter } from 'next/router'
import AddNewBoard from './AddNewBoard';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@crema/core/GridContainer';
import BoardItem from './BoardItem';
import AddBoardButton from './AddBoardButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {grey, red} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import InfoView from '../../../../@crema/core/InfoView';

const useStyles = makeStyles((theme) => ({
  boardStyle: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    height: 224,
    border: '2px dashed',
    borderColor: grey[600],
  },
  gridContainer: {
    justifyContent: 'center',
  },
  boardItem: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center',
    height: 224,
  },
  listAltIcon: {
    marginBottom: 16,
    fontSize: 24,
    [theme.breakpoints.up('xl')]: {
      fontSize: 40,
    },
  },
  addBoardCard: {
    padding: '32px 40px',
  },
  addButton: {
    backgroundColor: red[500],
    color: theme.palette.primary.contrastText,
    paddingRight: 32,
    paddingLeft: 32,
    marginTop: 12,
    '&:hover, &:focus': {
      backgroundColor: red[700],
      color: theme.palette.primary.contrastText,
    },
  },
  avatar: {
    backgroundColor: grey[500],
    marginBottom: 20,
  },
  addIcon: {
    fontSize: 24,
    [theme.breakpoints.up('xl')]: {
      fontSize: 40,
    },
  },
  dialogBox: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 600,
      width: '100%',
    },
    '& .MuiTypography-h6': {
      fontWeight: Fonts.LIGHT,
    },
  },
}));

const BoardList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const boardList = useSelector(({scrumboardApp}) => scrumboardApp.boardList);

  const [isAddBoardOpen, setAddBoardOpen] = useState(false);

  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    dispatch(onGetBoardList());
  }, [dispatch]);

  const onCloseAddBoardModal = () => {
    setAddBoardOpen(false);
  };

  const onAddButtonClick = () => {
    setSelectedBoard(null);
    setAddBoardOpen(true);
  };

  const onEditButtonClick = (board) => {
    setSelectedBoard(board);
    setAddBoardOpen(true);
  };

  const onAddBoard = (name) => {
    if (selectedBoard) {
      const board = {...selectedBoard, name};
      dispatch(onEditBoardDetail(board));
    } else {
      dispatch(onAddNewBoard({name}));
    }
  };

  const onViewBoardDetail = (board) => {
    router.push(`/apps/scrum-board/${board.id}`);
  };

  const classes = useStyles();

  return (
    <>
      <Box pt={4} display='flex' flex={1} flexDirection='column'>
        <Box
          my={{xs: 5, sm: 5, xl: 8}}
          component='h2'
          color='text.primary'
          fontWeight={Fonts.BOLD}
          textAlign='center'
          fontSize={16}>
          <IntlMessages id='scrumboard.scrumboardApp' />
        </Box>
        <GridContainer className={classes.gridContainer}>
          {boardList && boardList.length > 0
            ? boardList.map((board) => {
                return (
                  <BoardItem
                    key={board.id}
                    board={board}
                    onEditButtonClick={onEditButtonClick}
                    onViewBoardDetail={onViewBoardDetail}
                    classes={classes}
                  />
                );
              })
            : null}
          <AddBoardButton
            onAddButtonClick={onAddButtonClick}
            classes={classes}
          />
        </GridContainer>
      </Box>

      {isAddBoardOpen ? (
        <AddNewBoard
          isAddBoardOpen={isAddBoardOpen}
          onCloseAddBoardModal={onCloseAddBoardModal}
          onAddBoard={onAddBoard}
          selectedBoard={selectedBoard}
          classes={classes}
        />
      ) : null}
      <InfoView />
    </>
  );
};

export default BoardList;
