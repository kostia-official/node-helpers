const nestedService = require('./hooks/nested-service');
const errorHandler = require('./middlewares/errorhandler');
const config = require('./config');
const amqp = require('./amqp');
const mergeByValue = require('./merge-by-value');
const onArrayOrObject = require('./on-array-or-object');
const randomString = require('./random-string');
const request = require('./request');
const serverStatus = require('./server-status');
const toObject = require('./to-object');
const timeout = require('./timeout');

module.exports = {
  middlewares: { errorHandler },
  hooks: { nestedService },
  config,
  amqp,
  mergeByValue,
  onArrayOrObject,
  randomString,
  request,
  serverStatus,
  toObject,
  timeout
};
