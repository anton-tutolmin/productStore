import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Delivery from './delivery.jsx';
import { doLoadDelivery } from '../../store/actions/async/order';

const Wrapper = (props) => {
  useEffect(() => {
    props.load();
  });

  return <Delivery />;
};

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(doLoadDelivery()),
});

export default connect(null, mapDispatchToProps)(Wrapper);
