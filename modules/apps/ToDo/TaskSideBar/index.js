import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import {useSelector} from 'react-redux';
import AddNewTask from '../AddNewTask';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import AppsSideBarFolderItem from '../../../../@crema/core/AppsSideBarFolderItem';
import LabelItem from './LabelItem';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles';
import AppList from '../../../../@crema/core/AppList';
import AppAnimate from '../../../../@crema/core/AppAnimate';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import SidebarPlaceholder from '../../../../@crema/core/Skeleton/SidebarListSkeleton';

const useStyle = makeStyles((theme) => ({
  btnRoot: {
    width: '100%',
    fontSize: 16,
    fontWeight: Fonts.MEDIUM,
    textTransform: 'capitalize',
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
    },
  },
}));
const TaskSideBar = () => {
  const labelList = useSelector(({todoApp}) => todoApp.labelList);

  const folderList = useSelector(({todoApp}) => todoApp.folderList);

  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const classes = useStyle();

  return (
    <>
      <Box px={{xs: 4, md: 5}} pt={{xs: 4, md: 5}} pb={{xs: 2, xl: 5}}>
        <AppAnimate>
          <Button
            variant='contained'
            color='secondary'
            className={classes.btnRoot}
            onClick={onOpenAddTask}>
            <IntlMessages id='todo.addNewTask' />
          </Button>
        </AppAnimate>
      </Box>

      <Scrollbar className='scroll-app-sidebar'>
        <Box
          px={{xs: 4, md: 5, lg: 6, xl: 8}}
          pb={{xs: 4, md: 5, lg: 6, xl: 8}}
          pt={0}>
          <Box mb={{xs: 2, xl: 5}} clone>
            <List component='nav' aria-label='main task folders'>
              <AppList
                data={folderList}
                ListEmptyComponent={
                  <ListEmptyResult
                    loading={true}
                    placeholder={<SidebarPlaceholder />}
                  />
                }
                renderRow={(item) => (
                  <AppsSideBarFolderItem
                    key={item.id}
                    item={item}
                    path={`/apps/todo/folder/${item.alias}`}
                  />
                )}
              />
            </List>
          </Box>

          <Box component='h5' mt={{xs: 4, xl: 5}} fontWeight={Fonts.MEDIUM}>
            Labels
          </Box>

          <List component='nav' aria-label='main mailbox folders'>
            <AppList
              data={labelList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={<SidebarPlaceholder />}
                />
              }
              renderRow={(label) => <LabelItem key={label.id} label={label} />}
            />
          </List>
        </Box>
      </Scrollbar>

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};

export default TaskSideBar;
