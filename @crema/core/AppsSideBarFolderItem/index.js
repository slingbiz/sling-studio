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

const useStyle = makeStyles(theme => ({
  listItem: {
    paddingLeft: '10px',
    paddingRight: '0',
    paddingTop: '5px',
    paddingBottom: '5px',

    '& .MuiListItemText-root': {
      [theme.breakpoints.down('lg')]: {
        marginTop: 0,
        marginBottom: 0,
      },
    },

    '& .MuiTypography-body1': {
      fontSize: 15,
      fontWeight: Fonts.MEDIUM,
    },

    '& svg': {
      fontSize: '18px',
    },

    '&:hover,&:focus,&.active': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,

      '& svg': {
        color: theme.palette.primary.main,
      },

      '& .MuiTypography-root': {
        color: theme.palette.primary.main,
      },
    },

    '&.active': {
      color: theme.palette.primary.main,

      '& svg, & .MuiTypography-root': {
        color: theme.palette.primary.main,
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

const WrappedIcon = props => <Icon {...props} />;

const AppsSideBarFolderItem = ({item, path}) => {
  const classes = useStyle();
  const {query} = useRouter();
  const getSelectedRoute = () => {
    const data = path.split('/');
    return data[data.length - 1];
  };
  return (
    <Link href={path}>
      <ListItem
        button
        key={item.id}
        className={clsx(classes.listItem, {
          active: getSelectedRoute() === query.all[1],
        })}>
        <Box component='span' mr={{xs: 4, xl: 5}}>
          <ListItemIcon className={classes.listItemIcon}>
            <WrappedIcon>{item.icon}</WrappedIcon>
          </ListItemIcon>
        </Box>
        <ListItemText primary={item.name} className={classes.listItemText} />
      </ListItem>
    </Link>
  );
};

export default AppsSideBarFolderItem;
