const { productResource } = require('../resources/productResource');
const { productValidationService } = require('./productValidationService');
const { Product } = require('../entities/product');
const { ProductDto } = require('../dto/productDto');

class ProductService {
  constructor(productResource, validationService) {
    this.productResource = productResource;
    this.validationService = validationService;
  }

  async create(requestBody) {
    const product = new Product(requestBody);
    this.validationService.validateCreateBody(product);
    const createdProduct = await this.productResource.create(product);
    return new ProductDto(createdProduct);
  }

  async getAll() {
    const products = await this.productResource.getAll();
    return products.map((p) => new ProductDto(p));
  }

  async getById(id) {
    const product = await this.productResource.getById(id);
    return product ? new ProductDto(product) : null;
  }

  async updateById(id, requestBody) {
    const params = {};
    for (const param of Object.keys(requestBody)) {
      if (param === 'productname') params.productname = requestBody[param];
      if (param === 'cost') params.cost = requestBody[param];
      if (param === 'description') params.description = requestBody[param];
      if (param === 'img') params.img = requestBody[param];
      if (param === 'orderedCount') params.orderedCount = requestBody[param];
    }

    this.validationService.validateUpdateBody(params);
    await this.productResource.updateById(id, params);
  }

  async deleteById(id) {
    await this.productResource.deleteById(id);
  }
}

module.exports = {
  ProductService,
  productService: new ProductService(productResource, productValidationService),
};
