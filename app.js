const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlers = require('./handlers.js');
const fileHandler = require('./fileHandler.js');
// ====================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(handlers.logRequest.bind(app));
app.use(handlers.loadUser.bind(app));
app.use(handlers.serveIndexIfNotLoggedIn);
app.use(handlers.redirectLoggedInUserToHome);
// =====================================================
app.get('/',handlers.serveLandingPage.bind(app))
app.get('/login',handlers.serveLoginPage.bind(app));
app.get('/displayToDo',handlers.sendTemplate.bind(app));
app.post('/login',handlers.loginUser.bind(app));
app.post('/viewTodo',handlers.viewToDo.bind(app));
app.get('/home',handlers.serveHome.bind(app));
app.post('/createList',handlers.serveToDoCreationPage.bind(app));
app.post('/saveToDo',handlers.redirectHomeAfterSavingTodo.bind(app));
app.get('/todoLists',handlers.displayTitlesInHome.bind(app));
app.get('/logout',handlers.logoutUser.bind(app));
app.post('/deleteTodo',handlers.deleteToDo.bind(app));
app.post('/deleteItem',handlers.deleteItem.bind(app));
// ========================================================
app.use(handlers.storeToDos.bind(app));
app.use(express.static('public'))

module.exports = app;
