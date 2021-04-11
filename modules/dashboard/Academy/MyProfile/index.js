import React, {useContext} from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppContext from '../../../../@crema/utility/AppContext';

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    width: 50,
    height: 50,
    marginTop: 16,
    marginBottom: 16,
    [theme.breakpoints.up('md')]: {
      width: 70,
      height: 70,
    },
    [theme.breakpoints.up('lg')]: {
      width: 90,
      height: 90,
      marginBottom: 26,
    },
    [theme.breakpoints.up('xl')]: {
      width: 110,
      height: 110,
    },
  },
  titleRoot: {
    fontSize: 16,
    fontWeight: Fonts.BOLD,
  },
}));

const MyProfile = ({profile}) => {
  const {profile_pic, name, designation, achievements, friends} = profile;
  const {messages} = useIntl();
  const {theme} = useContext(AppContext);
  const classes = useStyles();
  return (
    <AppCard
      display='flex'
      flexDirection='column'
      height={1}
      title={messages['academy.myProfile']}>
      <Box display='flex' flexDirection='column' width={1} height={1}>
        <Box
          flex={1}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'>
          <Avatar className={classes.avatarRoot} src={profile_pic} />
          <Box component='p' className={classes.titleRoot} mb={2}>
            {name}
          </Box>
          <Box mb={2} component='p' color='text.secondary'>
            {designation}
          </Box>
        </Box>

        <Box
          width={1}
          p={{xs: 3, xl: 5}}
          display='flex'
          alignItems='center'
          bgcolor='#E7F4FC'
          color='common.black'
          justifyContent='center'
          style={{borderRadius: theme.overrides.MuiCard.root.borderRadius}}>
          <Box
            px={1}
            display='flex'
            flexDirection='column'
            alignItems='center'
            width={1 / 2}>
            <Box mb={3}>
              <img
                src={'/images/dashboard/academy/achievements.png'}
                alt='achievements'
              />
            </Box>
            <Box my={1} fontSize={20} fontWeight={Fonts.BOLD} component='p'>
              {achievements}
            </Box>
            <Box component='p'>Achievements</Box>
          </Box>
          <Box
            px={1}
            display='flex'
            flexDirection='column'
            alignItems='center'
            width={1 / 2}
            style={{borderLeft: 'solid 1px #C8E0EE'}}>
            <Box mt={-1} mb={2}>
              <PersonIcon style={{fontSize: 40, color: '#FD3A84'}} />
            </Box>
            <Box mb={1.5} fontSize={20} fontWeight={Fonts.BOLD} component='p'>
              {friends}
            </Box>
            <Box component='p'>Friends</Box>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default MyProfile;
