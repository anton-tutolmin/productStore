import React from 'react';
import { connect } from 'react-redux';
import { OrderItem } from '../../components/order/orderItem.jsx';
import { Loader } from '../../components/loader/loader.jsx';
import { Empty } from '../../components/empties/empty.jsx';
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

  const getUnfinishedOrders = () => {
    let result = orders.filter(
      (o) => o.status !== 'canceled' && o.status !== 'done',
    );
    result = result.map((o) => {
      return (
        <div className="orders__container" key={o.id}>
          <OrderItem
            product={o.product}
            cancelOrder={cancelOrder}
            doneOrder={doneOrder}
            orderId={o.id}
            status={o.status}
          />
        </div>
      );
    });
    return result.length ? result : <Empty />;
  };

  const getFinishedOrders = () => {
    let result = orders.filter(
      (o) => o.status === 'canceled' || o.status === 'done',
    );
    result = result.map((o) => {
      return (
        <div className="orders__container" key={o.id}>
          <OrderItem
            product={o.product}
            cancelOrder={cancelOrder}
            doneOrder={doneOrder}
            orderId={o.id}
            status={o.status}
          />
        </div>
      );
    });
    return result.length ? result : <Empty />;
  };

  return (
    <div className="orders">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <div>ACTUAL</div>
            {getUnfinishedOrders()}
          </div>
          <div>
            <div>HISTORY</div>
            {getFinishedOrders()}
          </div>
        </>
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
