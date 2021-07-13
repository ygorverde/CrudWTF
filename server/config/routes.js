module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.route('/signin').post(app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/types')
    .all(app.config.passport.authenticate())
    .get(app.api.types.get)
    .delete(app.api.types.remove)

    app.route('/services')
    .all(app.config.passport.authenticate())
    .post(app.api.services.save)
    .get(app.api.services.get)
}