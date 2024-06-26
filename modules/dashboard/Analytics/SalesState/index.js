import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import GridContainer from '../../../../@sling/core/GridContainer';
import Grid from '@material-ui/core/Grid';
import SlingCard from '../../../../@sling/core/SlingCard';

import ReactSvgPieChart from 'react-svg-piechart';
import {isBreakPointDown} from '../../../../@sling/utility/Utils';
import AppSelect from '../../../../@sling/core/AppSelect';
import {useIntl} from 'react-intl';
import AppList from '../../../../@sling/core/AppList';
import Avatar from '@material-ui/core/Avatar';

const SalesState = ({salesState, chartData}) => {
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };
  const getData = (data) => {
    if (isBreakPointDown('md')) {
      return data.slice(0, 4);
    } else if (isBreakPointDown('xl')) {
      return data.slice(0, 3);
    } else {
      return data;
    }
  };
  const {messages} = useIntl();
  return (
    <SlingCard
      title={'Google Analytics Stats'}
      height={1}
      action={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek'],
            messages['dashboard.lastWeeks'],
            messages['dashboard.lastMonth'],
          ]}
          defaultValue={messages['dashboard.thisWeek']}
          onChange={handleSelectionType}
        />
      }>
      <Box
        textAlign={{xs: 'center', sm: 'left'}}
        component='p'
        color='text.secondary'
        mt={-3}
        mb={2}>
        Page level breakup of unique visits
      </Box>

      <GridContainer>
        <Grid item xs={12} sm={5}>
          <Box
            width={1}
            height={1}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems={{xs: 'center', sm: 'flex-start'}}>
            <ReactSvgPieChart expandSize={5} data={chartData} expandOnHover />
          </Box>
        </Grid>

        <Grid item xs={12} sm={7}>
          <Box
            width={1}
            ml={2}
            display='flex'
            flexDirection='column'
            alignItems='flex-start'>
            <AppList
              animation='transition.slideRightBigIn'
              delay={200}
              duration={400}
              data={getData(salesState)}
              renderRow={(item) => (
                <Box
                  key={'salesState-' + item.id}
                  pl={{xl: 6}}
                  py={2}
                  display='flex'
                  alignItems='center'>
                  <Avatar
                    src={item.icon}
                    alt='icon'
                    style={{height: 48, width: 48}}
                  />

                  <Box position='relative' ml={4}>
                    <Box
                      component='h3'
                      display='inline-block'
                      fontWeight={Fonts.BOLD}
                      mb={0.5}
                      fontSize={16}>
                      {item.amount}
                    </Box>
                    <Box component='p' color='text.secondary' fontSize={14}>
                      {item.type}
                    </Box>
                  </Box>
                </Box>
              )}
            />
          </Box>
        </Grid>
      </GridContainer>
    </SlingCard>
  );
};
export default SalesState;

SalesState.defaultProps = {
  salesState: [],
};

SalesState.propTypes = {
  salesState: PropTypes.array,
};
