import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { doLoadProducts } from '../../store/actions/async/products';
import Products from './products.jsx';

const Wrapper = (props) => {
  useEffect(() => {
    props.load();
  });

  return <Products />;
};

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(doLoadProducts()),
});

export default connect(null, mapDispatchToProps)(Wrapper);
