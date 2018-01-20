const fs = require('fs');
const Item = require('./appModels/item.js');
const ToDo = require('./appModels/toDo.js');
const User = require('./appModels/user.js');
const retriveBehaviour = require('./retrive.js').retriveBehaviour;
const ToDoHandler = require('./appModels/toDoHandler.js');


let loadDatabase = function() {
  let database = fs.readFileSync('./database/todo.json', 'utf8') || '{}';
  database = JSON.parse(database);
  retriveBehaviour(database);
  return database;
};

let usersData = loadDatabase();

const toDoHandler = new ToDoHandler(usersData);

let handlers = {};

let toS = o => JSON.stringify(o, null, 2);

const registeredUsers = JSON.parse(fs.readFileSync('./database/userData.json', 'utf8'));

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
  let userName = req.user.userName;
  contents = contents.replace('Name', userName);
  res.write(contents);
  res.end();
};

let addUserIfNotExsist = function(req) {
  let user = req.body.userName;
  if (!toDoHandler.doesUserExsist(user)) {
    let newUser = new User(user);
    toDoHandler.addUser(newUser);
  }
  return;
};

handlers.loginUser = function(req, res) {
  let user = registeredUsers.find(u => u.userName == req.body.userName);
  if (!user) {
    res.setHeader('Set-Cookie', 'message=login failed; Max-Age=5');
    res.redirect('/login');
    return;
  }
  addUserIfNotExsist(req);
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  user.userName = req.body.userName;
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
  res.setHeader('Set-Cookie', `sessionid=; Max-Age=0`)
  res.redirect('/');
};

let addToDo = function(req) {
  let userName = req.user.userName;
  let title = req.body.title;
  let description = req.body.description;
  let toDo = new ToDo(title, description);
  toDoHandler.addToDos(userName, toDo);
};

handlers.serveToDoCreationPage = function(req, res) {
  let contents = fs.readFileSync('public/toDoCreation.html', 'utf8');
  contents = contents.replace('title of list', req.body.title);
  contents = contents.replace('toDo description', req.body.description);
  addToDo(req);
  res.write(contents);
  res.end();
};

let addItems = function(req) {
  let userName = req.user.userName;
  let items = req.body.item;
  let toDoKey = toDoHandler.getToDoKey(userName);
  if (!Array.isArray(items)) {
    items = [items]
  }
  items.forEach(item => {
    let newItem = new Item(item);
    toDoHandler.addItem(userName, toDoKey, newItem);
  })
  return;
};

handlers.storeToDos = function(req, res) {
  let userContents = JSON.stringify(toDoHandler.users, null, 2);
  fs.writeFileSync('./database/todo.json', userContents);
  return;
};

handlers.redirectHomeAfterSavingTodo = function(req, res) {
  addItems(req);
  res.redirect('/home');
};

handlers.displayTitlesInHome = function(req, res) {
  let userData = usersData[req.user.userName];
  let toDos = userData.toDos;
  let toDoKeys = Object.keys(toDos);
  let titles = toDoKeys.reduce((object, toDoKey) => {
    object[toDoKey] = toDos[toDoKey].title;
    return object;
  }, {});
  res.write(JSON.stringify(titles));
  res.end();
};

handlers.deleteToDo = function(req, res) {
  let userName = req.user.userName;
  let toDoKey = req.body.toDoKey;
  toDoHandler.deleteToDo(userName, toDoKey);
};

let toHtml = function(title,description,items){
  let contents = `<pre>`;
  contents += `<h2>Title:${title}</h2>`;
  contents +=  `<h2>Description:${description}</h2>`;
  contents += `<ol>`
  items.forEach((item)=>{
    contents += `<li>${item}</li>`
  })
  contents += `</ol>`;
  return contents;
}

handlers.viewToDo = function(req,res){
  let userName = req.user.userName;
  let toDoKey = req.body.toDoKey;
  let toDo = toDoHandler.getToDo(userName,toDoKey);
  let title = toDo.title;
  let description = toDo.description;
  let items = toDo.items;
  let itemsKeys  = Object.keys(items);
  let allItems = itemsKeys.map((itemKey)=>{
    return items[itemKey].content;
  });
  let contents = toHtml(title,description,allItems);
  let fileContents = fs.readFileSync('public/toDoLists.html', 'utf8');
  fileContents = fileContents.replace('todos',contents);
  fs.writeFileSync('public/template.html',fileContents);
  res.end();
};

handlers.sendTemplate = function(req,res){
  let contents = fs.readFileSync('public/template.html','utf8');
  res.write(contents);
  res.end();
};

module.exports = handlers;
