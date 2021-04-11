import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: 'pointer',
  },
  avatar: {
    width: 100,
    height: 100,
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 120,
    },
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
}));

const Profile = (props) => {
  const {data} = props;
  const classes = useStyles(props);
  const {messages} = useIntl();
  return (
    <AppCard
      height='1'
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
      title={messages['common.wall']}
      action={<CloseIcon className={classes.pointer} />}>
      <Box
        mb={8}
        flex='1'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        textAlign='center'>
        <Avatar className={classes.avatar} src={data.image} />
        <Box mt={8} component='h3' fontWeight={Fonts.BOLD} fontSize={16}>
          {data.name}
        </Box>
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        textAlign='center'
        mb={1}>
        <Box px={{xs: 2, xl: 4}}>
          <Box
            component='span'
            display='block'
            mb={2}
            fontWeight={Fonts.MEDIUM}
            fontSize={20}>
            {data.photos}
          </Box>
          <Box
            component='span'
            color='text.secondary'
            display='block'
            fontSize={14}
            className={classes.textUppercase}>
            <IntlMessages id='dashboard.photos' />
          </Box>
        </Box>
        <Box px={{xs: 2, xl: 4}}>
          <Box
            component='span'
            display='block'
            mb={2}
            fontWeight={Fonts.MEDIUM}
            fontSize={20}>
            {data.followers}
          </Box>
          <Box
            component='span'
            color='text.secondary'
            display='block'
            fontSize={14}
            className={classes.textUppercase}>
            <IntlMessages id='dashboard.followers' />
          </Box>
        </Box>
        <Box px={{xs: 2, xl: 4}}>
          <Box
            component='span'
            display='block'
            mb={2}
            fontWeight={Fonts.MEDIUM}
            fontSize={20}>
            {data.following}
          </Box>
          <Box
            component='span'
            color='text.secondary'
            display='block'
            fontSize={14}
            className={classes.textUppercase}>
            <IntlMessages id='dashboard.following' />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Profile;

Profile.propTypes = {
  data: PropTypes.object.isRequired,
};
