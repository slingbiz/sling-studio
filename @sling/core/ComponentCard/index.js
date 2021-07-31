import React, {useState} from 'react';
import {Card, makeStyles} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CodeIcon from '@material-ui/icons/Code';
import Highlight, {defaultProps} from 'prism-react-renderer';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Scrollbar from '../Scrollbar';
import clsx from 'clsx';
import {highlightTheme} from './highlightTheme';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../AppAnimate';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      borderRadius: 8,
      padding: 16,
      backgroundColor: theme.palette.background.default,
    },
    cardHeader: {
      paddingLeft: 32,
      paddingRight: 32,
      '& .MuiTypography-h5': {
        fontSize: 16,
        fontWeight: Fonts.BOLD,
        marginBottom: 1,
      },
    },
    cardContent: {
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 0,
    },
    preTag: {
      borderRadius: 8,
      padding: 12,
    },
  };
});
const ComponentCard = ({
  title,
  maxHeight,
  description,
  component: Component,
  source,
}) => {
  const [viewSource, setToggleViewSource] = useState(false);
  const [animation, setAnimation] = useState(false);

  const classes = useStyles();

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title={title}
          subheader={description}
          root={{
            subheader: {
              fontSize: 14,
            },
          }}
          action={
            source ? (
              <Box mt={2}>
                <IconButton
                  aria-label='view code'
                  onClick={() => {
                    if (animation) {
                      setAnimation(!animation);
                      setTimeout(() => setToggleViewSource(!viewSource), 400);
                    } else {
                      setAnimation(!animation);
                      setToggleViewSource(!viewSource);
                    }
                  }}>
                  <CodeIcon />
                </IconButton>
              </Box>
            ) : null
          }
        />

        <CardContent className={classes.cardContent}>
          <Collapse in={animation}>
            {viewSource ? (
              <Scrollbar
                style={{
                  borderRadius: 8,
                  background: '#333333',
                }}>
                <Highlight
                  {...defaultProps}
                  code={source}
                  language='jsx'
                  theme={highlightTheme}>
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={clsx(className, classes.preTag)}
                      style={{...style, maxHeight: 500}}>
                      {tokens.map((line, i) => (
                        <Box {...getLineProps({line, key: i})}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({token, key})} />
                          ))}
                        </Box>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </Scrollbar>
            ) : null}
          </Collapse>
          <Scrollbar className={classes.root} style={{maxHeight: maxHeight}}>
            <Box
              width='100%'
              display='flex'
              alignItems='center'
              justifyContent='center'>
              <Component />
            </Box>
          </Scrollbar>
        </CardContent>
      </Card>
    </AppAnimate>
  );
};

export default ComponentCard;

ComponentCard.defaultProps = {
  description: '',
  maxHeight: 500,
};

ComponentCard.propTypes = {
  component: PropTypes.any.isRequired,
  source: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
};
