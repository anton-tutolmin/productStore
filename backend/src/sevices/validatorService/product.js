const errors = require('../../errors/errors');

function validateCreateBody(body) {
  validateProductname(body.productname);
  validateDescription(body.description);
  validateCoast(body.coast);
  validateImg(body.img);
  validateOrderedCount(body.orderedCount);
}

function validateUpdateBody(params) {
  for (const param of Object.keys(params)) {
    if (param === 'productname') validateProductname(params[param]);
    if (param === 'description') validateDescription(params[param]);
    if (param === 'coast') validateCoast(params[param]);
    if (param === 'img') validateImg(params[param]);
  }
}

function validateProductname(productname) {
  if (
    !productname ||
    productname.length < 5 ||
    productname.match(/[^\w]/g)
  ) {
    throw new Error(errors.notCorrectProductname);
  }
}

function validateDescription(description) {
  if (
    !description ||
    description.length < 5 ||
    description.match(/[^\w|\s]/g)
  ) {
    throw new Error(errors.notCorrectDescription);
  }
}

function validateCoast(coast) {
  if (!coast || typeof coast !== 'number' || coast <= 0) {
    throw new Error(errors.notCorrectCoast);
  }
}

function validateImg(imgString) {
  if (
    !imgString ||
    typeof imgString !== 'string' ||
    imgString.match(/[^\w|.]/g)
  ) {
    throw new Error(errors.notCorrectImg);
  }
}

function validateOrderedCount(count) {
  if (!count || typeof count !== 'number') {
    throw new Error(errors.notCorrectOrderedCount);
  }
}

module.exports = {
  validateCreateBody,
  validateUpdateBody,
};
