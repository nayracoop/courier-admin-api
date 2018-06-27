// Example express application adding the parse-server module to expose Parse
// compatible API routes.
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
require('dotenv').config();

var databaseUri = process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.PARSE_SERVER_CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.PARSE_SERVER_MASTER_KEY || '',
  javascriptKey: process.env.PARSE_SERVER_JAVASCRIPT_KEY || '',
  restAPIKey: process.env.PARSE_SERVER_REST_API_KEY || '',
  serverURL: process.env.PARSE_SERVER_URL || 'http://localhost:1337/parse',  // https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // query subscriptions
  }
});

// javascriptKey, restAPIKey, dotNetKey, clientKey
var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_SERVER_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(403).send('I\'ve always dreamed of beeing a website.');
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('parse-server running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
