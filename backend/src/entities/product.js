class Product {
  constructor({ productname, coast, description, img, orderedCount }) {
    this.productname = productname;
    this.coast = coast;
    this.description = description;
    this.img = img;
    this.orderedCount = orderedCount || 0;
  }
}

module.exports = {
  Product,
};
