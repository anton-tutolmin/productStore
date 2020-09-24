import React from 'react';
import { connect } from 'react-redux';
import { OrderItem } from '../../components/order/orderItem.jsx';
import { Loader } from '../../components/loader/loader.jsx';
import { doUpdateOrder } from '../../store/actions/async/order';
import './orders.sass';

const Orders = (props) => {
  const { orders, loading, update } = props;

  const cancelOrder = (orderId) => {
    update(orderId, 'canceled');
  };

  const doneOrder = (orderId) => {
    update(orderId, 'done');
  };

  return (
    <div className="orders">
      {loading ? (
        <Loader />
      ) : (
        orders.map((o) => (
          <div className="orders__container" key={o.id}>
            <OrderItem
              product={o.product}
              cancelOrder={cancelOrder}
              doneOrder={doneOrder}
              orderId={o.id}
              status={o.status}
            />
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
});

const mapDispatchToProps = (dispatch) => ({
  update: (orderId, status) =>
    dispatch(doUpdateOrder(orderId, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
