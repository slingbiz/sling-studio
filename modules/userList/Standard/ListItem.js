import React from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LanguageIcon from '@material-ui/icons/Language';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
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
  avatar: {
    height: 85,
    width: 85,
  },
  chip: {
    backgroundColor: theme.palette.primary.contrastText,
    color: '#484848',
    paddingRight: 4,
    paddingLeft: 4,
    fontWeight: Fonts.MEDIUM,
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
  titleRoot: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    textAlign: 'center',
  },
}));

const ListItem = (props) => {
  const classes = useStyles(props);
  const {user} = props;
  return (
    <Box mb={8} className='item-hover' clone>
      <Card>
        <Box display='flex' flexDirection={{xs: 'column', sm: 'row'}}>
          <Box
            color='primary.contrastText'
            width={{xs: '100%', sm: 200, xl: 256}}
            p={{xs: 3, lg: 5}}
            bgcolor='primary.main'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'>
            <Box mb={3}>
              <Avatar src={user.image} className={classes.avatar} />
            </Box>
            <Box
              mb={3}
              component='h3'
              className={classes.titleRoot}
              fontSize={16}
              fontWeight={Fonts.BOLD}>
              {user.name}
            </Box>
            <Chip label={`@${user.charge}/Hour`} className={classes.chip} />
          </Box>

          <Box p={5} flex={1}>
            <Box
              mb={{xs: 2, xl: 3}}
              color='grey.600'
              display='flex'
              flexDirection={{xs: 'column', lg: 'row'}}
              alignItems={{lg: 'center'}}>
              <Box
                mx={-3}
                mb={2}
                color='text.primary'
                pr={{xl: 32}}
                display='flex'
                flex={1}
                fontSize={{xs: 14, xl: 16}}
                flexWrap='wrap'
                justifyContent='space-between'>
                <Box
                  px={3}
                  display='flex'
                  alignItems='center'
                  className={classes.pointer}>
                  <MailIcon />
                  <Box ml={2}>{user.email}</Box>
                </Box>

                <Box
                  px={3}
                  display='flex'
                  alignItems='center'
                  className={classes.pointer}>
                  <LanguageIcon />
                  <Box ml={2}>{user.website}</Box>
                </Box>

                <Box
                  px={3}
                  display='flex'
                  alignItems='center'
                  className={classes.pointer}>
                  <PhoneIcon />
                  <Box ml={2}>{user.phone}</Box>
                </Box>
              </Box>

              <Box
                mx={{xs: -1, xl: -4}}
                mb={2}
                pl={{lg: 6, xl: 10}}
                display='flex'
                alignItems='center'
                justifyContent={{xs: 'space-between', sm: 'flex-start'}}
                color='text.primary'>
                <Box component='span' mx={{xs: 1, xl: 4}}>
                  <FacebookIcon className={classes.pointer} />
                </Box>
                <Box component='span' mx={{xs: 1, xl: 4}}>
                  <LinkedInIcon className={classes.pointer} />
                </Box>
                <Box component='span' mx={{xs: 1, xl: 4}}>
                  <InstagramIcon className={classes.pointer} />
                </Box>
                <Box component='span' mx={{xs: 1, xl: 4}}>
                  <TwitterIcon className={classes.pointer} />
                </Box>
              </Box>
            </Box>

            <Box pr={{lg: 6, xl: 16}}>
              <Box
                component='p'
                color='text.secondary'
                mb={4}
                fontSize={14}
                fontWeight={Fonts.LIGHT}>
                {user.information}
              </Box>
            </Box>

            <Box
              display='flex'
              alignItems={{md: 'center'}}
              flexDirection={{xs: 'column', md: 'row'}}>
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
