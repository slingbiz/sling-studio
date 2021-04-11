import React from 'react';
import Card from '@material-ui/core/Card';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';

const ListItem = (props) => {
  const useStyles = makeStyles((theme) => ({
    crUserImage: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      width: '100%',
      height: 180,
      objectFit: 'cover',
      [theme.breakpoints.up('sm')]: {
        width: 130,
        height: 130,
      },
    },
    chipLabel: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.grey[700]
          : theme.palette.grey[200],
      padding: '4px 12px',
      marginTop: 8,
      marginRight: 4,
      marginLeft: 4,
      border: '1px solid',
      borderColor: grey[500],
      borderRadius: 2,
      [theme.breakpoints.up('xl')]: {
        marginRight: 8,
        marginLeft: 8,
      },
    },
    hireButton: {
      marginRight: 20,
      marginTop: 8,
      padding: '9px 12px',
      lineHeight: 1,
      width: 96,
      fontWeight: Fonts.MEDIUM,
    },
    removeButton: {
      backgroundColor: theme.palette.primary.contrastText,
      color: grey[500],
      marginTop: 8,
      border: '1px solid',
      borderColor: grey[500],
      width: 96,
      fontWeight: Fonts.MEDIUM,
      padding: '9px 12px',
      lineHeight: 1,
    },
    pointer: {
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);

  const {user} = props;

  return (
    <Box p={5} mb={5} className='item-hover' clone>
      <Card>
        <Box display='flex' flexDirection={{xs: 'column', sm: 'row'}}>
          <Box mr={{sm: 5}} mb={{xs: 3, sm: 0}}>
            <img src={user.image} alt='user' className={classes.crUserImage} />
          </Box>

          <Box flex={1}>
            <Box
              mb={3}
              display='flex'
              flexDirection={{xs: 'column', sm: 'row'}}
              color='text.secondary'>
              <Box
                component='h3'
                mb={{xs: 2, sm: 0}}
                fontSize={16}
                fontWeight={Fonts.BOLD}>
                {user.name}
              </Box>

              <Box
                ml={{xs: -4, sm: 'auto'}}
                mr={{sm: -4}}
                display='flex'
                alignItems='center'
                justifyContent={{xs: 'space-between', sm: 'flex-end'}}
                color='text.secondary'>
                <Box mx={4} component='span'>
                  <Tooltip
                    className={classes.pointer}
                    title={<IntlMessages id='common.share' />}>
                    <ShareIcon />
                  </Tooltip>
                </Box>

                <Box mx={4} component='span'>
                  <Tooltip
                    className={classes.pointer}
                    title={<IntlMessages id='common.bookmark' />}>
                    <BookmarkBorderIcon />
                  </Tooltip>
                </Box>

                <Box mx={4} component='span'>
                  <Tooltip
                    className={classes.pointer}
                    title={<IntlMessages id='common.more' />}>
                    <MoreVertIcon />
                  </Tooltip>
                </Box>
              </Box>
            </Box>

            <Box pr={{lg: 6, xl: 16}}>
              <Box component='p' color='text.secondary' mb={4} fontSize={14}>
                {user.information}
              </Box>
            </Box>

            <Box
              display='flex'
              flexDirection={{xs: 'column', md: 'row'}}
              alignItems={{md: 'center'}}>
              <Box mx={{xs: -1, xl: -2}}>
                {user.skills.map((skill, index) => {
                  return (
                    <Chip
                      key={index}
                      label={skill}
                      className={classes.chipLabel}
                    />
                  );
                })}
              </Box>

              <Box ml={{md: 'auto'}}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.hireButton}>
                  <IntlMessages id='common.hire' />
                </Button>
                <Button variant='contained' className={classes.removeButton}>
                  <IntlMessages id='mailApp.remove' />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ListItem;

ListItem.propTypes = {
  user: PropTypes.object.isRequired,
};
