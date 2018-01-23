const getContentType = function(filePath) {
  let fileExtention = filePath.split('.')[1]||"";
  let headers = {
    'html':'text/html',
    'js': 'text/js',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'png':'img/png',
    'jpeg': 'image/jpeg',
    'html': 'text/html',
    'gif': 'image/gif',
    'pdf': 'text/pdf',
    'ico': 'text/plain'
  }
  return headers[fileExtention];
};

const respondOnSourceNotFound = function(req, res) {
  res.statusCode = 404;
  res.write('source not found');
  res.end();
};

const serveStaticFiles = function(req, res) {
  if(req.url=='/'){
    req.url='/index.html'
  }
  let filePath = 'public' + req.url;
  let headers = getContentType(filePath);
  if(this.fs.existsSync(filePath)){
    let data = this.fs.readFileSync(filePath)
    res.statusCode = 200;
    res.setHeader('Content-Type', headers);
    res.write(data);
    res.end();
    return ;
  }
  return respondOnSourceNotFound(req,res)
};


exports.serveStaticFiles = serveStaticFiles;
