import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  newBadge: {
    borderRadius: 30,
    color: '#fff',
    padding: theme.spacing(1, 3),
    fontSize: 12,
    fontWeight: Fonts.MEDIUM,
    display: 'inline-block',
    minWidth: 75,
    textAlign: 'center',
  },
  avatarRoot: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    [theme.breakpoints.up('lg')]: {
      width: 70,
      height: 70,
    },
    [theme.breakpoints.up('xl')]: {
      width: 90,
      height: 90,
    },
    '& img': {
      [theme.breakpoints.down('lg')]: {
        height: 40,
        '&.cap': {
          height: 'auto',
          width: 40,
        },
      },
    },
  },
}));

const GeneralStats = ({stats}) => {
  const classes = useStyles();
  return (
    <AppCard height={1} className='card-hover'>
      <Box display='flex' alignItems='center'>
        <Box>
          <Box component='p' mb={1} fontSize={14}>
            {stats.title}
          </Box>
          <Box mb={3} component='h3' fontSize={20}>
            {stats.count}
          </Box>
          <Box
            component='span'
            bgcolor={stats.badgeColor}
            className={classes.newBadge}>
            {stats.new}
          </Box>
        </Box>
        <Box ml='auto'>
          <Avatar
            className={classes.avatarRoot}
            style={{backgroundColor: stats.bgcolor}}>
            <img
              className={stats.id === 2 ? 'cap' : ''}
              src={stats.icon}
              alt='icon'
            />
          </Avatar>
        </Box>
      </Box>
    </AppCard>
  );
};

export default GeneralStats;
