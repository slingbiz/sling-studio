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
import {useSelector} from 'react-redux';

export const folderList = [
  {
    id: 1,
    name: 'Company',
    alias: 'company-details',
    icon: 'widgets',
  },
  {
    id: 2,
    name: 'Keys & Usage',
    alias: 'keys-usage',
    icon: 'key',
  },
  {
    id: 4,
    name: 'Members',
    alias: 'members',
    icon: 'group',
  },
  {
    id: 5,
    name: 'Audit',
    alias: 'audit',
    icon: 'history',
  },
  {
    id: 3,
    name: 'Theme',
    alias: 'theme',
    icon: 'palette',
  },
  // {id: 3, name: 'Guide', alias: 'guide', icon: 'web'},
];

const useStyle = makeStyles((theme) => ({
  appsSidebar: {
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '14rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '16rem',
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
}));

const canManageMembers = (role) => role === 'owner' || role === 'admin';
const ownerAdminOnly = ['members', 'audit'];

const RoutesSideBar = ({basePath, noSubChild}) => {
  const classes = useStyle();
  const {user} = useSelector(({auth}) => auth);
  const items = folderList.filter(
    (item) => !ownerAdminOnly.includes(item.alias) || canManageMembers(user?.role),
  );

  return (
    <>
      <Scrollbar className='scroll-app-sidebar'>
        <Box p={0} m={0} style={{textAlign: 'center'}}>
          <Box clone>
            <List
              component='nav'
              aria-label='main task folders'
              className={classes.listRoot}>
              <AppList
                pageClasses={classes}
                data={items}
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
                    path={`/settings/${item.alias}`}
                  />
                )}
              />
            </List>
          </Box>
        </Box>
      </Scrollbar>
    </>
  );
};

export default RoutesSideBar;
