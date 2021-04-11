import React, {useState} from 'react';
import {onAddNewList} from '../../../../redux/actions/ScrumboardApp';
import AddNewList from './AddNewList';
import Box from '@material-ui/core/Box';
import AddCard from './List/AddCard';
import List from './List';
import AppsContent from '../../../../@crema/core/AppsContainer/AppsContent';
import {useDispatch} from 'react-redux';

const BoardDetailView = (props) => {
  const dispatch = useDispatch();
  const [list, setList] = useState(null);

  const [isAddCardOpen, setAddCardOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const {boardDetail} = props;

  const onClickAddCard = (list) => {
    setList(list);
    setSelectedCard(null);
    setAddCardOpen(true);
  };

  const onCloseAddCard = () => {
    setAddCardOpen(false);
  };

  const onAddList = (name) => {
    dispatch(onAddNewList(boardDetail.id, {name}));
  };

  const onEditCardDetail = (card, list) => {
    setSelectedCard(card);
    setList(list);
    setAddCardOpen(true);
  };

  return (
    <AppsContent style={{flex: 1}}>
      <Box className='scrum-row'>
        {boardDetail.list &&
          boardDetail.list.length > 0 &&
          boardDetail.list.map((list) => {
            return (
              <List
                key={list.id}
                list={list}
                boardId={boardDetail.id}
                onEditCardDetail={onEditCardDetail}
                onClickAddCard={onClickAddCard}
              />
            );
          })}
        <Box p={2} display='flex' flexDirection='column' className='scrum-col'>
          <AddNewList onAddList={onAddList} />
        </Box>
      </Box>
      {isAddCardOpen ? (
        <AddCard
          isAddCardOpen={isAddCardOpen}
          onCloseAddCard={onCloseAddCard}
          list={list}
          board={boardDetail}
          selectedCard={selectedCard}
        />
      ) : null}
    </AppsContent>
  );
};

export default BoardDetailView;
