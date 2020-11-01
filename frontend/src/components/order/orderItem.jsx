import React, { useEffect, useState } from 'react';
import { CardButton } from '../buttons/cardButton';
import productAgent from '../../utils/agent/products';
import './orderItem.sass';

export const OrderItem = (props) => {
  const {
    cancelOrder,
    doneOrder,
    orderId,
    productId,
    status,
  } = props;

  const [product, setProduct] = useState({});

  useEffect(() => {
    async function loadProduct() {
      const response = await productAgent.loadById(productId);
      setProduct(response.product);
    }
    loadProduct();
  }, []);

  return (
    <div className="ordercard">
      <img className="ordrcard__img" src={product.img} alt="pizza" />
      <div className="ordercard__text">
        <ul>
          <li>{product.productname}</li>
          <li>
            <span className="ordercard__status">{status}</span>
          </li>
          <li>
            <CardButton
              label="Done"
              onClick={() => doneOrder(orderId)}
              disabled={status !== 'delivered'}
            />
            <CardButton
              label="Cancel"
              onClick={() => cancelOrder(orderId)}
              disabled={status !== 'created'}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export const HistoryOrderItem = (props) => {
  const { status, orderId, productId } = props;

  const [product, setProduct] = useState({});

  useEffect(() => {
    async function loadProduct() {
      const response = await productAgent.loadById(productId);
      setProduct(response.product);
    }
    loadProduct();
  }, []);

  return (
    <div className="ordercard">
      <img className="ordrcard__img" src={product.img} alt="pizza" />
      <div className="ordercard__text history__text">
        <ul>
          <li>{product.productname}</li>
          <li>
            <span className="ordercard__status">{status}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
