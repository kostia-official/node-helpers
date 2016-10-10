const axios = require('axios');

module.exports = (opt) => {

  const instance = axios.create(opt);

  instance.interceptors.response.use(async function (res) {
    res = res.data;
    return res;
  });

  return instance;
};
