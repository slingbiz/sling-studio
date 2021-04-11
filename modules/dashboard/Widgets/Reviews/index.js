import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';
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

const Reviews = (props) => {
  const {data} = props;
  const {messages} = useIntl();
  const classes = useStyles();

  return (
    <AppCard
      height='1'
      title={messages['common.reviews']}
      contentStyle={{paddingRight: 0, paddingLeft: 0}}>
      <Scrollbar className={classes.scrollbarRoot}>
        <AppList
          data={data}
          renderRow={(item) => {
            return <ReviewItem key={item.id} item={item} />;
          }}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default Reviews;

Reviews.defaultProps = {
  data: [],
};

Reviews.propTypes = {
  data: PropTypes.array,
};
