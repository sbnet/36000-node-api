/**
 * Model for city table
 *
 * @author Stéphane BRUN - stephane@sbnet.fr
 * @see https://www.terlici.com/2015/08/13/mysql-node-express.html
 */
"use strict";

var Model = require('./Model.js');

class City extends Model{
    getBiggers(limit, done) {
        var sql = 'SELECT * FROM city ORDER BY population DESC LIMIT ' + limit;

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
        var sql = this.db.mysql.format('SELECT * FROM city WHERE id=?', id);

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

    getByIdFull(id, done) {
        var sql = "SELECT c.*, ";
            sql += "a.id AS area_id, a.name AS area_name, a.formal_name AS area_formal_name, a.code AS area_code, a.surface AS area_surface, a.density AS area_density, a.population AS area_population, ";
            sql += "r.id AS region_id, r.cheflieu_id, r.country_id, r.name AS region_name, r.formal_name AS region_formal_name, r.code AS region_code, r.emblem_url AS region_emblem, ";
            sql += "co.id AS country_id, co.name AS country_name, co.formal_name AS country_formal_name, co.iso_code2 AS country_iso_code_2, co.iso_code3 AS country_iso_code_3 ";
            sql +="FROM city c ";
            sql +="INNER JOIN area a ON c.area_id = a.id ";
            sql +="INNER JOIN region r ON a.region_id = r.id ";
            sql +="INNER JOIN country co ON r.country_id = co.id ";
            sql +="WHERE c.id=?";

        sql = this.db.mysql.format(sql, id);
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

    getByPostal(id, done) {
        var sql = "SELECT * FROM city WHERE post_code=?";
        sql = this.db.mysql.format(sql, id);

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

    getByPostalFull(id, done) {
        var sql = "SELECT c.*, ";
            sql += "a.id AS area_id, a.name AS area_name, a.formal_name AS area_formal_name, a.code AS area_code, a.surface AS area_surface, a.density AS area_density, a.population AS area_population, ";
            sql += "r.id AS region_id, r.cheflieu_id, r.country_id, r.name AS region_name, r.formal_name AS region_formal_name, r.code AS region_code, r.emblem_url AS region_emblem, ";
            sql += "co.id AS country_id, co.name AS country_name, co.formal_name AS country_formal_name, co.iso_code2 AS country_iso_code_2, co.iso_code3 AS country_iso_code_3 ";
            sql +="FROM city c ";
            sql +="INNER JOIN area a ON c.area_id = a.id ";
            sql +="INNER JOIN region r ON a.region_id = r.id ";
            sql +="INNER JOIN country co ON r.country_id = co.id ";
            sql +="WHERE c.post_code=?";

        sql = this.db.mysql.format(sql, id);
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

    // TODO: Should improve the concat as it can't be indexed !
    getByInsee(insee, done) {
        var sql = "SELECT * FROM city WHERE CONCAT(department_code, city_code) = ?";
        sql = this.db.mysql.format(sql, insee);

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

    getByArea(id, done) {
        var sql = "SELECT * FROM city WHERE area_id = ? ORDER BY name";
        sql = this.db.mysql.format(sql, id);

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
        var sql = "SELECT * FROM city WHERE search LIKE ? ORDER BY `post_code`";
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

    // It need the following stored function that calculate the distance between two points
    //   This is an aproximation, it is not accurate if the 2 points are near the poles as the calculation is not mapped on a sphere
    //   but on a straight line

    //   Use this kind of query to get the cities
    //   SELECT DISTINCT glength(LineStringFromWKB(LineString(GeomFromText(astext(PointFromWKB(orig.coordinates))),GeomFromText(astext(PointFromWKB(dest.coordinates))))))*100 AS sdistance
    //   FROM city orig, city dest
    //   WHERE orig.post_code = '84470' having sdistance < 50
    //   ORDER BY sdistance limit 10

    //   This one seems to fail with mysql 5.5
    //   SELECT DISTINCT dest.post_code, 11100*distance(orig.coordinates, dest.coordinates) as sdistance
    //     FROM city orig, city dest
    //     WHERE orig.post_code = '84470'
    //     having sdistance < 50
    //     ORDER BY sdistance limit 10
    near(postcode, distance, limit, done) {
        var sql =  "SELECT DISTINCT dest.*, 11100*glength(LineStringFromWKB(LineString(GeomFromText(astext(PointFromWKB(orig.coordinates))),GeomFromText(astext(PointFromWKB(dest.coordinates)))))) as sdistance ";
            sql += "FROM city orig, city dest ";
            sql += "WHERE orig.post_code = ? ";
            sql += "having sdistance < ? ";
            sql += "ORDER BY sdistance LIMIT 10";

        var inserts = [postcode, distance, limit];
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

module.exports = new City();
