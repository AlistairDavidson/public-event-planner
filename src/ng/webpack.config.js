var fs = require('fs');
var node_modules = fs.readdirSync('node_modules');

module.exports = {
    entry: {
        page1: [            
            "./node_modules/angular/angular.min.js",
            "./node_modules/angular-animate/angular-animate.min.js",
            "./node_modules/angular-aria/angular-aria.min.js",
            "./node_modules/angular-messages/angular-messages.min.js",
            "./node_modules/angular-cookies/angular-cookies.min.js",
            "./node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
            "./node_modules/angular-material/angular-material.min.js",
            "./node_modules/angular-material-data-table/dist/md-data-table.min.js",
            "./dist/static/templates.js",
            "./src/ng/index.ts"
        ]
    },
    output: {
        filename: "dist/static/event-planner.js"
    },
    resolve: {        
        extensions: [".ts", ".tsx"]    
    },
    module: {
        rules: [
             { test: /\.tsx?$/, use: ["ts-loader"] }
        ]
    },
    externals: node_modules
}
