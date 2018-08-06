'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.config.set('testing', true)
    }

    writing() {
        this._copy()
    }

    install() {
        const deps = [
            "jasmine-core@3",
            "karma@2",
            "karma-chrome-launcher",
            "karma-jasmine",
            "karma-sourcemap-loader",
            "karma-webpack",
            "protractor@5"
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