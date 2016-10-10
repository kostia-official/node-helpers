process.env.NODE_ENV = 'production';
process.env.PORT = 80;

const defaultConfig = { host: '0.0.0.0', port: 3000, uri: 'test.com' };
const prodConfig = { port: 'PORT',  uri: 'google.com' };

const test = require('ava');
const config = require('../src').config(defaultConfig, prodConfig);

test('inherit host', async(t) => {
  const host = config.get('host');
  t.is(host, defaultConfig.host);
});

test('port from env var', async(t) => {
  const port = config.get('port');
  t.is(port, process.env.PORT);
});

test('replace uri', async(t) => {
  const uri = config.get('uri');
  t.is(uri, prodConfig.uri);
});