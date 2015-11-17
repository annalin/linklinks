'use strict';

let config = require('../config');
let thinky = require('thinky')(config.rethinkdb);

module.exports = thinky;
