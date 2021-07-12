const { authSecret } = require('../.env');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
            app.db.query(`SELECT * FROM USERS WHERE ID = ${payload.id}`).then(result => {
                done(null, result[0][0] ? { ...payload } : false)
            }).catch(err => done(err, false))
            // done(null, false, false)
    })

    passport.use(strategy)

    return { 
        authenticate: () => passport.authenticate('jwt', { session: false })
    }

}