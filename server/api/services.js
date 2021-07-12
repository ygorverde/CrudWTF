const queries = require('./queries');

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const service = { ...req.body }
        try {
            if(service.client === '' && service.id_type === ''){
                throw 'Preencha todos os campos necessários!'
            }else{
                existsOrError(service.date_exec, 'Data não informado')
                existsOrError(service.client, 'Cliente não informado')
                existsOrError(service.id_type, 'Tipo não informado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        try{
            await app.db.query(queries.saveService, [service.date_exec, service.client, service.observation, service.id_user, service.id_type])
            res.status(204).send()
        }catch(msg){
            throw `OCORREU UM ERRO, ${msg}`
        }

        res.status(204).send()

    }

    const limit = 5
    const get = async(req, res) => {
        const pagination = { ...req.query }
        const resultCount = await app.db.query(queries.servicesCount);
        const count = parseInt(resultCount[0][0].count);
        const page = parseInt(pagination.page);
        const result = await app.db.query(queries.allServices, [limit, (page * limit - limit)])
        // res.json(result[0])
        res.json({ data: result[0], count, limit })
    }

    return { save, get }
}