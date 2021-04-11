import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      color: theme.palette.secondary.contrastText + '!important',
      '&.active, &.active:hover, &.active:focus': {
        backgroundColor: theme.palette.primary.main + '!important',
        color: theme.palette.secondary.contrastText + '!important',
      },
      '& .list-item-text': {
        padding: '0 0 0 16px',
      },
      '&.level-0': {
        height: 48,
        borderRadius: 4,
        '&:hover': {
          background: 'transparent',
        },
      },
      '&.dense': {
        padding: '8px 12px 8px 12px',
        minHeight: 40,
        '&.level-0': {
          height: 44,
        },
        '& .list-item-text': {
          padding: '0 0 0 8px',
        },
      },
    },
    children: {},
    popper: {
      zIndex: 999,
    },
    popperClose: {
      pointerEvents: 'none',
    },
    pl0: {
      paddingLeft: 0,
    },
    fontBold: {
      fontWeight: Fonts.MEDIUM,
    },
    ml2: {
      marginLeft: 8,
    },
    textLg: {
      fontSize: 18,
    },
  };
});
export default useStyles;
