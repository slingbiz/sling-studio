import React, {useContext} from 'react';
import {onToggleAppDrawer} from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import {Box} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import MenuIcon from '@material-ui/icons/Filter';
// import FilterAltIcon from '@material-ui/icons/FilterAlt';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Fonts} from '../../../shared/constants/AppEnums';
import {AppContext} from '../../index';
import {makeStyles} from '@material-ui/core/styles';
import {NavStyle} from '../../../shared/constants/AppEnums';
import Grid from '@material-ui/core/Grid';

const getHeaderHeight = (navStyle, screenSize) => {
  if (
    navStyle === NavStyle.HOR_DARK_LAYOUT ||
    navStyle === NavStyle.HOR_LIGHT_NAV ||
    navStyle === NavStyle.H_DEFAULT
  )
    return screenSize >= 1280 ? 124 + 20 : 70 + 10; // 50 Header Height + 20/10 Padding Bottom
  if (navStyle === NavStyle.BIT_BUCKET) return 0; // 0 Header Height

  return screenSize >= 600 ? 70 : 60;
};

const useStyles = makeStyles((theme) => ({
  appsContainer: (props) => ({
    // height: `calc(100vh - ${
    //   55 + // AppContainerHeader Height
    //   20 + //Container Padding
    //   getHeaderHeight(props.navStyle, 0) +
    //   (props.footer ? 70 : 10) // 50 Header Height + 20 Margin Top
    // }px) !important`,
    [theme.breakpoints.up('sm')]: {
      // height: `calc(100vh - ${
      //   55 + // AppContainerHeader Height
      //   20 + //Container Padding
      //   getHeaderHeight(props.navStyle, 600) +
      //   (props.footer ? 70 : 10)
      // }px) !important`,
    },
    [theme.breakpoints.up('md')]: {
      // height: `calc(100vh - ${
      //   55 + // AppContainerHeader Height
      //   30 + //Container Padding
      //   getHeaderHeight(props.navStyle, 960) +
      //   (props.footer ? 80 : 10) // 50 Header Height + 30 Margin Top
      // }px) !important`,
    },
    [theme.breakpoints.up('lg')]: {
      // height: `calc(100vh - ${
      //   43 + // AppContainerHeader Height
      //   30 + //Container Padding
      //   getHeaderHeight(props.navStyle, 1280) +
      //   (props.footer ? 80 : 10)
      // }px) !important`,
    },
    [theme.breakpoints.up('xl')]: {
      // height: `calc(100vh - ${
      //   64 + // AppContainerHeader Height
      //   30 + //Container Padding
      //   getHeaderHeight(props.navStyle, 1920) +
      //   (props.footer ? 86 : 10) // 56 Header Height + 30 Margin Top
      // }px) !important`,
    },
    display: 'flex',
  }),
  appsSidebar: {
    // height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '17rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '20rem',
    },
  },
  appsMainContent: (props) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${props.fullView ? 0 : 17}rem)`,
      paddingLeft: props.fullView ? 0 : 40,
    },
    [theme.breakpoints.up('xl')]: {
      width: `calc(100% - ${props.fullView ? 0 : 20}rem)`,
    },
  }),
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    width: 35,
    height: 35,
  },
  appSidebarDrawer: {
    width: '19rem',
    '& .listItem': {
      zIndex: 1305,
    },
  },
  scLauncher: {
    '& .sc-header, & .sc-message--content.sent .sc-message--text, & .sc-header--close-button:hover': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
}));
const FilterToggle = (props) => {
  const dispatch = useDispatch();
  const {footer, navStyle} = useContext(AppContext);
  // eslint-disable-next-line react/prop-types
  const {title, fullView} = props;
  const classes = useStyles({footer, navStyle, fullView});
  return (
    <Box
      mb={{xs: -3, md: 0, lg: 0}}
      mt={{xs: fullView ? 0 : -3, lg: 0}}
      display='flex'
      alignItems='center'>
      {fullView ? null : (
        <Hidden lgUp>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={() => dispatch(onToggleAppDrawer())}>
            <FilterListIcon className={classes.menuIcon} />
          </IconButton>
        </Hidden>
      )}
      <Box
        component='h2'
        color='text.primary'
        fontWeight={Fonts.BOLD}
        fontSize={16}>
        {title} Products
      </Box>
    </Box>
  );
};
export default FilterToggle;
