const fs = require('fs');

const User = require('./appModels/user.js');

let newUser = new User('pragya');

let handlers = {};

let loadDatabase = function(){
  let database = fs.readFileSync('./database/todo.json','utf8');
  database = JSON.parse(database);
  return database;
};

let toS = o => JSON.stringify(o, null, 2);

const registeredUsers = JSON.parse(fs.readFileSync('./database/userData.json','utf8'));

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
  let contents = fs.readFileSync('public/home.html', 'utf8');
  let userName = newUser.getName();
  contents = contents.replace('Name', userName);
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

let addToDo = function(req) {
  let title = req.body.title;
  let description = req.body.description;
  newUser.addToDo(title, description);
};

handlers.serveToDoCreationPage = function(req, res) {
  let contents = fs.readFileSync('public/toDoCreation.html', 'utf8');
  contents = contents.replace('title of list', req.body.title);
  contents = contents.replace('toDo description', req.body.description);
  addToDo(req);
  res.write(contents);
  res.end();
};

let addItem = function(req) {
  let items = req.body.item;
  let toDoKey = newUser.getToDoKey();
  if (Array.isArray(items)) {
    items.forEach(item => {
      newUser.addItems(toDoKey, item);
    })
    return;
  }
  newUser.addItems(toDoKey, items)
};

handlers.storeToDos = function(req, res) {
  let userContents = JSON.stringify(newUser, null, 2);
  fs.writeFileSync('./database/todo.json', userContents);
  return;
};

handlers.redirectHomeAfterSavingTodo = function(req, res) {
  addItem(req);
  res.redirect('/home');
};

handlers.displayTitlesInHome = function(req,res){
  let userData = loadDatabase();
  let toDos = userData.toDos;
  let toDoKeys = Object.keys(toDos);
  let titles = toDoKeys.map((toDoKey)=>{
    return toDos[toDoKey].title;
  })
  res.write(JSON.stringify(titles));
  res.end();
};
 
module.exports = handlers;
