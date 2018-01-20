const webApp = require('./webApp.js');
const app = webApp.create();
const handlers = require('./handlers.js');
const fileHandler = require('./fileHandler.js');

// ====================================================
app.preprocessor(handlers.logRequest);
app.preprocessor(handlers.loadUser);
app.preprocessor(handlers.serveIndexIfNotLoggedIn);

// =====================================================
app.post('/login',handlers.loginUser);
app.get('/login',handlers.serveLoginPage);
app.get('/home',handlers.serveHome);
app.post('/createList',handlers.serveToDoCreationPage);
app.post('/saveToDo',handlers.redirectHomeAfterSavingTodo);
app.get('/todoLists',handlers.displayTitlesInHome);
app.get('/logout',handlers.logoutUser);
app.post('/deleteTodo',handlers.deleteToDo);

// ========================================================
app.postprocessor(fileHandler.serveStaticFiles);
app.postprocessor(handlers.storeToDos);

module.exports = app;
