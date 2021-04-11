import React from 'react';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/router';

const useStyles = makeStyles(theme => ({
  listItemText: {
    '& .MuiTypography-body1': {
      fontSize: 15,
      fontWeight: Fonts.MEDIUM,
    },
  },
}));

const LabelItem = ({label}) => {
  const classes = useStyles();
  const {query} = useRouter();
  return (
    <Link href={`/apps/todo/label/${label.alias}`}>
      <ListItem
        button
        key={label.id}
        className={clsx(classes.listItem, {
          active: label.alias === query.all[1],
        })}>
        <Box
          component='span'
          width={12}
          height={12}
          mr={{xs: 4, xl: 5}}
          borderRadius='50%'
          bgcolor={`${label.color}`}
        />

        <ListItemText className={classes.listItemText} primary={label.name} />
      </ListItem>
    </Link>
  );
};

export default LabelItem;

LabelItem.prototype = {
  label: PropTypes.object.isRequired,
};
