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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const {log} = console;
const mtBreakPoints = [
  // {title: 'xs', id: 'xs'},
  {title: 'sm', id: 'sm'},
  {title: 'md', id: 'md'},
  {title: 'lg', id: 'lg'},
  // {title: 'xl', id: 'xl'},
];
const mtColumns = [
  {title: 1, id: 1},
  {title: 2, id: 2},
  {title: 3, id: 3},
  {title: 4, id: 4},
  {title: 5, id: 5},
  {title: 6, id: 6},
  {title: 7, id: 7},
  {title: 8, id: 8},
  {title: 9, id: 9},
  {title: 10, id: 10},
  {title: 11, id: 11},
  {title: 12, id: 12},
];
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {mtBreakPoints.map((bp) => {
                return (
                  <FormControl
                    key={`select-${bp.id}`}
                    className={classes.formControl}>
                    <InputLabel shrink id={`${bp.id}-label`}>
                      {bp.title}
                    </InputLabel>
                    <Select
                      labelId={`${bp.id}-label`}
                      id={`${bp.id}`}
                      name={`${bp.id}`}
                      value={layoutWidth[bp.id]}
                      onChange={handleWidth}
                      displayEmpty
                      className={classes.selectEmpty}>
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {mtColumns.map((v) => {
                        return (
                          <MenuItem key={v.id} value={v.id}>
                            {v.id}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {/*<FormHelperText>sm info. </FormHelperText>*/}
                  </FormControl>
                );
              })}
            </Box>
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
                    alt='Contemplative Reptile'
                    height='140'
                    image='/images/mtRef.png'
                    title='Contemplative Reptile'
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
