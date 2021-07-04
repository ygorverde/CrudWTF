module.exports = app => {

    const save = async (req, res) => {
        const user = { ...req.body }

        const sqlUserExists = `SELECT * FROM users WHERE email = '${user.email}'`;
        const userFromDb = await app.db.query(sqlUserExists, (err, result) => {
            userExists = result
        });

    }


    return { save }
}