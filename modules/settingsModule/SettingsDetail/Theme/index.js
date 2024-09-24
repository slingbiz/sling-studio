import React, {useEffect, useState} from 'react';
import {
  makeStyles,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Grid,
  SwipeableDrawer,
  Icon,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {useSelector, useDispatch} from 'react-redux';
import {getWidgets} from '../../../../redux/actions/Widgets';
import {blue} from '@mui/material/colors';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {Edit, PhotoLibrary} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ListEmptyResult from '../../../../@sling/core/AppList/ListEmptyResult';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({}));

const ThemeSettings = (props) => {
  const {titleKey, pageKey} = props;
  const classes = useStyles(props);
  const dispatch = useDispatch();

  return (
    <>
      <AppsHeader>
        <Box
          fontWeight={Fonts.BOLD}
          component='h3'
          style={{textTransform: 'capitalize'}}>
          {titleKey}
        </Box>
      </AppsHeader>
      <Box
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Box style={{display: 'flex', alignItems: 'center', fontSize: 18}}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Box style={{fontWeight: 'bold'}}>
              Customize your MUI theme and Styles{' '}
              <sup style={{fontSize: 10}}>Coming Soon.</sup>
            </Box>
            <Box style={{display: 'flex', alignItems: 'center', fontSize: 14}}>
              <Button
                color='secondary'
                onClick={() => {
                  window.open(`${process.env.GUIDE_URL}`, '_blank');
                }}>
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ThemeSettings;
