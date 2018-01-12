const fs = require('fs');
const getContentType = function(filePath) {
  let fileExtention = filePath.slice(filePath.lastIndexOf('.'));
  let headers = {
    '.js': 'text/js',
    '.css': 'text/css',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.html': 'text/html',
    '.gif': 'image/gif',
    '.pdf': 'text/pdf',
    '.ico': 'text/plain'
  }
  return headers[fileExtention];
};

const respondOnSourceNotFound = function(req, res) {
  res.statusCode = 404;
  res.write('source not found');
  res.end();
};

const serveStaticFiles = function(req, res) {
  let filePath = 'public' + req.url;
  let headers = getContentType(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) return respondOnSourceNotFound(req, res);
    res.setHeader('Content-Type', headers);
    if (req.cookies.message)
      res.write('Login Failed');
    res.write(data);
    res.end();
  })
};

exports.serveStaticFiles = serveStaticFiles;
