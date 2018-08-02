'use strict'

const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.name = this.args[0]
    }

    writing() {
        this.name || this._err('usage: "yo piw:component <name>"')

        this._copy(['controller.js', 'component.js', 'template.html'], { name: this.name })
        this.config.get('testing') && this._copyTests(['component.spec.js', 'controller.spec.js'])

        this._addImport(this.name, `./modules/${this.name}/${this.name}.component`, 'component')

        this.log(`
        .when('/${this.name}', {
            template: '<${this.name}></${this.name}>'
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
            this._cp(f, `src/app/modules/${this.name}/${this.name}.${f}`, options)
        })
    }

    _copyTests(files) {
        files.forEach(f => {
            this._cp(f, `test/e2e/${this.name}/${this.name}.${f}`, { name: this.name, type: ' e2e' })
            this._cp(f, `test/unit/${this.name}/${this.name}.${f}`, { name: this.name, type: ' unit' })
        })
    }

    _addImport(name, dest, type) {
        let data = this.fs.read(this._destinationPath('src/app/app.module.js'))
        // data = `import ${name} from "${dest}";\n${data}\n\t.${type}("${name}", ${name})`
        data = `${data}\n\nimport ${name} from "${dest}"\napp.${type}("${name}", ${name})`
        this.fs.write(this._destinationPath('src/app/app.module.js'), data)
    }

    _destinationPath(dest) {
        return path.join(this.destinationRoot(), dest)
    }
}