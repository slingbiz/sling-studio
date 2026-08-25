import React from 'react';
import PreviewIframe from './PreviewIframe';

const Desktop = ({urlToPreview}) => {
  return (
    <div className='marvel-device macbook'>
      <div className='top-bar'></div>
      <div className='camera'></div>
      <div className='screen'>
        <PreviewIframe urlToPreview={urlToPreview} />
      </div>
      <div className='bottom-bar'></div>
    </div>
  );
};

export default Desktop;
