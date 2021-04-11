import React, {useState} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import ConnectionList from './ConnectionList';
import ChatList from './ChatList';
import {makeStyles} from '@material-ui/core';
import Scrollbar from '../../../../../@crema/core/Scrollbar';
import PropTypes from 'prop-types';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const tabs = [
  {id: 333, name: <IntlMessages id='dashboard.messages' />},
  {id: 323, name: <IntlMessages id='chatApp.contacts' />},
];

const useStyles = makeStyles((theme) => ({
  galleryPhoto: {
    position: 'relative',
    marginBottom: 20,

    '& img': {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
    },
  },
  tabsPortfolio: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    position: 'relative',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    },
  },
  tab: {
    minWidth: 10,
    fontSize: 16,
    flex: 1,
    textTransform: 'capitalize',
    fontWeight: Fonts.MEDIUM,
  },
  scrollChatSidebar: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 165px)',
  },
}));

const UserTabs = ({connectionListData, chatListData, loading}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  };

  const classes = useStyles();
  return (
    <>
      <Box pb={2} width={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
          className={classes.tabsPortfolio}>
          {tabs.map((tab, index) => {
            return (
              <Tab
                key={tab.id}
                className={classes.tab}
                label={tab.name}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </Box>

      <Scrollbar className={classes.scrollChatSidebar}>
        <Box pb={2} flex={1}>
          {value === 0 && (
            <ChatList chatListData={chatListData} loading={loading} />
          )}
          {value === 1 && (
            <ConnectionList
              connectionListData={connectionListData}
              loading={loading}
            />
          )}
        </Box>
      </Scrollbar>
    </>
  );
};

export default UserTabs;

UserTabs.defaultProps = {
  connectionListData: [],
  chatListData: [],
};

UserTabs.propTypes = {
  connectionListData: PropTypes.array,
  chatListData: PropTypes.array,
};
