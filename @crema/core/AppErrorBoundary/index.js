import React from 'react';
import Box from '@material-ui/core/Box';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    console.log('error: ', error);
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('errorInfo: ', errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display='flex'
          alignItems='center'
          flexDirection='column'
          justifyContent='center'
          flex={1}>
          <img src={'/images/error.png'} alt='Error Info' />
          <Box component='h2' fontSize={30} mt={4}>
            Ah! Something went wrong.
          </Box>
          <Box fontSize={18} textAlign='center'>
            Brace yourself till we get the error fixed.
          </Box>
          <Box fontSize={18} textAlign='center'>
            You may also refresh the page or try again latter
          </Box>
        </Box>
      );
    } else {
      return this.props.children;
    }
  }
}

export default AppErrorBoundary;
