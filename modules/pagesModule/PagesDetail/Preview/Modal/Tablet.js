import React from 'react';

const Tablet = ({urlToPreview}) => {
  return (
    <div className='marvel-device ipad silver'>
      <div className='camera'></div>
      <div className='screen'>
        <iframe src={urlToPreview} width='100%' height='100%'></iframe>
      </div>
      <div className='home'></div>
    </div>
  );
};

export default Tablet;
