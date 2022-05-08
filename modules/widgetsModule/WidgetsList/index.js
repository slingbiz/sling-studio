import React from 'react';
import {CardActions, makeStyles} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import AppsHeader from '../../../@sling/core/AppsContainer/AppsHeader';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

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
    height: 300,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
  },
  mediaBottom: {
    height: 250,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '20px',
    border: '1px solid #eeeeee',
  },
  cardDesc: {
    height: '100%',
    width: '70%',
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const WidgetsList = () => {
  const classes = useStyles();

  return (
    <>
      <AppsHeader>Widgets Guide</AppsHeader>
      <Box>
        <Box className={classes.root}>
          <Grid container className={classes.guideList} spacing={10}>
            <Grid item className={classes.gridItemInfo} sm={12} md={12} lg={12}>
              <Typography variant='h5' component='h3'>
                Manage your Widgets.
              </Typography>
              <Typography component='p'>
                Every Page in Sling is made up of small react components called
                Widgets.
              </Typography>
              <Typography component='p'>
                Multiple widgets can combine to become a Block and a component
                is a list of blocks and widgets.
              </Typography>{' '}
              <Typography component='p'>
                This is inspired by the ATOMIC Web Design concept.
              </Typography>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <Box className={classes.card}>
                <Box>
                  <CardMedia
                    className={classes.media}
                    image={'/images/cards/guide-widgets.png'}
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
                      Widgets, Blocks & Components{' '}
                    </Typography>
                    <Typography
                      variant='body2'
                      className={classes.cardDesc}
                      color='text.secondary'
                      component='p'>
                      Widgets are the core building blocks of a Page.
                      <br></br>
                      Create a new Widget in your web frontend and upload the
                      widget on the Studio using the JSON file or manually.
                      <br></br>
                      <br></br>A widget matching the Widget Key should be
                      available in the exported index.js file of the widgets in
                      Sling FE client. This is for the global handler to pick
                      from the initial response.
                    </Typography>
                    <CardActions>
                      <Link href={`/widgets`} passHref>
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
        </Box>
      </Box>
    </>
  );
};

export default WidgetsList;
