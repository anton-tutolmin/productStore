import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Requests from './requests.jsx';

const Wrapper = () => {
  return <Requests />;
};

// const mapDispatchToProps = (dispatch) => ({
//   load: () => dispatch(doLoadRequest()),
// });

export default connect(null, null)(Wrapper);
