"use strict";
module.exports = function(config) {
    config.set({

        frameworks: ["jasmine", "karma-typescript"],

        files: [
            { pattern: "src/worker/**/*_spec.ts" }
        ],

        preprocessors: {
            "src/worker/**/*.ts": ["karma-typescript"]
        },

        reporters: ["progress", "karma-typescript"],

        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json"
        },

        logLevel: config.LOG_INFO,

        browsers: ["Chrome"]
    });
};