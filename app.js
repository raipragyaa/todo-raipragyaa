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
app.get('/logout',handlers.logoutUser);

// ========================================================
app.postprocessor(fileHandler.serveStaticFiles);

module.exports = app;
