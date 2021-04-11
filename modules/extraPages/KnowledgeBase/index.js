import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {salesData} from '../../../@crema/services/db/extraPages/portFolio/sales';
import {installationData} from '../../../@crema/services/db/extraPages/portFolio/installation';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import Box from '@material-ui/core/Box';
import Sales from './Sales';
import Installation from './Installation';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => {
  return {
    divider: {
      marginTop: 16,
      marginBottom: 16,
      [theme.breakpoints.up('sm')]: {
        marginTop: 24,
        marginBottom: 24,
      },
      [theme.breakpoints.up('lg')]: {
        marginTop: 32,
        marginBottom: 32,
      },
      [theme.breakpoints.up('xl')]: {
        marginTop: 40,
        marginBottom: 40,
      },
    },
  };
});

const KnowledgeBase = () => {
  const {messages} = useIntl();

  const [filterText, setFilterText] = useState('');

  const saleQueries =
    filterText !== ''
      ? salesData.filter((data) => data.ques.includes(filterText))
      : salesData;

  const installationQueries =
    filterText !== ''
      ? installationData.filter((data) => data.ques.includes(filterText))
      : installationData;

  const classes = useStyles();

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box flex={1}>
        <Box mx='auto' textAlign='center' maxWidth={768}>
          <Box
            component='h2'
            color='text.primary'
            mb={6}
            fontSize={20}
            fontWeight={Fonts.BOLD}>
            <IntlMessages id='knowledge.howHelp' />
          </Box>

          <TextField
            id='outlined-with-placeholder'
            placeholder={messages['knowledge.Skeleton']}
            style={{width: '100%'}}
            variant='outlined'
            InputProps={{
              startAdornment: (
                <Box fontWeight={Fonts.MEDIUM} clone>
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                </Box>
              ),
            }}
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
        </Box>

        <Divider className={classes.divider} />

        <Sales saleQueries={saleQueries} />

        <Installation installationQueries={installationQueries} />
      </Box>
    </AppAnimate>
  );
};

export default KnowledgeBase;
