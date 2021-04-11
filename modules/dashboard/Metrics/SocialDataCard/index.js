import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const SocialDataCard = ({data}) => {
  return (
    <AppCard
      height={1}
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Box width='100%' py={{xs: 4, xl: 8}} display='flex' textAlign='center'>
        <Box px={3} width='50%' borderRight={4} borderColor='grey.100'>
          <Box
            color='secondary.main'
            fontSize={{xs: 24, sm: 30, xl: 36}}
            mb={2}
            clone>
            <FavoriteIcon />
          </Box>
          <Box component='h3' mb={2} fontSize={20} fontWeight={Fonts.MEDIUM}>
            {data.likes}
          </Box>
          <Box
            component='p'
            color='text.secondary'
            mb={1}
            fontSize={14}
            fontWeight={Fonts.REGULAR}>
            <IntlMessages id='common.likes' />
          </Box>
        </Box>

        <Box width='50%' px={3}>
          <Box
            color='primary.main'
            fontSize={{xs: 24, sm: 30, xl: 36}}
            mb={2}
            clone>
            <SpeakerNotesIcon />
          </Box>
          <Box component='h3' mb={2} fontSize={20} fontWeight={Fonts.MEDIUM}>
            {data.comments}
          </Box>
          <Box
            component='p'
            color='text.secondary'
            mb={1}
            fontSize={14}
            fontWeight={Fonts.REGULAR}>
            <IntlMessages id='common.comments' />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default SocialDataCard;

SocialDataCard.defaultProps = {};

SocialDataCard.propTypes = {
  data: PropTypes.object.isRequired,
};
