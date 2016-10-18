const _ = require('lodash');

// From db instance to simple js object
// Removes __v fields
module.exports = (instance) => {
  if (!instance) return {};

  const result = _.has(instance, 'toObject') ? instance.toObject() : instance;
  return _.omit(result, ['__v']);
};
