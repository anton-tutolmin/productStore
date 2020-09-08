import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './cartButton.sass';

export const CartButton = (props) => {
  const classes = ['navbar__cart-btn'];

  if (props.show) {
    classes.push('active');
  }

  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={props.toggleShow}
    >
      <FontAwesomeIcon icon={faShoppingCart} />
    </button>
  );
};
