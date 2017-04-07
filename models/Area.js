/**
 * Model for area table
 *
 * @author Stéphane BRUN - stephane@sbnet.fr
 */
"use strict";

var Model = require('./Model.js');

class Area extends Model{

    getAll(done) {
        var sql = 'SELECT * FROM area ORDER BY name DESC';

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
        var sql = this.db.mysql.format('SELECT * FROM area WHERE id=?', id);

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

     getByRegionId(id, done) {
        var sql = this.db.mysql.format('SELECT * FROM area WHERE region_id=? ORDER BY name', id);

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

    getByCode(code, done) {
        var sql = this.db.mysql.format('SELECT * FROM area WHERE code=?', code);

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
        var sql = 'SELECT * FROM area WHERE search LIKE ?';
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

module.exports = new Area();