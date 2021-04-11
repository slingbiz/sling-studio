import React from 'react';
import Box from '@material-ui/core/Box';
import LabelIcon from '@material-ui/icons/Label';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import useStyles from './index.style';
import Link from 'next/link';
import clsx from 'clsx';
import {useRouter} from 'next/router';

const LabelItem = ({label}) => {
  const classes = useStyles();
  const {query} = useRouter();
  return (
    <Link href={`/apps/contact/label/${label.alias}`}>
      <ListItem
        button
        className={clsx(classes.listItem, {
          active: label.alias === query.all[1],
        })}>
        <Box
          component='span'
          width={12}
          height={12}
          mr={{xs: 4, xl: 7}}
          mb={1.5}>
          <LabelIcon style={{color: `${label.color}`}} />
        </Box>
        <ListItemText primary={label.name} />
      </ListItem>
    </Link>
  );
};

export default LabelItem;

LabelItem.prototype = {
  label: PropTypes.object.isRequired,
};
