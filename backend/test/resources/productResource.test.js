const { ProductResource } = require('../../src/resources/productResource');
const { mockProductSchema } = require('../mocks/mockProductSchema');
const { mockMongoose } = require('../mocks/mockMongoose');

const productResource = new ProductResource(mockProductSchema, mockMongoose);

let product = {
  productname: 'a',
  coast: 1,
  description: 'b',
  img: 'c',
};

describe('Test product resource', () => {
  it('create product', async () => {
    const createdProduct = await productResource.create(product);

    expect(createdProduct._id).not.toBe(undefined);
    expect(createdProduct.productname).toBe('a');
    expect(createdProduct.coast).toBe(1);
    expect(createdProduct.description).toBe(product.description);
    expect(createdProduct.img).toBe(product.img);

    product = createdProduct;
  });

  it('get product by id', async () => {
    const returnedProduct = await productResource.getById(product._id);

    expect(returnedProduct).toEqual(product);
  });

  it('get all products', async () => {
    const returnedProducts = await productResource.getAll();

    expect(returnedProducts.length).toBe(1);
    expect(returnedProducts[0]).toEqual(product);
  });

  it('update product by id', async () => {
    await productResource.updateById(product._id, { productname: 'z' });
    const updatedProduct = await productResource.getById(product._id);

    expect(updatedProduct.productname).toBe('z');
  });

  it('delete product by id', async () => {
    await productResource.deleteById(product._id);
    const deleted = await productResource.getById(product._id);

    expect(deleted).toBe(undefined);
  });
});
