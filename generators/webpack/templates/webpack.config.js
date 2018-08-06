function buildConfig(env) {
	if (env == undefined) {
		env = 'dev';
	}
	return require('./webpack.' + env + '.config.js')(env);
}

module.exports = buildConfig;