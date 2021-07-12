const queries = require('./queries');

module.exports = app => {

    const get = async (req, res) => {
        const result = await app.db.query(queries.allTypes);
        res.json(result[0])
    }

    const teste = async (req, res) => {
        res.json({name: 'Chegou aqui!'})
    }

    return { get, teste }
}