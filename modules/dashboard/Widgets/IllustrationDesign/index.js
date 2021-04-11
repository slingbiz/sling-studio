import React from 'react';
import {makeStyles} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const useStyles = makeStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: Fonts.LIGHT,
    textTransform: 'capitalize',
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
  },
  widthFull: {
    width: '100%',
  },
  marginY: {
    marginTop: 16,
    marginBottom: 16,
  },
  middleRoot: {
    verticalAlign: 'middle',
    display: 'inline-block',
  },
}));

const IllustrationDesign = (props) => {
  const classes = useStyles(props);
  return (
    <AppCard
      display='flex'
      flexDirection='column'
      height='1'
      contentStyle={{padding: 0}}>
      <Box position='relative' flex={1} display='flex'>
        <img
          className={classes.widthFull}
          src={'/images/illustration.png'}
          alt='illustration'
        />
        <Box
          color='primary.contrastText'
          position='absolute'
          left={0}
          bottom={0}
          m={{xs: 4, xl: 6}}>
          <Chip
            label={<IntlMessages id='dashboard.designs' />}
            className={classes.badge}
          />
        </Box>
      </Box>

      <Box p={{xs: 4, xl: 6}}>
        <Box component='h4' mb={4} fontSize={16} fontWeight={Fonts.BOLD}>
          <IntlMessages id='dashboard.illustrationDesign' />
        </Box>
        <Divider className={classes.marginY} />
        <Box
          color='grey.600'
          fontWeight={Fonts.MEDIUM}
          fontSize={14}
          display='flex'
          justifyContent='space-between'
          alignItems='center'>
          <Box component='span' px={3} textAlign='center'>
            <Box component='span' className={classes.middleRoot} mr={2}>
              <VisibilityIcon />
            </Box>
            11.7 K
          </Box>
          <Box component='span' px={3}>
            <Box component='span' className={classes.middleRoot} mr={2}>
              <FavoriteIcon />
            </Box>
            2.6 K
          </Box>
          <Box component='span' px={3}>
            <Box component='span' className={classes.middleRoot} mr={2}>
              <ChatIcon />
            </Box>
            345
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default IllustrationDesign;
