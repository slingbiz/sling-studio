import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Scrollbar from '../../../@sling/core/Scrollbar';
import {Fonts} from '../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles';
import AppList from '../../../@sling/core/AppList';
import ListEmptyResult from '../../../@sling/core/AppList/ListEmptyResult';
import SidebarPlaceholder from '../../../@sling/core/Skeleton/SidebarListSkeleton';
import AppsSideBarFolderItemCustom from '../../../@sling/core/AppsSideBarFolderItem/custom';
import Backdrop from '@material-ui/core/Backdrop';

export const folderList = [
  {id: 120, name: 'All', alias: 'api-list', icon: 'playlist_add'},
  {
    id: 121,
    name: 'Sling Edit',
    alias: 'sling-mappings',
    icon: 'account_tree',
  },
  {id: 123, name: 'Auto', alias: 'auto-sync', icon: 'sync'},
  {id: 123, name: 'Settings', alias: 'settings', icon: 'settings'},
  {id: 125, name: 'Guide', alias: 'guide', icon: 'help'},
];

const useStyle = makeStyles((theme) => ({
  appsSidebar: {
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '12rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '15rem',
    },
  },
  btnRoot: {
    width: '100%',
    fontSize: 16,
    fontWeight: Fonts.MEDIUM,
    textTransform: 'capitalize',
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
    },
  },
  listRoot: {
    padding: 0,
  },
  backdrop: {
    zIndex: 232,
    color: '#fff',
  },
}));

const ApisSideBar = ({basePath, noSubChild}) => {
  const classes = useStyle();

  return (
    <>
        <Box p={0} m={0} style={{textAlign: 'center'}}>
          <Box>
            <List
              component='nav'
              aria-label='main task folders'
              className={classes.listRoot}>
              <AppList
                pageClasses={classes}
                data={folderList}
                ListEmptyComponent={
                  <ListEmptyResult
                    loading={true}
                    placeholder={<SidebarPlaceholder />}
                  />
                }
                renderRow={(item) => (
                  <AppsSideBarFolderItemCustom
                    key={item.id}
                    noSubChild={noSubChild}
                    item={item}
                    path={`${basePath}${item.alias}`}
                  />
                )}
              />
            </List>
          </Box>
        </Box>
    </>
  );
};

export default ApisSideBar;
