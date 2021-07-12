const express = require('express');
const consign = require('consign');
const db = require('./config/db');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.db = db;

consign()
        .include('./config/passport.js')
        .then('./config/middlewares.js')
        .then('./api/validation.js')
        .then('./api')
        .then('./config/routes.js')
        .into(app)

app.listen(3001, () => {
    console.log('Funcionando na porta 3001')
});
