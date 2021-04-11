import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import CakeIcon from '@material-ui/icons/Cake';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';

const PersonalDetails = (props) => {
  const {contact} = props;

  const useStyles = makeStyles((theme) => ({
    borderBottomClass: {
      borderBottom: `1px solid ${grey[300]}`,
    },
    iconRoot: {
      fontSize: 16,
      color: 'grey.600',
    },
  }));

  const classes = useStyles(props);
  return (
    <Box
      pr={{xs: 5, lg: 8, xl: 10}}
      pb={5}
      className={classes.borderBottomClass}>
      <Box component='h6' mb={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
        <IntlMessages id='contactApp.personalDetails' />
      </Box>

      <Box px={{xs: 5, lg: 8, xl: 10}}>
        <Box mb={2} display='flex' alignItems='center'>
          {' '}
          <EmailIcon className={classes.iconRoot} />{' '}
          <Box ml={2} fontSize={14} color='text.secondary'>
            {contact.email}
          </Box>
        </Box>

        <Box mb={2} display='flex' alignItems='center'>
          <PhoneIcon className={classes.iconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {contact.contact}
          </Box>
        </Box>

        <Box mb={2} display='flex' alignItems='center'>
          <LanguageIcon className={classes.iconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {contact.website ? (
              contact.website
            ) : (
              <IntlMessages id='common.na' />
            )}
          </Box>
        </Box>

        <Box display='flex' alignItems='center'>
          <CakeIcon className={classes.iconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {contact.birthday ? (
              contact.birthday
            ) : (
              <IntlMessages id='common.na' />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalDetails;
