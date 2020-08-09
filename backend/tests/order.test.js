const OrdersController = require('../src/controllers/ordersController');
const ProductController = require('../src/controllers/');
const UserController = require('../src/controllers/userController');
const mongoose = require('mongoose');

const url = require('./config').url;

describe('Order operations test', () => {

  const createdOrder;

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

    test('Creating order:', async () => {
      const user = await UserController.createUser({
        username: 'orderop',
        password: 'orderop',
        email: 'orderop@gmail.com',
        phone: '11111111111',
        status: 'client'
      });

      const product = await ProductController.createProduct({
        productname: '',
        description: '',
        coast: '',
        img: '',
      });

      const order = await OrdersController.createOrder({
        status: 'created',
        authorId: user._id,
        productId: product._id
      });

      expect(order.status).toBe('created');
      expect(order.authorId).toBe(user._id);
      expect(order.productId).toBe(product._id);

      createdOrder = order;
    });
  
    test('Getting all orders:', async () => {
      const orders = await OrdersController.getAllOrders();

      expect(orders.length).toBe(1);
    });
  
    test('Getting order by id:', async () => {
      const order =
        await OrdersController.getOrderById(createdOrder._id);

      expect(order.status).toBe(createdOrder.status);
      expect(order.authorId).toBe(createdOrder.authorId);
      expect(order.productId).toBe(createdOrder.productId);
    });
  
    test('Updating order by id:', async () => {
      const order1 =
        await OrdersController.updateOrderById(createdOrder._id, {
            status: 'delivering'
        });

      const order2 =
        await OrdersController.updateOrderById(createdOrder._id, {
            status: 'delivered'
        });

      const order3 =
        await OrdersController.updateOrderById(createdOrder._id, {
            status: 'done'
        });

      expect(order1.status).toBe('delivering');
      expect(order2.status).toBe('delivered');
      expect(order3.status).toBe('done');
    });
  
    test('Deleting order by id', async () => {
      await OrdersController.deleteOrderById(createdOrder._id);

      const orders = await OrdersController.getAllOrders();
      expect(orders.length).toBe(0);
    });

  })

});