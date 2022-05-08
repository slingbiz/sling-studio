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

export const folderList = [
  {id: 1, name: 'Media Gallery', alias: 'gallery', icon: 'add_photo_alternate'},
  {id: 2, name: 'Media Constants', alias: 'constants', icon: 'playlist_play'},
  // {id: 3, name: 'Guide', alias: 'guide', icon: 'help_center'},
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
}));

const RoutesSideBar = ({basePath, noSubChild}) => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const classes = useStyle();

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

          {/*<Box component='h5' mt={{xs: 4, xl: 5}} fontWeight={Fonts.MEDIUM}>*/}
          {/*  Labels*/}
          {/*</Box>*/}

          {/*<List component='nav' aria-label='main mailbox folders'>*/}
          {/*  <AppList*/}
          {/*    data={labelList}*/}
          {/*    ListEmptyComponent={*/}
          {/*      <ListEmptyResult*/}
          {/*        loading={true}*/}
          {/*        placeholder={<SidebarPlaceholder />}*/}
          {/*      />*/}
          {/*    }*/}
          {/*    renderRow={(label) => <LabelItem key={label.id} label={label} />}*/}
          {/*  />*/}
          {/*</List>*/}
        </Box>
      </Scrollbar>

      {isAddTaskOpen ? (
        <>
          {/*// <AddNewTask*/}
          {/*//   isAddTaskOpen={isAddTaskOpen}*/}
          {/*//   onCloseAddTask={onCloseAddTask}*/}
          {/*// />*/}
        </>
      ) : null}
    </>
  );
};

export default RoutesSideBar;
