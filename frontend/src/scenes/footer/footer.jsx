import React from 'react';
import { Logo } from '../../components/logo/logo.jsx';
import { SocialLinks } from '../../components/socials/socialLinks.jsx';
import './footer.sass';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Logo />
        <Info />
      </div>
      <nav className="footer__nav">
        <ul>
          <li className="footer__nav-item">Main</li>
          <li className="footer__nav-item">Products</li>
          <li className="footer__nav-item">About</li>
          <li className="footer__nav-item">Contacts</li>
        </ul>
      </nav>
      <div className="footer__social-links">
        <SocialLinks />
      </div>
    </footer>
  );
};

const Info = () => {
  return (
    <div className="footer__info">
      Copyright © 2017-2020 HUP by John Rambo
    </div>
  );
};
