import React from 'react';
import PreviewIframe from './PreviewIframe';
import NotLivePreview from './NotLivePreview';

const Desktop = ({urlToPreview, notLive, onNavigate}) => {
  return (
    <div className='marvel-device macbook'>
      <div className='top-bar'></div>
      <div className='camera'></div>
      <div className='screen'>
        {notLive ? (
          <NotLivePreview onNavigate={onNavigate} />
        ) : (
          <PreviewIframe urlToPreview={urlToPreview} />
        )}
      </div>
      <div className='bottom-bar'></div>
    </div>
  );
};

export default Desktop;
