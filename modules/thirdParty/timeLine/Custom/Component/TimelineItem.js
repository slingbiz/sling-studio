import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './TimelineItem.style';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const TimelineItem = (props) => {
  const useStyles1 = makeStyles((theme) => ({
    tag: {
      backgroundColor: props.data.category.color + '25',
      color: props.data.category.color,
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      textTransform: 'capitalize',
    },
  }));

  const classes = useStyles(props);
  const classes1 = useStyles1(props);

  const {data} = props;

  return (
    <Box className={classes.timelineItem}>
      <Box className={classes.timelineItemContent}>
        <Box mb={4} display='flex' alignItems='center'>
          <Box>
            <Box component='h2' mb={2} fontWeight={Fonts.BOLD} fontSize={16}>
              {data.title}
            </Box>
            <time className={classes.timeRoot}>
              <Box fontSize={16} mr={2} clone>
                <i className='material-icons'>event</i>
              </Box>
              {data.date}
            </time>
          </Box>
          <Box
            component='span'
            py={2}
            px={4}
            ml='auto'
            fontWeight={Fonts.MEDIUM}
            fontSize={14}
            className={classes1.tag}>
            {data.category.tag}
          </Box>
        </Box>
        <Typography className={classes.text}>{data.text}</Typography>
        <Box className={classes.timelineItemFooter}>
          {data.link && (
            <a
              className={classes.link}
              href={data.link.url}
              target='_blank'
              rel='noopener noreferrer'>
              {data.link.text}
            </a>
          )}
        </Box>
        <Box component='span' className={classes.circle}>
          <span className={classes.circleInner} />
        </Box>
      </Box>
    </Box>
  );
};
export default TimelineItem;
