import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';

const SocialMedia = (props) => {
  const {contact} = props;

  const useStyles = makeStyles((theme) => ({
    borderBottomClass: {
      borderBottom: `1px solid ${grey[300]}`,
    },
    iconRoot: {
      fontSize: 16,
      color: 'grey.600',
    },
  }));

  const classes = useStyles(props);
  return (
    <Box
      pr={{xs: 5, lg: 8, xl: 10}}
      py={5}
      className={classes.borderBottomClass}>
      <Box component='h6' mb={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
        <IntlMessages id='common.socialMedia' />
      </Box>

      <Box px={{xs: 5, lg: 8, xl: 10}}>
        <Box mb={2} display='flex' alignItems='center'>
          <FacebookIcon className={classes.iconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {contact.facebookId ? (
              contact.facebookId
            ) : (
              <IntlMessages id='common.na' />
            )}
          </Box>
        </Box>

        <Box display='flex' alignItems='center'>
          <TwitterIcon className={classes.iconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {contact.twitterId ? (
              contact.twitterId
            ) : (
              <IntlMessages id='common.na' />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMedia;

SocialMedia.prototype = {
  contact: PropTypes.object.isRequired,
};
