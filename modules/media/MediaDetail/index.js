import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import Box from '@material-ui/core/Box';
import Gallery from './Gallery';

const LEGACY_MEDIA = {
  constants: 'gallery',
  basic: 'gallery',
  guide: 'gallery',
};

const PagesDetail = (props) => {
  const router = useRouter();
  const {query} = router;
  const rawId = query?.all?.[0] || 'gallery';
  const id = LEGACY_MEDIA[rawId] || rawId;

  useEffect(() => {
    if (LEGACY_MEDIA[rawId]) {
      router.replace('/media/gallery');
    }
  }, [rawId, router]);

  if (id === 'gallery') {
    return (
      <Box style={{height: '100%'}}>
        <Gallery {...props} />
      </Box>
    );
  }

  return (
    <Box style={{height: '100%'}}>
      <Gallery {...props} />
    </Box>
  );
};

export default PagesDetail;
