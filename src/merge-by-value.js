const _ = require('lodash');

module.exports = function (arrays, field) {
  return arrays.reduce((previousValue, currentValue) => {
    return mergeTwo(previousValue, currentValue, field);
  });
};

function mergeTwo(first, second, field) {
  return _.map(first, object => {
    const secondObject = _.find(second, { [field]: object[field] });
    return _.merge(object, secondObject);
  });
}
