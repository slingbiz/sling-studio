import React, {useEffect} from 'react';
import {Loader, MessageView} from '../../../@sling';
import {useDispatch, useSelector} from 'react-redux';

const isSessionAuthToast = (error) => {
  if (error == null || error === '') {
    return false;
  }
  const id = error?.props?.id ? String(error.props.id) : '';
  const text = `${error} ${id} ${error?.message || ''}`.toLowerCase();
  return (
    text.includes('401') ||
    text.includes('please authenticate') ||
    text.includes('invalidsession') ||
    text.includes('request failed with status code 401')
  );
};

const InfoView = () => {
  const {error, loading, message, warning, _v} = useSelector(
    ({common}) => common,
  );
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(true);
  }, [message, warning, _v]);

  const showMessage = () => {
    return (
      <MessageView
        open={open}
        setOpen={setOpen}
        variant='success'
        message={message.toString()}
      />
    );
  };

  const showError = () => {
    return (
      <MessageView
        open={open}
        setOpen={setOpen}
        showToast={true}
        variant='error'
        message={error.toString()}
      />
    );
  };

  const showWarning = () => {
    return (
      <MessageView
        open={open}
        setOpen={setOpen}
        showToast={true}
        variant='warning'
        warning={warning.toString()}
      />
    );
  };

  return (
    <>
      {loading && <Loader />}
      {message && showMessage()}
      {warning && showWarning()}
      {error && !isSessionAuthToast(error) && showError()}
    </>
  );
};

export default InfoView;
