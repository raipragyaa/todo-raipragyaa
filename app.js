const webApp = require('./webApp.js');
const app = webApp.create();
const handlers = require('./handlers.js');
const fileHandler = require('./fileHandler.js');


app.use(handlers.logRequest);
app.get('/',handlers.serveIndexPage);
app.post('/login',handlers.loginUser);
app.useAsPostProcessor(fileHandler.serveStaticFiles);

module.exports = app;
