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
import {useRouter} from 'next/router';

export const folderListChild = [
  {id: 120, name: 'Basic', alias: 'basic', icon: 'border_color'},
  {id: 121, name: 'Layout', alias: 'layout', icon: 'view_quilt'},
  {id: 123, name: 'Preview', alias: 'preview', icon: 'pageview-icon'},
  {id: 124, name: 'Data', alias: 'data', icon: 'storage-icon'},
];
export const folderListParent = [
  {id: 100, name: 'Templates', alias: 'pages/templates', icon: 'list'},
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
    padding: 0,
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

const PagesSideBar = ({basePath}) => {
  const currRoute = useRouter();
  const {query: {all} = {}} = currRoute;
  const id = all?.[1] || all?.[0];
  const basePathLoc =
    id === 'templates' || id === 'guide' || !id ? `` : `${all[0]}`;

  const folderList =
    id === 'templates' || id === 'guide' || !id
      ? folderListParent
      : folderListChild;
  const classes = useStyle();

  return (
    <Scrollbar className='scroll-app-sidebar'>
      <Box p={0} m={0} style={{textAlign: 'center'}}>
        <Box clone>
          <List
            component='nav'
            aria-label='page template folders'
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
                  item={item}
                  path={`${basePathLoc}/${item.alias}`}
                />
              )}
            />
          </List>
        </Box>
      </Box>
    </Scrollbar>
  );
};

export default PagesSideBar;
