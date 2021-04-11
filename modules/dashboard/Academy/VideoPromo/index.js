import React, {useState} from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import Box from '@material-ui/core/Box';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  reactPlayer: {
    width: '100% !important',
  },
  borderRightBefore: {
    position: 'relative',
    paddingRight: 6,
    '&:before': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: 5,
      width: 1,
      height: 10,
      backgroundColor: theme.palette.gray[400],
    },
  },
  tabsList: {
    position: 'relative',
    minHeight: 10,
  },
  tabItem: {
    maxWidth: 'none',
    minWidth: 10,
    minHeight: 10,
    padding: '5px 10px',
    textTransform: 'capitalize',
    fontSize: 14,
    color: theme.palette.text.secondary,
    fontWeight: Fonts.MEDIUM,
  },
  tabsContent: {
    border: `solid 1px ${theme.palette.gray[300]}`,
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    color: theme.palette.text.secondary,
  },
}));

const tabs = [
  {id: 1, title: 'Class Detail', slug: 'class'},
  {id: 2, title: 'Assignments', slug: 'assignments'},
  {id: 3, title: 'Projects', slug: 'projects'},
  {id: 4, title: 'Exams', slug: 'exams'},
];

const VideoPromo = ({videoPromo}) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState('assignments');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppCard height={1}>
      <Box mt={-5} mx={-6}>
        <ReactPlayer
          className={classes.reactPlayer}
          controls={true}
          url='https://www.youtube.com/watch?v=X1dz0xRbSJc'
        />
      </Box>
      <Box pt={5}>
        <Box
          display='flex'
          flexDirection={{xs: 'column', sm: 'row'}}
          alignItems={{sm: 'center'}}
          mb={1}>
          <Box flex={1} mr={2} mb={2}>
            <Box component='p' fontSize={14} fontWeight={Fonts.BOLD}>
              {videoPromo.title}
            </Box>
            <Box
              component='p'
              display='flex'
              alignItems='center'
              flexWrap='wrap'>
              <Box
                component='span'
                color='text.secondary'
                className={classes.borderRightBefore}>
                {videoPromo.owner}
              </Box>
              <Box
                component='span'
                color='text.secondary'
                className={classes.borderRightBefore}
                ml={2}>
                {videoPromo.category}
              </Box>
              <Box component='span' ml={2} color='primary.main'>
                + Follow Mentor
              </Box>
            </Box>
          </Box>
          <Box mb={2} display='flex' alignItems='center'>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height={40}
              width={40}
              style={{border: '1px solid #E5E4EA', borderRadius: 5}}>
              <AccessTimeIcon />
            </Box>
            <Box
              ml={2}
              display='flex'
              alignItems='center'
              justifyContent='center'
              bgcolor='#EFEFEF'
              height={40}
              width={40}
              style={{border: '1px solid #E5E4EA', borderRadius: 5}}>
              <CloudDownloadIcon />
            </Box>
          </Box>
        </Box>

        <Box display='flex' style={{borderBottom: '1px solid #E5E4EA'}}>
          <Tabs
            className={classes.tabsList}
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor='primary'
            aria-label='profile tabs'>
            {tabs.map((item, index) => {
              return (
                <Tab
                  className={classes.tabItem}
                  key={index}
                  value={item.slug}
                  label={item.title}
                />
              );
            })}
          </Tabs>
        </Box>

        {videoPromo.assignments.map((item, index) => (
          <Box className={classes.tabsContent} mt={5} key={index} p={4}>
            <Box
              color='text.primary'
              fontSize={14}
              mb={2}
              fontWeight={Fonts.MEDIUM}
              component='p'>{`${index + 1}. ${item.title} `}</Box>
            <Box mb={4} component='p'>
              {item.desc}
            </Box>
            <Box
              display='flex'
              flexDirection={{xs: 'column', sm: 'row'}}
              alignItems={{sm: 'center'}}>
              <Box mr={{sm: 2}} display='flex' alignItems='center'>
                <Button
                  size='small'
                  style={{fontSize: 10, whiteSpace: 'nowrap'}}
                  variant='outlined'
                  color='primary'>
                  See Calendar
                </Button>
                <Box ml={2}>
                  <Button
                    size='small'
                    style={{fontSize: 10, whiteSpace: 'nowrap'}}
                    variant='contained'
                    color='primary'>
                    View details
                  </Button>
                </Box>
              </Box>
              <Box
                ml={{sm: 'auto'}}
                mt={{xs: 2, sm: 0}}
                display='flex'
                alignItems='center'>
                <Box component='span'>{item.students} Students enrolled</Box>
                <Box component='span' ml={2} color='#F66F71'>
                  {item.daysLeft} Days left
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </AppCard>
  );
};

export default VideoPromo;
