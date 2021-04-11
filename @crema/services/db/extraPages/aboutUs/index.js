import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SearchIcon from '@material-ui/icons/Search';
import IntlMessages from '../../../../utility/IntlMessages';
import {blue, red, teal} from '@material-ui/core/colors';

export const aboutUsData = [
  {
    alias: 'branding',
    title: <IntlMessages id='extra.branding' />,
    avatarColor: teal[600],
    icon: <EditIcon />,
    content: <IntlMessages id='extra.brandingContent' />,
  },
  {
    alias: 'photography',
    title: <IntlMessages id='extra.photography' />,
    avatarColor: red[500],
    icon: <PhotoCameraIcon />,
    content: <IntlMessages id='extra.brandingContent' />,
  },
  {
    alias: 'seo',
    title: <IntlMessages id='extra.seo' />,
    avatarColor: blue[500],
    icon: <SearchIcon />,
    content: <IntlMessages id='extra.brandingContent' />,
  },
];

export const teamData = [
  {
    id: 444,
    name: 'Asantha Powel',
    position: 'CEO',
    image: 'https://via.placeholder.com/250',
  },
  {
    id: 111,
    name: 'Johna Taylor',
    position: 'CTO',
    image: 'https://via.placeholder.com/250',
  },
  {
    id: 222,
    name: 'Nick Campbell',
    position: 'General Manager',
    image: 'https://via.placeholder.com/250',
  },
  {
    id: 333,
    name: 'Johna Taylor',
    position: 'CFO',
    image: 'https://via.placeholder.com/250',
  },
  {
    id: 555,
    name: 'Ricardo Johnson',
    position: 'Director',
    image: 'https://via.placeholder.com/250',
  },
  {
    id: 666,
    name: 'Johnson Lopez',
    position: 'Technical Advisor',
    image: 'https://via.placeholder.com/250',
  },
];
