const {
  ProductController,
} = require('../../src/controllers/productController');
const { mockProductService } = require('../mocks/mockProductService');

const productController = new ProductController(mockProductService);

let product = {
  productname: 'a',
  coast: 1,
  description: 'b',
  img: 'c',
};

describe('Test product controller', () => {
  it('create product', async () => {
    const ctx = {
      request: {
        body: product,
      },
      response: {},
    };

    await productController.create(ctx, () => {});

    expect(ctx.response.body.product.id).not.toBe(undefined);
    expect(ctx.response.body.product.productname).toBe(product.productname);
    expect(ctx.response.body.product.coast).toBe(product.coast);
    expect(ctx.response.body.product.description).toBe(product.description);
    expect(ctx.response.body.product.img).toBe(product.img);

    product = ctx.response.body.product;
  });

  it('get product by id', async () => {
    const ctx = {
      params: { id: product.id },
      request: {},
      response: {},
    };

    await productController.getById(ctx, () => {});

    expect(ctx.response.body.product).toEqual(product);
  });

  it('get all products', async () => {
    const ctx = {
      request: {},
      response: {},
    };

    await productController.getAll(ctx, () => {});

    expect(ctx.response.body.products.length).toBe(1);
    expect(ctx.response.body.products[0]).toEqual(product);
  });

  it('update product by id', async () => {
    const ctx = {
      params: { id: product.id },
      request: { body: { productname: 'z' } },
      response: {},
    };

    await productController.updateById(ctx, () => {});

    expect(ctx.response.body.message).toBe('Product updated');

    await productController.getById(ctx, () => {});

    expect(ctx.response.body.product.productname).toEqual('z');
  });

  it('delete product by id', async () => {
    const ctx = {
      params: { id: product.id },
      request: {},
      response: {},
    };

    await productController.deleteById(ctx, () => {});

    expect(ctx.response.body.message).toBe('Product deleted');

    await productController.getById(ctx, () => {});

    expect(ctx.response.body.product).toBe(undefined);
  });
});
