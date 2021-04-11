import dynamic from 'next/dynamic';
import React from 'react';
import {Loader} from '../index';

export default function asyncComponent(importComponent) {
  return dynamic(importComponent, {
    loading: () => <Loader />,
  });
}
