import React, { useState, useEffect } from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import productAgent from '../../utils/agent/products';
import userAgent from '../../utils/agent/user';
import './requestItem.sass';

export const RequestItem = (props) => {
  const { orderId, productId, clientId, take } = props;

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
    <div className="requestcard">
      <img
        className="requestcard__img"
        src={product.img}
        alt="pizza"
      />
      <div className="requestcard__text">
        <ul>
          <li>{product.productname}</li>
          <li>${product.coast}</li>
          <li>
            <span className="requestcard__info">
              {client.username} {client.phone}
            </span>
          </li>
          <li>
            <CardButton label="Take" onClick={() => take(orderId)} />
          </li>
        </ul>
      </div>
    </div>
  );
};
