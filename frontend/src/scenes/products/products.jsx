import React from 'react';
import { connect } from 'react-redux';
import { ProductItem } from '../../components/product/productItem.jsx';
import { addToCart, addNotification } from '../../store/actions';
import { Loader } from '../../components/loader/loader.jsx';
import './products.sass';

const Products = (props) => {
  const { products, add, loading } = props;

  return (
    <div className="products">
      {loading ? (
        <Loader />
      ) : (
        products.map((p) => (
          <div className="container" key={p.productname}>
            <ProductItem product={p} addToCart={add} />
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  loading: state.products.loading,
});

const mapDispatchToProps = (dispatch) => ({
  add: (payload) => {
    dispatch(addToCart(payload));
    dispatch(addNotification('Added to cart'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
