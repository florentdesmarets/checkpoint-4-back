const {connection} = require('../db_connection');
const router = require('express').Router();
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  connection.query(
    "SELECT * FROM admin WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({err : err});
      }
      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if(response) {
            const user = {username : result[0].username} ;
            const token = jwt.sign(user, process.env.TOKEN_SECRET);
            res.json({user :user, token:token})
          }
          else {
            res.json({message : "bad password or username"})
          }
        })}
        else {
          res.json({message : "user does not exist"})
        }
      }
  )
});

router.get('/', (req, res) => {
  const sql = "SELECT * FROM admin";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/', (req, res) => {
  const sql = "INSERT INTO admin SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(201).json({id: results.insertId, ...req.body});
    }
  });
});

router.put('/:id', (req, res) => {
  let sql = "UPDATE admin SET ? WHERE id=?";
  connection.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      sql = "SELECT * FROM admin WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({errorMessage: `Admin with id ${req.params.id} not found`});
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM admin WHERE id=?";
  connection.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;