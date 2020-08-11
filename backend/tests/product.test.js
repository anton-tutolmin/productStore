const mongoose = require('mongoose');
const ProductController = require('../src/controllers/productController');

const url = require('./config').url;

describe('Product tests:', () => {

  beforeAll(async () => {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('products');
    await mongoose.connection.close();
  });

  describe('Product operations: ', () => {

    let createdProduct;

    test('Creating product:', async () => {
      const product = await ProductController.createProduct({
        productname: 'lipton',
        description: 'really cheap tea',
        coast: '40',
        img: 'lipton.jpg'
      });

      expect(product.productname).toBe('lipton');
      expect(product.description).toBe('really cheap tea');
      expect(product.coast).toBe('40');
      expect(product.img).toBe('lipton.jpg');
      createdProduct = product;
    });
  
    test('Getting all products:', async () => {
      const products = await ProductController.getAllProducts();

      expect(products.length).toBe(1);
    });
  
    test('Getting products by id:', async () => {
      const product =
        await ProductController.getProductById(createdProduct._id);

      expect(product.productname).toBe(createdProduct.productname);
      expect(product.description).toBe(createdProduct.description);
      expect(product.coast).toBe(createdProduct.coast);
      expect(product.img).toBe(createdProduct.img);
    });
  
    test('Updating products by id:', async () => {
      const product1 =
        await ProductController
          .updateProductById(createdProduct._id, {
            productname: 'greenfield'
      });

      const product2 =
        await ProductController
          .updateProductById(createdProduct._id, {
            description: 'really bad tea'
      });

      const product3 =
        await ProductController
          .updateProductById(createdProduct._id, {
            coast: '45'
      });

      const product4 =
        await ProductController
          .updateProductById(createdProduct._id, {
            img: 'greenfield.jpg'
      });

      expect(product1.productname).toBe('greenfield');
      expect(product2.description).toBe('really bad tea');
      expect(product3.coast).toBe('45');
      expect(product4.img).toBe('greenfield.jpg');
    });
  
    test('Deleting products by id:', async () => {
      await ProductController.deleteProductById(createdProduct._id);
      const products = await ProductController.getAllProducts();
      expect(products.length).toBe(0);
    });

  })

});