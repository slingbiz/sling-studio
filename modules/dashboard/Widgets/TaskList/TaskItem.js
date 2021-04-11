import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  litItemRoot: {
    padding: '8px 20px',
  },
}));
const TaskItem = (props) => {
  const {item} = props;

  const classes = useStyles(props);
  return (
    <ListItem key={item.id} className={clsx(classes.litItemRoot, 'item-hover')}>
      <ListItemText
        primary={
          <Box
            component='p'
            color='primary.main'
            fontWeight={Fonts.MEDIUM}
            fontSize={14}>
            {item.title}
          </Box>
        }
        secondary={
          <Box component='span' color='text.secondary' fontSize={14}>
            {item.desc}
          </Box>
        }
      />
    </ListItem>
  );
};

export default TaskItem;

TaskItem.propTypes = {
  item: PropTypes.object.isRequired,
};
