'use strict'

const Generator = require('yeoman-generator')
const to = require('to-case')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.name = this.args[0]
        this.name || this._err('usage: "yo piw:service <name>"')
        this.name = this.name[0].toUpperCase() + this.name.slice(1) // Capitalize
        this.nameSlug = to.slug(this.name)
        this.ext = this.config.get('ext')
    }

    writing() {

        this._copy(['service.js'], { name: this.name })
        this.config.get('testing') && this._copyTests()

        this._addImport(this.name, `./services/${this.nameSlug}.service`, 'service')
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
            this._cp(f, `src/app/services/${this.nameSlug}.${f}`, options)
        })
    }

    _copyTests() {
        let f = 'service.spec.js'
        this._cp(f, `test/e2e/services/${this.nameSlug}.${f}`, { name: this.name, type: ' e2e' })
        this._cp(f, `test/unit/services/${this.nameSlug}.${f}`, { name: this.name, type: ' unit' })
    }

    _addImport(name, dest, type) {
        let data = this.fs.read(this.destinationPath('src/app/app.module.' + this.ext))
        data = `${data}\n\nimport ${name} from "${dest}";\napp.${type}("${name}", ${name});`
        this.fs.write(this.destinationPath('src/app/app.module.' + this.ext), data)
    }
}