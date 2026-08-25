import React from 'react';
import PreviewIframe from './PreviewIframe';

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
        <PreviewIframe urlToPreview={urlToPreview} />
      </div>
    </div>
  );
};

export default Mobile;
