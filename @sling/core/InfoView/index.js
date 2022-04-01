import React, {useEffect} from 'react';
import {Loader, MessageView} from '../../../@sling';
import {useDispatch, useSelector} from 'react-redux';

const InfoView = () => {
  const {error, loading, message, warning} = useSelector(({common}) => common);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(true);
  }, [message, warning]);

  console.log(warning, 'error, loading, message, warning', open);
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
      {error && showError()}
    </>
  );
};

export default InfoView;
