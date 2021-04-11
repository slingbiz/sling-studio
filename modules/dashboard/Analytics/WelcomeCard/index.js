import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import AppCard from '../../../../@crema/core/AppCard';

const WelcomeCard = ({data}) => {
  const useStyles = makeStyles((theme) => ({
    textRoot: {
      textTransform: 'capitalize',
    },
    graphText: {
      fontWeight: Fonts.MEDIUM,
      fontSize: 16,
      [theme.breakpoints.up('xl')]: {
        fontSize: 18,
      },
    },
    textTruncate: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    imgRoot: {
      display: 'flex',
      alignItems: 'flex-end',
      marginRight: -24,
      marginBottom: -20,
      [theme.breakpoints.up('sm')]: {
        height: 150,
      },
      [theme.breakpoints.up('xl')]: {
        height: 200,
      },
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    ancer: {
      cursor: 'pointer',
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    specialTitle: {
      position: 'relative',
      lineHeight: 1,
      marginBottom: 5,
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: -12,
        width: 3,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 8,
      },
    },
  }));

  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <AppCard mb={{xs: 5, md: 8}}>
      <Box flex={1} display='flex' flexDirection={{xs: 'column', sm: 'row'}}>
        <Box
          mr={{xs: 2, xl: 10}}
          flex={1}
          display='flex'
          flexDirection='column'
          justifyContent='space-between'>
          <Box mb={3}>
            <Box
              component='h5'
              color='text.primary'
              fontWeight={Fonts.MEDIUM}
              mb={2}
              fontSize={16}>
              {messages['dashboard.analytics.welcome']}
            </Box>
            <Box
              component='h3'
              color='text.primary'
              fontWeight={Fonts.MEDIUM}
              fontSize={20}>
              {messages['dashboard.analytics.eddieMassy']}
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'>
            {data.map((item, index) => (
              <Box key={'box-' + index} pl={3} mr={3}>
                <Box
                  className={classes.specialTitle}
                  component='h5'
                  color='text.primary'
                  fontWeight={Fonts.MEDIUM}
                  fontSize={{xs: 18, xl: 20}}>
                  {item.counts}
                </Box>

                <Box
                  className={classes.ancer}
                  component='a'
                  fontSize={14}
                  color='primary.main'>
                  {item.type}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className={classes.imgRoot}>
          <img alt='welcome' src={'/images/dashboard/welcomImage.png'} />
        </Box>
      </Box>
    </AppCard>
  );
};

export default WelcomeCard;
