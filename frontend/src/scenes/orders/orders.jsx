import React from 'react';
import { connect } from 'react-redux';
import { OrderItem } from '../../components/order/orderItem.jsx';
import './orders.sass';

const Orders = (props) => {
  const { orders } = props;
  return (
    <div className="orders">
      {orders.map((p) => (
        <div className="orders__container" key={p.id}>
          <OrderItem order={p} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
});

export default connect(mapStateToProps, null)(Orders);
