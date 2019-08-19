const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123123',
    database: 'gc',
    multipleStatements: true
})
mysqlConnection.connect((err) => {
    if (!err) console.log('successfuly');
    else
        console.log('failed' + JSON.stringify(err, undefined, 2));
})
app.listen(3000, () => console.log('express server is running at posrt number :3000'));

app.get('/',(req,res)=>{
    res.json(user)
})
//Get all user
app.get('/user', (req, res) => {
    mysqlConnection.query('SELECT * FROM user ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get all user
app.get('/user/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM user Where iduser = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
//Delet user where id
app.delete('/user/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM user Where iduser = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('delete successfuly');
        else
            console.log(err);
    })
});

//insert user 
app.post('/user', (req, res) => {
    let usr = req.body;
    var sql = "SET @iduser = ?;SET @Name = ?;SET @email = ?;SET @password = ?; \
    CALL userAddOrEdit(@iduser,@name,@email,@password); ";
    mysqlConnection.query(sql, [usr.iduser, usr.name, usr.email, usr.password], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send('Inserted usr id : ' + element[0].userID);
                else
                    console.log(err);
            })
    })
});

//update user 
app.put('/user', (req, res) => {
    let usr = req.body;
    var sql = "SET @iduser = ?;SET @Name = ?;SET @email = ?;SET @password = ?; \
    CALL userAddOrEdit(@iduser,@name,@email,@password); ";
    mysqlConnection.query(sql, [usr.iduser, usr.name, usr.email, usr.password], (err, rows, fields) => {
        if (!err)
            res.send('update usr ');
        else
            console.log(err);
    })
});

//login user 
app.post('/login', (req, res) => {
    let usr = req.body;
    var sql = "SET @email = ?;SET @password = ?; \
    CALL userLogin(@email,@password); ";
    mysqlConnection.query(sql, [ usr.email, usr.password], (err, rows, fields) => {
        rows.forEach(element => {
            if (element.constructor == Array)
                res.send(element);
            else
                console.log(err);
        })
    })
});