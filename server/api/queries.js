module.exports = {
    servicesCount: `select count(id) as count from services;`,
    allServices: `SELECT S.id, 
    S.client, 
    S.date_exec, 
    S.observation, 
    T.description as type, U.name as user from services as S INNER JOIN users as U on S.id_user = U.id
    INNER JOIN types AS T on S.id_type = T.id ORDER BY S.id ASC LIMIT ? OFFSET ?;`,
    saveService: `INSERT INTO services (date_exec, client, observation, id_user, id_type) VALUES (?,?,?,?,?);`,
    allTypes: `SELECT * FROM types;`,
    verifyTypeInUse: `SELECT id from services s where s.id_type = ? LIMIT 1;`,
    removeType: `DELETE FROM TYPES WHERE ID = ?`,
    disableType: `UPDATE types SET ENABLED = ? WHERE ID = ?;`,
    saveUser: `INSERT INTO users (name, email, password) VALUES (?,?,?);`,
    userExists: `SELECT * FROM users where email = (?)`
}