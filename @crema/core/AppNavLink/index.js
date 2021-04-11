import React from 'react';
import Link from 'next/link';

const AppNavLink = ({to, children, ...rest}) => (
  <Link href={to} {...rest}>
    <>{children}</>
  </Link>
);

export default AppNavLink;
