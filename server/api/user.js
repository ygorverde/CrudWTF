const queries = require('./queries');
const bcrypt = require('bcrypt');

module.exports = app => {

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt);
    }

    const save = async (req, res) => {
        const user = { ...req.body }

        user.password = encryptPassword(user.password);

        try {
            const userFromDb = await app.db.query(queries.userExists, [user.email]);

            if (userFromDb[0].length !== 0) {
                console.log('Usuário já cadastrado!');
            } else {
                console.log('Usuário cadastrado!')
                app.db.query(queries.saveUser, [user.name, user.email, user.password]);
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }

    }


    return { save }
}