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
    color: theme.palette.grey['600'],
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '0',
    paddingTop: '25px',
    paddingBottom: '25px',
    boxShadow: '0 1px 1px rgb(0 0 0 / 10%)',

    '& .MuiListItemText-root': {
      [theme.breakpoints.down('lg')]: {
        marginTop: 0,
        marginBottom: 0,
      },
    },

    '& .MuiTypography-body1': {
      fontSize: 15,
      // fontWeight: Fonts.BOLD,
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
  sideMenuIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const WrappedIcon = (props) => <Icon {...props} />;

const AppsSideBarFolderItemCustom = ({item, path, noSubChild}) => {
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
          active: noSubChild
            ? getSelectedRoute() === query?.all?.[0]
            : getSelectedRoute() === query?.all?.[1],
        })}>
        <Box ml={4} mr={{xs: 4, xl: 5}} className={classes.sideMenuIcon}>
          <WrappedIcon>{item.icon}</WrappedIcon>
        </Box>
        <ListItemText primary={item.name} className={classes.listItemText} />
      </ListItem>
    </Link>
  );
};

export default AppsSideBarFolderItemCustom;
