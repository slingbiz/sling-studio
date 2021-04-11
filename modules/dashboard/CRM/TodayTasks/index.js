import React from 'react';
import TaskList from './TaskList';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import DateSelector from './DateSelector';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import clsx from 'clsx';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const TodayTasks = (props) => {
  const {todayTaskData} = props;

  const useStyles = makeStyles((theme) => ({
    link: {
      fontSize: 14,
      paddingLeft: 8,
      paddingRight: 8,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
    linkGrey: {
      color: grey[500],
    },
  }));

  const classes = useStyles(props);
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['dashboard.todayTasks']}
      height={1}
      action={
        <Box>
          <Hidden xsDown>
            <Link
             href='#'><a  className={clsx(classes.link, classes.linkGrey)}>
              <IntlMessages id='common.createTask' /></a>
            </Link>
          </Hidden>
          <Link
          href='#'>
            <a className={classes.link}>
            <IntlMessages id='common.viewAll' /></a>
          </Link>
        </Box>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} xl={7}>
          <TaskList todayTaskData={todayTaskData} />
        </Grid>

        <Grid item xs={12} md={6} xl={5}>
          <DateSelector />
        </Grid>
      </Grid>
    </AppCard>
  );
};

export default TodayTasks;

TodayTasks.defaultProps = {
  todayTaskData: [],
};

TodayTasks.propTypes = {
  todayTaskData: PropTypes.array,
};
