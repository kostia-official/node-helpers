var _ = require('lodash');

module.exports = (length = 10) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  return _(length)
    .times(n => possible.charAt(Math.floor(Math.random() * possible.length)))
    .join('');
};
