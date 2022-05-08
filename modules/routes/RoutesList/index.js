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
    height: 250,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
  },
  mediaBottom: {
    height: 200,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '20px',
    border: '1px solid #eeeeee',
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

const RoutesList = ({titleKey, pageKey}) => {
  const classes = useStyles();

  return (
    <>
      <AppsHeader>Routes Guide</AppsHeader>
      <AppsContent>
        <Paper className={classes.root}>
          <Grid container className={classes.guideList} spacing={10}>
            <Grid item className={classes.gridItemInfo} sm={12} md={12} lg={12}>
              <Typography variant='h5' component='h3'>
                Manage URL Routes.
              </Typography>
              <Typography component='p'>
                URL Routes in Sling are route patterns or static urls which use
                a page template to render the Page.
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
                    image={'/images/cards/guide-routes.png'}
                    title='Routes Guide'
                  />
                  <CardContent
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Static & Dynamic URLs{' '}
                    </Typography>
                    <Typography
                      variant='body2'
                      className={classes.cardDesc}
                      color='text.secondary'
                      component='p'>
                      Routes are the actual end points on your web front which
                      the user has access to. Assign a Page Template to each of
                      the URL Routes to re-use the Page Layout.
                      <br></br> <br></br>A page template can be assigned to
                      multiple URL routes.
                      <br></br> <br></br>A URL can be made dynamic by use the{' '}
                      {'< >'} brackets. Any value passed inside is considered a
                      variable which is accessible as page props on the web
                      frontend.
                      <br></br>
                      <br></br>
                      <a
                        target={'_blank'}
                        href={'https://sling.biz/documentation/'}
                        rel='noreferrer'>
                        <CardMedia
                          className={classes.mediaBottom}
                          image={'/images/cards/guide-routes-example.png'}
                          title='Routes Guide'
                        />
                      </a>
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
            {/*<Grid item sm={12} md={4} lg={4}>*/}
            {/*  <Card className={classes.card}>*/}
            {/*    <CardActionArea>*/}
            {/*      <CardMedia*/}
            {/*        className={classes.media}*/}
            {/*        image={'/images/cards/sling-layout-pick.png'}*/}
            {/*        title=''*/}
            {/*      />*/}
            {/*      <CardContent>*/}
            {/*        <Typography gutterBottom variant='h5' component='h2'>*/}
            {/*          Layout*/}
            {/*        </Typography>*/}
            {/*        <Typography*/}
            {/*          className={classes.cardDesc}*/}
            {/*          variant='body2'*/}
            {/*          color='text.secondary'*/}
            {/*          component='p'>*/}
            {/*          Modify and rearrange your page components. Simply Drag &*/}
            {/*          Drop to save new Layout or Pick a widget and deploy in an*/}
            {/*          instant.*/}
            {/*        </Typography>*/}
            {/*      </CardContent>*/}
            {/*    </CardActionArea>*/}
            {/*    <CardActions>*/}
            {/*      <Link href={`${pageKey}/layout`} passHref>*/}
            {/*        <Button size='small' color='primary'>*/}
            {/*          Modify Layout*/}
            {/*        </Button>*/}
            {/*      </Link>*/}
            {/*      /!*<Button size='small' color='primary'>*!/*/}
            {/*      /!*  Learn More*!/*/}
            {/*      /!*</Button>*!/*/}
            {/*    </CardActions>*/}
            {/*  </Card>*/}
            {/*</Grid>*/}
            {/*<Grid item sm={12} md={4} lg={4}>*/}
            {/*  <Card className={classes.card}>*/}
            {/*    <CardActionArea>*/}
            {/*      <CardMedia*/}
            {/*        className={classes.media}*/}
            {/*        image={'/images/cards/sling-pick-api.png'}*/}
            {/*        title='Pick your headless api'*/}
            {/*      />*/}
            {/*      <CardContent>*/}
            {/*        <Typography gutterBottom variant='h5' component='h2'>*/}
            {/*          Data Apis*/}
            {/*        </Typography>*/}
            {/*        <Typography*/}
            {/*          className={classes.cardDesc}*/}
            {/*          variant='body2'*/}
            {/*          color='text.secondary'*/}
            {/*          component='p'>*/}
            {/*          Select the list of Apis you would need to fetch the server*/}
            {/*          side rendered page. Sling uses NextJs and fetches these*/}
            {/*          Data Apis before the initial rendering of the page.*/}
            {/*        </Typography>*/}
            {/*      </CardContent>*/}
            {/*    </CardActionArea>*/}
            {/*    <CardActions>*/}
            {/*      <Link href={`${pageKey}/data`} passHref>*/}
            {/*        <Button size='small' color='primary'>*/}
            {/*          Select Apis*/}
            {/*        </Button>*/}
            {/*      </Link>*/}
            {/*      /!*<Button size='small' color='primary'>*!/*/}
            {/*      /!*  Learn More*!/*/}
            {/*      /!*</Button>*!/*/}
            {/*    </CardActions>*/}
            {/*  </Card>*/}
            {/*</Grid>*/}
          </Grid>
        </Paper>
      </AppsContent>
    </>
  );
};

export default RoutesList;
