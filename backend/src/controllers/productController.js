const { productService } = require('../sevices/productService');

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async create(ctx, next) {
    const product = await this.productService.create(ctx.request.body);
    ctx.response.body = { product, message: 'Product created' };
  }

  async getAll(ctx, next) {
    const products = await this.productService.getAll();
    ctx.response.body = { products };
  }

  async getById(ctx, next) {
    const product = await this.productService.getById(ctx.params.id);
    ctx.response.body = { product };
  }

  async updateById(ctx, next) {
    await this.productService.updateById(ctx.params.id, ctx.request.body);
    ctx.response.body = { message: 'Product updated' };
  }

  async deleteById(ctx, next) {
    await this.productService.deleteById(ctx.params.id);
    ctx.response.body = { message: 'Product deleted' };
  }
}

module.exports = {
  ProductController,
  productController: new ProductController(productService),
};
