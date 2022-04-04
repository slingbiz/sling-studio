import React from 'react';
import {Loader, MessageView} from '../../../@sling';
import {useSelector} from 'react-redux';

const InfoView = () => {
  const {error, loading, message} = useSelector(({common}) => common);

  const showMessage = () => {
    return <MessageView variant='success' message={message} />;
  };

  const showError = () => {
    return <MessageView variant='error' message={error} />;
  };

  return (
    <>
      {loading && <Loader />}

      {message && showMessage()}
      {error && showError()}
    </>
  );
};

export default InfoView;
