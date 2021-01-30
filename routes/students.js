var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET student list
router.get("/", function(req, res, next) {
  db("SELECT * FROM students;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one student
router.get("/:id", function(req, res, next) {
  // get the id first
  let id = req.params.id;
  // if the id exists, get the student with the ID
  let sql = `SELECT * FROM students WHERE id = ${id}`;
  db(sql)
    .then(results => {
      // send the results in json
      res.send(results.data);
    })
    // catch server error
    .catch(err => res.status(500).send(err));
  // if the id doesnt exists, there should be a not found message
});

// INSERT a new student into the DB
router.post("/", function(req, res, next) {
  //your code here
  // deconstruct what goes into the body
  let { firstname, lastname } = req.params.body;
  let sql = ` INSERT INTO 
  students ( firstname, lastname ) 
  VALUES ('${firstname}', '${lastname}');`;
  db(sql).then(results => {
    db("SELECT * FROM students").then(results => {
      res.status(201).send(results.data);
    });
  });
  // for some reason this keeps giving me a server error
});

// DELETE a student from the DB
router.delete("/:id", function(req, res, next) {
  //your code here
});

module.exports = router;
