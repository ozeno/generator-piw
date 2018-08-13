function buildConfig(env) {
	env = env || 'dev'
	return require('./webpack.' + env + '.config.js')(env);
}

module.exports = buildConfig;