const _ = require('lodash');

// From db instance to simple js object
// Removes __v fields
module.exports = (instance) => {
  return _.omit(instance.toObject ? instance.toObject() : instance, ['__v']);
};
