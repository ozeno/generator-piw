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
        this._copy()

        this.props.test && this.composeWith("piw:test", {})
        this.config.set('testing', this.props.test)

        this.props.bootstrap && this.composeWith("piw:bootstrap", {})
        this.config.set('bootstrap', this.props.bootstrap)

        this.props.fa && this.composeWith("piw:fa", {})
        this.config.set('fa', this.props.fa)

        this.composeWith("piw:npm", {})
        this.composeWith("piw:webpack", {})
        this.composeWith("piw:component", { arguments: [this.props.name] })
    }

    _copy() {
        this.fs.copyTpl(
            this.templatePath('src/'),
            this.destinationPath('src/'),
            { message: 'Hello! from ', name: this.props.name, date: new Date().toISOString().slice(0, 10) }
        )
    }
}