import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Typography from '@material-ui/core/Typography';
import AppCircularProgress from '../../../../@crema/core/AppCircularProgress';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  textBase: {
    fontSize: 14,
  },
}));

const VisitorAnalysis = (props) => {
  const classes = useStyles(props);
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['dashboard.visitorAnalysis']}
      height='1'
      footer={
        <Box color='text.secondary' display='flex' alignItems='center'>
          <Box
            bgcolor='secondary.main'
            height={{xs: 12, xl: 16}}
            width={{xs: 12, xl: 16}}
            mr={4}
            borderRadius='50%'
          />
          <Box flex={1}>
            <Typography className={classes.textBase}>
              <IntlMessages id='dashboard.visitorAnalysisContent' />
            </Typography>
          </Box>
        </Box>
      }>
      <Box>
        <AppCircularProgress activeColor='#F04F47' value={59} thickness={2} />
      </Box>
    </AppCard>
  );
};

export default VisitorAnalysis;
