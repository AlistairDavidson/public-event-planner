"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const webserver_1 = require("./webserver");
let throng = require('throng');
let WORKERS = 1; //process.env.WEB_CONCURRENCY || 1;
function start() {
    database_1.default.connect()
        .then(() => webserver_1.default.init());
}
throng({
    start: start,
    workers: WORKERS,
    lifetime: Infinity
});
