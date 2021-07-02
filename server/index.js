const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wtfcrud'
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    const sqlSelect = "SELECT * FROM types;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.post("/api/insert", (req, res) => {
    const type = req.body.type;
    const client = req.body.client;
    const observation = req.body.observation;
    const id_user = req.body.user;
    
    // const sqlTypeExists = `select * from types where id = '${type}';`;

    db.query(sqlTypeExists, (err, result) => {
        console.log('result:', result)
    });
    const sqlInsert = "INSERT INTO services (type, client, observation, id_user) VALUES (?,?,?,?);";
    db.query(sqlInsert, [type, client, observation, id_user], (err, result) => {
        console.log(result);
    });
});



app.listen(3001, () => {
    console.log('Funcionando na porta 3001')
});
