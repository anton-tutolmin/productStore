const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app')

const User = require('../src/models/User');

const url = '';

const users = [
  {username: 'pavel', password: '1111', email: 'anton@example.com', phone: '1(111)111-11-11'},
  {username: 'cobain', password: '2222', email: 'irina@example.com', phone: '2(222)222-22-22'},
  {username: 'putin', password: '3333', email: 'alina@example.com', phone: '3(333)333-33-33'}
];

describe('User api', () => {

  beforeAll(async () => {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await mongoose.connection.db.dropCollection('users');
    await User.create(users);
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  test('GET api/users request', async () => {
    const response = await request(app.callback()).get('/api/users/');
    const data = JSON.parse(response.text).users;

    expect(response.status).toBe(200);
    expect(data.length).toBe(3);
  });
  
  test('GET api/users/:id request', async () => {
    const users = await User.findOne({});
    const id = users._id;

    const response =
      await request(app.callback())
      .get(`/api/users/${id}`);

    const data = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(data.user.username).toBe(users.username);
  });

  test('UPDATE api/users/:id request', async () => {
    const users = await User.findOne({});
    const id = users._id;

    const response =
      await request(app.callback())
      .put(`/api/users/${id}`)
      .send({username: 'misha'});

    const data = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(data.user.username).toEqual('misha');
  });

  test('DELETE api/users/:id request', async () => {
    const user = await User.findOne({});
    const id = user._id;

    const response =
      await request(app.callback())
      .delete(`/api/users/${id}`);

    const data = JSON.parse(response.text);

    const users = await User.find({});

    expect(response.status).toBe(200);
    expect(users.length).toBe(2);
    expect(data.message).toEqual('User deleted');
  });

  test('GET with wrong id', async () => {
    const response =
      await request(app.callback())
      .get(`/api/users/1488`);

    const data = JSON.parse(response.text);
    expect(response.status).toBe(404);
    expect(data.error).toBe('Not valid id');
  });

  test('DELETE with wrong id', async () => {
    const response =
      await request(app.callback())
      .delete(`/api/users/1488`);

    const data = JSON.parse(response.text);
    expect(response.status).toBe(404);
    expect(data.error).toBe('Not valid id');
  });

  test('UPDATE with wrong id', async () => {
    const response =
      await request(app.callback())
      .put(`/api/users/1488`)
      .send({username: 'cobain'});

    const data = JSON.parse(response.text);
    expect(response.status).toBe(404);
    expect(data.error).toBe('Not valid id');
  });

  test('UPDATE with wrong body', async () => {
    correctBody = {
      username: 'anton',
      email: 'anton@gmail.com',
      phone: '11111111111'
    };

    const response1 =
      await request(app.callback())
      .put(`/api/users/1`)
      .send({...correctBody, username: '%^&ant%^&'});

    const response2 =
      await request(app.callback())
      .put(`/api/users/3`)
      .send({...correctBody, email: 'vbcpo77790'});

    const response3 =
      await request(app.callback())
      .put(`/api/users/4`)
      .send({...correctBody, phone: 'keks'});

    expect(response1.status).toBe(404);
    expect(response2.status).toBe(404);
    expect(response3.status).toBe(404);

    const data1 = JSON.parse(response1.text);
    const data2 = JSON.parse(response2.text);
    const data3 = JSON.parse(response3.text);

    expect(data1.error).toBe('Username is not correct');
    expect(data2.error).toBe('Email is not correct');
    expect(data3.error).toBe('Phone is not correct');
  });

});