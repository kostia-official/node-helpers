module.exports = ({ fk }) => (hook) => {

  if (hook.method === 'create') {
    hook.data[fk] = hook.params[fk];
  } else {
    hook.params.query[fk] = hook.params[fk];
  }

  return hook;
};
