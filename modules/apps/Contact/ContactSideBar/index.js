import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import CreateContact from '../CreateContact';
import LabelItem from './LabelItem';
import AppsSideBarFolderItem from '../../../../@crema/core/AppsSideBarFolderItem';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppList from '../../../../@crema/core/AppList';
import AppAnimate from '../../../../@crema/core/AppAnimate';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import SidebarPlaceholder from '../../../../@crema/core/Skeleton/SidebarListSkeleton';

const useStyles = makeStyles((theme) => ({
  btnRoot: {
    width: '100%',
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: Fonts.MEDIUM,
  },
  listRoot: {
    marginBottom: 8,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 20,
    },
  },
}));

const SideBarContent = (props) => {
  const labelList = useSelector(({contactApp}) => contactApp.labelList);

  const folderList = useSelector(({contactApp}) => contactApp.folderList);

  const [isAddContact, onSetIsAddContact] = useState(false);

  const handleAddContactOpen = () => {
    onSetIsAddContact(true);
  };

  const handleAddContactClose = () => {
    onSetIsAddContact(false);
  };

  const classes = useStyles(props);

  return (
    <>
      <Box px={{xs: 4, md: 5}} pt={{xs: 4, md: 5}} pb={{xs: 2, xl: 5}}>
        <AppAnimate>
          <Button
            variant='contained'
            color='secondary'
            className={classes.btnRoot}
            onClick={handleAddContactOpen}>
            <IntlMessages id='contactApp.createContact' />
          </Button>
        </AppAnimate>
      </Box>

      <Scrollbar className='scroll-app-sidebar'>
        <Box
          px={{xs: 4, md: 5, lg: 6, xl: 8}}
          pb={{xs: 4, md: 5, lg: 6, xl: 8}}
          pt={0}>
          <List
            className={classes.listRoot}
            component='nav'
            aria-label='main task folders'>
            <AppList
              animation='transition.slideLeftIn'
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
                  path={`/apps/contact/folder/${item.alias}`}
                />
              )}
            />
          </List>

          <Box component='h5' mt={{xs: 4, xl: 5}} fontWeight={Fonts.MEDIUM}>
            <IntlMessages id='common.labels' />
          </Box>

          <List component='nav' aria-label='main mailbox folders'>
            <AppList
              animation='transition.slideLeftIn'
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

          {isAddContact ? (
            <CreateContact
              isAddContact={isAddContact}
              handleAddContactClose={handleAddContactClose}
            />
          ) : null}
        </Box>
      </Scrollbar>
    </>
  );
};

export default SideBarContent;
