import React from 'react';
import AuthLayout from './AuthLayout';

const withLayout = (ComposedComponent) => (props) => {
  return (
    <AuthLayout>
      <ComposedComponent {...props} />
    </AuthLayout>
  );
};

export default withLayout;
