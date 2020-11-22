import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardButton } from '../buttons/cardButton';
import productAgent from '../../utils/agent/products';
import { RatingModal } from '../modals/ratingModal';
import './orderItem.sass';

export const OrderItem = (props) => {
  const { order, cancelOrder, doneOrder, handleRatingCurier } = props;

  const [product, setProduct] = useState({});
  const [isShowRatingModal, setIsShowRatingModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function loadProduct() {
      const productResponse = await productAgent.loadById(order.productId);
      setProduct(productResponse.product);
    }

    loadProduct();
  }, []);

  const handleOrderInfoRedirect = (e) => {
    e.preventDefault();
    history.push(`/order/${order.id}`);
  };

  const handleDoneOrder = (e) => {
    e.stopPropagation();
    setIsShowRatingModal(true);
  };

  const handleCancelOrder = (e) => {
    e.stopPropagation();
    cancelOrder(order.id);
  };

  const handleCloseRatingModal = (rating) => {
    setIsShowRatingModal(false);
    doneOrder(order.id);
    handleRatingCurier(rating, order.curierId);
  };

  return (
    <>
      <div className="ordercard" onClick={handleOrderInfoRedirect}>
        <img className="ordrcard__img" src={product.img} alt="pizza" />
        <div className="ordercard__text">
          <ul>
            <li>{product.productname}</li>
            <li>
              <span className="ordercard__status">{order.status}</span>
            </li>
            <li>
              <CardButton label="Done" onClick={handleDoneOrder} />
              <CardButton
                label="Cancel"
                onClick={handleCancelOrder}
                disabled={order.status !== 'created'}
              />
            </li>
          </ul>
        </div>
      </div>
      {isShowRatingModal ? (
        <RatingModal closeRatingModal={handleCloseRatingModal} />
      ) : null}
    </>
  );
};

export const HistoryOrderItem = (props) => {
  const { order } = props;

  const [product, setProduct] = useState({});

  useEffect(() => {
    async function loadProduct() {
      const response = await productAgent.loadById(order.productId);
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
            <span className="ordercard__status">{order.status}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
