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

const WidgetsIntegration = (props) => {
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
        <Box style={{display: 'flex', alignItems: 'center'}}></Box>
      </AppsHeader>
    </>
  );
};

export default WidgetsIntegration;
