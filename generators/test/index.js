'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.config.set('testing', true)
    }

    writing() {
        this._copy()
        this.log('*** Run "webdriver-manager start" before starting e2e testing...')
    }

    install() {
        const deps = [
            "jasmine-core@3.0.0",
            "karma",
            "karma-chrome-launcher",
            "karma-jasmine",
            "karma-sourcemap-loader",
            "karma-webpack",
            "protractor"
        ]

        this.npmInstall(deps, { 'save-dev': true })
    }

    _copy() {
        this.fs.copyTpl(
            this.templatePath(''),
            this.destinationPath('')
        )

        this.fs.copy(
            this.templatePath('.config'),
            this.destinationPath('.config')
        )
    }
}