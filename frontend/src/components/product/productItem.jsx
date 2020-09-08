import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './productItem.sass';

export const ProductItem = (props) => {
  const { product, addToCart } = props;

  const onClick = () => {
    addToCart(product);
  };

  return (
    <div className="productcard">
      <img
        src={product.img}
        alt="pizza"
        className="productcard__img"
      />
      <div className="productcard__text">
        <ul>
          <li>{product.productname}</li>
          <li>
            <div className="productcard__description">
              {product.description}
            </div>
          </li>
          <li>{product.coast}</li>
          <li>
            <CardButton label="Add to cart" onClick={onClick} />
          </li>
        </ul>
      </div>
    </div>
  );
};
