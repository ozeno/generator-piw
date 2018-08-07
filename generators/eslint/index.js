'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
    }

    writing() {
        this._copy()
    }

    install() {
        const deps = [
            "eslint@5",
            "eslint-plugin-angular@3",
        ]

        this.npmInstall(deps, { 'save-dev': true })
    }

    _copy() {
        this.fs.copy(
            this.templatePath('.*'),
            this.destinationPath('')
        )
    }
}