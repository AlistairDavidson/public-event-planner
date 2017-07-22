import database from '../common/database';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

let throng = require('throng');

let WORKERS = 1;

function start() {
     try {
        database.connect()
            .then(() => {
                // init
            });
    } catch(e) {
        console.error(e);
    }     
}

throng({
    start: start,
    workers: WORKERS,
    lifetime: Infinity
});

