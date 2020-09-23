import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Orders from './orders.jsx';
import { doLoadOrders } from '../../store/actions/async/order';

const Wrapper = (props) => {
  useEffect(() => {
    props.load(props.userId);
  });

  return (
    <>
      <Orders />
    </>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  load: (userId) => dispatch(doLoadOrders(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
