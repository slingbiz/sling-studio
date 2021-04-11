import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import useStyles from './CustomColorCell.style';
import {AppContext} from '../../index';
import CheckIcon from '@material-ui/icons/Check';
import IntlMessages from '../../utility/IntlMessages';
import {ThemeMode} from '../../../shared/constants/AppEnums';

const CustomColorCell = ({themeColorSet, updateThemeColors}) => {
  const classes = useStyles();
  const {themeMode, theme} = useContext(AppContext);
  return (
    <Box
      component='li'
      onClick={() => {
        updateThemeColors(themeColorSet);
      }}>
      <Box
        height={40}
        width={50}
        style={{backgroundColor: themeColorSet.PrimaryColor}}
        className={classes.colorOption}>
        <Box
          height={60}
          width={60}
          style={{
            backgroundColor: themeColorSet.SecondaryColor,
          }}
          className={classes.colorOptionTriangle}
        />
        <Box
          style={{
            borderColor: '#ADADAD',
            borderWidth: 1,
            backgroundColor:
              themeMode === ThemeMode.LIGHT
                ? 'white'
                : themeColorSet.SidebarColor,
          }}
          className={classes.colorOptionBorder}
        />

        {theme.palette.primary.main === themeColorSet.PrimaryColor &&
        theme.palette.secondary.main === themeColorSet.SecondaryColor ? (
          <span className={classes.colorOptionRightIcon}>
            <CheckIcon className={classes.textBase}>
              <IntlMessages id='customizer.checked' />
            </CheckIcon>
          </span>
        ) : null}
      </Box>
    </Box>
  );
};

export default CustomColorCell;
