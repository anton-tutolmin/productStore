const mongoose = require('mongoose');
const ProductController = require('../src/controllers/productController');

const url = require('./config').url;

describe('Product tests:', () => {
  beforeAll(async () => {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('products');
    await mongoose.connection.close();
  });

  describe('Product operations: ', () => {
    let createdProduct;

    test('Creating product:', async () => {
      const product = await ProductController.create({
        productname: 'lipton',
        description: 'really cheap tea',
        coast: 40,
        img: 'lipton.jpg',
      });

      expect(product.productname).toBe('lipton');
      expect(product.description).toBe('really cheap tea');
      expect(product.coast).toBe(40);
      expect(product.img).toBe('lipton.jpg');
      createdProduct = product;
    });

    test('Getting all products:', async () => {
      const products = await ProductController.getAll();
      expect(products.length).toBe(1);
    });

    test('Getting products by id:', async () => {
      const product = await ProductController.getById(
        createdProduct._id,
      );

      expect(product.productname).toBe(createdProduct.productname);
      expect(product.description).toBe(createdProduct.description);
      expect(product.coast).toBe(createdProduct.coast);
      expect(product.img).toBe(createdProduct.img);
    });

    test('Updating products by id:', async () => {
      const product1 = await ProductController.updateById(
        createdProduct._id,
        {
          productname: 'greenfield',
        },
      );

      const product2 = await ProductController.updateById(
        createdProduct._id,
        {
          description: 'really bad tea',
        },
      );

      const product3 = await ProductController.updateById(
        createdProduct._id,
        {
          coast: 45,
        },
      );

      const product4 = await ProductController.updateById(
        createdProduct._id,
        {
          img: 'greenfield.jpg',
        },
      );

      expect(product1.productname).toBe('greenfield');
      expect(product2.description).toBe('really bad tea');
      expect(product3.coast).toBe(45);
      expect(product4.img).toBe('greenfield.jpg');
    });

    test('Deleting products by id:', async () => {
      await ProductController.deleteById(createdProduct._id);
      const products = await ProductController.getAll();
      expect(products.length).toBe(0);
    });
  });

  describe('Product errors tests:', () => {
    test('Create with wrong params', async () => {
      const product = {
        productname: 'testerror',
        description: 'testerror',
        coast: 100,
        img: 'testerror.jpg',
      };

      try {
        await ProductController.create({
          ...product,
          productname: '!@#$%^$^',
        });
      } catch (e) {
        expect(e.message).toBe('Not correct productname');
      }

      try {
        await ProductController.create({
          ...product,
          productname: 'aa',
        });
      } catch (e) {
        expect(e.message).toBe('Not correct productname');
      }

      try {
        await ProductController.create({
          ...product,
          description: '!@#$%$^$',
        });
      } catch (e) {
        expect(e.message).toBe('Not correct description');
      }

      try {
        await ProductController.create({
          ...product,
          description: 'aa',
        });
      } catch (e) {
        expect(e.message).toBe('Not correct description');
      }

      try {
        await ProductController.create({
          ...product,
          coast: 0,
        });
      } catch (e) {
        expect(e.message).toBe('Not correct coast');
      }

      try {
        await ProductController.create({
          ...product,
          img: '!@#.jpg',
        });
      } catch (e) {
        expect(e.message).toBe('Not correct image');
      }
    });

    test('Get with wrong id', async () => {
      try {
        await ProductController.getById('wrongid');
      } catch (e) {
        expect(e.message).toBe('Not valid id');
      }
    });

    test('Delete with wrong id', async () => {
      try {
        await ProductController.deleteById('wrongid');
      } catch (e) {
        expect(e.message).toBe('Not valid id');
      }
    });

    describe('Updating with wrong:', () => {
      let product;

      beforeAll(async () => {
        product = await ProductController.create({
          productname: 'updateerrortest',
          description: 'updateerrortest',
          coast: 100,
          img: 'updateerrortest.jpg',
        });
      });

      test('Productname', async () => {
        try {
          await ProductController.updateById(product._id, {
            ...product,
            productname: '!@#wrong!@#',
          });
        } catch (e) {
          expect(e.message).toBe('Not correct productname');
        }
      });

      test('Description', async () => {
        try {
          await ProductController.updateById(product._id, {
            ...product,
            description: '!@#wrong!@#',
          });
        } catch (e) {
          expect(e.message).toBe('Not correct description');
        }
      });

      test('Coast', async () => {
        try {
          await ProductController.updateById(product._id, {
            ...product,
            coast: -1,
          });
        } catch (e) {
          expect(e.message).toBe('Not correct coast');
        }
      });

      test('Image', async () => {
        try {
          await ProductController.updateById(product._id, {
            ...product,
            img: '!@#wrong!@#',
          });
        } catch (e) {
          expect(e.message).toBe('Not correct image');
        }
      });
    });
  });
});
