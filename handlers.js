const Item = require('./appModels/item.js');
const ToDo = require('./appModels/toDo.js');
const User = require('./appModels/user.js')
const loadDatabase = require('./databaseHandler.js').loadDatabase;
let handlers = {};

let toS = o => JSON.stringify(o, null, 2);

handlers.logRequest = function(req,res,next) {
  let text = ['------------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`, ''
  ].join('\n');
  this.fs.appendFile('request.log', text, () => {});
  console.log(`${req.method} ${req.url}`);
  next();
};


handlers.loadUser = function(req, res,next) {
  let sessionid = req.cookies.sessionid;
  let user = this.registeredUsers.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
  next();
};

handlers.serveHome = function(req, res,next) {
  let contents = this.fs.readFileSync('public/home.html', 'utf8');
  let userName = req.user.userName;
  contents = contents.replace('Name', userName);
  res.send(contents);
};

let addUserIfNotExsist = function(user,handler) {
  if (!handler.doesUserExsist(user)) {
    let newUser = new User(user);
    handler.addUser(newUser);
  }
  return;
};

handlers.loginUser = function(req, res,next) {
  let user = this.registeredUsers.find(u => u.userName == req.body.userName);
  if (!user) {
    res.cookie('message','loginfailed', { httpOnly: true })
    res.redirect('/login');
    return;
  }
  addUserIfNotExsist(req.body.userName,this.toDoHandler);
  let sessionid = new Date().getTime();
  res.cookie('sessionid',sessionid)
  user.sessionid = sessionid;
  user.userName = req.body.userName;
  res.redirect('/home');
  next();
};

handlers.serveIndexIfNotLoggedIn = function(req, res,next) {
  if (['/deleteTodo', '/todoLists', '/saveToDo', '/viewTodo', '/home', '/todoCreation', '/toDos'].includes(req.url) && !req.user) {
    res.redirect('/');
    return;
  }
  next();
};

handlers.redirectLoggedInUserToHome = (req,res,next)=>{
  if(['/','/login'].includes(req.url) && req.user) {
    res.redirect('/home');
    return;
  }
  next();
}

handlers.serveLoginPage = function(req, res) {
  let contents = this.fs.readFileSync('public/login.html', 'utf8');
  if (req.cookies.message) {
    res.clearCookie("message");
    contents += 'Login Failed';
  }
  res.send(contents);
};

handlers.logoutUser = function(req, res) {
  res.clearCookie("sessionid");
  res.redirect('/');
};

let addToDo = function(req,handler) {
  let userName = req.user.userName;
  let title = req.body.title;
  let description = req.body.description;
  let toDo = new ToDo(title, description);
  handler.addToDos(userName, toDo);
};

handlers.serveToDoCreationPage = function(req, res) {
  let contents = this.fs.readFileSync('public/toDoCreation.html', 'utf8');
  contents = contents.replace('title of list', req.body.title);
  contents = contents.replace('toDo description', req.body.description);
  addToDo(req,this.toDoHandler);
  res.send(contents);
};

handlers.serveLandingPage=function(req,res){
  res.redirect('/index.html');
}

let addItems = function(req,handler) {
  let userName = req.user.userName;
  let items = req.body.item;
  let toDoKey = handler.getToDoKey(userName);
  if (!Array.isArray(items)) {
    items = [items]
  }
  items.forEach(item => {
    let newItem = new Item(item);
    handler.addItem(userName, toDoKey, newItem);
  })
  return;
};

handlers.storeToDos = function(req, res,next) {
  let userContents = JSON.stringify(this.toDoHandler.users, null, 2);
  this.fs.writeFileSync('./database/todo.json', userContents);
  next();
};

handlers.redirectHomeAfterSavingTodo = function(req, res,next) {
  addItems(req,this.toDoHandler);
  res.redirect('/home');
  next();
};

handlers.displayTitlesInHome = function(req, res,next) {
  let userData = this.toDoHandler.getUsers()[req.user.userName];
  let toDos = userData.toDos;
  let toDoKeys = Object.keys(toDos);
  let titles = toDoKeys.reduce((object, toDoKey) => {
    object[toDoKey] = toDos[toDoKey].title;
    return object;
  }, {});
  res.send(JSON.stringify(titles));
  next();
};

handlers.deleteToDo = function(req, res,next) {
  let userName = req.user.userName;
  let toDoKey = req.body.toDoKey;
  this.toDoHandler.deleteToDo(userName, toDoKey);
};

const createButtonWithOnclick = function(innerText,onclickOperator,id){
  return `<button id="${id}" onclick="${onclickOperator}" type="button" name="button">${innerText}</button>`
}

const createCheckBox = function(status,id,onclickOperator) {
  if (status) {
    return `<input id="${id}" onclick="${onclickOperator}" type="checkbox" name="status" checked>`
  }
  return `<input id="${id}" onclick="${onclickOperator}" type="checkbox" name="status">`
}

const getEditButton = function(id){
  return createButtonWithOnclick('edit','editItem()',id)
}

const getDeleteButton = function(id){
  return createButtonWithOnclick('delete','deleteItem()',id)
}

let toHtml = function(title, description, items) {
  let contents = `<pre>`;
  contents += `<h2>Title:${title} ${createButtonWithOnclick('edit','editTitle()','title')}</h2>`;
  contents += `<h2>Description:${description} ${createButtonWithOnclick('edit','editDescription()','description')}</h2><ul id="list">`;
  let allItems = Object.keys(items);
  allItems.forEach((itemId) => {
    let id = itemId;
    let item = items[itemId];
    let checkBox = createCheckBox(item.status,id,'markOrUnmarkItem()')
    contents += `<li id=${id}_${id}>${item.content} ${checkBox} ${getEditButton(id)} ${getDeleteButton(id)}</li>`
  })
  contents += `</ul><br>`;
  contents += createButtonWithOnclick('Add Item','addItem()','addItem')
  contents += createButtonWithOnclick("save",'save()','save');
  return contents;
};

handlers.viewToDo = function(req, res,next) {
  let toDo = this.toDoHandler.getToDo(req.user.userName, req.body.toDoKey);
  this.toDoHandler.setToDoAsCurrent(req.body.toDoKey);
  let contents = toHtml(toDo.title, toDo.description,toDo.items);
  let fileContents = this.fs.readFileSync('public/toDoLists.html', 'utf8');
  fileContents = fileContents.replace('todos', contents);
  this.fs.writeFileSync('public/template.html', fileContents);
  next();
};

handlers.sendTemplate =function(req, res,next) {
  let contents = this.fs.readFileSync('public/template.html', 'utf8');
  res.send(contents);
  next();
};

handlers.deleteItem=function(req,res,next){
  let toDoKey = this.toDoHandler.getCurrentToDoKey()
  this.toDoHandler.deleteItem(req.user.userName,toDoKey,req.body.itemKey);
  next();
}

module.exports = handlers;
