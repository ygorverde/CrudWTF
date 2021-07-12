const { authSecret } = require('../.env');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = app => {

    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(404).send('Informe usuário e senha!')
        }

        const result = await app.db.query(`SELECT * from users where email = '${req.body.email}';`);
        const user = { ...result[0][0] }

        if (!user) return res.status(401).send('Email não cadastrado');

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) return res.status(401).send('Usuário ou senha inválidos');

        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
            // exp: now + (60)

        }

        res.json({
            ...payload,
            token: jwt.sign(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            // Problema no token.
        }
        res.send(false)
    }

    return { signin, validateToken }
}