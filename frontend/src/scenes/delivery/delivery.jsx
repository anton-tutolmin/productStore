import React from 'react';
import { connect } from 'react-redux';
import { DeliveryItem } from '../../components/delivery/deliveryItem.jsx';
import { doUpdateOrder } from '../../store/actions/async/order';
import './delivery.sass';

const Delivery = (props) => {
  const { delivery, delivere } = props;

  const onDelivere = (orderId) => {
    delivere(orderId, 'delivered');
  };

  return (
    <div className="delivery">
      {delivery.map((d) => (
        <div className="delivery__container" key={d.id}>
          <DeliveryItem
            product={d.product}
            client={d.client}
            orderId={d.id}
            delivere={onDelivere}
          />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  delivery: state.orders.orders,
});

const mapDispatchToProps = (dispatch) => ({
  delivere: (orderId, status) =>
    dispatch(doUpdateOrder(orderId, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
