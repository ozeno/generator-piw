import view from './<%= name %>.template.html'

class <%= name %>Ctrl {
    constructor() {
        "ngInject"
    }
}

export default {
    template: view,
    controller: <%= name %>Ctrl
}