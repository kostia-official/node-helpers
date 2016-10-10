const Promise = require('bluebird');
const _ = require('lodash');

module.exports = async function onArrayOrObject(data, fn) {
  return _.isArray(data) ?
    (await Promise.map(data, instance => fn(instance))) :
    (await fn(data));
};
