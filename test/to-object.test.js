const test = require('ava');
const { toObject } = require('../src');

test('null object', async(t) => {
  t.deepEqual(toObject(null), {});
});

test('simple object', async(t) => {
  t.deepEqual(toObject({a: 'a'}), {a: 'a'});
});

