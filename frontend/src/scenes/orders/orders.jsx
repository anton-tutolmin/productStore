import React from 'react';
import { connect } from 'react-redux';
import {
  OrderItem,
  HistoryOrderItem,
} from '../../components/orderCard/orderCard';
import { Loader } from '../../components/loader/loader';
import { Empty } from '../../components/empties/empty';
import { OrderTitle } from '../../components/titles/order/orderTitle';
import { doDoneOrder, doCancelOrder } from '../../store/actions/async/order';
import { addRating } from '../../utils/agent/rating';
import './orders.sass';

const Orders = (props) => {
  const { orders, loading, done, cancel } = props;

  const cancelOrder = (orderId) => {
    cancel(orderId);
  };

  const doneOrder = (orderId) => {
    done(orderId);
  };

  const handleRatingCurier = (rating, curierId) => {
    addRating(rating, curierId);
  };

  const getUnfinishedOrders = () => {
    let result = orders.filter(
      (o) => o.status !== 'canceled' && o.status !== 'done',
    );
    result = result.map((o) => {
      return (
        <div className="orders__container" key={o.id}>
          <OrderItem
            order={o}
            cancelOrder={cancelOrder}
            doneOrder={doneOrder}
            handleRatingCurier={handleRatingCurier}
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
          <HistoryOrderItem order={o} />
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
            <OrderTitle>Current:</OrderTitle>
            {getUnfinishedOrders()}
          </div>
          <div>
            <OrderTitle>History:</OrderTitle>
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
