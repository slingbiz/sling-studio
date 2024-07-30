import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled({handleChange, count, page}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/*<Typography>Page: {page}</Typography>*/}
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
}
