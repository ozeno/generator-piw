'use strict'

const Generator = require('yeoman-generator')
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.ext = this.config.get('ext')
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath(''),
            this.destinationPath('.config/'),
            { ext: this.ext }
        )
        this.fs.copy(
            this.templatePath('.*'),
            this.destinationPath('')
        )
    }
}