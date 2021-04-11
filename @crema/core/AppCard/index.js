import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import {Box, CardHeader, makeStyles} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: 14,
  },
  textTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 4,
    '& .MuiCardHeader-action': {
      marginTop: 0,
      marginRight: 0,
    },
  },
}));

const AppCard = ({
  title,
  titleStyle,
  headerStyle,
  contentStyle,
  action,
  actionStyle,
  footer,
  footerPosition,
  footerStyle,
  children,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box display='flex' flexDirection='column' {...rest} clone>
      <Card>
        {title || action ? (
          <CardHeader
            className={classes.cardHeader}
            style={{
              ...headerStyle,
            }}
            title={
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'>
                {typeof title === 'object' ? (
                  title
                ) : (
                  <Box
                    component='h3'
                    className={classes.textTruncate}
                    color='text.primary'
                    alignSelf='flex-start'
                    fontWeight={Fonts.BOLD}
                    fontSize={16}
                    {...titleStyle}>
                    {title}
                  </Box>
                )}
              </Box>
            }
            action={
              typeof action === 'object' ? (
                action
              ) : (
                <Box component='span' ml='auto' mt={2} mr={2} {...actionStyle}>
                  <Link
                    href='#'
                    color='secondary'
                    component='button'
                    underline='none'
                    className={classes.link}>
                    <Box component='span'>{action}</Box>
                  </Link>
                </Box>
              )
            }
          />
        ) : null}
        <CardContent
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            height: '100%',
            ...contentStyle,
          }}>
          {children}
        </CardContent>
        {footer ? (
          <CardActions
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 16,
              ...footerStyle,
            }}>
            {typeof footer === 'object' ? (
              footer
            ) : (
              <Box
                component='span'
                ml={footerPosition === 'right' ? 'auto' : 0}>
                <Link
                  color='secondary'
                  component='button'
                  underline='none'
                  className={classes.link}>
                  {footer}
                </Link>
              </Box>
            )}
          </CardActions>
        ) : null}
      </Card>
    </Box>
  );
};

export default AppCard;

AppCard.prototype = {
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

AppCard.defaultProps = {
  footerPosition: 'left',
};
