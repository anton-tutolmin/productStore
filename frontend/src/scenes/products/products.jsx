import React from 'react';
import { connect } from 'react-redux';
import { ProductItem } from '../../components/product/productItem.jsx';
import { addToCart, addNotification } from '../../store/actions';
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
  addToCart: (payload) => {
    dispatch(addToCart(payload));
    dispatch(addNotification('Added to cart'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
