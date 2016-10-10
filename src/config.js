const _ = require('lodash');
const iterator = require('object-recursive-iterator');

module.exports = function (defaultConfig, productionConfig) {
  iterator.forAll(productionConfig, (path, key, obj) => {
    if (_.startsWith(obj[key], '$')) {
      let jsonEnvVarName = _.trim(obj[key], '$');
      const value = _.trim(process.env[jsonEnvVarName], '\'');
      if (value) obj[key] = JSON.parse(value);
      return;
    }
    obj[key] = process.env[obj[key]] || obj[key];
  });

  return {
    get: function (name) {
      const defaultConfigNode = _.get(defaultConfig, name);
      const prodConfigNode = _.get(productionConfig, name);

      if (process.env.NODE_ENV === 'production') return prodConfigNode || defaultConfigNode;
      return defaultConfigNode;
    }
  };
};
