import React, {useState} from 'react';
import ColorItem from './ColorItem';
import PropTypes from 'prop-types';
import {isBreakPointDown} from '../../../../@crema/utility/Utils';
import AppList from '../../../../@crema/core/AppList';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  scrollbarRoot: {
    height: 362,
    [theme.breakpoints.up('xl')]: {
      height: 316,
    },
  },
}));

const getData = (data) => {
  if (isBreakPointDown('xl')) {
    return data;
  } else {
    return data.slice(0, 9);
  }
};

const Colors = (props) => {
  const data = getData(props.data);
  const classes = useStyles();
  const [colorsList, handleList] = useState(data);

  const handleChange = (e, color) => {
    color.isChecked = e.target.checked;
    const list = colorsList.map((item) =>
      item.id === color.id ? color : item,
    );
    handleList(list);
  };
  const {messages} = useIntl();
  return (
    <AppCard
      height='1'
      title={messages['dashboard.colors']}
      contentStyle={{paddingRight: 0, paddingLeft: 0}}>
      <Scrollbar className={classes.scrollbarRoot}>
        <AppList
          data={data}
          renderRow={(item) => {
            return (
              <ColorItem
                key={item.id}
                item={item}
                handleChange={handleChange}
              />
            );
          }}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default Colors;

Colors.defaultProps = {
  data: [],
};

Colors.propTypes = {
  data: PropTypes.array,
};
