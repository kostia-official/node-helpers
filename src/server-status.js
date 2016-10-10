const runTime = new Date();

module.exports = (packageJson) => async()=> ({ version: packageJson.version, uptime: +(new Date()) - +runTime });
