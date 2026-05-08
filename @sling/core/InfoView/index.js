import React, {useEffect} from 'react';
import {Loader, MessageView} from '../../../@sling';
import {useDispatch, useSelector} from 'react-redux';

const normalizeToastContent = (value) => {
  if (React.isValidElement(value)) {
    return value;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (typeof value === 'object') {
    return (
      value.message ||
      value.error ||
      value.detail ||
      JSON.stringify(value)
    );
  }
  return String(value);
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
        message={normalizeToastContent(message)}
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
        message={normalizeToastContent(error)}
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
        warning={normalizeToastContent(warning)}
      />
    );
  };

  return (
    <>
      {loading && <Loader />}
      {message && showMessage()}
      {warning && showWarning()}
      {error && showError()}
    </>
  );
};

export default InfoView;
