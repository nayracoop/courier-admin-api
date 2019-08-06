const express = require('express')
const ParseServer = require('parse-server').ParseServer
const path = require('path')
require('dotenv').config()

const databaseUri = process.env.MONGODB_URI

if (!databaseUri) {
  console.error('DATABASE_URI not specified, falling back to localhost.')
}

const api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.PARSE_SERVER_CLOUD_CODE_MAIN || path.join(__dirname, '/cloud/main.js'),
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.PARSE_SERVER_MASTER_KEY || '',
  javascriptKey: process.env.PARSE_SERVER_JAVASCRIPT_KEY || '',
  restAPIKey: process.env.PARSE_SERVER_REST_API_KEY || '',
  serverURL: process.env.PARSE_SERVER_URL || 'http://localhost:1337/parse'
})

// javascriptKey, restAPIKey, dotNetKey, clientKey
const app = express()

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_SERVER_MOUNT || '/parse'
// app.use(cors());
app.use(mountPath, api)

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(403).send('I\'ve always dreamed of beeing a website.')
})

const port = process.env.PORT || 1337
const httpServer = require('http').createServer(app)
httpServer.listen(port, function () {
  console.log('parse-server running on port ' + port + '.')
})

// This will enable the Live Query real-time server
// ParseServer.createLiveQueryServer(httpServer);
