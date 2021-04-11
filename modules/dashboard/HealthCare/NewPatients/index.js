import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import PatientGraph from './PatientGraph';
import {Box, makeStyles} from '@material-ui/core';
import AppMenu from '../../../../@crema/core/AppMenu';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  arrowIconRoot: {
    '& img': {
      height: 12,
    },
  },
}));

const NewPatients = ({data}) => {
  const {messages} = useIntl();
  const classes = useStyles();
  return (
    <AppCard title={messages['healthCare.newPatient']} action={<AppMenu />}>
      <Box>
        <Box mb={6} display='flex' alignItems='center'>
          <Box component='span' mr={2} fontSize={20} fontWeight={Fonts.BOLD}>
            214
          </Box>
          <Box className={classes.arrowIconRoot}>
            <img
              src={'/images/dashboard/metrics_icon_active.png'}
              alt='down'
            />
          </Box>
        </Box>
        <Box mx={-6} mb={-6}>
          <PatientGraph data={data} />
        </Box>
      </Box>
    </AppCard>
  );
};

export default NewPatients;
