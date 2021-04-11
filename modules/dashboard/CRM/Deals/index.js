import React, {useState} from 'react';
import DealsTable from './DealsTable';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import AppSelect from '../../../../@crema/core/AppSelect';

const Deals = (props) => {
  const {dealsTableData} = props;
  const [tableData, setTableData] = useState(dealsTableData);

  const handleChange = (value) => {
    if (value === messages['dashboard.allDeals']) {
      setTableData(dealsTableData);
    } else if (value === messages['todo.completed']) {
      setTableData(
        dealsTableData.filter((data) => data.progress === 'Approved'),
      );
    } else {
      setTableData(
        dealsTableData.filter((data) => data.progress === 'Pending'),
      );
    }
  };

  const {messages} = useIntl();

  return (
    <AppCard
      title={
        <Box display='flex' alignItems='center'>
          <Box
            mr={{xs: 3, lg: 8}}
            component='h3'
            fontWeight={Fonts.BOLD}
            fontSize={16}>
            <IntlMessages id='dashboard.deals' />
          </Box>
          <AppSelect
            menus={[
              messages['dashboard.allDeals'],
              messages['todo.completed'],
              messages['common.pending'],
            ]}
            defaultValue={messages['dashboard.allDeals']}
            onChange={handleChange}
          />
        </Box>
      }
      contentStyle={{paddingRight: 0, paddingLeft: 0}}
      action={messages['common.viewAll']}
      height={1}>
      <DealsTable dealsTableData={tableData} />
    </AppCard>
  );
};

export default Deals;

Deals.defaultProps = {
  dealsTableData: [],
};

Deals.propTypes = {
  dealsTableData: PropTypes.array,
};
