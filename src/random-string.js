var _ = require('lodash');

module.exports = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  return _(length)
    .times(n => possible.charAt(Math.floor(Math.random() * possible.length)))
    .join('');
};
