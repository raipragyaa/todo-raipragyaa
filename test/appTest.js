let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
      request(app, {
        method: 'GET',
        url: '/bad'
      }, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  })
  describe('GET /', () => {
    it('redirects to index', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.should_be_redirected_to(res, './index');
        assert.equal(res.body, "");
        done();
      })
    })
  })
  describe('GET /index', () => {
    it('gives the index page', done => {
      request(app, {
        method: 'GET',
        url: '/index'
      }, res => {
        th.status_is_ok(res);
        th.content_type_is(res, 'text/html');
        th.body_contains(res, 'Welcome To To-Do Site');
        done();
      })
    })
  })
  describe('GET /login', () => {
    it('serves the login page', done => {
      request(app, {
        method: 'GET',
        url: '/login'
      }, res => {
        th.status_is_ok(res);
        th.body_contains(res, 'userName');
        th.body_does_not_contain(res, 'login failed');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
    it('serves the login page with message for a failed login', done => {
      request(app, {
        method: 'GET',
        url: '/login',
        headers: {
          'cookie': 'message=login failed'
        }
      }, res => {
        th.status_is_ok(res);
        th.body_contains(res, 'userName');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
  })
  describe('GET /index.html', () => {
    it('should be redirected to index page after logout', done => {
      request(app, {
        method: 'GET',
        url: '/logout'
      }, res => {
        th.should_be_redirected_to(res, '/index');
        th.should_have_cookie(res, 'sessionid','');
        done();
      })
    })
  })
})
