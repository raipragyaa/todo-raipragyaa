const http = require('http');
const PORT = 8000;
const app = require('./app.js');
const fs = require('fs');
const Item = require('./appModels/item.js');
const ToDo = require('./appModels/toDo.js');
const User = require('./appModels/user.js');
const loadDatabase = require('./databaseHandler.js').loadDatabase;
const getRegisteredUsers = require('./databaseHandler.js').getRegisteredUsers;
const ToDoHandler = require('./appModels/toDoHandler.js');
let userData=loadDatabase(fs,User,ToDo,Item);
app.fs = fs;
app.toDoHandler = new ToDoHandler(userData)
app.registeredUsers=getRegisteredUsers(fs);
let server = http.createServer(app);
server.listen(PORT);
server.on('error',e=>console.error('**error**',e.message));
console.log(`Listening on ${PORT}`);
