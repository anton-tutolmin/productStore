const mongoose = require('mongoose');
const Products = require('../models/Product');
const productList = require('./products');
const url = 'mongodb+srv://Anton:12win4456@cluster0-z82da.mongodb.net/productStore';



async function fillDb() {
  await mongoose.connect(url, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  for (p of productList) {
    await Products.create(p);
  }

  await mongoose.connection.close();
}

fillDb();