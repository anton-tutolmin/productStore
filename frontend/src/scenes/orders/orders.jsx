import React from 'react';
import { connect } from 'react-redux';
import { OrderItem } from '../../components/order/orderItem.jsx';
import { Loader } from '../../components/loader/loader.jsx';
import {
  doDoneOrder,
  doCancelOrder,
} from '../../store/actions/async/order';
import './orders.sass';

const Orders = (props) => {
  const { orders, loading, done, cancel } = props;

  const cancelOrder = (orderId) => {
    cancel(orderId);
  };

  const doneOrder = (orderId) => {
    done(orderId);
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
  done: (orderId) => dispatch(doDoneOrder(orderId)),
  cancel: (orderId) => dispatch(doCancelOrder(orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
