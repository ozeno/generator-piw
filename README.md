#### Installation
Install yo and this generator globally.
```
npm install -g yo
npm install -g generator-piw
```

#### Create an empty directory
Create an empty directory with your project's name and cd in.
```
mkdir <project-name>
cd <project-name>
```

#### Use yo command to generate your app
Use ```yo piw``` to kickstart a new project.
Use ```yo piw:<sub-generator> <params-for-sub-generator>``` add features to an existing project.
```
yo piw
yo piw:component <name>
yo piw:service <name>
```
Examples:

```
yo piw:component listManagers
yo piw:service peopleService
```

#### File Structure
Here is an example file structure for an app called demo.

Simple directory structure.
```
  demo/
    ├───.config/ -> config files are here.
    |
    ├───src/ -> source files are here.
    │   └───app/
    │       └───modules/
    │           └───demo-app/
    |
    └───test/ -> test files are here.
        ├───e2e/
        │   └───demo-app/
        └───unit/
            └───demo-app/
```
After adding a service.
```
  demo/
    ├───.config/ -> config files are here.
    |
    ├───src/ -> source files are here.
    │   └───app/
    │       ├───modules/
    │       │   └───demo-app/
    │       └───services/
    |
    └───test/ -> test files are here.
        ├───e2e/
        │   ├───demo-app/
        │   └───services/
        └───unit/
            ├───demo-app/
            └───services/
```

Whole file structure.
```
  demo/ -> project's name
    │   .babelrc
    │   .eslintignore
    │   .eslintrc.js
    │   .yo-rc.json
    │   package.json
    │
    ├───.config/
    │       karma.conf.js
    │       protractor.conf.js
    │       webpack.base.config.js
    │       webpack.config.js
    │       webpack.dev.config.js
    │       webpack.prod.config.js
    │
    ├───src/
    │   │   bundle.template.ejs
    │   │
    │   └───app/
    │       │   app.less
    │       │   app.module.js
    │       │   app.routes.js
    │       │
    │       ├───modules/
    │       │   └───demo-app/
    │       │           demo-app.component.js
    │       │           demo-app.controller.js
    │       │           demo-app.template.html
    │       │
    │       └───services/
    │               demo.service.js
    │
    └───test/
        ├───e2e/
        │   │   app.spec.js
        │   │
        │   ├───demo-app/
        │   │       demo-app.component.spec.js
        │   │       demo-app.controller.spec.js
        │   │
        │   └───services/
        │           demo.service.spec.js
        │
        └───unit/
            │   app.spec.js
            │
            ├───demo-app/
            │       demo-app.component.spec.js
            │       demo-app.controller.spec.js
            │
            └───services/
                    demo.service.spec.js

```