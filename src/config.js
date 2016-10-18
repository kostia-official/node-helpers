const _ = require('lodash');
const iterator = require('object-recursive-iterator');
const extend = require('deep-extend');

module.exports = function (defaultConfig, productionConfig, envFile) {
  applyEnvFile(envFile);
  resolveConfig(defaultConfig);
  resolveConfig(productionConfig);

  const resultConfig = mergeConfigs(defaultConfig, productionConfig);

  return {
    get: (name) => getConfig(defaultConfig, productionConfig, name),
    ...resultConfig
  };
};

function resolveConfig(config) {
  iterator.forAll(config, function (path, key, obj) {
    if (_.startsWith(obj[key], '$')) {
      var jsonEnvVarName = _.trim(obj[key], '$');
      var value = _.trim(process.env[jsonEnvVarName], '\'');
      if (value) obj[key] = JSON.parse(value);
      return;
    }

    obj[key] = process.env[obj[key]] || obj[key];
  });
}

function applyEnvFile(envFile) {
  _.mapKeys(envFile, (value, envName) => {
    process.env[envName] = value;
  })
}

function getConfig(defaultConfig, productionConfig, name)  {
  var defaultConfigNode = _.get(defaultConfig, name);
  var prodConfigNode = _.get(productionConfig, name);

  if (process.env.NODE_ENV === 'production') return prodConfigNode || defaultConfigNode;
  return defaultConfigNode;
}

function mergeConfigs(defaultConfig, productionConfig) {
  return process.env.NODE_ENV === 'production' ?
    extend(defaultConfig, productionConfig) :
    defaultConfig;
}