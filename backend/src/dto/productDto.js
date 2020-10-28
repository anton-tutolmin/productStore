class ProductDto {
  constructor({ _id, productname, coast, description, img, orderedCount }) {
    this.id = _id;
    this.productname = productname;
    this.coast = coast;
    this.description = description;
    this.img = img;
    this.orderedCount = orderedCount || 0;
  }
}

module.exports = {
  ProductDto,
};
