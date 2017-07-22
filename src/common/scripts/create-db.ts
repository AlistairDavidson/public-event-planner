import database from '../database';

database.connect(true).then(() => database.create());