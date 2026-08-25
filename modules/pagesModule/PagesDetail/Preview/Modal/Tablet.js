import React from 'react';
import PreviewIframe from './PreviewIframe';

const Tablet = ({urlToPreview}) => {
  return (
    <div className='marvel-device ipad silver'>
      <div className='camera'></div>
      <div className='screen'>
        <PreviewIframe urlToPreview={urlToPreview} />
      </div>
      <div className='home'></div>
    </div>
  );
};

export default Tablet;
