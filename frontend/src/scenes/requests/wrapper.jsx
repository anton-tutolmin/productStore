import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { doLoadRequests } from '../../store/actions/async/order';
import Requests from './requests.jsx';

const Wrapper = (props) => {
  useEffect(() => {
    props.load();
  });

  return <Requests />;
};

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(doLoadRequests()),
});

export default connect(null, mapDispatchToProps)(Wrapper);
