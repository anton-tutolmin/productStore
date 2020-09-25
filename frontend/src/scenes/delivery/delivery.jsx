import React from 'react';
import { connect } from 'react-redux';
import { DeliveryItem } from '../../components/delivery/deliveryItem.jsx';
import { doDeliverDelivery } from '../../store/actions/async/order';
import { Loader } from '../../components/loader/loader.jsx';
import './delivery.sass';

const Delivery = (props) => {
  const { delivery, loading, deliver } = props;

  const onDeliver = (orderId) => {
    deliver(orderId);
  };

  return (
    <div className="delivery">
      {loading ? (
        <Loader />
      ) : (
        delivery.map((d) => (
          <div className="delivery__container" key={d.id}>
            <DeliveryItem
              product={d.product}
              client={d.client}
              orderId={d.id}
              deliver={onDeliver}
              status={d.status}
            />
          </div>
        ))
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
