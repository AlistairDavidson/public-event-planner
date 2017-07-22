import database from '../common/database';
import webserver from './webserver';
let throng = require('throng');

let WORKERS = process.env.WEB_CONCURRENCY || 1;

function start() {
    database.connect()
        .then(() => webserver.init());
}

throng({
    start: start,
    workers: WORKERS,
    lifetime: Infinity
});