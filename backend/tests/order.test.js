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
      let user = await UserController.create({
        username: 'orderop',
        password: 'orderop',
        email: 'orderop@gmail.com',
        phone: '11111111111',
        type: 1
      });

      const product = await ProductController.create({
        productname: 'orderop',
        description: 'orderop',
        coast: 20,
        img: 'orderop.jpg',
      });

      await UserController.updateById(user._id, {balance: 1000});
      user = await UserController.getById(user._id)

      const order = await OrdersController.create({
        status: 'created',
        clientId: user._id.toString(),
        productId: product._id.toString()
      }, user);

      expect(order.status).toBe('created');
      expect(order.clientId).toBe(user._id.toString());
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


  
    test('Deleting order by id', async () => {
      await OrdersController.deleteById(createdOrder._id);

      const orders = await OrdersController.getAll();
      expect(orders.length).toBe(0);
    });

  });



  describe('Order update tests', () => {

    let order;
    let client;
    let curier;
    let product;

    beforeAll(async () => {
      client = await UserController.create({
        username: 'clienttest',
        password: 'clienttest',
        email: 'clienttest@gmail.com',
        phone: '11111111111',
        type: 1
      });

      await UserController.updateById(client._id, {balance: 1000});
      client = await UserController.getById(client._id);

      curier = await UserController.create({
        username: 'curiertest',
        password: 'curiertest',
        email: 'curiertest@gmail.com',
        phone: '11111111111',
        type: 2
      });

      product = await ProductController.create({
        productname: 'producttest',
        description: 'producttest',
        coast: 42,
        img: 'producttest.img'
      });
    });



    test('Set status on delivering:', async () => {
      order = await OrdersController.create({
        clientId: client._id,
        productId: product._id,
        status: 'created'
      }, client);
      
      expect(order.status).toBe('created');

      await OrdersController.updateById(
        order._id,
        {status: 'delivering'},
        curier
      );

      const updatedOrder = await OrdersController.getById(order._id);
      
      expect(updatedOrder.curierId).toBe(curier._id.toString());
      expect(updatedOrder.status).toBe('delivering');
    });



    test('Set status on delivered:', async () => {
      await OrdersController.updateById(
        order._id,
        {status: 'delivered'},
        curier
      );

      const updatedOrder = await OrdersController.getById(order._id);
      
      expect(updatedOrder.status).toBe('delivered');
    });



    test('Set status on done:', async () => {
      await OrdersController.updateById(
        order._id,
        {status: 'done'},
        client
      );

      const updatedOrder = await OrdersController.getById(order._id);

      const updatedCurier = await UserController.getById(curier._id);
      const balance = +Number(product.coast * 0.05).toFixed(2);

      expect(updatedOrder.status).toBe('done');
      expect(updatedCurier.balance).toBe(balance);
    });



    test('Set status on canceled:', async () => {
      order = await OrdersController.create({
        clientId: client._id,
        productId: product._id,
        status: 'created'
      }, client);

      await OrdersController.updateById(
        order._id,
        {status: 'canceled'},
        client
      );
      const updatedOrder = await OrdersController.getById(order._id);
      expect(updatedOrder.status).toBe('canceled');
    });



    test('Reset status on created:', async () => {
      order = await OrdersController.create({
        clientId: client._id,
        productId: product._id,
        status: 'created'
      }, client);

      await OrdersController.updateById(
        order._id,
        {status: 'delivering'},
        curier
      );

      await OrdersController.updateById(
        order._id,
        {status: 'reset'},
        curier
      );

      const updatedOrder = await OrdersController.getById(order._id);

      expect(updatedOrder.status).toBe('created');
      expect(updatedOrder.curierId).toBe('none');
    });

  });

  describe('Order error tests:', () => {

    test('Create with wrong clientId', async () => {
      const client = await UserController.create({
        username: 'testordererror',
        password: 'testordererror',
        email: 'testordererror@gmail.com',
        phone: '11111111111',
        type: 1
      });

      const product = await ProductController.create({
        productname: 'testordererror',
        description: 'testordererror',
        coast: 100,
        img: 'testordererror'
      });

      await UserController.deleteById(client._id);

      try {
        await OrdersController.create({
          clientId: client._id,
          productId: product._id
        }, null)
      } catch(e) {
        expect(e.message).toBe('No such user');
      }

      await ProductController.deleteById(product._id);
    });

    test('Create order with wrong productId', async () => {
      const client = await UserController.create({
        username: 'testordererror',
        password: 'testordererror',
        email: 'testordererror@gmail.com',
        phone: '11111111111',
        type: 1
      });

      const product = await ProductController.create({
        productname: 'testordererror',
        description: 'testordererror',
        coast: 100,
        img: 'testordererror'
      });

      await ProductController.deleteById(product._id);

      try {
        await OrdersController.create({
          clientId: client._id,
          productId: product._id
        }, client);
      } catch(e) {
        expect(e.message).toBe('No such product');
      }

      await UserController.deleteById(client._id);
    });

    test('Get order with wrong id', async () => {
      try {
        await OrdersController.getById('wrongid');
      } catch(e) {
        expect(e.message).toBe('Not valid id');
      }
    });

    test('Delete with wrong id', async () => {
      try {
        await OrdersController.deleteById('wrongid');
      } catch(e) {
        expect(e.message).toBe('Not valid id');
      }
    });

    describe('Update with wrong:', () => {
      let order;

      beforeAll(async () => {
        let client = await UserController.create({
          username: 'testordererrorupdate',
          password: 'testordererrorupdate',
          email: 'testordererrorupdate@gmail.com',
          phone: '11111111111',
          type: 1,
        });

        await UserController.updateById(client._id, {
          balance: 1000
        });
        client = await UserController.getById(client._id);

        let product = await ProductController.create({
          productname: 'testordererrorupdate',
          description: 'testordererrorupdate',
          coast: 100,
          img: 'testordererrorupdate'
        });

        order = await OrdersController.create({
          clientId: client._id,
          productId: product._id,
          status: 'created'
        }, client);
      });

      test('curierId', async () => {
        try {
          
        } catch(e) {

        }
      });

    });

  });

});