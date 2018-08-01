'use strict'

const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.config.set('fa', true)
    }

    default() {
        this._addSimpleImport('@fortawesome/fontawesome-free/js/all')
    }

    install() {
        this.npmInstall("@fortawesome/fontawesome-free", {}, { cwd: 'src' })
    }

    _addSimpleImport(toImport) {
        let data = this.fs.read(this._destinationPath('src/app/app.module.js'))
        data = `${data}\n\nimport "${toImport}"`
        this.fs.write(this._destinationPath('src/app/app.module.js'), data)
    }

    _destinationPath(dest) {
        return path.join(this.destinationRoot(), dest)
    }
}