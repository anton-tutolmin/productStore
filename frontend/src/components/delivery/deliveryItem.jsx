import React, { useState, useEffect } from 'react';
import productAgent from '../../utils/agent/products';
import userAgent from '../../utils/agent/user';
import { CardButton } from '../buttons/cardButton.jsx';
import './deliveryItem.sass';

export const DeliveryItem = (props) => {
  const { orderId, productId, clientId, status, deliver } = props;

  const [product, setProduct] = useState({});
  const [client, setClient] = useState({});

  useEffect(() => {
    async function loadProduct() {
      const response = await productAgent.loadById(productId);
      setProduct(response.product);
    }
    async function loadClient() {
      const response = await userAgent.loadById(clientId);
      setClient(response.client);
    }
    loadProduct();
    loadClient();
  }, []);

  return (
    <div className="deliverycard">
      <img
        className="deliverycard__img"
        src={product.img}
        alt="pizza"
      />
      <div className="deliverycard__text">
        <ul>
          <li>
            {product.productname} ${product.coast}
          </li>
          <li>
            <span className="deliverycard__info">{status}</span>
          </li>
          <li>
            <span className="deliverycard__info">
              {client.username} {client.phone}
            </span>
          </li>
          <li>
            <CardButton
              label="Delivere"
              onClick={() => deliver(orderId)}
              disabled={status !== 'delivering'}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export const HistoryDeliveryItem = (props) => {
  const { productId, clientId, status } = props;

  const [product, setProduct] = useState({});
  const [client, setClient] = useState({});

  useEffect(() => {
    async function loadProduct() {
      const response = await productAgent.loadById(productId);
      setProduct(response.product);
    }
    async function loadClient() {
      const response = await userAgent.loadById(clientId);
      setClient(response.client);
    }
    loadProduct();
    loadClient();
  }, []);

  return (
    <div className="deliverycard">
      <img
        className="deliverycard__img"
        src={product.img}
        alt="pizza"
      />
      <div className="deliverycard__text">
        <ul>
          <li>
            {product.productname} ${product.coast}
          </li>
          <li>
            <span className="deliverycard__info">{status}</span>
          </li>
          <li>
            <span className="deliverycard__info">
              {client.username} {client.phone}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
