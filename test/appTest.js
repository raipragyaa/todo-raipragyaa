let chai = require('chai');
let ToDoHandler = require('../appModels/toDoHandler.js');
let assert = chai.assert;
let app = require('../app.js');
let fs = require('./dummyFs.js');
let request = require('supertest');
let doesNotContain = (pattern) => {
  return (res) => {
    let match = res.text.match(pattern);
    if (match) throw new Error(`'${res.text}' contains '${pattern}'`);
  }
};

let shouldHaveCookie = (cookie)=>{
  return (res) => {
    let key = res.headers["set-cookie"][0].match(cookie)
    if (!key) throw new Error(`Expected ${cookie} in ${res.headers["set-cookie"]}`);
  };
}

let doesNotHaveCookies = (res) => {
  const keys = Object.keys(res.headers);
  let key = keys.find(k => k.match(/set-cookie/i));
  if (key) throw new Error(`Didnot expect Set-Cookie in header of ${keys}`);
};

beforeEach(function(){
  app.fs = new fs();
  app.toDoHandler = new ToDoHandler()
  app.registeredUsers = [{
      "userName": "priya",
      "name": "Priya",
      'sessionid':1234
    },
    {
      "userName": "bahubali",
      "name": "MMK"
    }
  ]
})

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
      request(app)
        .get('/bad')
        .expect(404)
        .end(done);
    })
  })
  describe('GET /', () => {
    it('serve index', done => {
      app.fs.addFile('public/index.html', 'Welcome To To-Do Site');
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect(/Welcome To To-Do Site/)
        .end(done);
    })
  })
  describe('GET /home', () => {
    it('should be redirected to index page if user is not loggedIn', done => {
      app.fs.addFile('public/home.html', 'Home Page')
      request(app)
        .get('/home')
        .expect(302)
        .expect(doesNotHaveCookies)
        .expect('Location', '/')
        .end(done);
    })
  })
  describe('GET /todoCreation', () => {
    it('should be redirected to index page if user is not loggedIn', done => {
      app.fs.addFile('public/home.html', 'Home Page')
      request(app)
        .get('/todoCreation')
        .expect(302)
        .expect('Location', '/')
        .expect(doesNotHaveCookies)
        .end(done);
    })
  })
  describe('GET /login', () => {
    it('serves the login page', done => {
      app.fs.addFile('public/login.html', 'userName\n')
      request(app)
        .get('/login')
        .expect(200)
        .expect(/userName/)
        .expect(doesNotContain('login failed'))
        .expect(doesNotHaveCookies)
        .end(done);
    })
    it('serves the login page with message for a failed login', done => {
      app.fs.addFile('public/login.html', 'userName\n')
      request(app)
        .get('/login')
        .expect(200)
        .expect(/userName/)
        .expect(doesNotContain('login failed'))
        .expect(doesNotHaveCookies)
        .end(done);
    })
    it('serves the login page with message for a failed login',(done)=>{
      app.fs.addFile('public/login.html', 'userName\n')
      request(app)
        .get('/login')
        .set('Cookie','message=loginfailed')
        .expect(200)
        .expect('Content-Type',/html/)
        .expect(/userName/)
        .expect(/Login Failed/)
        .end(done);
    });
  })
  describe('GET /index', () => {
    it('should be redirected to index page after logout', done => {
      request(app)
        .get('/logout')
        .expect(302)
        .expect('Location','/')
        .expect(shouldHaveCookie('sessionid'))
        .end(done);
    })
  })
  describe('POST /login', () => {
    it('should be redirected to home if valid user', done => {
      request(app)
        .post('/login')
        .send('userName=priya&password=gwhioghuh')
        .expect(302)
        .expect('Location','/home')
        .end(done);
    })
  })
  describe('GET /', () => {
    it('should be redirected to home if loggedIn', done => {
      request(app)
        .get('/')
        .set('Cookie','sessionid=1234 ')
        .expect(302)
        .expect('Location','/home')
        .end(done);
    })
  })
})
