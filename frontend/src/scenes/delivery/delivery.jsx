import React from 'react';
import { connect } from 'react-redux';

import {
  DeliveryItem,
  HistoryDeliveryItem,
} from '../../components/delivery/deliveryItem.jsx';

import { doDeliverDelivery } from '../../store/actions/async/order';
import { Loader } from '../../components/loader/loader.jsx';
import { Empty } from '../../components/empties/empty.jsx';
import { OrderTitle } from '../../components/titles/order/orderTitle.jsx';
import './delivery.sass';

const Delivery = (props) => {
  const { delivery, loading, deliver } = props;

  const onDeliver = (orderId) => {
    deliver(orderId);
  };

  const getUnfinished = () => {
    let result = delivery.filter((d) => d.status !== 'done');
    result = result.map((d) => {
      return (
        <div className="delivery__container" key={d.id}>
          <DeliveryItem
            orderId={d.id}
            productId={d.productId}
            clientId={d.clientId}
            deliver={onDeliver}
            status={d.status}
          />
        </div>
      );
    });
    return result.length ? result : <Empty />;
  };

  const getFinished = () => {
    let result = delivery.filter((d) => d.status === 'done');
    result = result.map((d) => {
      return (
        <div className="delivery__container" key={d.id}>
          <HistoryDeliveryItem
            orderId={d.id}
            productId={d.productId}
            clientId={d.clientId}
            status={d.status}
          />
        </div>
      );
    });
    return result.length ? result : <Empty />;
  };

  return (
    <div className="delivery">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <OrderTitle>Current:</OrderTitle>
            {getUnfinished()}
          </div>
          <div>
            <OrderTitle>History:</OrderTitle>
            {getFinished()}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  delivery: state.orders.orders,
  loading: state.orders.loading,
});

const mapDispatchToProps = (dispatch) => ({
  deliver: (orderId) => dispatch(doDeliverDelivery(orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
