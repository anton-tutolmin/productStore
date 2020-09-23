import React from 'react';
import { connect } from 'react-redux';
import { OrderItem } from '../../components/order/orderItem.jsx';
import { Loader } from '../../components/loader/loader.jsx';
import './orders.sass';

const Orders = (props) => {
  const { orders, loading } = props;
  return (
    <div className="orders">
      {loading ? (
        <Loader />
      ) : (
        orders.map((p) => (
          <div className="orders__container" key={p.id}>
            <OrderItem order={p.product} />
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

export default connect(mapStateToProps, null)(Orders);
