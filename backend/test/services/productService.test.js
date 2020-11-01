const { ProductService } = require('../../src/sevices/productService');
const { mockProductResource } = require('../mocks/mockProductResource');
const {
  mockProdcutValidationService,
} = require('../mocks/mockProductValidationService');

const productService = new ProductService(
  mockProductResource,
  mockProdcutValidationService,
);

let product = {
  productname: 'a',
  coast: 1,
  description: 'b',
  img: 'c',
};

describe('Test product service', () => {
  it('create product', async () => {
    const createdProduct = await productService.create(product);

    expect(createdProduct.id).not.toBe(undefined);
    expect(createdProduct.productname).toBe(product.productname);
    expect(createdProduct.coast).toBe(product.coast);
    expect(createdProduct.description).toBe(product.description);
    expect(createdProduct.img).toBe(product.img);
    expect(createdProduct.orderedCount).toBe(0);

    product = createdProduct;
  });

  it('get product by id', async () => {
    const returnedProduct = await productService.getById(1);

    expect(returnedProduct).toEqual(product);
  });

  it('get all products', async () => {
    const returnedProducts = await productService.getAll();

    expect(returnedProducts.length).toBe(1);
    expect(returnedProducts[0]).toEqual(product);
  });

  it('update product by id', async () => {
    await productService.updateById(1, { productname: 'z' });
    const updatedProduct = await productService.getById(1);

    expect(updatedProduct.productname).toBe('z');
  });

  it('delete product by id', async () => {
    await productService.deleteById(1);
    const deleted = await productService.getById(1);

    expect(deleted).toBe(null);
  });
});
