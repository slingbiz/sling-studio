import React from 'react';
import PreviewIframe from './PreviewIframe';
import NotLivePreview from './NotLivePreview';

const Tablet = ({urlToPreview, notLive, onNavigate}) => {
  return (
    <div className='marvel-device ipad silver'>
      <div className='camera'></div>
      <div className='screen'>
        {notLive ? (
          <NotLivePreview onNavigate={onNavigate} />
        ) : (
          <PreviewIframe urlToPreview={urlToPreview} />
        )}
      </div>
      <div className='home'></div>
    </div>
  );
};

export default Tablet;
