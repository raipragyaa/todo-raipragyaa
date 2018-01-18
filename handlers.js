const fs = require('fs');

const User = require('./appModels/user.js');

let newUser = new User('pragya');

const database = [];

let handlers = {};

let toS = o => JSON.stringify(o, null, 2);

const registeredUsers = JSON.parse(fs.readFileSync('./database/userData.json'));

handlers.logRequest = function(req, res) {
  let text = ['------------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`, ''
  ].join('\n');
  fs.appendFile('request.log', text, () => {});
  console.log(`${req.method} ${req.url}`);
};


handlers.loadUser = function(req, res) {
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
  return;
};

handlers.serveHome = function(req, res) {
  let contents = fs.readFileSync('public/home.html','utf8');
  res.write(contents);
  res.end();
};

handlers.loginUser = function(req, res) {
  let userName = newUser.getName();
  let user = registeredUsers.find(u => u.userName == userName);
  if (!user) {
    res.setHeader('Set-Cookie', 'message=login failed; Max-Age=5');
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
};

handlers.serveIndexIfNotLoggedIn = function(req, res) {
  if (req.urlIsOneOf(['/home', '/todoCreation', '/toDos']) && !req.user) {
    res.redirect('/');
  }
};

handlers.serveLoginPage = function(req, res) {
  let contents = fs.readFileSync('public/login.html', 'utf8');
  if (req.cookies.message) {
    contents += 'Login Failed';
  }
  res.write(contents);
  res.end();
};

handlers.logoutUser = function(req, res) {
  res.setHeader('Set-Cookie', `sessionid=; Max-Age=0"`)
  res.redirect('/');
};

let addToDo = function(req){
  let title = req.body.title;
  let description = req.body.description;
  newUser.addToDo(title,description);
  console.log(newUser);
};

handlers.serveToDoCreationPage= function(req, res) {
  let contents = fs.readFileSync('public/toDoCreation.html');
  addToDo(req);
  res.write(contents);
  res.end();
};



module.exports = handlers;
