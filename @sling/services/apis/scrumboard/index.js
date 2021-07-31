import mock from '../../MockConfig';
import labelList from '../../db/apps/scrumboard/labelList';
import boardList from '../../db/apps/scrumboard/boardList';
import {memberList} from '../../db/apps/scrumboard/memberList';

let boardData = boardList;

mock.onGet('/api/scrumboard/board/list').reply(200, boardData);

mock.onGet('/api/scrumboard/label/list').reply(200, labelList);

mock.onGet('/api/scrumboard/member/list').reply(200, memberList);

mock.onPost('/api/scrumboard/add/board').reply((request) => {
  const {board} = JSON.parse(request.data);
  const newBoard = {
    id: Math.floor(Math.random() * 10000),
    name: board.name,
    list: [],
  };
  boardData = boardData.concat(newBoard);
  return [200, newBoard];
});

mock.onPut('/api/scrumboard/edit/board').reply((request) => {
  const {board} = JSON.parse(request.data);
  boardData = boardData.map((data) => (data.id === board.id ? board : data));
  return [200, board];
});

mock.onGet('/api/scrumboard/board/').reply((config) => {
  const params = config.params;
  const response = boardData.find((board) => board.id === parseInt(params.id));
  return [200, response];
});

mock.onPost('/api/scrumboard/add/list').reply((request) => {
  const {boardId, list} = JSON.parse(request.data);
  const newList = {
    id: Math.floor(Math.random() * 10000),
    cards: [],
    name: list.name,
  };
  const updatedBoardList = boardData.map((data) => {
    if (data.id === boardId) {
      data.list = data.list.concat(newList);
      return data;
    } else {
      return data;
    }
  });
  const updatedBoard = updatedBoardList.find((data) => data.id === boardId);
  return [200, updatedBoard];
});

mock.onPut('/api/scrumboard/edit/list').reply((request) => {
  const {boardId, list} = JSON.parse(request.data);
  const updatedBoardList = boardData.map((data) => {
    if (data.id === boardId) {
      data.list = data.list.map((item) => (item.id === list.id ? list : item));
      return data;
    } else {
      return data;
    }
  });
  const updatedBoard = updatedBoardList.find((data) => data.id === boardId);
  return [200, updatedBoard];
});

mock.onPost('/api/scrumboard/add/card').reply((request) => {
  const {board, list, card} = JSON.parse(request.data);
  let selectedBoard = boardData.find((data) => data.id === board.id);
  let selectedList = selectedBoard.list.find((data) => data.id === list.id);
  selectedList.cards = selectedList.cards.concat(card);
  selectedBoard.list = selectedBoard.list.map((data) =>
    data.id === selectedList.id ? selectedList : data,
  );
  boardData = boardData.map((data) =>
    data.id === selectedBoard.id ? selectedBoard : data,
  );
  return [200, selectedBoard];
});

mock.onPut('/api/scrumboard/edit/card').reply((request) => {
  const {board, list, card} = JSON.parse(request.data);
  let selectedBoard = boardData.find((data) => data.id === board.id);
  let selectedList = selectedBoard.list.find((data) => data.id === list.id);
  selectedList.cards = selectedList.cards.map((data) =>
    data.id === card.id ? card : data,
  );
  selectedBoard.list = selectedBoard.list.map((data) =>
    data.id === selectedList.id ? selectedList : data,
  );
  boardData = boardData.map((data) =>
    data.id === selectedBoard.id ? selectedBoard : data,
  );
  return [200, selectedBoard];
});

mock.onPost('/api/scrumboard/delete/card').reply((request) => {
  const {boardId, listId, cardId} = JSON.parse(request.data);
  let selectedBoard = boardData.find((data) => data.id === boardId);
  let selectedList = selectedBoard.list.find((data) => data.id === listId);
  selectedList.cards = selectedList.cards.filter((data) => data.id !== cardId);
  selectedBoard.list = selectedBoard.list.map((data) =>
    data.id === selectedList.id ? selectedList : data,
  );
  boardData = boardData.map((data) =>
    data.id === selectedBoard.id ? selectedBoard : data,
  );
  return [200, selectedBoard];
});

mock.onPost('/api/scrumboard/delete/board').reply((request) => {
  const {boardId} = JSON.parse(request.data);
  boardData = boardData.filter((data) => data.id !== boardId);
  return [200, boardId];
});

mock.onPost('/api/scrumboard/delete/list').reply((request) => {
  const {boardId, listId} = JSON.parse(request.data);
  let selectedBoard = boardData.find((data) => data.id === boardId);
  selectedBoard.list = selectedBoard.list.filter((item) => item.id !== listId);
  boardData = boardData.map((data) =>
    data.id === selectedBoard.id ? selectedBoard : data,
  );
  return [200, selectedBoard];
});
