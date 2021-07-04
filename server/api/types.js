const queries = require('./queries');

module.exports = app => {

    const get = (req, res) => {
        app.db.query(queries.allTypes, (err, result) => {
            res.json(result)
        });
    }

    return { get }
}