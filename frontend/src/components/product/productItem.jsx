import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './productItem.sass';

export const ProductItem = (props) => {
  const { product, addToCart } = props;

  const onClick = () => {
    addToCart(product);
  };

  const getPopularity = (orderedCount) => {
    if (orderedCount >= 50) return 3;
    if (orderedCount >= 25) return 2;
    return 1;
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
          <li>${product.coast}</li>
          <li>
            <div className="productcard__description">
              {product.description}
            </div>
          </li>
          <li>
            <div className="productcard__description">
              Popularity: {getPopularity(product.orderedCount)}
            </div>
          </li>
          <li>
            <CardButton label="Add to cart" onClick={onClick} />
          </li>
        </ul>
      </div>
    </div>
  );
};
