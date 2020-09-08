import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './profileButton.sass';

export const ProfileButton = (props) => {
  const classes = ['navbar__profile-btn'];

  if (props.active === '/profile') {
    classes.push('active');
  }

  const handleClick = () => {
    props.setActive('/profile');
  };

  return (
    <button type="button" className={classes.join(' ')}>
      <Link to="/profile" onClick={handleClick}>
        <FontAwesomeIcon icon={faUserAlt} />
      </Link>
    </button>
  );
};
