import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {grey} from '@material-ui/core/colors/index';

const useStyles = makeStyles((theme) => ({
  timelineItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 45,
    position: 'relative',
    margin: '10px 0',
    width: '50%',

    [theme.breakpoints.up('xl')]: {
      paddingRight: 65,
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingRight: 0,
      paddingLeft: 90,
    },

    '@media (max-width: 499px)': {
      paddingLeft: 50,
    },

    '&:nth-child(odd)': {
      alignSelf: 'flex-end',
      justifyContent: 'flex-start',
      paddingLeft: 45,
      paddingRight: 0,

      [theme.breakpoints.up('xl')]: {
        paddingLeft: 65,
      },

      [theme.breakpoints.down('sm')]: {
        paddingLeft: 90,
      },

      '@media (max-width: 499px)': {
        paddingLeft: 50,
      },

      '& $timelineItemContent': {
        '&:after': {
          right: 'auto',
          left: '-15px',
          transform: 'rotate(180deg)',
        },

        '& $circle': {
          right: 'auto',
          left: '-60px',

          [theme.breakpoints.up('xl')]: {
            left: '-80px',
          },

          [theme.breakpoints.down('sm')]: {
            left: '-75px',
          },

          '@media (max-width: 499px)': {
            left: '-56px',
          },
        },
      },
    },
  },

  timelineItemContent: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    position: 'relative',
    maxWidth: 500,

    '&:after': {
      content: '""',
      position: 'absolute',
      right: '-15px',
      top: 'calc(50% - 20px)',
      width: 0,
      height: 0,
      borderTop: '16px solid transparent',
      borderBottom: '22px solid transparent',
      borderLeft: `16px solid ${theme.palette.background.paper}`,

      [theme.breakpoints.down('sm')]: {
        transform: 'rotate(180deg)',
        right: 'auto',
        left: '-15px',
      },
    },
  },

  circle: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%',
    position: 'absolute',
    top: 'calc(50% - 15px)',
    right: '-60px',
    width: 30,
    height: 30,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up('xl')]: {
      right: '-80px',
    },

    [theme.breakpoints.down('sm')]: {
      right: 'auto',
      left: '-75px',
    },

    '@media (max-width: 499px)': {
      left: '-56px',
    },
  },

  circleInner: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    width: 16,
    height: 16,
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkitBoxOrient': 'vertical',
    '-webkitLineClamp': 3,
  },
  link: {
    color: theme.palette.secondary.main,
    textTransform: 'capitalize',
    fontWeight: 700,
    textDecoration: 'none',
  },
  timelineItemFooter: {
    textAlign: 'center',
    margin: '20px -20px -20px',
    padding: '20px',
    borderTop: `solid 1px ${theme.palette.grey[300]}`,

    [theme.breakpoints.down('sm')]: {
      margin: '20px -20px -20px',
      padding: '12px 20px',
    },
  },
  timeRoot: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: Fonts.LIGHT,
    color: grey[500],
    fontSize: 14,
  },

  '@media (max-width: 1023px)': {
    timelineItemContent: {
      maxWidth: '100%',
    },
  },

  [theme.breakpoints.down('sm')]: {
    timelineItemContent: {
      padding: 20,
    },

    timelineItem: {
      '&:nth-child(odd)': {
        '& $timelineItemContent': {
          padding: 20,
        },
      },
    },
  },
}));
export default useStyles;
