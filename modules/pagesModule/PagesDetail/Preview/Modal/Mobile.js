import React from 'react';

const Mobile = ({urlToPreview}) => {
  return (
    <div class='marvel-device iphone-x'>
      <div class='notch'>
        <div class='camera'></div>
        <div class='speaker'></div>
      </div>
      <div class='top-bar'></div>
      <div class='sleep'></div>
      <div class='bottom-bar'></div>
      <div class='volume'></div>
      <div class='overflow'>
        <div class='shadow shadow--tr'></div>
        <div class='shadow shadow--tl'></div>
        <div class='shadow shadow--br'></div>
        <div class='shadow shadow--bl'></div>
      </div>
      <div class='inner-shadow'></div>
      <div class='screen'>
        <iframe
          src={urlToPreview}
          width='100%'
          height='100%'
          style={{paddingTop: '20px'}}></iframe>
      </div>
    </div>
  );
};

export default Mobile;
