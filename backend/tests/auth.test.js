const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const AuthController = require('../src/controllers/authController');

const url = require('./config').url;

describe('Auth test:', () => {

  let token;

  const user = {
    username: 'testauth',
    password: 'testauth',
    email: 'testapi@gmail.com',
    phone: '11111111111',
    type: 1
  }

  beforeAll(async () => {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('users');
    await mongoose.connection.close();
  });

  test('Register', async () => {
    const response = await request(app.callback())
      .post('/api/register')
      .send(user);

    expect(response.status).toBe(200);
  });

  test('Login', async () => {
    const response = await request(app.callback())
      .post('/api/login')
      .send({
        username: user.username,
        password: user.password
      });

    expect(response.status).toBe(200);

    const body = JSON.parse(response.text);
    token = body.token;
  });

  test('Profile', async () => {
    const response = await request(app.callback())
      .get('/api/profile')
      .set('Authorization', 'Bearer ' + token);
    
    const data = JSON.parse(response.text);
    expect(data.username).toBe(user.username);
    expect(data.email).toBe(user.email);
    expect(data.phone).toBe(user.phone);
  });

});