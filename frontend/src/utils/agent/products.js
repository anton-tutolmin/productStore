import products from '../../store/actions/async/products';

const load = () => {
  products.load();
};

export default { load };
