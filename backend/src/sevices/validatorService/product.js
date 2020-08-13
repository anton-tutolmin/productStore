

function validateCreateBody(body) {
  validateProductname(body.productname);
  validateDescription(body.description);
  validateCoast(body.coast);
  validateImg(body.img);
}

function validateUpdateBody(body) {

}

function validateProductname(productname) {
  if (
    !productname ||
    productname.length < 5 ||
    productname.match(/[^\w]/g)
  ) {
    throw new Error('Not correct productname');
  }
}

function validateDescription(description) {
  if (
    !description ||
    description.length < 5 ||
    description.match(/[^\w|\s]/g
  )) {
    throw new Error('Not correct description');
  }
}

function validateCoast(coast) {
  if (!coast || typeof coast !== 'number' || coast === 0) {
    throw new Error('Not correct coast');
  }
}

function validateImg(imgString) {
  if (
    !imgString ||
    typeof imgString !== 'string' ||
    imgString.length < 5
  ) {
    throw new Error();
  } 
}

module.exports = {
  validateCreateBody,
  validateUpdateBody
}