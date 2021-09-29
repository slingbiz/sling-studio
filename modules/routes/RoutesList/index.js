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
    height: '80px',
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
                {titleKey == 'auto-sync'}Customize your {titleKey} Page.
              </Typography>
              <Typography component='p'>
                Pages are the main entities linked to Url routes.
              </Typography>
              <Typography component='p'>
                Customize your page here to reflect the changes on all your
                urls.
              </Typography>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={'/images/cards/sling-basic.png'}
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Basics
                    </Typography>
                    <Typography
                      variant='body2'
                      className={classes.cardDesc}
                      color='text.secondary'
                      component='p'>
                      Customize the basics of your {titleKey} page. With Spacing
                      and margin to meta tags. Everything at your finger tips.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href={`${pageKey}/basic`} passHref>
                    <Button size='small' color='primary'>
                      Edit Basics
                    </Button>
                  </Link>
                  {/*<Button size='small' color='primary'>*/}
                  {/*  Learn More*/}
                  {/*</Button>*/}
                </CardActions>
              </Card>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={'/images/cards/sling-layout-pick.png'}
                    title=''
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Layout
                    </Typography>
                    <Typography
                      className={classes.cardDesc}
                      variant='body2'
                      color='text.secondary'
                      component='p'>
                      Modify and rearrange your page components. Simply Drag &
                      Drop to save new Layout or Pick a widget and deploy in an
                      instant.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href={`${pageKey}/layout`} passHref>
                    <Button size='small' color='primary'>
                      Modify Layout
                    </Button>
                  </Link>
                  {/*<Button size='small' color='primary'>*/}
                  {/*  Learn More*/}
                  {/*</Button>*/}
                </CardActions>
              </Card>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={'/images/cards/sling-pick-api.png'}
                    title='Pick your headless api'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Data Apis
                    </Typography>
                    <Typography
                      className={classes.cardDesc}
                      variant='body2'
                      color='text.secondary'
                      component='p'>
                      Select the list of Apis you would need to fetch the server
                      side rendered page. Sling uses NextJs and fetches these
                      Data Apis before the initial rendering of the page.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href={`${pageKey}/data`} passHref>
                    <Button size='small' color='primary'>
                      Select Apis
                    </Button>
                  </Link>
                  {/*<Button size='small' color='primary'>*/}
                  {/*  Learn More*/}
                  {/*</Button>*/}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </AppsContent>
    </>
  );
};

export default RoutesList;
