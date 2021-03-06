'use strict'

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.config.set('bootstrap', true)
        this.ext = this.config.get('ext')
    }

    propmting() {
        const prompts = [
            {
                type: 'list',
                name: 'style',
                message: 'Which style do you want to use?',
                choices: ["less", "css"]
            }
        ]
        return this.prompt(prompts).then((props) => {
            this.props = props
            this.config.set('style', this.props.style)
        })
    }

    writing() {
        if (this.props.style === 'css') {
            this._css()
        }

        if (this.props.style === 'less') {
            this._less()
        }
        this._addImport('ui', 'angular-ui-bootstrap')
    }

    install() {
        const deps = [
            "bootstrap@3",
            "angular-ui-bootstrap"
        ]

        const devDeps = [
            "css-loader@1.0.0",
            "file-loader@1.1.11",
            "less@3.8.0",
            "less-loader@4.1.0",
            "style-loader@0.21.0"
        ]

        this.npmInstall(deps)
        this.npmInstall(devDeps, { 'save-dev': true })
    }

    _css() {
        this._addSimpleImport('bootstrap/dist/css/bootstrap.min.css')
    }

    _less() {
        this._addSimpleImport('./app.less')
        this._cp('app.less', 'src/app/app.less', {})
    }

    _cp(from, to, options) {
        this.fs.copyTpl(
            this.templatePath(from),
            this.destinationPath(to),
            options
        )
    }

    _addSimpleImport(toImport) {
        let data = this.fs.read(this.destinationPath('src/app/app.module.' + this.ext))
        data = `${data}\n\nimport "${toImport}";`
        this.fs.write(this.destinationPath('src/app/app.module.' + this.ext), data)
    }

    _addImport(name, dest) {
        let data = this.fs.read(this.destinationPath('src/app/app.module.' + this.ext))
        if (this.ext === 'js') data = `${data}\nimport ${name} from "${dest}";\napp.requires.push(${name});`
        if (this.ext === 'ts') data = `${data}\nimport * as ${name} from "${dest}";\napp.requires.push(String(${name}));`
        this.fs.write(this.destinationPath('src/app/app.module.' + this.ext), data)
    }
}