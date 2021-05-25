import React from 'react';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const EditLayout = ({open, setOpen, titleKey}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
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
          <Button autoFocus color='inherit' onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText primary='Phone ringtone' secondary='Titania' />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary='Default notification ringtone'
            secondary='Tethys'
          />
        </ListItem>
      </List>
    </Dialog>
  );
};
export default EditLayout;
