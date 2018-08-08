'use strict'

const Generator = require('yeoman-generator')
const to = require('to-case')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.name = this.args[0]
        this.name || this._err('usage: "yo piw:component <name>"')
        this.nameSlug = to.slug(this.name)
        this.ext = this.config.get('ext')
    }

    writing() {
        this._copy(['controller.js', 'component.js', 'template.html'], { name: this.name, nameSlug: this.nameSlug })
        this.config.get('testing') && this._copyTests(['component.spec.js', 'controller.spec.js'])

        this._addImport(this.name, `./modules/${this.nameSlug}/${this.nameSlug}.component`, 'component')

        this.log(`
        .when('/${this.name}', {
            template: '<${this.nameSlug}></${this.nameSlug}>'
        })`)
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
            let ff
            if (f.slice(-2) === 'js') { 
                ff = f.slice(0, -2) + this.ext
            } else {
                ff = f
            }
            this._cp(f, `src/app/modules/${this.nameSlug}/${this.nameSlug}.${ff}`, options)
        })
    }

    _copyTests(files) {
        files.forEach(f => {
            this._cp(f, `test/e2e/${this.nameSlug}/${this.nameSlug}.${f}`, { name: this.name, type: ' e2e' })
            this._cp(f, `test/unit/${this.nameSlug}/${this.nameSlug}.${f}`, { name: this.name, type: ' unit' })
        })
    }

    _addImport(name, dest, type) {
        let data = this.fs.read(this.destinationPath('src/app/app.module.' + this.ext))
        data = `${data}\n\nimport ${name} from "${dest}";\napp.${type}("${name}", ${name});`
        this.fs.write(this.destinationPath('src/app/app.module.' + this.ext), data)
    }
}