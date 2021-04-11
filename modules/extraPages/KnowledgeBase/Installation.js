import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import KBItem from './KBItem';
import GridContainer from '../../../@crema/core/GridContainer';
import PropTypes from 'prop-types';
import {Fonts} from '../../../shared/constants/AppEnums';

const Installation = ({installationQueries}) => {
  return (
    <Box mb={2}>
      <Box
        component='h3'
        color='text.primary'
        mb={{xs: 4, lg: 6}}
        fontSize={16}
        fontWeight={Fonts.BOLD}>
        <IntlMessages id='knowledge.installation' />
      </Box>
      <GridContainer>
        {installationQueries.map((data) => (
          <KBItem data={data} key={data.id} />
        ))}
      </GridContainer>
    </Box>
  );
};

export default Installation;

Installation.propTypes = {
  installationQueries: PropTypes.array.isRequired,
};
