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
import {useSelector} from 'react-redux';
import orange from '@material-ui/core/colors/orange';
import {Fonts} from '../../../shared/constants/AppEnums';
import Box from "@material-ui/core/Box";
import AppSearch from "../../../@sling/core/SearchBar";

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
  gridTileInfo: {
    justifyContent: 'space-around',
    display: 'flex',
  },
  gridItemInfo: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  media: {
    height: 200,
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    'background-position-y': '45%',
  },
  cardDesc: {
    height: '80px',
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  button: {
    // backgroundColor: orange[500],
    color: theme.palette.primary.light,
    fontWeight: Fonts.BOLD,
    paddingRight: 20,
    marginRight: 20,
    paddingLeft: 20,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: theme.palette.primary.contrastText,
    },
  },
}));

const PageTemplatesList = ({titleKey, pageKey}) => {
  const classes = useStyles();
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const {layoutConfig} = layoutData || {};

  return (
    <>
      <AppsHeader>
        All Page Templates{' '}
        <Box display='flex' alignItems='center'>
          <Button
            className={classes.button}
            aria-label='add'
            disabled={true}
            onClick={() => {}}>
            Add Template
          </Button>
          <AppSearch
            placeholder='Search templates'
            onChange={(e) => e.target.value}
          />
        </Box>
      </AppsHeader>
      <Paper className={classes.root}>
        <Grid container className={classes.guideList} spacing={10}>
          <Grid item className={classes.gridItemInfo} sm={12} md={12} lg={12}>
            <Typography
              component='p'
              style={{fontSize: 18, fontWeight: 'bold'}}>
              List of available Page Templates.
            </Typography>
            <Typography component='p'>Showing 3 templates</Typography>
          </Grid>
          <Grid item className={classes.gridTileInfo} sm={12} md={12} lg={12}>
            {Object.keys(layoutConfig).map((v, k) => {
              const {meta = {}} = layoutConfig[v] || {};
              return (
                <Grid
                  key={k}
                  item
                  sm={12}
                  md={4}
                  lg={4}
                  style={{marginLeft: 10, marginRight: 10}}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={'/images/cards/pagelayout_default.png'}
                        title={meta?.title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          className={classes.templateTitle}
                          variant='h5'
                          component='h2'>
                          {meta.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          className={classes.cardDesc}
                          color='text.secondary'
                          component='p'>
                          {meta.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link href={`/pages/${v}/layout`} passHref>
                        <Button className={classes.button} aria-label='Edit'>
                          Edit Template
                        </Button>
                      </Link>
                      {/*<Button size='small' color='primary'>*/}
                      {/*  Learn More*/}
                      {/*</Button>*/}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PageTemplatesList;
