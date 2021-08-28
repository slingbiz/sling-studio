import React, {useState} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from '@material-ui/core/styles';
import SelectBreakpoints from './SelectBreakpoints';

const {log} = console;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  layoutBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const initialWidth = {
  sm: 12,
  md: 6,
  lg: 4,
};

const NewCellModal = (props) => {
  const {
    openNewRow,
    handleCloseNewCell,
    handleSaveNewCell,
    section,
    newCellRowIndex,
  } = props;
  const classes = useStyles();
  const [layoutWidth, setLayoutWidth] = useState(initialWidth);

  const handleWidth = (e) => {
    const {value, name} = e.target;
    log(name, value, 'id - value', e.target);
    setLayoutWidth({...layoutWidth, [name]: value});
  };

  return (
    <Dialog
      onClose={handleCloseNewCell}
      maxWidth={'md'}
      aria-labelledby='customized-dialog-title'
      open={openNewRow}>
      <DialogTitle id='customized-dialog-title' onClose={handleCloseNewCell}>
        Select Layout
      </DialogTitle>
      <DialogContent dividers style={{background: '#f0f4f9'}}>
        <Grid
          container
          direction='row'
          spacing={4}
          justify={'space-between'}
          alignItems='center'>
          <Grid
            item
            sm={12}
            md={6}
            style={{display: 'flex', alignItems: 'center'}}
            direction={'column'}>
            <Typography
              style={{padding: '5px 10px', fontSize: '20px'}}
              gutterBottom>
              {/*Pick width*/}
            </Typography>
            <SelectBreakpoints
              classes={classes}
              handleWidth={handleWidth}
              layoutWidth={layoutWidth}
            />
          </Grid>
          <Grid
            item
            sm={12}
            md={6}
            style={{display: 'flex', flexDirection: 'column'}}>
            <Box>
              <Card style={{maxWidth: '100%'}}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    alt='Material UI ref'
                    height='140'
                    image='/images/mtRef.png'
                    title='Material UI Breakpoints reference'
                  />
                  <CardContent>
                    <Typography gutterBottom>
                      BreakPoint & Width Reference
                    </Typography>

                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'>
                      These breakpoint values are used to determine breakpoint
                      ranges. A range starts from the breakpoint value
                      inclusive, to the next breakpoint value exclusive
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => {
                      //TODO: To be replaced with Sling Blog
                      window.open(
                        'https://material-ui.com/customization/breakpoints/',
                        '_blank',
                      );
                    }}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
          {/*<Grid spacing={39} item sm={12} md={12}>*/}
          {/*  <Divider />*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  item*/}
          {/*  sm={12}*/}
          {/*  md={12}*/}
          {/*  direction={'column'}*/}
          {/*  alignItems='center'*/}
          {/*  style={{textAlign: 'center'}}>*/}
          {/*  <Typography gutterBottom>*/}
          {/*    Already created components. (TBD)*/}
          {/*  </Typography>*/}
          {/*</Grid>*/}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseNewCell} color='primary'>
          Cancel
        </Button>
        <Button
          autoFocus
          onClick={() => {
            handleSaveNewCell(newCellRowIndex, section, layoutWidth);
          }}
          color='primary'>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCellModal;
