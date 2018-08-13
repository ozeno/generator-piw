'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
    }

    writing() {
        this.fs.copy(
            this.templatePath(''),
            this.destinationPath('')
        )
    }

    install() {
        const deps = [
            "@types/angular@1",
            "@types/angular-route@1",
            "awesome-typescript-loader@5",
            "typescript@3",
        ]

        this.config.get('bootstrap') && deps.push('@types/angular-ui-bootstrap')

        this.npmInstall(deps, { 'save-dev': true })
    }
}