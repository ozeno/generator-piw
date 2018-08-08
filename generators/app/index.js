'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
    }

    propmting() {
        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the project:'
            }, {
                type: 'confirm',
                name: 'test',
                message: 'Would you like to enable testing?',
                default: true
            }, {
                type: 'confirm',
                name: 'fa',
                message: 'Would you like to enable Font Awesome?',
                default: true
            }, {
                type: 'list',
                name: 'ext',
                message: 'Which language do you want to use?',
                choices: ['js', 'ts']
            }, {
                type: 'confirm',
                name: 'bootstrap',
                message: 'Would you like to enable Bootstrap?',
                default: true
            }
        ]
        return this.prompt(prompts).then((props) => {
            this.props = props
        })
    }

    writing() {
        this._copy(this.props.ext)

        this.props.ext === 'ts' && this.composeWith("piw:ts", {})
        this.config.set('ext', this.props.ext)

        this.props.test && this.composeWith("piw:test", {})
        this.config.set('testing', this.props.test)

        this.props.bootstrap && this.composeWith("piw:bootstrap", {})
        this.config.set('bootstrap', this.props.bootstrap)

        this.props.fa && this.composeWith("piw:fa", {})
        this.config.set('fa', this.props.fa)

        this.props.ext === 'js' && this.composeWith("piw:eslint", {})

        this.composeWith("piw:npm", {})
        this.composeWith("piw:webpack", {})
        this.composeWith("piw:component", { arguments: [this.props.name] })
    }

    _copy(ext) {
        this.fs.copyTpl(
            this.templatePath(ext),
            this.destinationPath(''),
            { message: 'Hello! from ', name: this.props.name, date: new Date().toISOString().slice(0, 10) }
        )
    }
}