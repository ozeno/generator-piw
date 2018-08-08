'use strict'

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.config.set('fa', true)
        this.ext = this.config.get('ext')
    }

    default() {
        this._addSimpleImport('@fortawesome/fontawesome-free/js/all')
    }

    install() {
        this.npmInstall("@fortawesome/fontawesome-free")
    }

    _addSimpleImport(toImport) {
        let data = this.fs.read(this.destinationPath('src/app/app.module.' + this.ext))
        data = `${data}\n\nimport "${toImport}";`
        this.fs.write(this.destinationPath('src/app/app.module.' + this.ext), data)
    }
}