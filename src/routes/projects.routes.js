const {connection} = require('../db_connection');
const router = require('express').Router();

router.get('/', (req, res) => {
  const sql = "SELECT * FROM projects";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/', (req, res) => {
    const sql = "INSERT INTO projects SET ?";
    connection.query(sql, req.body, (err, results) => {
      if (err) {
        res.status(500).send({errorMessage: err.message});
      } else {
        res.status(201).json({id: results.insertId, ...req.body});
      }
    });
  });
  
  router.put('/:id', (req, res) => {
    let sql = "UPDATE projects SET ? WHERE id=?";
    connection.query(sql, [req.body, req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({errorMessage: err.message});
      } else {
        sql = "SELECT * FROM projects WHERE id=?";
        connection.query(sql, req.params.id, (err, result) => {
          if (result.length === 0) {
            res.status(404).send({errorMessage: `projects with id ${req.params.id} not found`});
          } else {
            res.status(200).json(result[0]);
          }
        });
      }
    });
  });
  
  router.delete('/:id', (req, res) => {
    const sql = "DELETE FROM projects WHERE id=?";
    connection.query(sql, req.params.id, (err, results) => {
      if (err) {
        res.status(500).send({errorMessage: err.message});
      } else {
        res.sendStatus(200);
      }
    });
  });

  
  
  module.exports = router;