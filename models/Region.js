/**
 * Model for region table
 *
 * @author Stéphane BRUN - stephane@sbnet.fr
 */
"use strict";

var Model = require('./Model.js');

class Region extends Model{

    getAll(done) {
        var sql = 'SELECT * FROM region ORDER BY name DESC';

        this.db.connection.query(
            sql,
            function select(error, results, fields) {
                if(error) {
                    this.db.connection.end();
                    return done(error);
                }
                done(null, results);
            }
        );
    }

    getById(id, done) {
        var sql = this.db.mysql.format('SELECT * FROM region WHERE id=?', id);

        this.db.connection.query(
            sql,
            function select(error, results, fields) {
                if(error) {
                    this.db.connection.end();
                    return done(error);
                }
                done(null, results);
            }
        );
    }

    search(q, done) {
        var sql = 'SELECT * FROM region WHERE search LIKE ?';
        var input = this.parseSearchInput(q);
        var inserts = ['%' + input + '%'];
        sql = this.db.mysql.format(sql, inserts);

        this.db.connection.query(
            sql,
            function select(error, results, fields) {
                if(error) {
                    this.db.connection.end();
                    return done(error);
                }
                done(null, results);
            }
        );
    }
}

module.exports = new Region();

