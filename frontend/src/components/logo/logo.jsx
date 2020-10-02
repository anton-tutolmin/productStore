import React from 'react';
import { Link } from 'react-router-dom';
import './logo.sass';

export const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <span>PRODUCT STORE</span>
      </Link>
    </div>
  );
};
