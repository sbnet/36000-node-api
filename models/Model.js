"use strict";

class Model{

    // Init mysql here
    constructor() {
        this.db = require('../mysqlConfig.js');
    }

    parseSearchInput(input) {
        var parsed = input
                    .replace(/[^A-Z0-9]+/ig, '')
                    .toUpperCase();

        return parsed;
    }
}

module.exports = Model;