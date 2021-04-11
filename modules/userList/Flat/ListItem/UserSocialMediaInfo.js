import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';

const UserSocialMediaInfo = ({user}) => {
  return (
    <Box
      color='grey.600'
      mx={{xs: -3, xl: -5}}
      display='flex'
      alignItems='center'
      fontSize={14}
      justifyContent={{xs: 'space-between', sm: 'flex-start'}}>
      <Hidden xsDown>
        <Box px={{xs: 3, xl: 5}} display='flex' alignItems='center'>
          <Box mr={1} component='span'>
            {user.readTime}
          </Box>
          <IntlMessages id='common.read' />
        </Box>
      </Hidden>
      <Box px={{xs: 3, xl: 5}} display='flex' alignItems='center'>
        <Box mr={1} component='span'>
          <FacebookIcon />
        </Box>
        <Box mr={1} component='span'>
          {user.shares}
        </Box>
        <IntlMessages id='common.shares' />
      </Box>
      <Box px={{xs: 3, xl: 5}} display='flex' alignItems='center'>
        <Box mr={1} component='span'>
          <TwitterIcon />
        </Box>
        <Box mr={1} component='span'>
          {user.retweets}
        </Box>
        <IntlMessages id='common.retweets' />
      </Box>
    </Box>
  );
};

export default UserSocialMediaInfo;

UserSocialMediaInfo.propTypes = {
  user: PropTypes.object.isRequired,
};
