const runTime = new Date();

module.exports = ({ name, version }) => async() => ({ name, version, uptime: +(new Date()) - +runTime });
