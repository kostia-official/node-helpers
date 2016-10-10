const test = require('ava');
const withUsers = [{ tag: 'staging', users: 1 }, { tag: 'spire', users: 2 }];
const withNames = [{ tag: 'staging', name: 'Staging' }, { tag: 'spire', name: 'Spire' }];
const withNodes = [{ tag: 'staging', node: ['some'] }, { tag: 'spire', name: 'Spire', nodes: ['whatever'] }];
const result = [
  { tag: 'staging', name: 'Staging', users: 1, node: ['some'] },
  { tag: 'spire', users: 2, name: 'Spire', nodes: ['whatever'] }
];
const mergeByValue = require('../src/merge-by-value');

test('merge many arrays', async(t) => {
  const res = mergeByValue([withUsers, withNames, withNodes], 'tag');
  t.deepEqual(res, result);
});
