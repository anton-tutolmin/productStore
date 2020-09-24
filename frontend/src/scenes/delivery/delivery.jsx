import React from 'react';
import { connect } from 'react-redux';
import { DeliveryItem } from '../../components/delivery/deliveryItem.jsx';
import { doTakeDelivery } from '../../store/actions/async/order';
import './delivery.sass';

const Delivery = (props) => {
  const { delivery, takeDelivery } = props;

  return (
    <div className="delivery">
      {delivery.map((p) => (
        <div className="delivery__container" key={p.id}>
          <DeliveryItem product={p} takeDelivery={takeDelivery} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  delivery: state.delivery.delivery,
});

const mapDispatchToProps = (dispatch) => ({
  takeDelivery: () => dispatch(doTakeDelivery()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
