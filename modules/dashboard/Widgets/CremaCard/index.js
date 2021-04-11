import React from 'react';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: (props) => props.bgColor,
  },
  userInfo: {
    width: 'calc(100% - 50px)',
  },
  userInfoView: {
    width: 'calc(100% - 50px)',
  },
  pointer: {
    cursor: 'pointer',
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  letterSpacing: {
    letterSpacing: '0.1em',
  },
}));

const CremaCard = (props) => {
  const {data, bgColor, icon} = props;

  const classes = useStyles({bgColor});

  return (
    <AppCard height='1' className={classes.root}>
      <Box mb={{xs: 4, xl: 6}} mt={1} display='flex' alignItems='center'>
        <Box
          mr={2}
          display='flex'
          alignItems='center'
          className={classes.userInfo}>
          <Box width={40}>
            <img alt='logo' src={data.image} />
          </Box>
          <Box ml={4} fontSize={14} className={classes.userInfoView}>
            <Box
              component='h4'
              color='primary.contrastText'
              fontWeight={Fonts.BOLD}
              fontSize={16}
              className={clsx(
                classes.textUppercase,
                classes.truncate,
                classes.letterSpacing,
              )}>
              {data.name}
            </Box>
            <Box
              component='span'
              color='primary.contrastText'
              mb={0}
              display='block'
              className={clsx(classes.pointer, classes.truncate)}>
              {data.id}
            </Box>
          </Box>
        </Box>
        <Box component='span' ml='auto'>
          {icon}
        </Box>
      </Box>

      <Box
        component='p'
        color='primary.contrastText'
        mb={{xs: 1, xl: 4}}
        fontSize={14}>
        {data.desc}
      </Box>
    </AppCard>
  );
};

export default CremaCard;

CremaCard.defaultProps = {
  bgColor: '',
};

CremaCard.propTypes = {
  data: PropTypes.object.isRequired,
  bgColor: PropTypes.string,
};
