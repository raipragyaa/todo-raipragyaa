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
    it('redirects to index.html', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.should_be_redirected_to(res, './index.html');
        assert.equal(res.body, "");
        done();
      })
    })
  })
  describe('GET /index.html', () => {
    it('gives the index page', done => {
      request(app, {
        method: 'GET',
        url: '/index.html'
      }, res => {
        th.status_is_ok(res);
        th.content_type_is(res, 'text/html');
        th.body_contains(res, 'You can make your todo here');
        done();
      })
    })
  })
  describe('GET /loginPage.html', () => {
    it('serves the login page', done => {
      request(app, {
        method: 'GET',
        url: '/loginPage.html'
      }, res => {
        th.status_is_ok(res);
        th.body_contains(res, 'userName');
        th.body_does_not_contain(res, 'login failed');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
    it('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/loginPage.html',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
})
