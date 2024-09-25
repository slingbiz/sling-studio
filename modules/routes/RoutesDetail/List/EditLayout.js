import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {Fonts} from '../../../../shared/constants/AppEnums';
import LayoutView from './LayoutView';
import LayoutSettings from './LayoutSettings';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Highlight} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: {padding: '1.5em'},
  // [theme.breakpoints.down('md')]: {
  //   boxLayoutView: {
  //     width: '70%',
  //   },
  // },

  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
  },
  textTruncate: {
    padding: '10px 0',
  },
  componentBox: {
    height: '8em',
    width: '100%',
    // backgroundColor: 'lightgrey',
    border: '1px solid #d6d3d3',
    borderRadius: '4px',
    justifyContent: 'center',
    margin: '0.5em',
    flex: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

// fake data generator
const getItems = (count, offset = 0, classes) =>
  Array.from({length: count}, (v, k) => k).map((k) => {
    let content = `Widget ${k + offset}`;
    if (k == 0) {
      content = (
        <>
          <SearchIcon />
          <Box
            component='h6'
            className={classes.textTruncate}
            color='text.primary'
            fontWeight={Fonts.BOLD}>
            {'Search Bar'}
          </Box>
        </>
      );
    }
    return {
      id: `item-${k + offset}`,
      content,
    };
  });

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;
//Widget ITem
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
//Widget GetList style
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

const EditLayout = ({open, setOpen, titleKey, pageKey}) => {
  const classes = useStyles();
  const childRef = useRef();

  const handleClose = () => {
    setOpen(false);
  };
  const handleRootSave = () => {
    childRef.current.saveLayoutConfig();
    handleClose();
  };

  const onDragEnd = (result) => {
    const {source, destination} = result;
    console.log(result, 'onDragEnd @dragme, ');

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return;
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {titleKey} {' / Edit'}
          </Typography>
          <Button autoFocus={true} color='inherit' onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus={true} color='inherit' onClick={handleRootSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item lg={3}>
          <Hidden mdDown>
            <Card
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5em',
                marginTop: '1.5em',
              }}>
              <Box
                component='h4'
                className={classes.textTruncate}
                color='text.primary'
                alignSelf='flex-start'
                fontWeight={Fonts.BOLD}>
                {'Components'}
              </Box>
              <Paper className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder='Search Components'
                  inputProps={{'aria-label': 'search components'}}
                />
                <IconButton className={classes.iconButton} aria-label='search'>
                  <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation='vertical' />
              </Paper>
              <Divider style={{marginTop: 15, marginBottom: 15}} />
              <Box>
                {/*<Box*/}
                {/*  component='h6'*/}
                {/*  className={classes.textTruncate}*/}
                {/*  color='text.primary'*/}
                {/*  alignSelf='flex-start'*/}
                {/*  fontWeight={Fonts.BOLD}>*/}
                {/*  {'All'}*/}
                {/*</Box>*/}
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId='droppable-widgets'>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        style={{display: 'flex', flexWrap: 'wrap'}}>
                        {getItems(10, 0, classes).map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, snapshot) => (
                              <div
                                className={classes.componentBox}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>
                {/*<Box style={{display: 'flex', flexWrap: 'wrap'}}>*/}
                {/*  <Box className={classes.componentBox}>*/}
                {/*    <SearchIcon />*/}
                {/*    <Box*/}
                {/*      component='h6'*/}
                {/*      className={classes.textTruncate}*/}
                {/*      color='text.primary'*/}
                {/*      fontWeight={Fonts.BOLD}>*/}
                {/*      {'Search Bar'}*/}
                {/*    </Box>*/}
                {/*  </Box>*/}
                {/*  <Box className={classes.componentBox}>2</Box>*/}
                {/*  <Box className={classes.componentBox}>3</Box>*/}
                {/*  <Box className={classes.componentBox}>4</Box>*/}
                {/*  <Box className={classes.componentBox}>5</Box>*/}
                {/*</Box>*/}
              </Box>
            </Card>
          </Hidden>
        </Grid>
        <Grid item sm={9} lg={6}>
          <Box className={classes.boxLayoutView}>
            <LayoutView
              ref={childRef}
              pageKey={pageKey}
              isEditable={true}
              key={'edit'}
            />
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Card
            style={{
              padding: '1.5em',
              marginTop: '1.5em',
            }}>
            <LayoutSettings />
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default EditLayout;
