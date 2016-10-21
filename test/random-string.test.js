const test = require('ava');
const randomString = require('../src/random-string');

test('default length is 10', async(t) => {
  t.is(randomString().length, 10);
});

test('with length', async(t) => {
  t.is(randomString(5).length, 5);
});
