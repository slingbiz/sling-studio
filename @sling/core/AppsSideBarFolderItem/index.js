import React from 'react';
import Box from '@material-ui/core/Box';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';
import Icon from '@material-ui/core/Icon';
import Link from 'next/link';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import grey from '@material-ui/core/colors/grey';

const useStyle = makeStyles((theme) => ({
  listItem: {
    color: '#6b645c',
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0e6d8',
    backgroundColor: 'transparent',
    fontFamily: 'Open Sans, system-ui, sans-serif',

    '& .MuiListItemText-root': {
      [theme.breakpoints.down('lg')]: {
        marginTop: 0,
        marginBottom: 0,
      },
    },

    '& .MuiTypography-body1': {
      fontSize: 14,
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#6b645c',
    },

    '& svg, & .MuiIcon-root': {
      fontSize: '18px',
      color: '#6b645c',
    },

    '&:hover,&:focus': {
      backgroundColor: '#fff8f0',
      color: '#6b645c',

      '& svg, & .MuiIcon-root': {
        color: '#6b645c',
      },

      '& .MuiTypography-root': {
        color: '#6b645c',
      },
    },

    '&.active': {
      backgroundColor: '#fff8f0',
      color: '#ff9800',

      '& svg, & .MuiIcon-root, & .MuiTypography-root': {
        color: '#ff9800',
      },
    },
  },
  listItemIcon: {
    minWidth: 10,
    paddingTop: 4,
  },
  listItemText: {
    fontFamily: 'inherit',
  },
}));

const WrappedIcon = (props) => <Icon {...props} />;

const AppsSideBarFolderItemCustom = ({item, path}) => {
  const classes = useStyle();
  const {query} = useRouter();
  const getSelectedRoute = () => {
    const data = path.split('/');
    return data[data.length - 1];
  };
  return (
    <Link href={path} legacyBehavior>
      <ListItem
        button
        key={item.id}
        className={clsx(classes.listItem, {
          active: getSelectedRoute() === query?.all?.[1],
        })}>
        <WrappedIcon>{item.icon}</WrappedIcon>
        <Box mr={{xs: 4, xl: 5}}>
          <ListItemIcon className={classes.listItemIcon}></ListItemIcon>
        </Box>
        <ListItemText primary={item.name} className={classes.listItemText} />
      </ListItem>
    </Link>
  );
};

export default AppsSideBarFolderItemCustom;
