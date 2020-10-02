/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faVk,
} from '@fortawesome/free-brands-svg-icons';
import './socialLinks.sass';

export const SocialLinks = () => {
  return (
    <div className="social__links">
      <a href="">
        <FontAwesomeIcon className="faaa" icon={faTwitter} />
      </a>
      <a href="">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="">
        <FontAwesomeIcon icon={faVk} />
      </a>
    </div>
  );
};
