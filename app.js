const webApp = require('./webApp.js');
const app = webApp.create();
const handlers = require('./handlers.js');
const fileHandler = require('./fileHandler.js');
// ====================================================
app.preprocessor(handlers.logRequest.bind(app));
app.preprocessor(handlers.loadUser.bind(app));
app.preprocessor(handlers.redirectLoggedInUserToHome);
app.preprocessor(handlers.serveIndexIfNotLoggedIn);

// =====================================================
app.post('/login',handlers.loginUser.bind(app));
app.post('/viewTodo',handlers.viewToDo.bind(app));
app.get('/toDoLists',handlers.sendTemplate.bind(app));
app.get('/login',handlers.serveLoginPage.bind(app));
app.get('/home',handlers.serveHome.bind(app));
app.post('/createList',handlers.serveToDoCreationPage.bind(app));
app.post('/saveToDo',handlers.redirectHomeAfterSavingTodo.bind(app));
app.get('/todoLists',handlers.displayTitlesInHome.bind(app));
app.get('/logout',handlers.logoutUser.bind(app));
app.post('/deleteTodo',handlers.deleteToDo.bind(app));

// ========================================================
app.postprocessor(fileHandler.serveStaticFiles.bind(app));
app.postprocessor(handlers.storeToDos.bind(app));

module.exports = app;
