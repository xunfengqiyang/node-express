const express = require('express');
const http = require('http')
const log4js = require('log4js');
const logger = log4js.getLogger();
const config = require('./config/config.js');
const path = require('path');
var mutipart= require('connect-multiparty');
var bodyParser = require("body-parser"); 


log4js.configure({
    appenders: {
      dateFile: {
        type: 'dateFile',
        filename: config.LOGGER_PATH + "/logger",
        "pattern": "-yyyy-MM-dd.log",
        alwaysIncludePattern: true
      },
      out: {
        type: 'stdout'
      }
    },
    categories: {
      default: {
        appenders: ['dateFile', 'out'],
        level: 'debug'
      }
    }
  });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());
app.use(mutipart({uploadDir: config.UPLOAD_PATH}));

app.use(express.static(config.STATIC_PATH));
app.use('/', require("./controller/index.js"));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/web/index.html'));
});

http.createServer(app).listen(8090);
logger.info('HTTP server start on 8090');

process.on('uncaughtException', function (err) {
  logger.error('An uncaught error occurred! ', err);
});