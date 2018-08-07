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
            "jasmine-reporters@2",
            "karma@2",
            "karma-chrome-launcher",
            "karma-jasmine",
            "karma-sourcemap-loader",
            "karma-webpack",
            "karma-babel-preprocessor@6",
            "karma-browserify@5",
            "karma-firefox-launcher@1",
            "karma-ie-launcher@1",
            "karma-ng-html2js-preprocessor@1",
            "karma-phantomjs-launcher@1",
            "karma-phantomjs-shim@1",
            "karma-teamcity-reporter@1",
            "karma-spec-reporter",
            "karma-coverage",
            "karma-helpful-reporter",
            "karma-summary-reporter",
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