import React from 'react';
import Card from '@material-ui/core/Card';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import List from '@material-ui/core/List';
import CachedIcon from '@material-ui/icons/Cached';
import SettingsIcon from '@material-ui/icons/Settings';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DescriptionIcon from '@material-ui/icons/Description';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {makeStyles} from '@material-ui/core';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SideBarItem from './SideBarItem';
import {Fonts} from '../../../../shared/constants/AppEnums';

const faqFolderList = [
  {id: 101, name: <IntlMessages id='faq.general' />, icon: <CachedIcon />},
  {
    id: 102,
    name: <IntlMessages id='knowledge.installation' />,
    icon: <SettingsIcon />,
  },
  {id: 103, name: <IntlMessages id='faq.pricing' />, icon: <AttachMoneyIcon />},
  {
    id: 104,
    name: <IntlMessages id='faq.licenseTypes' />,
    icon: <DescriptionIcon />,
  },
  {
    id: 105,
    name: <IntlMessages id='faq.support' />,
    icon: <InsertEmoticonIcon />,
  },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: '0',
    paddingRight: '0',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'transparent',

    '& .MuiTypography-body1': {
      fontSize: 14,
      fontWeight: Fonts.MEDIUM,
    },

    '&:hover,&:focus,&.active': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,

      '& svg': {
        fontSize: 18,
        color: theme.palette.primary.main,
      },
    },

    '&.active': {
      color: theme.palette.primary.main,
    },

    '& svg': {
      fontSize: 18,
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemIcon: {
    minWidth: 10,
  },
}));

const FaqSideBar = ({onGetFaqData, selectionId}) => {
  const classes = useStyles();

  return (
    <Box p={5} clone>
      <Card>
        <Scrollbar>
          <Box component='h3' mb={4} fontWeight={Fonts.BOLD} fontSize={16}>
            <IntlMessages id='faq.queries' />
          </Box>
          <List
            component='nav'
            aria-label='main mailbox folders'
            className={classes.list}>
            {faqFolderList.map((item) => {
              return (
                <SideBarItem
                  key={item.id}
                  item={item}
                  classes={classes}
                  selectionId={selectionId}
                  onGetFaqData={onGetFaqData}
                />
              );
            })}
          </List>
        </Scrollbar>
      </Card>
    </Box>
  );
};

export default FaqSideBar;

FaqSideBar.propTypes = {
  setSelectionId: PropTypes.func,
};
