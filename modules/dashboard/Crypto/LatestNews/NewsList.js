import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import {Box, makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import AppList from '../../../../@crema/core/AppList';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  newsImg: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '10rem',
    },
  },
  newsContent: {
    flex: '1 1 0',
  },
  listItem: {
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
}));

const NewsList = (props) => {
  const {newsData} = props;

  const classes = useStyles(props);

  return (
    <Scrollbar>
      <List>
        <AppList
          data={newsData}
          renderRow={(news) => {
            return (
              <ListItem
                key={news.id}
                className={clsx(classes.listItem, 'item-hover')}>
                <ListItemText
                  className={classes.newsContent}
                  primary={
                    <Box
                      mb={1}
                      component='span'
                      display='flex'
                      alignItems='center'
                      fontSize={14}>
                      <Box color='text.secondary'>{news.created}</Box>
                      <Box ml={2} color='primary.main'>
                        {news.by}
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box
                      component='span'
                      color='grey.700'
                      fontWeight={Fonts.MEDIUM}
                      fontSize={14}>
                      {news.news}
                    </Box>
                  }
                />
                <Box ml={{sm: 3, xl: 5}}>
                  <img
                    className={classes.newsImg}
                    src={news.image}
                    alt='bitcoin'
                  />
                </Box>
              </ListItem>
            );
          }}
        />
      </List>
    </Scrollbar>
  );
};

export default NewsList;

NewsList.defaultProps = {
  newsData: [],
};

NewsList.propTypes = {
  newsData: PropTypes.array,
};
