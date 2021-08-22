import React from 'react';

const Desktop = ({urlToPreview}) => {
  return (
    <div className='marvel-device macbook'>
      <div className='top-bar'></div>
      <div className='camera'></div>
      <div className='screen'>
        <iframe src={urlToPreview} width='100%' height='100%'></iframe>
      </div>
      <div className='bottom-bar'></div>
    </div>
  );
};

export default Desktop;
