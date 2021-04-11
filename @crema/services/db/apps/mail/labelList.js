import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import React from 'react';
import {blue, green, grey, red} from '@material-ui/core/colors';

const labelList = [
  {
    id: 211,
    name: 'Crema',
    alias: 'crema',
    color: red[500],
    icon: <WorkIcon />,
  },
  {
    id: 212,
    name: 'Personal',
    alias: 'personal',
    color: blue[500],
    icon: <PersonIcon />,
  },
  {
    id: 213,
    name: 'Work',
    alias: 'work',
    color: green[500],
    icon: <WorkIcon />,
  },
  {
    id: 214,
    name: 'Paypal',
    alias: 'paypal',
    color: grey[500],
    icon: <WorkIcon />,
  },
];
export default labelList;
