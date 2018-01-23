const Item = require('./appModels/item.js');
const ToDo = require('./appModels/toDo.js');
const User = require('./appModels/user.js');
const loadDatabase = require('./databaseHandler.js').loadDatabase;
let handlers = {};

let toS = o => JSON.stringify(o, null, 2);

handlers.logRequest = function(req,res) {
  let text = ['------------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`, ''
  ].join('\n');
  this.fs.appendFile('request.log', text, () => {});
  console.log(`${req.method} ${req.url}`);
};


handlers.loadUser = function(req, res) {
  let sessionid = req.cookies.sessionid;
  let user = this.registeredUsers.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
  return;
};

handlers.serveHome = function(req, res) {
  let contents = this.fs.readFileSync('public/home.html', 'utf8');
  let userName = req.user.userName;
  contents = contents.replace('Name', userName);
  res.write(contents);
  res.end();
};

let addUserIfNotExsist = function(req,handler) {
  let user = req.body.userName;
  if (!handler.doesUserExsist(user)) {
    let newUser = new User(user);
    handler.addUser(newUser);
  }
  return;
};

handlers.loginUser = function(req, res) {
  let user = this.registeredUsers.find(u => u.userName == req.body.userName);
  if (!user) {
    res.setHeader('Set-Cookie', 'message=login failed; Max-Age=5');
    res.redirect('/login');
    return;
  }
  addUserIfNotExsist(req,this.toDoHandler);
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  user.userName = req.body.userName;
  res.redirect('/home');
};

handlers.serveIndexIfNotLoggedIn = function(req, res) {
  if (req.urlIsOneOf(['/deleteTodo', '/todoLists', '/saveToDo', '/viewTodo', '/home', '/todoCreation', '/toDos']) && !req.user) {
    res.redirect('/');
  }
};

handlers.redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home');
}

handlers.serveLoginPage = function(req, res) {
  let contents = this.fs.readFileSync('public/login.html', 'utf8');
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
  res.write(contents);
  res.end();
};

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

handlers.storeToDos = function(req, res) {
  let userContents = JSON.stringify(this.toDoHandler.users, null, 2);
  this.fs.writeFileSync('./database/todo.json', userContents);
  res.end()
  return;
};

handlers.redirectHomeAfterSavingTodo = function(req, res) {
  addItems(req,this.toDoHandler);
  res.redirect('/home');
};

handlers.displayTitlesInHome = function(req, res) {
  let userData = this.toDoHandler.getUsers()[req.user.userName];
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
  this.toDoHandler.deleteToDo(userName, toDoKey);
};

const createButton = function(name) {
  return `<button type="button" name="button">${name}</button>`
}

const createCheckBox = function(status) {
  if (status) {
    return ` <input type="checkbox" name="status" checked>`
  }
  return ` <input type="checkbox" name="status">`
}

let toHtml = function(title, description, items) {
  let editBtn = createButton('edit');
  let deleteBtn = createButton('delete');
  let contents = `<pre>`;
  contents += `<h2>Title:${title} ${editBtn}</h2>`;
  contents += `<h2>Description:${description} ${editBtn}</h2><ul>`;
  items.forEach((item) => {
    let checkBox = createCheckBox(item.status)
    contents += `<li>${item.content} ${checkBox} ${editBtn} ${deleteBtn}</li>`
  })
  contents += `</ul><br>`;
  contents += createButton('Add Item')
  contents += createButton("save");
  return contents;
};

const getAllItems = function(items) {
  let itemsKeys = Object.keys(items);
  return itemsKeys.map((itemKey) => {
    return items[itemKey];
  });
};

handlers.viewToDo = function(req, res) {
  let toDo = this.toDoHandler.getToDo(req.user.userName, req.body.toDoKey);
  let allItems = getAllItems(toDo.items);
  let contents = toHtml(toDo.title, toDo.description, allItems);
  let fileContents = this.fs.readFileSync('public/toDoLists.html', 'utf8');
  fileContents = fileContents.replace('todos', contents);
  this.fs.writeFileSync('public/template.html', fileContents);
  res.end();
};

handlers.sendTemplate = function(req, res) {
  let contents = this.fs.readFileSync('public/template.html', 'utf8');
  res.write(contents);
  res.end();
};

module.exports = handlers;
