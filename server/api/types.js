const queries = require('./queries');

module.exports = app => {
    const { notExistsOrError } = app.api.validation

    const get = async (req, res) => {
        const result = await app.db.query(queries.allTypes);
        res.json(result[0])
    }

    const remove = async (req, res) => {
        const id = req.query.id;
        try {
            const result = await app.db.query(queries.verifyTypeInUse, id)
            const row = result[0][0]

            notExistsOrError(row, 'Oops! Tipo associado à atendimentos')

            await app.db.query(queries.removeType, id)
            throw `Excluído com sucesso!!`
        } catch (err) {
            res.send(err)
        }
    }

    return { get, remove }
}