import React, {useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import {isBreakPointDown} from '../../../../@crema/utility/Utils';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  listHalf: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 0,

    '& li': {
      width: '50%',
      padding: '0px 20px',
      '& .MuiListItemIcon-root': {
        minWidth: 0,
      },
    },
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const getData = (data) => {
  if (isBreakPointDown('xl')) {
    return data.slice(0, 10);
  } else {
    return data;
  }
};

const Categories = (props) => {
  const classes = useStyles(props);
  const {messages} = useIntl();
  const data = getData(props.data);

  const [categoryList, handleList] = useState(data);

  const handleChange = (e, category) => {
    category.isChecked = e.target.checked;
    const list = categoryList.map((item) =>
      item.id === category.id ? category : item,
    );
    handleList(list);
  };

  return (
    <AppCard
      title={messages['dashboard.categories']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      action={<CloseIcon className={classes.pointer} />}
      height='1'>
      <List className={classes.listHalf}>
        {categoryList.map((item) => {
          return (
            <CategoryItem
              key={item.id}
              item={item}
              classes={classes}
              handleChange={handleChange}
            />
          );
        })}
      </List>
    </AppCard>
  );
};

export default Categories;

Categories.defaultProps = {
  categoryList: [],
};

Categories.propTypes = {
  categoryList: PropTypes.array,
};
