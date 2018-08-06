const path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.prod.config.js')('prod');

var server;
exports.config = {
    framework: 'jasmine',
    specs: ['../test/e2e/*spec.js', '../test/e2e/**/*spec.js'],
    jasmineNodeOpts: {
        showColors: true,
    },
    multiCapabilities: [{
        browserName: 'chrome',
        chromeOptions: {
            args: ["--headless", "--disable-gpu", "--window-size=800,600"]
        }
    }],
    onPrepare: () => {
        var jasmineReporters = require('jasmine-reporters');
        var tcReporter = new jasmineReporters.TeamCityReporter({
            savePath: __dirname,
            consolidateAll: false
        });
        jasmine.getEnv().addReporter(tcReporter);
    },
    beforeLaunch: () => {
        var compiler = webpack(webpackConfig);

        server = new WebpackDevServer(compiler, {
            publicPath: '',
            contentBase: path.resolve(__dirname, '..'),
            compress: true,
            watchContentBase: true,
            watchOptions: {
                poll: true
            }
        });
        server.listen(81, () => { });
    },
    afterLaunch: () => {
        server.close();
    }
}