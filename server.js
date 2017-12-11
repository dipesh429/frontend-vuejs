var express = require('express');

app = express();

var history = require('connect-history-api-fallback');

app.use(history({
  // verbose: true
}));

var path = require('path');
var serveStatic = require('serve-static');

app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);