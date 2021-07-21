const queries = require('./queries');

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const service = { ...req.body }
        try {
            if (service.client === '' && service.id_type === '') {
                throw 'Preencha todos os campos necessários!'
            } else {
                existsOrError(service.date_exec, 'Data não informado')
                existsOrError(service.client, 'Cliente não informado')
                existsOrError(service.id_type, 'Tipo não informado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        try {
            await app.db.query(queries.saveService, [service.date_exec, service.client, service.observation, service.id_user, service.id_type])
            res.status(204).send()
        } catch (msg) {
            throw `OCORREU UM ERRO, ${msg}`
        }

        res.status(204).send()

    }

    const limit = 5
    const get = async (req, res) => {

        date = req.query.date.split(',')
        const clientName = `%${req.query.client}%`
        let result = []
        let resultCount = []

        const pagination = { ...req.query }
        const page = parseInt(pagination.page);
        
        if(req.query.client !== ''){
            result = await app.db.query(queries.allServicesByClient, [date[0], date[1], clientName, limit, (page * limit - limit)])
            resultCount = await app.db.query(queries.servicesCountByName, [date[0], date[1], clientName]);
        }else{
            resultCount = await app.db.query(queries.servicesCount, [date[0], date[1]]);
            result = await app.db.query(queries.allServices, [date[0], date[1], limit, (page * limit - limit)])
        }
        
        const count = parseInt(resultCount[0][0].count);

        res.json({ data: result[0], count, limit })
    }

    return { save, get }
}