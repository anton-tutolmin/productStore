import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartCounter } from './cartCounter.jsx';
import './cartButton.sass';

const CartButton = (props) => {
  const classes = ['navbar__cart-btn'];

  if (props.show) {
    classes.push('active');
  }

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      {props.count > 0 ? <CartCounter count={props.count} /> : null}
      <button
        type="button"
        className={classes.join(' ')}
        onClick={props.toggleShow}
        id="navbar__cart-btn"
      >
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  count: state.cart.cart.length,
});

export default connect(mapStateToProps, null)(CartButton);
