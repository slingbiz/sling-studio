import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const AddCardButton = (props) => {
  const {onClickAddCard, list} = props;

  const useStyles = makeStyles((theme) => ({
    pointer: {
      cursor: 'pointer',
    },
    minHeight72: {
      minHeight: 72,
    },
    avatarRoot: {
      backgroundColor: grey[100],
      border: `1px dashed ${grey[400]}`,
    },
    addIconRoot: {
      fontWeight: Fonts.LIGHT,
      color: grey[500],
    },
  }));

  const classes = useStyles(props);

  return (
    <Box py={4} px={6} mt={2} clone>
      <Card
        className={clsx(classes.minHeight72, classes.pointer)}
        onClick={() => onClickAddCard(list)}>
        <Box display='flex' alignItems='center'>
          <Avatar className={classes.avatarRoot}>
            <AddIcon className={classes.addIconRoot} />
          </Avatar>
          <Box ml={5} fontWeight={Fonts.REGULAR}>
            <IntlMessages id='scrumboard.addACard' />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default AddCardButton;

AddCardButton.prototype = {
  onClickAddCard: PropTypes.func,
  list: PropTypes.object.isRequired,
};
