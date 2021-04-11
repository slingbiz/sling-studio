import React, {useState} from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import AppGrid from '../../../../@crema/core/AppGrid';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core';
import MediaViewer from '../../../../@crema/core/MedialViewer';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    borderRadius: 10,
    display: 'block',
    width: '100%',
    cursor: 'pointer',
  },
}));

const Photos = ({photos}) => {
  const [index, setIndex] = useState(-1);

  const onClose = () => {
    setIndex(-1);
  };
  const {messages} = useIntl();
  const classes = useStyles();
  return (
    <AppCard mb={8} title={messages['wall.photos']}>
      <Box pt={2.5}>
        <AppGrid
          data={photos}
          column={3}
          itemPadding={4}
          responsive={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
          }}
          renderRow={(photo, index) => (
            <img
              onClick={() => setIndex(index)}
              className={clsx(classes.avatarRoot, 'card-hover')}
              key={index}
              src={photo.thumb}
              alt='user'
            />
          )}
        />
      </Box>
      <Box
        mx={-6}
        mt={4}
        pt={3}
        px={6}
        style={{borderTop: '1px solid #E5E4EA'}}
        color='primary.main'
        textAlign='center'
        className='pointer'>
        View More
      </Box>
      <MediaViewer
        index={index}
        medias={photos.map((data) => {
          return {
            src: data.thumb,
            metaData: {
              type: 'image',
            },
          };
        })}
        onClose={onClose}
      />
    </AppCard>
  );
};

export default Photos;
