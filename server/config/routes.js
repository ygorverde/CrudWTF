module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signIn)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/')
    .get(app.api.types.get)
}