import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCircularProgress from '../../../../@crema/core/AppCircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {fade} from '@material-ui/core';
import clsx from 'clsx';
import {AppContext} from '../../../../@crema';

const useStyles = makeStyles((theme) => ({
  learningItems: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
  },
  thumbRoot: {
    backgroundColor: fade(theme.palette.primary.main, 0.12),
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    padding: 6,
  },
}));

const LearningItem = ({course}) => {
  const classes = useStyles();
  const {theme} = useContext(AppContext);
  return (
    <Box
      className={clsx(classes.learningItems, 'item-hover')}
      key={course.id}
      display='flex'
      alignItems='center'>
      <Box display='flex' alignItems='center' mr={2}>
        <Box
          className={classes.thumbRoot}
          width={50}
          height={50}
          display='flex'
          alignItems='center'
          justifyContent='center'>
          <img alt='' src={course.icon} />
        </Box>
        <Box flex={1} ml={4}>
          <Box
            mb={0.5}
            component='h3'
            display='inline-block'
            fontWeight={Fonts.MEDIUM}
            fontSize={14}>
            {course.title}
          </Box>
          <Box component='p' fontSize={14} color='text.secondary' mb={1}>
            {course.desc}
          </Box>
        </Box>
      </Box>

      <Box ml='auto'>
        <AppCircularProgress
          minWidth={42}
          maxWidth={45}
          activeColor='#0A8FDC'
          value={course.percentage}
          valueStyle={{
            fontSize: 12,
            color: theme.palette.text.primary,
            fontWeight: Fonts.MEDIUM,
          }}
          thickness={3}
        />
      </Box>
    </Box>
  );
};

export default LearningItem;
