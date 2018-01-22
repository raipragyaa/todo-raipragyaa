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
    it('serve index', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        assert.equal(res.statusCode, 200);
        th.body_contains(res, 'Welcome To To-Do Site');
        done();
      })
    })
  })
  describe('GET /home', () => {
    it('should be redirected to index page if user is not loggedIn', done => {
      request(app, {
        method: 'GET',
        url: '/home'
      }, res => {
        th.should_be_redirected_to(res, '/');
        th.should_not_have_cookie(res, 'sessionid', '');
        done();
      })
    })
  })
  describe('GET /todoCreation', () => {
    it('should be redirected to index page if user is not loggedIn', done => {
      request(app, {
        method: 'GET',
        url: '/todoCreation'
      }, res => {
        th.should_be_redirected_to(res, '/');
        th.should_not_have_cookie(res, 'sessionid', '');
        done();
      })
    })
  })
  describe('GET /index', () => {
    it('gives the index page', done => {
      request(app, {
        method: 'GET',
        url: '/'
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
  describe('GET /index', () => {
    it('should be redirected to index page after logout', done => {
      request(app, {
        method: 'GET',
        url: '/logout'
      }, res => {
        th.should_be_redirected_to(res, '/');
        th.should_have_cookie(res, 'sessionid', '');
        done();
      })
    })
  })
  describe('GET /home', () => {
    it('should be redirected to index page without cookies', done => {
      request(app, {
        method: 'GET',
        url: '/home',
        headers:{
          cookie:'89tyyd18992980'
        },
      }, res => {
        th.should_be_redirected_to(res, '/');
        done();
      })
    })
  })
  describe('POST /login', () => {
    it('should be redirected to home if valid user', done => {
      request(app, {
        method: 'POST',
        url: '/login',
        body:'userName=pragya&password=gwhioghuh',
      }, res => {
        th.should_be_redirected_to(res, '/home');
        done();
      })
    })
  })
  describe('GET /', () => {
    it('should be redirected to home if loggedIn', done => {
      request(app, {
        user:'pragya',
        method: 'GET',
        url: '/',
      }, res => {
        th.should_be_redirected_to(res, '/home');
        done();
      })
    })
  })
})
