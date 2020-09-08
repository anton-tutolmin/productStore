import React from 'react';
import { connect } from 'react-redux';
import { ProductItem } from '../components/product/productItem.jsx';
import './products.sass';

const Products = (props) => {
  const { products, addToCart } = props;

  return (
    <div className="products">
      {products.map((p) => (
        <div className="container" key={p.id}>
          <ProductItem product={p} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (payload) => dispatch({ type: 'ADD_TO_CART', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
