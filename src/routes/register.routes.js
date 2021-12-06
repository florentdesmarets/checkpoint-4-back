const {connection} = require('../db_connection');
const router = require('express').Router();
const bcrypt = require("bcrypt");
const saltRound = 10;

router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
        if(err) {
            console.log(err)
        }
        connection.query("INSERT INTO admin (username, password) VALUES(?,?)",
        [username, hash],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({message : "identifiants already exist, take another one !"})
            }
            else {
                res.send({message : "Acount succesfuly create"})
            }
        }
        )
    })
})



module.exports = router;