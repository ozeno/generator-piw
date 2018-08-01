'use strict'

const Generator = require('yeoman-generator')
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
    }

    writing() {
        this.fs.copy(
            this.templatePath(''),
            this.destinationPath('src/')
        )
    }

    install() {
        this.npmInstall(null, {}, { cwd: 'src' })
    }
}