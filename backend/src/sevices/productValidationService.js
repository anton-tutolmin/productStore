const errors = require('../errors/errors');

class ProductValidationService {
  validateCreateBody(requestBody) {
    this.validateProductname(requestBody.productname);
    this.validateDescription(requestBody.description);
    this.validateCoast(requestBody.coast);
    this.validateImg(requestBody.img);
    this.validateOrderedCount(requestBody.orderedCount);
  }

  validateUpdateBody(requestBody) {
    for (const param of Object.keys(requestBody)) {
      if (param === 'productname') this.validateProductname(requestBody[param]);
      if (param === 'description') this.validateDescription(requestBody[param]);
      if (param === 'coast') this.validateCoast(requestBody[param]);
      if (param === 'img') this.validateImg(requestBody[param]);
    }
  }

  validateProductname(productname) {
    if (!productname || productname.length < 5 || productname.match(/[^\w]/g)) {
      throw new Error(errors.notCorrectProductname);
    }
  }

  validateDescription(description) {
    if (
      !description ||
      description.length < 5 ||
      description.match(/[^\w|\s]/g)
    ) {
      throw new Error(errors.notCorrectDescription);
    }
  }

  validateCoast(coast) {
    if (!coast || typeof coast !== 'number' || coast <= 0) {
      throw new Error(errors.notCorrectCoast);
    }
  }

  validateImg(imgString) {
    if (
      !imgString ||
      typeof imgString !== 'string' ||
      imgString.match(/[^\w|.]/g)
    ) {
      throw new Error(errors.notCorrectImg);
    }
  }

  validateOrderedCount(count) {
    if (!count || typeof count !== 'number') {
      throw new Error(errors.notCorrectOrderedCount);
    }
  }
}

module.exports = {
  ProductValidationService,
  productValidationService: new ProductValidationService(),
};
