import React from 'react';
import Card from '@material-ui/core/Card';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../shared/constants/AppEnums';

const BoardItem = ({board, onEditButtonClick, onViewBoardDetail, classes}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={board.id}>
      <Card
        className={classes.boardItem}
        key={board.id}
        onClick={() => onViewBoardDetail(board)}>
        <ListAltIcon className={classes.listAltIcon} />
        <EditIcon
          className={classes.listAltIcon}
          onClick={() => onEditButtonClick(board)}
        />
        <Box mb={4} fontWeight={Fonts.MEDIUM} fontSize={14}>
          {board.name}
        </Box>
        <Box component='span' onClick={(event) => event.stopPropagation()} />
      </Card>
    </Grid>
  );
};

export default BoardItem;

BoardItem.prototype = {
  board: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onViewBoardDetail: PropTypes.func,
};
