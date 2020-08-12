const OrdersController = require('../src/controllers/ordersController');
const ProductController = require('../src/controllers/productController');
const UserController = require('../src/controllers/userController');
const mongoose = require('mongoose');

const url = require('./config').url;

describe('Order tests:', () => {

  beforeAll(async () => {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('orders');
    await mongoose.connection.db.dropCollection('users');
    await mongoose.connection.db.dropCollection('products');
    await mongoose.connection.close();
  });

  describe('Order operations test: ', () => {

    let createdOrder;

    test('Creating order:', async () => {
      const user = await UserController.create({
        username: 'orderop',
        password: 'orderop',
        email: 'orderop@gmail.com',
        phone: '11111111111',
        type: 1
      });

      const product = await ProductController.create({
        productname: '',
        description: '',
        coast: '',
        img: '',
      });

      const order = await OrdersController.create({
        status: 'created',
        authorId: user._id.toString(),
        productId: product._id.toString()
      });

      expect(order.status).toBe('created');
      expect(order.authorId).toBe(user._id.toString());
      expect(order.productId).toBe(product._id.toString());

      createdOrder = order;
    });
  
    test('Getting all orders:', async () => {
      const orders = await OrdersController.getAll();

      expect(orders.length).toBe(1);
    });
  
    test('Getting order by id:', async () => {
      const order =
        await OrdersController.getById(createdOrder._id);

      expect(order.status).toBe(createdOrder.status);
      expect(order.authorId).toBe(createdOrder.authorId);
      expect(order.productId).toBe(createdOrder.productId);
    });
  
    test('Updating order by id:', async () => {
      const order1 =
        await OrdersController.updateById(createdOrder._id, {
            status: 'delivering'
        });

      const order2 =
        await OrdersController.updateById(createdOrder._id, {
            status: 'delivered'
        });

      const order3 =
        await OrdersController.updateById(createdOrder._id, {
            status: 'done'
        });

      expect(order1.status).toBe('delivering');
      expect(order2.status).toBe('delivered');
      expect(order3.status).toBe('done');
    });
  
    test('Deleting order by id', async () => {
      await OrdersController.deleteById(createdOrder._id);

      const orders = await OrdersController.getAll();
      expect(orders.length).toBe(0);
    });

  })

});