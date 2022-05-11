const express = require('express');
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')

const jwtsecret = "dkalskdjlasdlkasjdlkas.djaslfjasl;kjflaskfl;ask;ga"

const sqlpool = mysql.createPool({
    namedPlaceholders: true,
    charset: 'utf8',
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "homework5_gosoft",
})

const app = express();
app.use(express.json());

app.use((req, response, next)=>{
    if(req.path == "/login") return next()

    const authheader = req.headers.authorization

    if(!authheader) return response.json({msg: "Error unauthorize"})

    jwt.verify(authheader.split(' ')[1], jwtsecret, (err, result) => {
        if (err) {
            return response.json({msg: "Error unauthorize"})
        }
        next()
    })
})

app.post('/login', (req, response) => {
    if (req.body.user == "venena" && req.body.pass == "0000") {
        const token = jwt.sign({ username: "admin" }, jwtsecret)
        return response.json({token})
    }
    return response.status(404).send("Error invalid data");
})

app.get('/getData', (req, response) => {
    const sql = 'select * from employee'
    sqlpool.query(sql, (err, result) => {
        if(err) {
            return response.status(404).json(err)
        }
        return response.json({ data: result })
    })
})

app.post('/createData', (req, response) => {
    if(
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.id ||
        !req.body.pos ||
        !req.body.tel ||
        !req.body.email
        ) {
        return response.status(404).send("Error invalid data");
    }

    const sql = 'insert into employee value (:fname, :lname, :id, :pos, :tel, :email)'
    sqlpool.query(sql, {
        fname: req.body.firstname,
        lname: req.body.lastname,
        id: req.body.id,
        pos: req.body.pos,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {
        if(err) {
            return response.status(404).json(err)
        }
        return response.json({ data: "ok" })
    })
})

app.put('/updateData', (req, response) => {
    if(
        !req.body.id ||
        !req.body.pos ||
        !req.body.tel ||
        !req.body.email
        ) {
        return response.status(404).send("Error invalid data");
    }
    
    const sql = 'update employee set pos = :pos, tel = :tel, email = :email where id = :id'
    sqlpool.query(sql, {
        id: req.body.id,
        pos: req.body.pos,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {
        if(err) {
            return response.status(404).json(err)
        }
        if(result.affectedRows == 0) return response.status(400).json({data: "Employee not found"})
        return response.json({ data: "ok" })
    })
})

app.delete('/deleteData', (req, response) => {
    if(!req.body.id) return response.status(400).send("Error invalid data");
    
    const sql = 'delete from employee where id = :id'
    sqlpool.query(sql, {
        id: req.body.id
    }, (err, result) => {
        if(err) {
            return response.status(404).json(err)
        }
        if(result.affectedRows == 0) return response.status(400).json({data: "Employee not found"})
        return response.json({ data: "ok" })
    })
})

app.listen(3000 , () => {
    console.log(`Listening on port: 3000`);
});
