import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import Scrollbar from '../../../@crema/core/Scrollbar';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  scrollBar: {
    padding: 0,
    marginBottom: 20,
    maxHeight: 130,
  },
  chip: {
    margin: 8,
    fontWeight: Fonts.MEDIUM,
  },
}));

const KbItem = ({data}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box p={5} clone>
        <Card>
          <Box mb={2} component='h5' fontSize={16} fontWeight={Fonts.BOLD}>
            {data.ques}
          </Box>
          <Scrollbar className={classes.scrollBar}>
            <Box component='p'>{data.ans}</Box>
          </Scrollbar>
          <Box mx={-2}>
            {data.tags.map((tag, index) => {
              return (
                <Chip
                  label={tag}
                  variant='outlined'
                  className={classes.chip}
                  key={index}
                />
              );
            })}
          </Box>
        </Card>
      </Box>
    </Grid>
  );
};

export default KbItem;
