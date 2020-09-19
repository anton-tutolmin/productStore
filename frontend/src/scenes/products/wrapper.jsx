import React, { useEffect } from 'react';
import agent from '../../utils/agent/products';
import Products from './products.jsx';

export default () => {
  useEffect(() => {
    agent.load();
  });

  return <Products />;
};
