process.env.NODE_ENV = 'production';
process.env.PORT = 80;
process.env.KEY = 'some';

const defaultConfig = { host: '0.0.0.0', port: 3000, uri: 'test.com', key: 'KEY' };
const prodConfig = { port: 'PORT',  uri: 'google.com', key: 'KEY' };

const test = require('ava');
const config = require('../src').config(defaultConfig, prodConfig);

test('safe getting config with using "get"', async(t) => {
  const host = config.get('host');
  t.is(host, defaultConfig.host);
});

test('inherit host', async(t) => {
  const host = config.host;
  t.is(host, defaultConfig.host);
});

test('port from env var', async(t) => {
  const port = config.port;
  t.is(port, process.env.PORT);
});

test('replace uri', async(t) => {
  const uri = config.uri;
  t.is(uri, prodConfig.uri);
});

test('key from env var for local', async(t) => {
  process.env.NODE_ENV = 'development';
  const key = config.key;
  t.is(key, process.env.KEY);
});