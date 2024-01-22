import React from 'react';
// import AddNewTask from '../AddNewTask';
import {makeStyles} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import AppsHeader from '../../../@sling/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@sling/core/AppsContainer/AppsContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  guideList: {display: 'flex', justifyContent: 'space-between'},
  root: {
    padding: theme.spacing(5, 4),
    height: '100%',
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  pagination: {
    paddingRight: 8,
    paddingLeft: 8,
    borderColor: grey[300],
    borderTopWidth: 1,
  },
  gridItemInfo: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    height: 200,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
  },
  cardDesc: {
    height: '100%',
    width: '60%',
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const TasksList = ({titleKey, pageKey}) => {
  const classes = useStyles();

  return <>
    <AppsHeader>Headless Api Integration Guide</AppsHeader>
    <Box>
      <Box className={classes.root}>
        <Grid container className={classes.guideList} spacing={10}>
          <Grid item className={classes.gridItemInfo} sm={12} md={12} lg={12}>
            <Typography variant='h5' component='h3'>
              Manage your APIs.
            </Typography>
            <Typography component='p'>
              Did you know you can add APIs from the Studio and automatically
              get the response in your Widgets?{' '}
            </Typography>
            {/*<Typography component='p'>*/}
            {/*  Customize your page here to reflect the changes on all your*/}
            {/*  urls.*/}
            {/*</Typography>*/}
          </Grid>
          <Grid item sm={12} md={12} lg={12}>
            <Box className={classes.card}>
              <Box>
                <CardMedia
                  className={classes.media}
                  image={'/images/cards/guide-api.png'}
                  title='API Guide'
                />
                <CardContent
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Integrate your APIs in one place
                  </Typography>
                  <Typography
                    variant='body2'
                    className={classes.cardDesc}
                    color='text.secondary'
                    component='p'>
                    Some of the widgets props are dependent on API Response.
                    It is very easy and convenient to switch to your custom
                    APIs. For example, A Product Listing Widget might expect
                    the key position of the total count and products in the
                    API Response.
                    <br></br>
                    <br></br>
                    Note: All APIs integrated from the Studio are fetched and
                    served server side.
                  </Typography>
                  <CardActions>
                    <Link href={`/headless-apis/api-list`} passHref legacyBehavior>
                      <Button
                        size='medium'
                        color='secondary'
                        style={{marginTop: 15, border: '1px solid '}}>
                        Manage APIs
                      </Button>
                    </Link>
                  </CardActions>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </>;
};

export default TasksList;
