const fs = require('fs');
let handlers = {};

let toS = o => JSON.stringify(o, null, 2);

const registeredUsers = JSON.parse(fs.readFileSync('./database/userData.json'));


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

handlers.serveIndexPage = function(req, res) {
  res.redirect('./index');
};

handlers.loadUser = function(req, res) {
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
};

handlers.loginUser = function(req, res) {
  let user = registeredUsers.find(u => u.userName == req.body.userName);
  if (!user) {
    res.setHeader('Set-Cookie', 'message=login failed; Max-Age=5');
    res.redirect('./login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('./home');
};

handlers.logoutUser = function(req, res) {
  res.setHeader('Set-Cookie', `sessionid=; Max-Age=0"`)
  res.redirect('/index');
};

handlers.redirectToToDoList = function(req,res){
  res.redirect('/todoCreation');
};


module.exports = handlers;
