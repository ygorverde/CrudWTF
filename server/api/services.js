const queries = require('./queries');

module.exports = app => {

    const get = (req, res) => {
        res.send('Olá!')
    }

    return { get }
}