'use strict'

const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.name = this.args[0]// .replace(/\s/g, '')
    }

    writing() {
        this.name || this._err('usage: "yo piw:service <name>"')

        this._copy(['service.js'], { name: this.name })
        this.config.get('testing') && this._copyTests()

        this._addImport(this.name, `./services/${this.name}.service`, 'service')
    }

    _err(s) {
        this.log(s)
        process.exit(1)
    }

    _cp(from, to, options) {
        this.fs.copyTpl(
            this.templatePath(from),
            this.destinationPath(to),
            options
        )
    }

    _copy(files, options) {
        files.forEach(f => {
            this._cp(f, `src/app/services/${this.name}.${f}`, options)
        })
    }

    _copyTests() {
        let f = 'service.spec.js'
        this._cp(f, `src/e2e/services/${this.name}.${f}`, { name: this.name, type: ' e2e' })
        this._cp(f, `src/tests/services/${this.name}.${f}`, { name: this.name, type: '' })
    }

    _addImport(name, dest, type) {
        let data = this.fs.read(this._destinationPath('src/app/app.module.js'))
        data = `${data}\n\nimport ${name} from "${dest}"\napp.${type}("${name}", ${name})`
        this.fs.write(this._destinationPath('src/app/app.module.js'), data)
    }

    _destinationPath(dest) {
        return path.join(this.destinationRoot(), dest)
    }
}