const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');

const url = require('./config').url;

let user = {
  username: 'pavel',
  password: 'pavel',
  email: 'anton@gmail.com',
  phone: '11111111111',
  status: 'client'
}
let id;

describe('User operations test:', () => {

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


  describe('Auth routes test:', () => {

    let token = '';
  
    test('POST /api/register', async () => {
      const response =
        await request(app.callback())
        .post('/api/register')
        .send(user);
      const data = JSON.parse(response.text);

      expect(response.status).toBe(200);
      expect(data.message).toBe('User registered');
    });
  
  
    test('POST /api/login', async () => {  
      const response =
        await request(app.callback())
        .post('/api/login')
        .send({username: user.username, password: user.password});
  
      const data = JSON.parse(response.text);
  
      expect(response.status).toBe(200);
      expect(data.message).toBe('User logined');
      token = data.token;
    });
  
  
    test('GET /api/profile', async () => {
      const response =
        await request(app.callback())
        .get('/api/profile')
        .set('Authorization', 'Bearer ' + token);
  
      const data = JSON.parse(response.text);
  
      expect(response.status).toBe(200);
      expect(data.username).toBe(user.username);
      expect(data.email).toBe(user.email);
      expect(data.phone).toBe(user.phone);

      id = data.id;
    });
  });


  describe('User routes: ', () => {

    test('GET api/users', async () => {
      const response = await request(app.callback()).get('/api/users/');
      const data = JSON.parse(response.text).users;
  
      expect(response.status).toBe(200);
      expect(data.length).not.toBe(0);
    });
    
    test('GET api/users/:id', async () => {  
      const response =
        await request(app.callback())
        .get(`/api/users/${id}`);
  
      const data = JSON.parse(response.text);
  
      expect(response.status).toBe(200);
      expect(data.user.username).toBe(user.username);
    });
  
    test('UPDATE api/users/:id', async () => {
      const response =
        await request(app.callback())
        .put(`/api/users/${id}`)
        .send({username: 'misha'});
  
      const data = JSON.parse(response.text);
  
      expect(response.status).toBe(200);
      expect(data.user.username).toEqual('misha');
    });
  
    test('DELETE api/users/:id', async () => {
      const response =
        await request(app.callback())
        .delete(`/api/users/${id}`);
  
      const data = JSON.parse(response.text);
  
      expect(response.status).toBe(200);
      expect(data.message).toEqual('User deleted');
    });

  })


  describe('User routes with wrong params:', () => {

    test('GET /api/users/:id with wrong id', async () => {
      const response =
        await request(app.callback())
        .get(`/api/users/1488`);
  
      const data = JSON.parse(response.text);
      expect(response.status).toBe(404);
      expect(data.error).toBe('Not valid id');
    });
  
    test('DELETE /api/users/:id with wrong id', async () => {
      const response =
        await request(app.callback())
        .delete(`/api/users/1488`);
  
      const data = JSON.parse(response.text);
      expect(response.status).toBe(404);
      expect(data.error).toBe('Not valid id');
    });
  
    test('UPDATE /api/users/:id with wrong id', async () => {
      const response =
        await request(app.callback())
        .put(`/api/users/1488`)
        .send({username: 'cobain'});
  
      const data = JSON.parse(response.text);
      expect(response.status).toBe(404);
      expect(data.error).toBe('Not valid id');
    });
  
    test('UPDATE /api/users with wrong body', async () => {
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
  })

});