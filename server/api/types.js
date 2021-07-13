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

    const put = async (req, res) => {
        const body = { ...req.body }
        try {
            await app.db.query(queries.disableType, [body.checked, body.id])
            res.status(202).send()
        } catch (err) {
            console.log(err)
        }
    }

    return { get, remove, put }
}