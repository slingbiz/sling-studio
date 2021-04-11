import React, {useState} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Gallery from 'react-photo-gallery';
import photos from '../../../@crema/services/db/gallery/photos';
import {makeStyles} from '@material-ui/core';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => ({
  galleryPhoto: {
    position: 'relative',
    marginBottom: 20,

    '& img': {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
    },
  },
  tabsPortfolio: {
    marginBottom: 20,
    position: 'relative',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    },
  },
  tab: {
    minWidth: 10,
    fontSize: 16,
    textTransform: 'capitalize',
  },
}));

const tabs = [
  {id: 323, name: <IntlMessages id='common.all' />},
  {id: 333, name: <IntlMessages id='portfolio.logo' />},
  {id: 32323, name: <IntlMessages id='portfolio.painting' />},
  {id: 421, name: <IntlMessages id='portfolio.graphicDesign' />},
  {id: 4454, name: <IntlMessages id='portfolio.webDesign' />},
  {id: 221, name: <IntlMessages id='portfolio.ui' />},
];

const Portfolio = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const shuffle = (arra1) => {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  };

  const a11yProps = (index) => {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  };

  const classes = useStyles(props);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box flex={1}>
        <Box mx='auto' textAlign='center' maxWidth={672}>
          <Box mb={6}>
            <Box
              component='h2'
              color='text.primary'
              mb={4}
              fontWeight={Fonts.BOLD}
              fontSize={20}>
              <IntlMessages id='portfolio.heading' />
            </Box>
            <Box component='p' color='text.secondary' mb={3}>
              <IntlMessages id='portfolio.content' />
            </Box>
          </Box>

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

        <Box className={classes.galleryPhoto}>
          {value === 0 && (
            <Gallery margin={10} photos={shuffle(photos)} direction='column' />
          )}
          {value === 1 && (
            <Gallery margin={10} photos={shuffle(photos)} direction='column' />
          )}
          {value === 2 && (
            <Gallery margin={10} photos={shuffle(photos)} direction='column' />
          )}
          {value === 3 && (
            <Gallery margin={10} photos={shuffle(photos)} direction='column' />
          )}
          {value === 4 && (
            <Gallery margin={10} photos={shuffle(photos)} direction='column' />
          )}
          {value === 5 && (
            <Gallery margin={10} photos={shuffle(photos)} direction='column' />
          )}
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Portfolio;
