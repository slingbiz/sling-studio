import React, {useEffect, useState} from 'react';
// import AddNewTask from '../AddNewTask';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import AppsHeader from '../../../@sling/core/AppsContainer/AppsHeader';
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
import {useDispatch, useSelector} from 'react-redux';
import orange from '@material-ui/core/colors/orange';
import {Fonts} from '../../../shared/constants/AppEnums';
import Box from '@material-ui/core/Box';
import AppSearch from '../../../@sling/core/SearchBar';
import DialogContentText from '@material-ui/core/DialogContentText';
import {setLayoutConfig} from '../../../redux/actions';

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
  textField: {
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
    // fontSize: 12,
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
  dashboardBtn: {
    backgroundColor: orange[500],
    color: theme.palette.primary.contrastText,
    fontWeight: Fonts.BOLD,
    paddingRight: 20,
    marginRight: 20,
    paddingLeft: 20,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: theme.palette.primary.contrastText,
    },
  },
  button: {
    color: theme.palette.primary.light,
    fontWeight: Fonts.BOLD,
    paddingRight: 10,
    marginRight: 10,
    paddingLeft: 10,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: theme.palette.primary.contrastText,
    },
  },
}));

const ModalPageTemplate = ({
  setOpen,
  open,
  edit,
  addPageTemplate,
  classes,
  currentTemplate = {},
}) => {
  const {
    description: descriptionInit,
    templateKey: templateKeyInit,
    title: titleInit,
  } = currentTemplate;
  const [templateKey, setTemplateKey] = useState(templateKeyInit);
  const [title, setTitle] = useState(titleInit);
  const [description, setDescription] = useState(descriptionInit);

  useEffect(() => {
    setTemplateKey(templateKeyInit);
    setTitle(titleInit);
    setDescription(descriptionInit);
  }, [templateKeyInit, descriptionInit, titleInit]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Template Id</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new page template, please enter a unique template id here.
          This template id will be used for each of the page routes which use
          this page template.
        </DialogContentText>
        <TextField
          autoFocus
          className={classes.textField}
          margin='dense'
          placeholder='newyear-sale'
          id='templateId'
          label='Template Id'
          type='templateId'
          fullWidth
          value={templateKey}
          onChange={(e) => setTemplateKey(e.target.value)}
          variant='standard'
        />
        <Box style={{marginTop: 20}}>
          {/*<Divider style={{marginTop: 15, marginBottom: 15}} />*/}
          <Box>
            {/*<Divider className={classes.divider} orientation='vertical' />*/}
            <Typography style={{fontSize: 14}} variant='h6'>
              Meta Info
            </Typography>
            <Box style={{padding: 5}}>
              <TextField
                autoFocus
                className={classes.textField}
                margin='dense'
                placeholder='New Year Sale Template'
                id='title'
                label='Title for Template'
                type='title'
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant='standard'
              />
              <TextField
                className={classes.textField}
                rows={2}
                maxRows={4}
                multiline={true}
                autoFocus
                margin='dense'
                placeholder='This will be used for all the Promotional Landing Pages from Christmas to New Year'
                id='description'
                label='Small Description'
                type='description'
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant='standard'
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => addPageTemplate(templateKey, {title, description})}>
          {edit ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const PageTemplatesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const {layoutConfig} = layoutData || {};
  const totalPageTemplates = Object.keys(layoutConfig).length;
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({});

  const addPageTemplate = (pageKey, meta) => {
    setOpen(false);
    const root = {header: {}, body: {}, footer: {}};
    dispatch(setLayoutConfig(pageKey, root, meta, !edit));
  };

  return (
    <>
      <AppsHeader>
        All Page Templates{' '}
        <Box display='flex' alignItems='center'>
          <Button
            className={classes.dashboardBtn}
            aria-label='add'
            disabled={false}
            onClick={() => {
              setCurrentTemplate({});
              setEdit(false);
              setOpen(true);
            }}>
            Add Template
          </Button>
          <AppSearch
            placeholder='Search templates'
            onChange={(e) => e.target.value}
          />
        </Box>
      </AppsHeader>
      <Paper className={classes.root}>
        <ModalPageTemplate
          edit={edit}
          currentTemplate={currentTemplate}
          open={open}
          classes={classes}
          setOpen={setOpen}
          addPageTemplate={addPageTemplate}
        />
        <Grid container className={classes.guideList} spacing={10}>
          <Grid item className={classes.gridItemInfo} sm={12} md={12} lg={12}>
            <Typography
              component='p'
              style={{fontSize: 18, fontWeight: 'bold'}}>
              List of available Page Templates.
            </Typography>
            <Typography component='p'>
              Showing {totalPageTemplates} templates
            </Typography>
          </Grid>
          <Grid item className={classes.gridTileInfo} sm={12} md={12} lg={12}>
            {Object.keys(layoutConfig).map((v, k) => {
              const {meta} = layoutConfig[v] || {};
              const {title, description} = meta || {};
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
                        title={title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          className={classes.templateTitle}
                          variant='h5'
                          component='h2'>
                          {title}
                        </Typography>
                        <Typography
                          variant='body2'
                          className={classes.cardDesc}
                          color='text.secondary'
                          component='p'>
                          {description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions
                      style={{display: 'flex', justifyContent: 'right'}}>
                      <Link href={`/pages/${v}/layout`} passHref>
                        <Button className={classes.button} aria-label='Edit'>
                          Configure
                        </Button>
                      </Link>
                      <Button
                        // size='small'
                        className={classes.button}
                        onClick={() => {
                          setOpen(true);
                          setEdit(true);
                          setCurrentTemplate({
                            templateKey: v,
                            title,
                            description,
                          });
                        }}>
                        Edit Meta
                      </Button>
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
