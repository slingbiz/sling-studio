import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../shared/constants/AppEnums';
import VisitorsGraph from './VisitorsGraph';
import {green, red} from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useIntl} from 'react-intl';
import AppCard from '../../../../@crema/core/AppCard';
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    fontSize: 16,
    marginTop: 6,
    [theme.breakpoints.up('xl')]: {
      marginTop: 16,
    },
  },
}));

const ActiveVisitors = ({data}) => {
  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <AppCard contentStyle={{padding: 0}}>
      <Box pt={{xs: 5, sm: 5, xl: 5}} bgcolor='#49bd65'>
        <Box px={6}>
          <Box
            component='h3'
            color='#FFFFFF'
            mb={2}
            fontWeight={Fonts.BOLD}
            fontSize={16}>
            {messages['dashboard.analytics.activeVisitors']}
          </Box>
          <Box color='#FFF8'>
            {messages['dashboard.analytics.pageViewPerMinutes']}
          </Box>
        </Box>
        <Box mt='auto'>
          <VisitorsGraph data={data.graphData}/>
        </Box>
      </Box>
      <Box py={5} px={6}>
        <Box position='relative'>
          <Box mb={0.5}>
            <Box
              component='h3'
              display='inline-block'
              fontWeight={Fonts.MEDIUM}
              fontSize={18}>
              {data.value}
            </Box>
            <Box
              component='span'
              ml={3}
              fontSize={16}
              fontWeight={Fonts.MEDIUM}
              color={data.growth > 0.0 ? green[500] : red[500]}>
              {data.growth}% Then yesterday
            </Box>
          </Box>
          <Box component='p' fontSize={14} color='text.secondary' mb={1}>
            {data.slug}
          </Box>
        </Box>
        <Box textAlign='right'>
          <Button className={classes.root} underline='none'>
            View Report
          </Button>
        </Box>
      </Box>
    </AppCard>
  );
};

export default ActiveVisitors;

ActiveVisitors.defaultProps = {};

ActiveVisitors.propTypes = {
  data: PropTypes.object,
};
