import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../shared/constants/AppEnums';

const AddBoardButton = ({onAddButtonClick, classes}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.boardStyle} onClick={() => onAddButtonClick()}>
        <Avatar className={classes.avatar}>
          <AddIcon className={classes.addIcon} />
        </Avatar>
        <Box mb={4} fontWeight={Fonts.MEDIUM} fontSize={14}>
          <IntlMessages id='scrumboard.addNewBoard' />
        </Box>
      </Card>
    </Grid>
  );
};

export default AddBoardButton;

AddBoardButton.prototype = {
  onAddButtonClick: PropTypes.func,
};
